"use client";
import LayoutContainer from "@/app/LayoutContainer";
import Card from "@/components/molecules/Card";
import {getRoomsByHall} from "@/services/manager/room";

import {useParams, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
export interface Room {
    id: string;
    name: string;
    nameOwner: string;
    hall: string;
    description: string;
}
export default function RoomList() {
    const {id} = useParams() as {id: string};
    const {hallid} = useParams() as {hallid: string};
    const [room, setRooms] = useState<Room[]>([]);
    const router = useRouter();
    useEffect(() => {
        const fetchFloors = async () => {
            try {
                const response = await getRoomsByHall(hallid);
                console.log("reponse room", response);

                if (response && response.code === 1000) {
                    setRooms(response.data);
                } else {
                    setRooms(response.data.message);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tầng:", error);
            }
        };
        fetchFloors();
    }, [hallid]);

    return (
        <LayoutContainer isNav={false}>
            <div className="grid grid-cols-3 gap-10 p-5">
                {room.length > 0 ?
                    room.map((room) => (
                        <Card
                            key={room.id}
                            title={room?.name}
                            onClick={() =>
                                router.push(
                                    `/floor/${id}/hall/${hallid}/room/${room.id}`
                                )
                            }>
                            <p className="text-gray text-center font-medium mb-2">
                                Landord: {room.nameOwner}
                            </p>
                            <p className="text-gray-600 text-center">
                                {room.description}
                            </p>
                        </Card>
                    ))
                :   <p className="text-center col-span-3">
                        Không có hall nào trong tầng này
                    </p>
                }
            </div>
        </LayoutContainer>
    );
}
