import React from "react";
import TriagleExClamation from "@/assets/svgs/triangle_exclamation.svg";

interface PropertieProps {
    title: string;
}

const StatusPending = ({ title }: PropertieProps) => {
    title = title.toUpperCase()
    const isIcon = title == "PENDING"
    return (
        <div
            className={`py-1 px-4 flex w-[193px] items-center text-text  text-center text-[11px] font-medium rounded-sm max-w-md bg-gray-light `}>
            {!isIcon && <TriagleExClamation className={"mr-1"} />}
            <p className={`${isIcon && "ml-3.5"}`}>{title}</p>
        </div>
    );
};

export default StatusPending;
