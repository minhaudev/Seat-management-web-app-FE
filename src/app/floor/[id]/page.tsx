"use client";
import {useEffect, useState} from "react";
import {useRouter, useParams} from "next/navigation";
import LayoutContainer from "@/app/LayoutContainer";
import Card from "@/components/molecules/Card";
import {getHallsByFloor} from "@/services/manager/hall";
import Breadcrumb from "@/components/atoms/Breadcrumb";
import {HomeIcon} from "lucide-react";

interface Hall {
    id: string;
    name: string;
    floorName: string;
    floorId: string;
    capacity: number;
    description: string;
}
interface Floor {
    id: string;
    floorName: string;
}

export default function HallList() {
    const {id} = useParams() as {id: string};
    const [halls, setHalls] = useState<Hall[]>([]);
    const [floor, setFloor] = useState<Floor | null>(null);
    const router = useRouter();
    const [isTimeout, setIsTimeout] = useState(false);
    useEffect(() => {
        const fetchHalls = async () => {
            try {
                const response = await getHallsByFloor(id);

                setHalls(response.data);
                if (response.data.length > 0) {
                    const floorData = await response.data[0]?.floorName;
                    const floorId = await response.data[0]?.floorId;
                    setFloor({id: floorId, floorName: floorData});
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách hall:", error);
            }
        };

        fetchHalls();
        const timeout = setTimeout(() => {
            setIsTimeout(true);
        }, 10000);

        return () => clearTimeout(timeout);
    }, [id]);

    return (
        <LayoutContainer isNav={false}>
            <Breadcrumb
                breadcrumbs={[
                    {
                        url: "/",
                        label: "Home",
                        prefixIcon: <HomeIcon size={16} />
                    },
                    {
                        url: `/floor/${floor?.id}`,
                        label: floor?.floorName
                    }
                ]}
            />
            <div className="grid grid-cols-3 gap-10 p-5">
                {halls?.length > 0 ?
                    halls?.map((hall) => (
                        <Card
                            key={hall.id}
                            title={hall.name}
                            onClick={() =>
                                router.push(`/floor/${id}/hall/${hall.id}`)
                            }>
                            <p className="text-gray-600 text-center">
                                {hall.description}
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
