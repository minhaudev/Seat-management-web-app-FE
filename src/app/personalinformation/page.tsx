"use client";

import Button from "@/components/atoms/Button";
import React, {useEffect, useState} from "react";
import LayoutContainer from "../LayoutContainer";
import {useUser} from "@/context/UserContext";
import {ShowCompany} from "@/services/auth/update";

const PersonalInformation = () => {
    const {user, setUser} = useUser();
    const [companyValue, setCompanyValue] = useState("");

    useEffect(() => {
        if (!user) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, [user, setUser]);

    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.companyId) {
                    const response = await ShowCompany(
                        user.companyId,
                        authToken || ""
                    );
                    setCompanyValue(response.data.name);
                }
            } catch (error) {
                console.error("Failed to fetch company data:", error);
            }
        };

        fetchData();
    }, [user?.companyId, authToken]);

    return (
        <LayoutContainer>
            <div className="flex justify-center items-center">
                <div className="w-full max-w-xl gap-3 bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
                        Thông Tin Người Dùng
                    </h2>

                    <div className="space-y-6">
                        <div className="flex justify-center items-center py-[4px]">
                            <span className="text-sm font-medium text-gray-600 w-[30%]">
                                FirstName:
                            </span>
                            <span className="text-sm text-gray-800 border w-[70%] rounded-lg border-gray p-2">
                                {user?.firstName || "N/A"}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex justify-center items-center py-[4px]">
                            <span className="text-sm font-medium text-gray-600 w-[30%]">
                                LastName:
                            </span>
                            <span className="text-sm text-gray-800 border w-[70%] rounded-lg border-gray p-2">
                                {user?.lastName || "N/A"}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex justify-center items-center py-[4px]">
                            <span className="text-sm font-medium text-gray-600 w-[30%]">
                                UserName:
                            </span>
                            <span className="text-sm text-gray-800 border w-[70%] rounded-lg border-gray p-2">
                                {user?.username || "N/A"}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex justify-center items-center py-[4px]">
                            <span className="text-sm font-medium text-gray-600 w-[30%]">
                                Company:
                            </span>
                            <span className="text-sm text-gray-800 border w-[70%] rounded-lg border-gray p-2">
                                {companyValue || "N/A"}
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <Button>Chỉnh sửa thông tin</Button>
                    </div>
                </div>
            </div>
        </LayoutContainer>
    );
};

export default PersonalInformation;
