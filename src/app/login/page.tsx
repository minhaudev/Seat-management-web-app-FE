"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import "./style.css";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import {signInUser} from "@/services/auth/login";
import {fieldInput} from "@/consts/validates";
import {validateField} from "@/utils/validateForm";
import {Spinner} from "@nextui-org/react";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({
        email: "",
        password: ""
    });

    const [isRemember, setIsRemember] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        const savedPassword = localStorage.getItem("rememberedPassword");
        if (savedEmail && savedPassword) {
            setFormData({email: savedEmail, password: savedPassword});
            setIsRemember(true);
        }
    }, []);
    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setIsSuccess(true);
        setErrors({
            ...errors,
            [name]: validateField(name, value)
        });
    };
    const onChangeRemember = (id: string) => {
        setIsRemember(!isRemember);
    };

    const handleLogin = async () => {
        setIsLoading(true);
        const usernameError = validateField(fieldInput.EMAIL, formData.email);
        const passwordError = validateField(
            fieldInput.PASSWORD,
            formData.password
        );

        if (usernameError || passwordError) {
            setErrors({
                email: usernameError,
                password: passwordError
            });
            return;
        }

        try {
            const response = await signInUser(
                formData.email,
                formData.password
            );

            if (response && response?.code !== 1000) {
                setErrorMessage(response?.message);
            }
            if (response && response.code === 1000) {
                setIsSuccess(true);

                if (isRemember) {
                    localStorage.setItem("rememberedEmail", formData.email);
                    localStorage.setItem(
                        "rememberedPassword",
                        formData.password
                    );
                } else {
                    localStorage.removeItem("rememberedEmail");
                    localStorage.removeItem("rememberedPassword");
                }
                const {firstName, lastName, email, role, idUser, idRoom} =
                    response.data;
                localStorage.setItem("idUser", idUser);
                localStorage.setItem("role", role);
                const nameUser =
                    firstName || lastName ?
                        `${firstName || ""} ${" "} ${lastName || ""}`
                    :   email;

                localStorage.setItem("nameUser", nameUser);
                localStorage.setItem("authToken", response.data.token);
                const roleUser = localStorage.getItem("role");
                router.push(roleUser === "SUPERUSER" ? "/" : `/room/${idRoom}`);
            } else {
                setIsSuccess(false);
                setIsLoading(false);
            }
        } catch (error) {
            setIsSuccess(false);
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="">
            <div
                className={`background bg-stroke w-[full] flex justify-center items-center `}>
                <div className="font-wendy-one uppercase text-[128px] font-[400] leading-[135.04px] text-primary mr-[350px]">
                    SEAT
                </div>
                <div className="w-[452px] py-[64px] px-[24px] bg-white shadow-lg shadow-[rgba(0,0,0,0.1)]">
                    <Input
                        isError={!!errors.email}
                        helperText={errors.email}
                        size="large"
                        label="email"
                        require
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        handleOnChange={handleInputChange}
                    />
                    <p className="mb-6"></p>
                    <Input
                        isError={!!errors.password}
                        helperText={errors.password}
                        size="large"
                        type="password"
                        label="Password"
                        require
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        handleOnChange={handleInputChange}
                    />
                    <p className="mb-6"></p>

                    <Button
                        isDisabled={
                            !!errors.email ||
                            !!errors.password ||
                            formData.email === "" ||
                            formData.password === "" ||
                            !isSuccess ||
                            isLoading
                        }
                        className="bg-custom-gradient "
                        onClick={handleLogin}>
                        {isLoading ?
                            <p className="flex justify-center items-center">
                                Loading...
                                <Spinner size="sm" color="default" />
                            </p>
                        :   "Login"}
                    </Button>
                    {!isSuccess && (
                        <p className="text-red text-[13px] absolute mt-[4px]">
                            {errorMessage}
                        </p>
                    )}
                    <p className="mb-6"></p>

                    <div className="flex justify-between ">
                        <div className="text-[#4B5563] text-[13px] font-normal leading-[15.51px]">
                            <Checkbox
                                id="remember"
                                checked={isRemember}
                                onChange={onChangeRemember}
                                description="Remember me"
                            />
                        </div>
                        <p
                            className="text-[13px] cursor-pointer text-[#01559B] font-medium leading-[15.51px]"
                            onClick={() => {
                                router.push("/resetpassword");
                            }}>
                            Forgot password?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
