import React from "react";
import UnSelected from "@/assets/svgs/unselected.svg";
import Selected from "@/assets/svgs/selected.svg";
import SelectedDisable from "@/assets/svgs/selected_disable.svg";

interface CheckboxProps {
    description?: string;
    id: string;
    disable?: boolean;
    className?: string;
    checked?: boolean | Record<string, boolean>;
    onChange?: (id: string) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
    description,
    id,
    disable,
    className,
    checked = false,
    onChange
}) => {
    const handleClick = () => {
        if (!disable && onChange) {
            onChange(id); // Pass id to parent component to handle the change
        }
    };

    return (
        <div className="flex items-center justify-left w-full">
            <div
                onClick={handleClick}
                className={`w-5 h-5 cursor-pointer ${disable ? "opacity-50" : ""}`}>
                {disable ?
                    <SelectedDisable className="w-5 h-5" />
                : checked ?
                    <Selected className={`w-5 h-5 ${className}`} />
                :   <UnSelected className={`w-5 h-5 ${className}`} />}
            </div>
            <label
                onClick={handleClick}
                htmlFor={id}
                className="ms-2 text-[13px] font-normal text-text-light dark:text-gray-300 cursor-pointer">
                {description}
            </label>
        </div>
    );
};

export default Checkbox;
