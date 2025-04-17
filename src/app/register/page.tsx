"use client";
import React, {ReactNode, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import "./style.css";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import {fieldInput} from "@/consts/validates";
import {validateField} from "@/utils/validateForm";
import {Spinner} from "@nextui-org/react";
import {RegisterUser, GetAllCompany} from "@/services/auth/register";
function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const companyRef = useRef<string[]>([]);
    const [company, setCompany] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        company: "",
        birthday: ""
    });
    const [errors, setErrors] = useState<{
        username?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
        confirmPassword?: string;
        company?: string;
        birthday?: string;
    }>({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        company: "",
        birthday: ""
    });
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetAllCompany();

                const formattedCompanies = response.data.map(
                    (company: any) => ({
                        label: company.name,
                        value: company.id
                    })
                );
                setCompany(formattedCompanies);
                companyRef.current = company;
            } catch (error) {
                console.error("Failed to fetch company data:", error);
            }
        };

        fetchData();
    }, []);
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        setFormData({
            ...formData,
            company: value
        });
        setIsSuccess(true); // Đặt trạng thái là thành công khi thay đổi
        setErrors({
            ...errors,
            company: validateField(fieldInput.COMPANY, value) // Kiểm tra lỗi của công ty
        });
    };

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

    const handleRegister = async () => {
        const usernameError = validateField(
            fieldInput.USERNAME,
            formData.username
        );
        const passwordError = validateField(
            fieldInput.PASSWORD,
            formData.password
        );
        const confirmPasswordError = validateField(
            fieldInput.PASSWORD,
            formData.confirmPassword
        );
        const companyError = validateField(
            fieldInput.COMPANY,
            formData.company
        );
        const firstNameError = validateField(
            fieldInput.NAME,
            formData.firstName
        );
        const lastNameError = validateField(fieldInput.NAME, formData.lastName);
        const birthdayError = validateField(
            fieldInput.USERNAME,
            formData.birthday
        );

        if (
            companyError ||
            usernameError ||
            passwordError ||
            confirmPasswordError ||
            firstNameError ||
            lastNameError ||
            birthdayError
        ) {
            setErrors({
                username: usernameError,
                password: passwordError,
                firstName: firstNameError,
                lastName: lastNameError,
                confirmPassword: confirmPasswordError,
                company: companyError,
                birthday: birthdayError
            });
            return;
        }
        const matchPassword = formData.password === formData.confirmPassword;
        if (!matchPassword) {
            setErrorMessage("Password is not match!");
        }
        try {
            const response = await RegisterUser(
                formData.firstName,
                formData.lastName,
                formData.username,
                formData.password,
                formData.confirmPassword,
                formData.company,
                formData.birthday
            );

            if (response && response?.code !== 1000) {
                setErrorMessage(response?.message);
            }
            if (response && response.code === 1000) {
                setIsSuccess(true);
                router.push("/login");
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
                className={`background bg-stroke w-[full] max-h-[100vh] flex justify-center items-center `}>
                <div className="font-wendy-one uppercase text-[128px] font-[400] leading-[135.04px] text-primary mr-[350px]">
                    LUNA
                </div>
                <div className="w-[452px] py-[64px] px-[24px] bg-white shadow-lg shadow-[rgba(0,0,0,0.1)]">
                    <Input
                        isError={!!errors.firstName}
                        helperText={errors.firstName}
                        size="large"
                        type="firstName"
                        label="firstName"
                        require
                        name="firstName"
                        placeholder="FirstName"
                        value={formData.firstName}
                        handleOnChange={handleInputChange}
                    />
                    <p className="mb-6"></p>
                    <Input
                        isError={!!errors.lastName}
                        helperText={errors.lastName}
                        size="large"
                        type="lastName"
                        label="lastName"
                        require
                        name="lastName"
                        placeholder="LastName"
                        value={formData.lastName}
                        handleOnChange={handleInputChange}
                    />
                    <p className="mb-6"></p>
                    <Input
                        isError={!!errors.username}
                        helperText={errors.username}
                        size="large"
                        label="username"
                        require
                        name="username"
                        placeholder="username"
                        value={formData.username}
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
                    <Input
                        isError={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        size="large"
                        type="password"
                        label="ConfirmPassword"
                        require
                        name="confirmPassword"
                        placeholder="ConfirmPassword"
                        value={formData.confirmPassword}
                        handleOnChange={handleInputChange}
                    />
                    <p className="mb-6"></p>
                    <Input
                        optionSelect={company}
                        isError={!!errors.company}
                        helperText={errors.company}
                        size="large"
                        type="company"
                        label="Company"
                        require
                        variant="select"
                        name="company"
                        placeholder="Company"
                        value={formData.company}
                        handleSelectChange={handleSelectChange}
                    />
                    <p className="mb-6"></p>
                    <Input
                        isError={!!errors.birthday}
                        helperText={errors.birthday}
                        size="large"
                        type="birthday"
                        label="Birthday"
                        require
                        name="birthday"
                        placeholder="2003-03-28"
                        value={formData.birthday}
                        handleOnChange={handleInputChange}
                    />
                    <p className="mb-6"></p>
                    <p className="mb-6"></p>

                    <Button
                        isDisabled={
                            !!errors.username ||
                            !!errors.password ||
                            !!errors.confirmPassword ||
                            !!errors.lastName ||
                            !!errors.lastName ||
                            !!errors.birthday ||
                            formData.username === "" ||
                            formData.password === "" ||
                            !isSuccess ||
                            isLoading
                        }
                        className="bg-custom-gradient "
                        onClick={handleRegister}>
                        {isLoading ?
                            <p className="flex justify-center items-center">
                                Loading...
                                <Spinner size="sm" color="default" />
                            </p>
                        :   "Register"}
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

export default Register;
