"use client";
import Link from "next/link";
import React from "react";

interface IconListItemProps {
    title?: string;
    href?: string;
    prefixIcon?: React.ComponentType<{className?: string}>;
    leadingIcon?: React.ComponentType<{className?: string}>;
    active?: boolean;
    onActive?: () => void;
    expand?: boolean;
    isAnimate?: boolean;
    classCustom?: string;
}

const IconListItem: React.FC<IconListItemProps> = ({
    title,
    href,
    prefixIcon: PrefixIcon,
    leadingIcon: LeadingIcon,
    active = false,
    onActive,
    expand = true,
    isAnimate = false,
    classCustom = ""
}) => {
    return (
        <>
            {href ? (
                <Link
                    href={href}
                    className={`group h-[60px] flex items-center justify-start w-full  px-4  text-white ${
                        active ? "bg-primary-5" : "bg-primary flex-row"
                    }  ${classCustom}`}>
                    {PrefixIcon && (
                        <PrefixIcon
                            className={`min-w-6 min-h-6 text-white ${
                                !active && "group-hover:text-text-1"
                            }`}
                        />
                    )}
                    {expand && (
                        <p
                            className={`w-full text-white pl-2 transition-opacity duration-100 font-sf-ui-display text-[16px] font-[500] leading-[19px]  ${
                                !active && "group-hover:text-primary-4"
                            }`}>
                            {title}
                        </p>
                    )}
                    {LeadingIcon && (
                        <div
                            className={`duration-200 ${
                                isAnimate ? "rotate-180" : ""
                            }`}>
                            <LeadingIcon
                                className={`w-6 h-6 text-white ${
                                    !active && "group-hover:text-text-1"
                                }`}
                            />
                        </div>
                    )}
                </Link>
            ) : (
                <div
                    onClick={onActive}
                    className={`cursor-pointer group h-[60px] flex items-center justify-start w-full  px-4  text-white ${
                        active ? "bg-secondary" : "bg-   flex-row"
                    }  ${classCustom}`}>
                    {PrefixIcon && (
                        <PrefixIcon
                            className={`min-w-6 min-h-6 text-white ${
                                !active && "group-hover:text-text-1"
                            }`}
                        />
                    )}
                    {expand && (
                        <p
                            className={`w-full text-white pl-2 transition-opacity duration-100 font-sf-ui-display text-[16px] font-[500] leading-[19px]  ${
                                !active && "group-hover:text-primary-4"
                            }`}>
                            {title}
                        </p>
                    )}
                    {LeadingIcon && (
                        <div
                            className={`duration-200 ${
                                isAnimate ? "rotate-180" : ""
                            }`}>
                            <LeadingIcon
                                className={`w-6 h-6 text-white ${
                                    !active && "group-hover:text-primary-4"
                                }`}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default IconListItem;
