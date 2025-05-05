"use client";
import React, {useEffect, useState} from "react";
import LayoutContainer from "../LayoutContainer";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {approveLayout, rejectLayout} from "@/services/manager/room";
import {useSeat} from "@/context/SeatContext";
import Link from "next/link";
import {Check, Pencil, Trash2, X} from "lucide-react";
import Button from "@/components/atoms/Button";

function Approve() {
    const {valueApprove, refreshApprove} = useSeat();
    const [data, setData] = useState(valueApprove);

    useEffect(() => {
        refreshApprove();
    }, []);

    useEffect(() => {
        setData(valueApprove);
    }, [valueApprove]);

    const handleStatusChange = async (
        roomId: string,
        newStatus: "Approve" | "Reject"
    ) => {
        setData((prevData) =>
            prevData.map((room) =>
                room.roomId === roomId ? {...room, status: newStatus} : room
            )
        );

        try {
            if (newStatus === "Approve") {
                await approveLayout(roomId);
            } else {
                await rejectLayout(roomId);
            }
            refreshApprove();
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };

    return (
        <LayoutContainer isNav={false} isFooter={false}>
            <Table isStriped aria-label="Approval Table">
                <TableHeader>
                    <TableColumn>NAME ROOM</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>ROOM CODE</TableColumn>
                    <TableColumn>PREVIEW ROOM</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                </TableHeader>

                <TableBody>
                    {data?.map((item) => (
                        <TableRow className="text-center" key={item.roomId}>
                            <TableCell>{item.roomName}</TableCell>
                            <TableCell>{item.changedBy}</TableCell>
                            <TableCell>{item.roomId}</TableCell>
                            <TableCell>
                                <Link
                                    href={`/preview/${item.roomId}`}
                                    target="_blank"
                                    className="text-blue underline hover:text-blue-bold">
                                    Preview
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-3 items-center justify-center">
                                    <button
                                        onClick={() =>
                                            handleStatusChange(
                                                item.roomId,
                                                "Approve"
                                            )
                                        }
                                        className="bg-green text-white p-2 rounded hover:bg-greenLight">
                                        <Check size={16} />
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleStatusChange(
                                                item.roomId,
                                                "Reject"
                                            )
                                        }
                                        className="bg-red text-white p-2 rounded hover:bg-red-bold">
                                        <X size={16} />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </LayoutContainer>
    );
}

export default Approve;
