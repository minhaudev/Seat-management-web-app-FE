"use client";
import Header from "@/components/layouts/Header";
import Navigation from "@/components/molecules/Navigation";
import {usePathname} from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import {NavigationType} from "@/interfaces";
import {UserProvider} from "@/context/UserContext";
import Footer from "@/components/layouts/Footer";
interface LayoutContainerProps {
    className?: string;
    isNav?: boolean;
    isHeader?: boolean;
    isFooter?: boolean;
    footerChildren?: React.ReactNode;
    children: React.ReactNode;
}
export default function LayoutContainer({
    className,
    isNav = true,
    isHeader = true,
    isFooter = true,
    footerChildren,
    children
}: LayoutContainerProps) {
    const pathCurrentPage = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
    }, []);

    if (isLoading) return null;

    return (
        <div className={`flex min-h-screen ${className}`}>
            {isNav && (
                <Navigation
                    type={NavigationType.CLIENT}
                    routePath={pathCurrentPage || ""}
                />
            )}
            <div className="flex flex-col flex-1 min-h-screen">
                {isHeader && <Header />}
                <main className="flex-1">{children}</main>
                {isFooter && <Footer />}
            </div>
        </div>
    );
}
