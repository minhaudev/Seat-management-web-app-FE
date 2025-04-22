"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation"; // Import useRouter
import LayoutContainer from "../LayoutContainer";
import Card from "@/components/molecules/Card";
import {getAllFloor} from "@/services/manager/floor";
import Breadcrumb from "@/components/atoms/Breadcrumb";
import {HomeIcon} from "lucide-react";

export interface Floor {
    id: string;
    name: string;
    description: string;
}

export default function FloorList() {
    const [floorList, setFloorList] = useState<Floor[]>([]);
    const [isTimeout, setIsTimeout] = useState(false);
    const router = useRouter();

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
        const timeout = setTimeout(() => {
            setIsTimeout(true);
        }, 10000);

        return () => clearTimeout(timeout);
    }, []);

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
                            url: "/floor",
                            label: "Floor"
                        }
                    ]}
                />
            </div>
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
                :   <p className="text-center col-span-3">
                        {!isTimeout ? "Loading..." : "Not data!"}
                    </p>
                }
            </div>
        </LayoutContainer>
    );
}
