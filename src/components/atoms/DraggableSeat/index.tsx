"use client";
import {Seat} from "@/interfaces/managerSeat";
import React, {useState, useEffect} from "react";
import Countdown from "react-countdown";

interface DraggableSeatProps {
    seat: Seat;
    onTimeout?: () => void;
}

export const DraggableSeat: React.FC<DraggableSeatProps> = ({
    seat,
    onTimeout
}) => {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        setRole(localStorage.getItem("role"));
    }, []);

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
        if (role === "USER") return;

        const rect = e.currentTarget.getBoundingClientRect();
        e.dataTransfer.setData("seat", JSON.stringify(seat));
        e.dataTransfer.setData("typeSeat", JSON.stringify("seatType"));
        e.dataTransfer.setData(
            "positionMouse",
            JSON.stringify({
                offsetX: e.clientX - rect.left,
                offsetY: e.clientY - rect.top
            })
        );
    };

    const expiredAt =
        seat.expiredAt ? new Date(seat.expiredAt).getTime() : null;
    const now = Date.now();
    const timeRemaining = expiredAt ? expiredAt - now : 0;

    return (
        <li
            draggable={role !== "USER"}
            onDragStart={handleDragStart}
            className={`relative p-1 text-center border border-gray-300 flex justify-center items-center
                ${role === "USER" ? "cursor-pointer" : "cursor-move"}
                truncate text-wrap w-[108px] h-[45px]
                ${seat.user?.color ? "" : "bg-white"}`}
            style={seat.user?.color ? {backgroundColor: seat.user.color} : {}}>
            {timeRemaining > 0 && (
                <div className="absolute top-0 left-0 w-full text-xs text-center bg-black bg-opacity-50 text-white">
                    <Countdown
                        date={new Date(expiredAt as number)}
                        renderer={({minutes, seconds}) => (
                            <span>{`${minutes}m ${seconds}s`}</span>
                        )}
                        onComplete={onTimeout}
                    />
                </div>
            )}
            {seat.user ? seat.user.firstName : seat.name}
        </li>
    );
};
