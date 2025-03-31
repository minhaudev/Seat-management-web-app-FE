"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation"; // Import useRouter
import LayoutContainer from "../LayoutContainer";
import Card from "@/components/molecules/Card";
import {getAllFloor} from "@/services/manager/floor";
import {listHall} from "@/services/manager/hall";

export interface Hall {
    id: string;
    name: string;
    description: string;
}

export default function HallList() {
    const [hallList, setHallList] = useState<Hall[]>([]);
    const router = useRouter(); // Khởi tạo router

    useEffect(() => {
        const fetchHalls = async () => {
            try {
                const response = await listHall();
                setHallList(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tầng:", error);
            }
        };

        fetchHalls();
    }, []);

    return (
        <LayoutContainer isNav={false}>
            <div className="grid grid-cols-3 gap-10 p-5">
                {hallList.length > 0 ?
                    hallList.map((hall) => (
                        <Card
                            key={hall.id}
                            title={hall.name}
                            onClick={() => router.push(`/hall/${hall.id}`)}>
                            <p className="text-gray-600 text-center">
                                {hall.description}
                            </p>
                        </Card>
                    ))
                :   <p className="text-center col-span-3">Không có dữ liệu</p>}
            </div>
        </LayoutContainer>
    );
}
