import React from "react";

interface CardProps {
    title: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const Card = ({title, children, onClick}: CardProps) => {
    return (
        <div
            onClick={onClick}
            className="rounded overflow-hidden shadow-lg p-4 bg-white cursor-pointer">
            <div className="flex items-center mb-4 justify-center">
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
            <div className="text-gray-700">{children}</div>
        </div>
    );
};

export default Card;
