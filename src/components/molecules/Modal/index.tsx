import React, {ReactNode} from "react";
import Close from "@/assets/svgs/close_round.svg";
import {twMerge} from "tailwind-merge";
import "./style.css";
import Button from "@/components/atoms/Button";

interface Props {
    onClick?: () => void;
    nameBtn?: string;
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    name?: string;
    subName?: string;
    onClose?: () => void;
}

export default function Modal({
    onClick,
    nameBtn,
    className,
    children,
    isOpen,
    name,
    subName,
    onClose
}: Props) {
    return (
        <div
            onClick={onClose}
            className={twMerge(
                "modal w-full bg-[rgba(0,0,0,0.3)] fixed inset-0 z-30  transition flex justify-center items-center",
                isOpen ? "show" : "hidden"
            )}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={twMerge(
                    "modal-content max-w-2xl w-full bg-white rounded-xl",
                    isOpen ? "show" : "",
                    className
                )}>
                <div
                    className={twMerge(
                        "py-5 px-4 flex justify-between items-center flex-col"
                    )}>
                    <div className="flex items-center justify-between rounded-t dark:border-gray-600 w-full">
                        <h3 className="text-base !text-text font-medium w-[95%]">
                            {name}
                        </h3>
                        <div
                            className="flex justify-end w-fit"
                            onClick={onClose}>
                            <Close className="w-5 h-5 text-gray-10 " />
                        </div>
                    </div>
                    <div className="p-4 w-full space-y-4">{children}</div>
                    <div className="flex items-center justify-end gap-x-2 px-4 pb-0 md:p-5 rounded-b dark:border-gray-600">
                        {/* Additional footer content if needed */}
                    </div>
                    <div>
                        <Button
                            onClick={onClick}
                            className="text-primary font-medium text-[16px] leading-[19.09px] mb-1">
                            {nameBtn}
                        </Button>
                        {/* <p className="font-normal text-[13px] leading-[15.51px] text-gray">
                            {subName}
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
