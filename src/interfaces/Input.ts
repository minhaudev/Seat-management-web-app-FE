import {ReactNode} from "react";

export interface PropsInput {
    variant?: "input" | "textarea";
    size?: "large" | "medium" | "small";
    label?: string;
    value?: string | number;
    type?: string;
    error?: boolean;
    helperText?: string;
    suffixIcon?: string;
    placeholder?: string;
    name?: string;
    handleOnChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    isDisabled?: boolean;
    className?: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    require?: boolean;
    showCalendar?: boolean;
    setShowCalendar?: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDate?: Date | null;
    handleDateChange?: (date: Date | null) => void;
    handleSelectChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
