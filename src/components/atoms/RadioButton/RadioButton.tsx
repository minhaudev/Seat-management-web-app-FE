import React from "react";

interface RadioProps {
    label?: string;
    checked: boolean;
    disabled?: boolean;
    onChange: () => void;
}

const RadioButton = ({
    label,
    checked,
    disabled = false,
    onChange
}: RadioProps) => {
    return (
        <label
            className={`flex items-center cursor-pointer ${
                disabled ? "cursor-not-allowed" : ""
            }`}>
            <input
                type="radio"
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                className={`
                    form-radio
                    h-5 w-5
                    text-primary
                    transition duration-150 ease-in-out
                    hover:cursor-pointer
                    ${
                        checked
                            ? "bg-blue-bold border-success"
                            : "bg-gray-200 border-gray-400"
                    }
                    ${
                        disabled
                            ? "bg-gray-200 border-gray-400 cursor-not-allowed"
                            : ""
                    }
                    ${!disabled && "focus:ring focus:ring-blue-300"}
                `}
            />
            <span
                className={`ml-2 ${
                    disabled ? "text-gray-400" : "text-gray-900"
                }`}>
                {label}
            </span>
        </label>
    );
};

export default RadioButton;
