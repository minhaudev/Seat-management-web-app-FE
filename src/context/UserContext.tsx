// "use client";
// import React, {
//     createContext,
//     useContext,
//     useState,
//     useEffect,
//     ReactNode
// } from "react";

// interface UserContextProps {
//     user: any;
//     setUser: (user: any) => void;
//     userName: string;
//     setUserName: (userName: string) => void;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({children}: {children: ReactNode}) => {
//     const [user, setUser] = useState<any>(null);
//     const [userName, setUserName] = useState<string>("");

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         const storedUserName = localStorage.getItem("userName");

//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//         if (storedUserName) {
//             setUserName(storedUserName);
//         }
//     }, []);

//     useEffect(() => {
//         if (user) {
//             localStorage.setItem("user", JSON.stringify(user));
//         } else {
//             localStorage.removeItem("user");
//         }
//     }, [user]);

//     useEffect(() => {
//         if (userName.trim()) {
//             localStorage.setItem("userName", userName);
//         } else {
//             localStorage.removeItem("userName");
//         }
//     }, [userName]);

//     return (
//         <UserContext.Provider value={{user, setUser, userName, setUserName}}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUser = () => {
//     const context = useContext(UserContext);
//     if (!context) {
//         throw new Error("useUser must be used within a UserProvider");
//     }
//     return context;
// };
