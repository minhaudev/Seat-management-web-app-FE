"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import {fieldInput} from "@/consts/validates";
import {forgotPassword} from "@/services/auth/auth";
import {validateField} from "@/utils/validateForm";
import {Spinner} from "@nextui-org/react";
import {useParams} from "next/navigation";
import React, {useState} from "react";
import "./style.css";

export default function recoverPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({email: ""});
    const [errors, setErrors] = useState<{email?: string}>({email: ""});
    const [emailSent, setEmailSent] = useState(false);

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setIsSuccess(true);
        setErrors({...errors, [name]: validateField(name, value)});
    };

    const handleSentEmail = async () => {
        const usernameError = validateField(fieldInput.EMAIL, formData.email);
        setErrors({email: usernameError});

        if (usernameError) return;

        setIsLoading(true);
        try {
            const res = await forgotPassword(formData.email);

            if (res.code !== 9999) {
                setEmailSent(true);
                setIsSuccess(true);
            } else {
                setIsSuccess(false);
                setErrorMessage(res.message);
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
                        isError={!!errors.email}
                        helperText={errors.email}
                        size="large"
                        label="Email"
                        require
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        handleOnChange={handleInputChange}
                    />

                    <p className="mb-6"></p>

                    <Button
                        isDisabled={
                            emailSent ||
                            !!errors.email ||
                            formData.email === "" ||
                            isLoading
                        }
                        onClick={handleSentEmail}
                        className={`${
                            emailSent ? "" : "bg-custom-gradient"
                        } text-white transition-all duration-300`}>
                        {isLoading ?
                            <p className="flex justify-center items-center">
                                Loading...
                                <Spinner size="sm" color="default" />
                            </p>
                        : emailSent && isSuccess === true ?
                            "Please check your email"
                        :   "Reset Password"}
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
