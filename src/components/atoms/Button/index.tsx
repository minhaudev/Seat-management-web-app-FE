"use client";
import "./style.css";
import Frame from "@/assets/svgs/frame_v2.svg";
import FileDock from "@/assets/svgs/file_dock_duotone.svg";
import Close from "@/assets/svgs/close_square_light.svg";
import Link from "next/link";
import React, {
    ReactNode,
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
    useState
} from "react";

interface FileDetail {
    name: string;
    size: number;
}

interface PropsBtn {
    heplerText?: string;
    onSubmit?: () => void;
    maxFile?: number;
    variant?:
        | "file"
        | "primary-light"
        | "primary-dark"
        | "secondary"
        | "dashed"
        | "link"
        | "text"
        | "upload";
    size?: "2xl" | "large" | "semi" | "medium" | "small";
    color?: "white" | "blue" | "blue-dark";
    isDisabled?: boolean;
    children?: ReactNode;
    prefixIcon?: ReactNode;
    url?: string;
    isError?: boolean;
    isIcon?: boolean;
    className?: string;
    onDelete?: (index: number) => void;
    fileDetails?: FileDetail[];
    setFileDetails?: React.Dispatch<React.SetStateAction<FileDetail[]>>;
    typeFile?: string;
    warningFile?: ReactNode;
}
// type RequiredProps = Required<Pick<PropsBtn, "typeFile">> &
//     Omit<PropsBtn, "typeFile">;

