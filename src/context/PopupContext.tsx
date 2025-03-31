"use client";
import React, {createContext, useContext, ReactNode, useState} from "react";

interface PopupContextType {
    showPopup: boolean;
    setShowPopup: (show: boolean) => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{children: React.ReactNode}> = ({
    children
}) => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <PopupContext.Provider value={{showPopup, setShowPopup}}>
            {children}
        </PopupContext.Provider>
    );
};

export const usePopup = () => {
    const context = useContext(PopupContext);
    if (context === undefined) {
        throw new Error("usePopup must be used within a PopupProvider");
    }
    return context;
};
