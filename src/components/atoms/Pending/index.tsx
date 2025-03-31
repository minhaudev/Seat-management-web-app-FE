import {PendingEnum} from "@/enums/PendingEnum";
import React from "react";

interface PendingValue {
    color: string;
    background: string;
}

interface PendingProps {
    type: PendingEnum;
    description: string;
    className?: string;
}

export const PendingValues: Record<PendingEnum, PendingValue> = {
    [PendingEnum.Current]: {
        color: "text-white",
        background: "bg-green-bold"
    },
    [PendingEnum.Expired]: {
        color: "text-text",
        background: "bg-gray-light"
    },
    [PendingEnum.Approve]: {
        color: "text-white",
        background: "bg-secondary"
    },
    [PendingEnum.Denied]: {
        color: "text-white",
        background: "bg-red-bold"
    },
    [PendingEnum.Pending]: {
        color: "text-text",
        background: "bg-yellow"
    },
    [PendingEnum.Draft]: {
        color: "text-text",
        background: "bg-gray-light"
    }
};

const Pending = ({type, description}: PendingProps) => {
    const {color, background} = PendingValues[type];

    return (
        <div
            className={` w-fit flex justify-center items-center px-2 py-1 ${background} rounded-[3px]  `}>
            <p
                className={`${color} text-[11px] font-semibold text-center leading-[16.5px]`}>
                {description}
            </p>
        </div>
    );
};

export default Pending;
