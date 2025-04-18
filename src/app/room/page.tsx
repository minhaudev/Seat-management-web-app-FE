"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation"; // Import useRouter
import LayoutContainer from "../LayoutContainer";
import Card from "@/components/molecules/Card";
import {listRoom} from "@/services/manager/room";

export interface Room {
    id: string;
    name: string;
    owner: string;
    description: string;
}

export default function RoomList() {
    const [roomList, setRoomList] = useState<Room[]>([]);
    const router = useRouter(); // Khởi tạo router

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await listRoom();
                setRoomList(response.data.content);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách phòng:", error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <LayoutContainer isNav={false}>
            <div className="grid grid-cols-3 gap-10 p-5">
                {roomList.length > 0 ?
                    roomList.map((room) => (
                        <Card
                            key={room.id}
                            title={room.name}
                            onClick={() => router.push(`/room/${room.id}`)}>
                            <p className="text-gray-600 text-center">
                                {room.description}
                            </p>
                        </Card>
                    ))
                :   <p className="text-center col-span-3">Loading ...</p>}
            </div>
        </LayoutContainer>
    );
}
