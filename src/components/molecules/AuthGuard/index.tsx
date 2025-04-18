"use client";
import {useRouter} from "next/navigation";

import {useEffect, useState, ReactNode} from "react";

interface Props {
    children: ReactNode;
}

const AuthGuard = ({children}: Props) => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const token = localStorage.getItem("authToken");
        if (!token) {
            localStorage.setItem(
                "redirectAfterLogin",
                window.location.pathname
            );
            router.push("/login");
        }
    }, [router]);

    if (!mounted) return null;

    return <>{children}</>;
};

export default AuthGuard;
