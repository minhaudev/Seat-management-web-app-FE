"use client";
import {useEffect, useState} from "react";
import {useRouter, useParams} from "next/navigation";
import LayoutContainer from "@/app/LayoutContainer";
import Card from "@/components/molecules/Card";
import {getHallsByFloor} from "@/services/manager/hall";

interface Hall {
    id: string;
    name: string;
    capacity: number;
}

export default function HallList() {
    const {id} = useParams() as {id: string};
    const [halls, setHalls] = useState<Hall[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchHalls = async () => {
            try {
                const response = await getHallsByFloor(id);
                setHalls(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách hall:", error);
            }
        };

        fetchHalls();
    }, [id]);

    return (
        <LayoutContainer isNav={false}>
            <div className="grid grid-cols-3 gap-10 p-5">
                {halls.length > 0 ?
                    halls.map((hall) => (
                        <Card
                            key={hall.id}
                            title={hall.name}
                            onClick={() =>
                                router.push(`/floor/${id}/hall/${hall.id}`)
                            }>
                            <p className="text-gray-600 text-center">
                                Sức chứa: {hall.capacity} người
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
