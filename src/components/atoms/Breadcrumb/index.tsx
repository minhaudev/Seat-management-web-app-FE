import Link from "next/link";
import React, {ReactNode} from "react";
import Separator from "@/assets/svgs/sperator.svg";
interface IBreadcrumbItem {
    url: string;
    label: string;
    prefixIcon?: ReactNode;
}

interface Props {
    separator?: ReactNode;
    breadcrumbs: IBreadcrumbItem[];
}

const Breadcrumb = ({breadcrumbs, separator = ""}: Props) => {
    const renderBreadcrumbs = () => {
        const length = breadcrumbs.length;
        if (length <= 4) {
            return breadcrumbs.map((breadcrumb, index) =>
                BreadcrumbItem(breadcrumb, index)
            );
        } else {
            return (
                <>
                    {BreadcrumbItem(breadcrumbs[0], 0)}
                    {BreadcrumbItem(breadcrumbs[length - 3], length - 3)}
                    <span className="pointer-events-none text-input">
                        .....
                    </span>
                    {separator ?
                        separator
                    :   <Separator className="w-[16px] h-[16px] text-[#929292]" />
                    }
                    {BreadcrumbItem(breadcrumbs[length - 2], length - 2)}
                    <span className="text-primary font-semibold text-[16px] leading-[22px]">
                        {breadcrumbs[length - 1].prefixIcon &&
                            breadcrumbs[length - 1].prefixIcon}
                        {breadcrumbs[length - 1].label}
                    </span>
                </>
            );
        }
    };

    const BreadcrumbItem = (breadcrumb: IBreadcrumbItem, index: number) => (
        <span
            className="inline-flex items-center text-[#929292] font-normal leading-[22px] text-[16px] "
            key={index}>
            {breadcrumb.prefixIcon && breadcrumb.prefixIcon}
            {index !== breadcrumbs.length - 1 ?
                <>
                    <Link href={breadcrumb.url}>
                        <span className="px-1 text-[16px] text-input">
                            {breadcrumb.label}
                        </span>
                    </Link>

                    {separator ?
                        separator
                    :   <Separator className="w-[16px] h-[16px] text-[#929292]" />
                    }
                </>
            :   <span className="text-primary font-semibold">
                    {breadcrumb.label}
                </span>
            }
        </span>
    );

    return <nav className="flex items-center">{renderBreadcrumbs()}</nav>;
};

export default Breadcrumb;
