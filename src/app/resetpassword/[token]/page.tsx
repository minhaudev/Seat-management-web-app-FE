"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import {fieldInput} from "@/consts/validates";
import {forgotPassword, recoverPassword} from "@/services/auth/auth";
import {validateField} from "@/utils/validateForm";
import {Spinner} from "@nextui-org/react";
import {useParams} from "next/navigation";
import React, {useState} from "react";
import "./style.css";
import {Router} from "next/router";
import {useRouter} from "next/navigation";
export default function ResetPasswordPage() {
    const router = useRouter();
    const params = useParams();
    const tokenParam = params.token;
    const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({password: ""});
    const [errors, setErrors] = useState<{password?: string}>({password: ""});

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setIsSuccess(true);
        setErrors({...errors, [name]: validateField(name, value)});
    };

    const handleResetPassword = async () => {
        const usernameError = validateField(
            fieldInput.PASSWORD,
            formData.password
        );
        setErrors({password: usernameError});

        if (usernameError) return;

        setIsLoading(true);
        try {
            const res = await recoverPassword(token, formData.password);
            if (res) {
                setIsSuccess(true);
                router.push("/login");
            } else {
                setIsSuccess(false);
                setErrorMessage("Đã có lỗi xảy ra!");
            }
        } catch (err) {
            setIsSuccess(false);
            setErrorMessage("Server error!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="">
            <div className="background bg-stroke w-full h-[100vh] flex justify-center items-center">
                <div className="w-[452px] py-[64px] px-[24px] bg-white shadow-lg shadow-[rgba(0,0,0,0.1)]">
                    <p className="text-center text-[25px] font-normal">
                        Recover Password
                    </p>
                    <Input
                        isError={!!errors.password}
                        helperText={errors.password}
                        size="large"
                        label="New Password"
                        require
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        handleOnChange={handleInputChange}
                    />

                    <p className="mb-6"></p>

                    <Button
                        isDisabled={
                            !!errors.password ||
                            formData.password === "" ||
                            !isSuccess ||
                            isLoading
                        }
                        onClick={handleResetPassword}
                        className="bg-custom-gradient">
                        {isLoading ?
                            <p className="flex justify-center items-center">
                                Loading...
                                <Spinner size="sm" color="default" />
                            </p>
                        :   "Reset Password"}
                        a
                    </Button>

                    {!isSuccess && (
                        <p className="text-red text-[13px] absolute mt-[4px]">
                            {errorMessage}
                        </p>
                    )}
                    <p className="mb-6"></p>
                </div>
            </div>
        </div>
    );
}
