"use client";
import LayoutContainer from "@/app/LayoutContainer";
import Card from "@/components/molecules/Card";
import {getRoomsByHall} from "@/services/manager/room";
import Breadcrumb from "@/components/atoms/Breadcrumb";
import {HomeIcon} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
export interface Room {
    id: string;
    name: string;
    nameOwner: string;
    hall: string;
    description: string;
}
export interface Ibreadcrumb {
    id: string;
    name: string;
    owner: string;
    nameOwner: string;
    hallId: string;
    floorId: string;
    nameFloor: string;
    nameHall: string;
}
export default function RoomList() {
    const {id} = useParams() as {id: string};
    const {hallid} = useParams() as {hallid: string};
    const [room, setRooms] = useState<Room[]>([]);
    const [breadcrumb, setBreacrumb] = useState<Ibreadcrumb>();
    const router = useRouter();
    const [isTimeout, setIsTimeout] = useState(false);
    useEffect(() => {
        const fetchFloors = async () => {
            try {
                const response = await getRoomsByHall(hallid);

                if (response && response.code === 1000) {
                    setRooms(response.data);
                    setBreacrumb(response.data[0]);
                } else {
                    setRooms(response.data.message);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tầng:", error);
            }
        };
        fetchFloors();
        const timeout = setTimeout(() => {
            setIsTimeout(true);
        }, 10000);

        return () => clearTimeout(timeout);
    }, [hallid]);

    return (
        <LayoutContainer isNav={false}>
            <div>
                <Breadcrumb
                    breadcrumbs={[
                        {
                            url: "/",
                            label: "Home",
                            prefixIcon: <HomeIcon size={16} />
                        },
                        {
                            url: `/floor/${breadcrumb?.floorId}`,
                            label: breadcrumb?.nameFloor
                        },
                        {
                            url: `/hall/${breadcrumb?.hallId}`,
                            label: breadcrumb?.nameHall
                        }
                    ]}
                />
            </div>
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
                        {" "}
                        {!isTimeout ? "Loading..." : "Not data!"}
                    </p>
                }
            </div>
        </LayoutContainer>
    );
}
