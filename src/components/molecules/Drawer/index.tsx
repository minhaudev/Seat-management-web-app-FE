import {ReactNode} from "react";
import Delete from "@/assets/svgs/close_round_light.svg";
import {twMerge} from "tailwind-merge";
import "./style.css";

interface Props {
    positionContent?: "Top_Left" | "Top_Right" | "Top" | "Bottom";
    customClassName?: string;
    children?: ReactNode;
    isOpen?: boolean;
    name?: string;
    subName?: ReactNode;
    onClose?: () => void;
}

const positionClasses = {
    Top_Left: "top-0 left-0",
    Top_Right: "top-0 right-0",
    Top: "top-0",
    Bottom: "bottom-0"
};

const translateClasses = {
    Top_Left: "translate-x-[-100%]",
    Top_Right: "translate-x-full",
    Top: "translate-y-[-100%]",
    Bottom: "translate-y-full"
};

const openTranslateClasses = {
    Top_Left: "translate-x-0",
    Top_Right: "translate-x-0",
    Top: "translate-y-0",
    Bottom: "translate-y-0"
};
// const handleClose = () => {

// }
export default function Drawer({
    children,
    isOpen,
    name,
    subName,
    onClose,
    customClassName,
    positionContent = "Bottom"
}: Props) {
    return (
        <div
            onClick={onClose}
            className={twMerge(
                "drawer w-full bg-[rgba(0,0,0,0.3)] fixed inset-0 z-50 transition",
                isOpen ? "show" : ""
            )}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={twMerge(
                    "max-w-[448px] w-full transition duration-300 bg-white min-h-screen h-full absolute !z-auto",
                    customClassName,
                    isOpen ?
                        openTranslateClasses[positionContent]
                    :   translateClasses[positionContent],
                    positionClasses[positionContent],
                    positionContent === "Bottom" || positionContent === "Top" ?
                        `w-full max-w-[100%] max-h-[448px] min-h-[0px] ${customClassName}`
                    :   ""
                )}>
                <div className="py-5 px-4 flex justify-between items-center">
                    <div>
                        <p className="text-primary font-medium text-[16px] leading-[19.09px] mb-1">
                            {name}
                        </p>
                        <p>{subName}</p>
                    </div>
                    <Delete
                        className="text-[#3A3B3C] cursor-pointer w-8 h-8 p-2 inline-block"
                        onClick={onClose}
                    />
                </div>
                {children}
            </div>
        </div>
    );
}
