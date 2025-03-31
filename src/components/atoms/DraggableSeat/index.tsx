"use client";
import {Seat} from "@/interfaces/managerSeat";
import React, {useState, useEffect} from "react";

interface DraggableSeatProps {
    seat: Seat;
}

export const DraggableSeat: React.FC<DraggableSeatProps> = ({seat}) => {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        setRole(localStorage.getItem("role"));
    }, []);

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
        if (role === "USER") return;
        e.dataTransfer.effectAllowed = "move";
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        e.dataTransfer.setData("seat", JSON.stringify(seat));
        e.dataTransfer.setData(
            "positionMouse",
            JSON.stringify({offsetX, offsetY})
        );
    };

    return (
        <li
            draggable={role !== "USER"}
            onDragStart={handleDragStart}
            className={`p-1 text-center border border-gray-300 flex justify-center items-center ${
                role === "USER" ? "cursor-pointer" : "cursor-move"
            } truncate text-wrap w-[108px] h-[45px] ${
                seat.user?.color ? "" : "bg-white"
            }`}
            style={seat.user?.color ? {backgroundColor: seat.user.color} : {}}>
            {seat.user ? seat.user.firstName : "free"}
        </li>
    );
};
