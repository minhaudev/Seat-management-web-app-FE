"use client";
import DropDown from "@/assets/svgs/dropdown_config.svg";
import Bell from "@/assets/svgs/bell.svg";
import User from "@/assets/svgs/user_1.svg";
import DropsDown from "@/components/atoms/Dropdown";
import OrderNotice from "@/components/atoms/OrderNotice/OrderNotice";
import {FormatNotice} from "@/utils";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {useOrderNotice} from "@/utils/Notification";
import useWebSockets from "@/hooks/webSocket";
import {useSeat} from "@/context/SeatContext";

export default function Header() {
    const [isClicked, setIsClicked] = useState(false);
    const [isNotice, setIsNotice] = useState(false);
    const noticeRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const {total, data} = useOrderNotice();
    const {clearNotifications, userName, notifications} = useSeat();

    const router = useRouter();
    const userNamelocal =
        typeof window !== "undefined" ?
            userName || localStorage.getItem("nameUser")
        :   "Guest";

    const role =
        typeof window !== "undefined" ? localStorage.getItem("role") : " ";

    const handleLogout = () => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        const rememberedPassword = localStorage.getItem("rememberedPassword");

        localStorage.clear();

        if (rememberedEmail) {
            localStorage.setItem("rememberedEmail", rememberedEmail);
        }
        if (rememberedPassword) {
            localStorage.setItem("rememberedPassword", rememberedPassword);
        }

        router.push("/login");
    };

    useWebSockets("SUPERUSER");
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!noticeRef.current?.contains(event.target as Node))
                setIsNotice(false);
            if (!dropdownRef.current?.contains(event.target as Node))
                setIsClicked(false);
        };
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);
    const handleNoticeClick = () => {
        setIsNotice(!isNotice);
        if (!isNotice) {
            clearNotifications();
        }
    };
    return (
        <div className="w-full z-10 sticky top-0 bg-white">
            <div className="h-14 w-full flex justify-between items-center px-6 border-b border-stroke">
                {role === "superuser" ?
                    <Link
                        href="/"
                        className="uppercase text-[32px] font-[500] leading-[33.76px] font-wendy-one text-primary">
                        SEAT
                    </Link>
                :   <Link
                        href={`/room/${localStorage.getItem("roomId")}`}
                        className="uppercase text-[32px] font-[500] leading-[33.76px] font-wendy-one text-primary">
                        SEAT
                    </Link>
                }

                {role === "SUPERUSER" && (
                    <div className="flex justify-between items-center w-[40%]">
                        {["floor"].map((page) => (
                            <p
                                key={page}
                                className="cursor-pointer hover:text-primary-5-hover hover:font-medium font-normal text-[20px]"
                                onClick={() => router.push(`/${page}`)}>
                                {page.charAt(0).toUpperCase() + page.slice(1)}
                            </p>
                        ))}
                    </div>
                )}

                <div className="flex gap-4 items-center w-[30%] justify-end">
                    <div
                        className="relative"
                        ref={noticeRef}
                        onClick={handleNoticeClick}>
                        {notifications.filter((n) => !n.read).length > 0 && (
                            <span className="absolute cursor-pointer rounded-full ml-3 z-10 px-1 text-[8px] text-white bg-red">
                                {FormatNotice(
                                    notifications.filter((n) => !n.read).length
                                )}
                            </span>
                        )}

                        <Bell className="w-6 h-6 cursor-pointer" />
                        {isNotice && (
                            <OrderNotice total={total} dataNotice={data} />
                        )}
                    </div>

                    <div className="h-[32px] w-[1px] bg-stroke"></div>

                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        ref={dropdownRef}
                        onClick={() => setIsClicked(!isClicked)}>
                        <User className="w-8 h-8 rounded-full" />
                        <div>
                            <p className="text-text text-[13px]">
                                {userNamelocal}
                            </p>
                            <p className="text-unit text-[12px]">{role}</p>
                        </div>
                        <DropDown className="!w-3 !h-2" />
                        {isClicked && (
                            <DropsDown>
                                <p
                                    className="border-b py-2 text-[13px] cursor-pointer"
                                    onClick={() =>
                                        router.push("/personalinformation")
                                    }>
                                    Info Personal
                                </p>
                                {role === "SUPERUSER" && (
                                    <div>
                                        <p
                                            className="border-b py-2 text-[13px] cursor-pointer"
                                            onClick={() => {
                                                router.push("/managementuser");
                                            }}>
                                            Management User
                                        </p>
                                        <p
                                            className="border-b py-2 text-[13px] cursor-pointer"
                                            onClick={() => {
                                                router.push("/approve");
                                            }}>
                                            Approve
                                        </p>
                                    </div>
                                )}
                                <p
                                    className="border-b py-2 text-[13px] cursor-pointer"
                                    onClick={() => {
                                        router.push("/resetpassword");
                                    }}>
                                    Change Password
                                </p>
                                <p
                                    className="py-2 text-[13px] cursor-pointer"
                                    onClick={handleLogout}>
                                    Logout
                                </p>
                            </DropsDown>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
