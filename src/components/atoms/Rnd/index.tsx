"use client";
import React from "react";
import {Rnd} from "react-rnd";
import {useSeat} from "@/context/SeatContext";

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
    // 🔴 SỬA: Đặt useSeat() ở đây, bên trong function
    const {updateObjectPosition} = useSeat();

    return (
        <Rnd
            className="relative flex justify-center items-center text-center text-white h-full"
            style={{backgroundColor: color}}
            default={{
                x: ox,
                y: oy,
                width: width,
                height: height
            }}
            maxWidth={800}
            maxHeight={700}
            minWidth={40}
            bounds="parent"
            onDragStop={(e, d) =>
                updateObjectPosition(id, d.x, d.y, width, height)
            }
            onResizeStop={(e, direction, ref, delta, position) => {
                updateObjectPosition(
                    id,
                    position.x,
                    position.y,
                    parseInt(ref.style.width, 10),
                    parseInt(ref.style.height, 10)
                );
            }}>
            <div className="w-full h-full flex justify-center items-center">
                {value}
            </div>
        </Rnd>
    );
}
