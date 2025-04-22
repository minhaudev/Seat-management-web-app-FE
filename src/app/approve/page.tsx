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

function Approve() {
    useEffect(() => {
        refreshApprove();
    }, []);
    const {valueApprove, refreshApprove} = useSeat();
    const [data, setData] = useState(valueApprove);

    useEffect(() => {
        setData(valueApprove);
    }, [valueApprove]);

    const handleStatusChange = async (
        roomId: string,
        newStatus: "Pending" | "Approve" | "Reject"
    ) => {
        setData((prevData) =>
            prevData.map((room) =>
                room.roomId === roomId ? {...room, status: newStatus} : room
            )
        );

        try {
            if (newStatus === "Approve") {
                await approveLayout(roomId);
            } else if (newStatus === "Reject") {
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
                                <select
                                    value={item.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            item.roomId,
                                            e.target.value as
                                                | "Pending"
                                                | "Approve"
                                                | "Reject"
                                        )
                                    }
                                    className="border p-1 rounded">
                                    <option value="Pending">Pending</option>
                                    <option value="Approve">Approve</option>
                                    <option value="Reject">Reject</option>
                                </select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </LayoutContainer>
    );
}

export default Approve;
