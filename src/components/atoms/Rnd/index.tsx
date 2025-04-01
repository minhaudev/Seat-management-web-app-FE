"use client";
import React, {useState, useEffect} from "react";
import {Rnd} from "react-rnd";
import {useSeat} from "@/context/SeatContext";
import {deleteObject} from "@/services/manager/room";
import {useParams} from "next/navigation";

interface ObjectSupply {
    id: string;
    value: React.ReactNode;
    color: string;
    ox: number;
    oy: number;
    width: number;
    height: number;
}

export default function ObjectComponent({
    id,
    value,
    color,
    ox,
    oy,
    width,
    height
}: ObjectSupply) {
    const [role, setRole] = useState<string | null>(null);
    const {refreshObject, updateObjectPosition} = useSeat();
    const {roomid} = useParams() as {roomid: string};
    const [isHovered, setIsHovered] = useState(false);

    // Kiểm tra và lấy thông tin role khi component mount
    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
    }, []);

    const handleDeleteObject = async () => {
        const response = await deleteObject(roomid, id);

        if (response.code === 1000) {
            refreshObject();
        }
    };

    return (
        <Rnd
            className="relative flex justify-center items-center text-center text-white h-full"
            style={{backgroundColor: color}}
            position={{x: ox, y: oy}}
            size={{width: width, height: height}}
            maxWidth={800}
            maxHeight={700}
            minWidth={40}
            bounds="parent"
            disableDragging={role === "USER"}
            disableResizing={role === "USER"}
            onDragStop={(e, d) =>
                role !== "USER" &&
                updateObjectPosition(id, d.x, d.y, width, height)
            }
            onResizeStop={(e, direction, ref, delta, position) => {
                if (role !== "USER") {
                    updateObjectPosition(
                        id,
                        position.x,
                        position.y,
                        parseInt(ref.style.width, 10),
                        parseInt(ref.style.height, 10)
                    );
                }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="w-full h-full flex justify-center items-center">
                {value}
                {isHovered && role !== "USER" && (
                    <button
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                        onClick={handleDeleteObject}>
                        X
                    </button>
                )}
            </div>
        </Rnd>
    );
}
