"use client";

import React, {useEffect, useState} from "react";
import LayoutContainer from "../LayoutContainer";
import {getInfoPersonal, updateUser} from "@/services/auth/update";

import Input from "@/components/atoms/Input";

import Button from "@/components/atoms/Button";
import {UserInfo} from "@/interfaces/managerSeat";
import {ToastPosition, ToastType} from "@/enums/ToastEnum";
import Toast from "@/components/molecules/Toast";
import {useSeat} from "@/context/SeatContext";

export default function PersonalInformation() {
    const {setUserName} = useSeat();
    const [isSaveLayout, setIsSaveLayout] = useState(false);
    const [info, setInfo] = useState<UserInfo | null>(null);

    const handleGetInfo = async () => {
        try {
            const res = await getInfoPersonal();
            setInfo(res.data);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin cá nhân:", error);
        }
    };

    useEffect(() => {
        handleGetInfo();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const {name, value} = e.target;
        setInfo((prev) => (prev ? {...prev, [name]: value} : prev));
    };
    const handleUpdate = async () => {
        if (!info) return;

        const payload = {
            firstName: info.firstName,
            lastName: info.lastName,
            project: info.project,
            team: info.team,
            phone: info.phone ?? "",
            roles:
                Array.isArray(info.roles) ?
                    info.roles.map((role) => role.name)
                :   [],
            roomId: info.roomId ?? ""
        };
        try {
            const res = await updateUser(info.id, payload);
            if (res.code === 1000) {
                if (res.code === 1000) {
                    setUserName(`${info.firstName} ${info.lastName}`);
                    setIsSaveLayout(true);
                }

                setIsSaveLayout(true);
            }
        } catch (error) {
            console.error("Cập nhật thất bại:", error);
        }
    };

    if (!info)
        return (
            <LayoutContainer isFooter={false} isNav={false}>
                Loading ...
            </LayoutContainer>
        );

    return (
        <LayoutContainer isFooter={false} isNav={false}>
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
                <h2 className="text-xl font-semibold text-center mb-4">
                    Personal Information
                </h2>

                <Input
                    label="FirstName:"
                    name="firstName"
                    value={info.firstName}
                    handleOnChange={handleChange}
                    placeholder="firstName"
                />
                <Input
                    label="LastName:"
                    name="lastName"
                    value={info?.lastName}
                    handleOnChange={handleChange}
                    placeholder="LastName"
                />

                <Input
                    label="Email:"
                    name="email"
                    value={info.email}
                    isDisabled
                />
                <Input
                    label="Phone"
                    name="phone"
                    value={info.phone}
                    handleOnChange={handleChange}
                    placeholder="Phone number"
                />
                <Input
                    isDisabled
                    label="Project:"
                    name="project"
                    value={info.project}
                    handleOnChange={handleChange}
                    placeholder="Project"
                />
                <Input
                    isDisabled
                    label="Team:"
                    name="team"
                    value={info.team}
                    handleOnChange={handleChange}
                    placeholder="Team"
                />
                <Input
                    label="RoomName:"
                    name="roomId"
                    value={localStorage.getItem("roomName") || ""}
                    isDisabled
                    placeholder="roomId"
                />

                <div className="text-right mt-6">
                    <Button onClick={handleUpdate}>UPDATE</Button>
                </div>
            </div>
            {isSaveLayout === true && (
                <Toast
                    time={1000}
                    position={ToastPosition.Top_Right}
                    type={ToastType.Success}
                    description="Save layout Success!"
                    isOpen={isSaveLayout}
                    onClose={() => setIsSaveLayout(false)}
                />
            )}
        </LayoutContainer>
    );
}
