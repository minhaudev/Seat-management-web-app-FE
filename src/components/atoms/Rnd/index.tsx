"use client";
import React, {useState, useEffect} from "react";
import {Rnd} from "react-rnd";
import {useSeat} from "@/context/SeatContext";
import {deleteObject} from "@/services/manager/room";
import {useParams} from "next/navigation";
import Button from "../Button";
import Input from "../Input";

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
    const {
        refreshObject,
        updateObject,
        updateObjectPosition,
        removeUnsavedObject
    } = useSeat();
    const {roomid} = useParams() as {roomid: string};
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(value as string);
    const [newColor, setNewColor] = useState(color);

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
    }, []);

    const handleDeleteObject = async () => {
        if (id.startsWith("temp-")) {
            removeUnsavedObject(id); // chỉ xóa local
        } else {
            const response = await deleteObject(roomid, id);
            if (response.code === 1000) {
                refreshObject();
            }
        }
    };

    const handleSave = () => {
        updateObject(id, newName, newColor);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewName(value as string);
        setNewColor(color);
        setIsEditing(false);
    };

    return (
        <Rnd
            onDoubleClick={() => role !== "USER" && setIsEditing(true)}
            className="relative flex justify-center items-center text-center text-white h-full"
            style={{backgroundColor: isEditing ? newColor : color}}
            position={{x: ox, y: oy}}
            size={{width: width, height: height}}
            maxWidth={1000}
            maxHeight={1000}
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
            <div className="w-full h-full flex justify-center items-center relative">
                {isEditing ?
                    <div className="flex flex-col  gap-1 bg-white p-2 rounded shadow z-10">
                        <div className="flex justify-center items-center gap-2">
                            <label className="text-text-1" htmlFor="">
                                Name:
                            </label>
                            <Input
                                placeholder="Name"
                                type="text"
                                value={newName}
                                handleOnChange={(e) =>
                                    setNewName(e.target.value)
                                }
                            />
                        </div>

                        <div className="flex justify-start items-start gap-2">
                            <label htmlFor="" className="text-text-1">
                                Color:
                            </label>
                            <input
                                className="w-full"
                                type="color"
                                value={newColor}
                                onChange={(e) => setNewColor(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 mt-1">
                            <Button
                                size="small"
                                variant="secondary"
                                onClick={handleSave}>
                                Save
                            </Button>
                            <Button
                                size="small"
                                variant="upload"
                                onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                :   <span className="pointer-events-none">{newName}</span>}

                {isHovered && role !== "USER" && !isEditing && (
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
