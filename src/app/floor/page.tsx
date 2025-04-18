"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation"; // Import useRouter
import LayoutContainer from "../LayoutContainer";
import Card from "@/components/molecules/Card";
import {getAllFloor} from "@/services/manager/floor";

export interface Floor {
    id: string;
    name: string;
    description: string;
}

export default function FloorList() {
    const [floorList, setFloorList] = useState<Floor[]>([]);
    const router = useRouter(); // Khởi tạo router

    useEffect(() => {
        const fetchFloors = async () => {
            try {
                const response = await getAllFloor();
                setFloorList(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tầng:", error);
            }
        };

        fetchFloors();
    }, []);

    return (
        <LayoutContainer isNav={false}>
            <div className="grid grid-cols-3 gap-10 p-5">
                {floorList?.length > 0 ?
                    floorList?.map((floor) => (
                        <Card
                            key={floor.id}
                            title={floor.name}
                            onClick={() => router.push(`/floor/${floor.id}`)}>
                            <p className="text-gray-600 text-center">
                                {floor.description}
                            </p>
                        </Card>
                    ))
                :   <p className="text-center col-span-3">Đang tải ...</p>}
            </div>
        </LayoutContainer>
    );
}