export default function Button(
    props: PropsBtn &
        ButtonHTMLAttributes<HTMLButtonElement> &
        AnchorHTMLAttributes<HTMLAnchorElement>
) {
    const {
        heplerText = "",
        maxFile = 1,
        warningFile,
        typeFile,
        onDelete,
        isIcon,
        variant = "primary-dark",
        size = "large",
        isDisabled,
        isError,
        prefixIcon,
        url,
        color,
        children,
        className,
        fileDetails,
        setFileDetails,
        ...rest
    } = props;
    const [isWarning, setIsWarning] = useState(false);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && setFileDetails) {
            const files = Array.from(event.target.files).map((file) => ({
                name: file.name,
                size: file.size
            }));

            if (files.length <= maxFile) {
                setIsWarning(false);
                setFileDetails(files);
            } else {
                setIsWarning(true);
            }
        }
    };

    const formatFileName = (fileName: string, maxLength: number = 10) => {
        const extension = fileName.slice(fileName.lastIndexOf("."));
        const nameWithoutExtension = fileName.slice(
            0,
            fileName.lastIndexOf(".")
        );

        if (nameWithoutExtension.length > maxLength) {
            return `${nameWithoutExtension.slice(0, maxLength)}...${extension}`;
        }

        return fileName;
    };
    const handleClose = (index: number) => {
        if (fileDetails && setFileDetails) {
            const updatedFiles = fileDetails.filter((_, i) => i !== index);
            setFileDetails(updatedFiles);
        }
    };

    const getVariantClass = (variant: string) => {
        switch (variant) {
            case "primary-light":
                return "bg-secondary text-white hover:bg-secondary-hover ";
            case "primary-dark":
                return "bg-primary-5 text-white hover:bg-primary-5-hover";
            case "secondary":
                return "bg-white border border-stroke hover:bg-highlight hover:border-primary-5-hover hover:text-primary-5-hover text-text";
            case "dashed":
                return "bg-white border border-stroke border-dashed hover:bg-highlight hover:border-primary-5-hover hover:text-primary-5-hover text-text";
            case "link":
                return "bg-[transparent] text-primary hover:text-primary-5-hover";
            case "text":
                return "bg-[transparent] hover:bg-white";
            case "upload":
                return "bg-yellow text-white hover:text-green";
            case "file":
            default:
                return "";
        }
    };

    const getErrorClass = (variant: string) => {
        if (isError) {
            switch (variant) {
                case "primary-light":
                case "primary-dark":
                    return "bg-red hover:bg-warning-hover text-white";
                case "secondary":
                    return "bg-white border border-red hover:border-warning-hover hover:text-warning-hover text-red";
                case "dashed":
                    return "bg-white border border-dashed border-warning hover:border-warning-hover hover:text-warning-hover text-red";
                case "link":
                case "text":
                    return "bg-[transparent] text-red hover:text-warning-hover";
                case "file":
                    return "bg-[transparent] text-red hover:text-warning-hover";

                default:
                    return "";
            }
        }
    };

    const getOutline = (color?: string) => {
        if (variant === "secondary" || variant === "dashed") {
            switch (color) {
                case "white":
                    return "bg-[transparent] border-white hover:border-white hover:bg-[transparent] hover:text-white text-white hover:opacity-60";
                case "blue":
                    return "!border-secondary hover:!border-secondary-hover hover:!text-secondary-hover !text-secondary";
                case "blue-dark":
                    return "!border-primary-5 hover:!border-primary-5-hover hover:!text-primary-5-hover !text-primary-5";
                default:
                    return "";
            }
        }
        return "";
    };

    const getSizeClass = (size: string) => {
        switch (size) {
            case "2xl":
                return "min-w-[50px] min-h-[50px]";
            case "large":
                return "min-w-[40px] min-h-[40px]";
            case "semi":
                return "min-w-[36px] min-h-[36px]";
            case "medium":
                return "min-w-[32px] min-h-[32px]";

            case "small":
                return "min-w-[22px] min-h-[22px]";
            default:
                return "";
        }
    };

    if (variant === "link") {
        const anchorProps = {
            ...rest
        } as AnchorHTMLAttributes<HTMLAnchorElement>;

        return (
            <Link
                {...anchorProps}
                href={url || ""}
                className={`inline-flex justify-center items-center gap-[6px]
                text-[14px] rounded-[3px] px-5 leading-[16.71px] font-medium transition op ${className} ${getVariantClass(
                    variant
                )} ${
                    isDisabled ?
                        "text-input cursor-not-allowed pointer-events-none"
                    :   ""
                }  ${getErrorClass(variant)}`}
                style={{fontFamily: "inherit"}}>
                {prefixIcon && <span className="w-4 h-4">{prefixIcon}</span>}
                <span className={`${isIcon ? "[&_svg]:w-5 [&_svg]:h-5 " : ""}`}>
                    {children}
                </span>
            </Link>
        );
    }

    if (variant === "file") {
        return (
            <div className="file-input-container">
                <label
                    htmlFor="file-input"
                    className={`inline-flex justify-center items-center gap-[6px]
                  text-[14px] rounded-[3px] px-5 leading-[16.71px] font-medium transition cursor-pointer bg-white text-primary border border-stroke hover:bg-highlight hover:border-primary-5-hover   ${isIcon} ${className} ${getSizeClass(
                      size
                  )} ${isDisabled ? "!text-input !cursor-not-allowed  pointer-events-none" : ""} ${isError ? "border !border-red text-red !cursor-not-allowed pointer-events-none" : ""}`}>
                    <input
                        type="file"
                        id="file-input"
                        hidden
                        onChange={handleFileChange}
                        multiple={true}
                        accept={typeFile}
                    />
                    <span className="w-4 h-4  ">
                        <Frame className="!text-red" />
                    </span>
                    <span>
                        {fileDetails && fileDetails.length === 1 ?
                            formatFileName(fileDetails[0].name)
                        : (
                            fileDetails &&
                            fileDetails.length > 1 &&
                            fileDetails.length <= maxFile
                        ) ?
                            `${fileDetails.length} multiple files`
                        :   children}
                    </span>
                </label>
                {isWarning && <div>{warningFile}</div>}
                {fileDetails &&
                    fileDetails.length >= 1 &&
                    fileDetails.length <= maxFile && (
                        <div>
                            <div className="flex-col mt-2 w-full max-w-[620px] rounded-[5px] h-auto border border-stroke py-2 px-4">
                                <ul className="flex gap-4 flex-wrap justify-between">
                                    {fileDetails.map((fileDetail, index) => (
                                        <li key={index}>
                                            <div className="w-full flex-col min-w-[200px] ">
                                                <div className="flex justify-between max-w-[164px] items-center">
                                                    <FileDock className="w-[21.33px] h-[26.67px]" />
                                                    <div>
                                                        <p className="text-[#4B5563] font-normal text-[14px] leading-[14.32px] mb-1">
                                                            {(
                                                                fileDetail.name
                                                                    .length > 10
                                                            ) ?
                                                                `${fileDetail.name.slice(0, 10)}...${fileDetail.name.slice(
                                                                    fileDetail.name.lastIndexOf(
                                                                        "."
                                                                    )
                                                                )}`
                                                            :   fileDetail.name}
                                                        </p>
                                                        <p className="font-normal text-[11px] text-input leading-[13.13px]">
                                                            {(
                                                                fileDetail.size /
                                                                1024
                                                            ).toLocaleString()}{" "}
                                                            MB
                                                        </p>
                                                    </div>
                                                    <Close
                                                        onClick={() =>
                                                            handleClose(index)
                                                        }
                                                        className=" cursor-pointer text-primary w-4 h-4"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
            </div>
        );
    }

    return (
        <>
            <button
                disabled={isDisabled}
                {...rest}
                className={`flex justify-center items-center gap-[6px] w-full 
              text-[14px] rounded-[3px] px-5 leading-[16.71px] font-medium transition  disabled:bg-[#F7F7F7] disabled:text-input disabled:border disabled:border-stroke disabled:cursor-not-allowed ${
                  isIcon ? "!px-0 !border !border-white !text-white" : ""
              } ${className} ${getVariantClass(variant)} ${getErrorClass(
                  variant
              )} ${getSizeClass(size)} ${getOutline(color)}`}
                style={{fontFamily: "inherit"}}>
                {prefixIcon && <span className="w-4 h-4">{prefixIcon}</span>}
                <span
                    className={`${isIcon ? "[&_svg]:min-w-5 [&_svg]:min-h-5" : ""}`}>
                    {children}
                </span>
            </button>
            <small
                className={`${isError ? "text-red focus:!outline-red" : "text-unit"}`}>
                {heplerText}
            </small>
        </>
    );
}
