"use client";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
} from "react";

interface UserContextProps {
    user: any;
    setUser: (user: any) => void;
    userName: string;
    setUserName: (userName: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<any>(null);
    const [userName, setUserName] = useState<string>("");

    // Lấy thông tin từ localStorage khi component được mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedUserName = localStorage.getItem("userName");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    // Lưu user vào localStorage khi user thay đổi, nếu không phải null
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user"); // Xóa khi user là null
        }
    }, [user]);

    // Lưu userName vào localStorage khi userName thay đổi, nếu không phải chuỗi rỗng
    useEffect(() => {
        if (userName.trim()) {
            localStorage.setItem("userName", userName);
        } else {
            localStorage.removeItem("userName"); // Xóa khi userName là chuỗi rỗng
        }
    }, [userName]);

    return (
        <UserContext.Provider value={{user, setUser, userName, setUserName}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
