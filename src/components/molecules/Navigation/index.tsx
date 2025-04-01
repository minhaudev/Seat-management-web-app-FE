"use client";
import React, {useEffect, useRef, useState} from "react";
import Menu from "@/assets/svgs/menu.svg";
import Button from "@/components/atoms/Button";
import "../../../app/globals.css";
import {useSeat} from "@/context/SeatContext";
import {useParams} from "next/navigation";
import {savePositionSeat, paginationSeat} from "@/services/manager/seat";
import {DraggableSeat} from "@/components/atoms/DraggableSeat";
import Toast from "../Toast";
import {ToastPosition, ToastType} from "@/enums/ToastEnum";
import CreateSeatModal from "@/components/atoms/CreateSeatModal/CreateSeatModal";
import {CreateObjectModal} from "@/components/atoms/CreateObjectModal";
import Frame from "@/assets/svgs/frame_v2.svg";
import {saveLayoutRoom, uploadImageRoom} from "@/services/manager/room";

import useWebSocket from "@/hooks/webSocket";

function Navigation() {
    const {roomid} = useParams() as {roomid: string};
    const {
        seatList,
        setSeatList,
        setRoomValue,
        objects,
        refreshSeats,
        updateSeatPosition
    } = useSeat();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [expand, setExpand] = useState(false);
    const [section, setSection] = useState<string[]>([]);
    const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
    const [isObjectModalOpen, setIsObjectModalOpen] = useState(false);
    const [isSaveLayout, setIsSaveLayout] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [page, setPage] = useState(0);
    const [isOpenUpload, setIsOpenUpload] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(
        null
    );
    useEffect(() => {
        fetchSeats(page, 10);
    }, [page]);

    const handleToggle = (sectionName: string) => {
        setExpand(true);

        setSection((prev) =>
            prev.includes(sectionName) ?
                prev.filter((s) => s !== sectionName)
            :   [...prev, sectionName]
        );
    };

    const handleDropInNavigation = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const seatData = e.dataTransfer.getData("seat");
        if (!seatData) return;

        const droppedSeat = JSON.parse(seatData);
        updateSeatPosition(droppedSeat.id, 0, 0);
    };

    const fetchSeats = async (page: number, size: number) => {
        const data = await paginationSeat(roomid, page, size);
        setSeatList((prev) => ({
            seats:
                page === 0 ?
                    data?.data?.content
                :   [...prev.seats, ...data.data.content],
            totalElements: data?.data?.totalElements,
            totalPages: data?.data?.totalPages,
            pageNumber: data?.data?.pageable?.pageNumber,
            pageSize: data?.data?.pageable?.pageSize
        }));
    };

    const handleLoadMore = () => setPage((prev) => prev + 1);

    const saveLayoutSeat = async () => {
        try {
            const formattedSeats = seatList.seats.map(({id, ox, oy}) => ({
                id,
                ox,
                oy
            }));
            const response = await savePositionSeat(formattedSeats, roomid);
            if (response.code === 1000) setIsSaveLayout(true);
        } catch (error) {
            console.error("Error saving layout:", error);
        }
    };

    useWebSocket(roomid);
    const seaveLayoutObject = async () => {
        try {
            const formattedObject = objects.map(
                ({id, name, ox, oy, width, height, color}) => ({
                    id,
                    name,
                    ox,
                    oy,
                    width,
                    height,
                    color
                })
            );
            const response = await saveLayoutRoom(roomid, formattedObject);
            if (response && response.code === 1000) {
                setIsSaveLayout(true);
            }
        } catch (error) {
            console.error("Error saving layout:", error);
        }
    };

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setSelectedFileName(file.name);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result) {
                    localStorage.setItem(
                        "selectedFile",
                        reader.result as string
                    );
                }
            };
        }
    };

    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
            setIsOpenUpload(true);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please choose file!");
            return;
        }
        try {
            const response = await uploadImageRoom(roomid, selectedFile);
            if (response.code === 1000) {
                setIsSaveLayout(true);
                setRoomValue(response.data);
                setIsOpenUpload(false);
                setSelectedFileName("");
            }
        } catch (error) {
            console.error("Error upload:", error);
        }
    };

    const handleCancel = () => {
        setSelectedFileName("");
        setIsOpenUpload(false);
    };
    return (
        <div
            className={`min-h-screen z-10 transition-width duration-100 ${expand ? "w-64" : "w-14"} bg-primary pb-4`}>
            <div className="sticky top-0 h-14 z-50 bg-primary flex items-center justify-between px-2">
                {expand && (
                    <p className="text-[32px] font-semibold text-white">
                        Smart
                    </p>
                )}
                <Button
                    isIcon
                    variant="primary-dark"
                    color="white"
                    size="medium"
                    onClick={() => {
                        setExpand(!expand);
                    }}>
                    <Menu />
                </Button>
            </div>

            <div
                className="cursor-pointer text-white p-1 font-semibold"
                onClick={() => handleToggle("seat")}>
                {expand ? "Management Seat" : "Seat"}
            </div>
            {expand && section.includes("seat") && (
                <div
                    className="px-4 pb-4 bg-gray-100 rounded-md shadow-md"
                    onDrop={handleDropInNavigation}
                    onDragOver={(e) => e.preventDefault()}>
                    <p className="text-white font-medium mb-2 text-[14px]">
                        Total Seats:{" "}
                        {String(
                            (seatList?.seats ?? []).filter(
                                (seat) => seat.ox === 0 && seat.oy === 0
                            ).length || 0
                        ).padStart(2, "0")}
                    </p>

                    {(seatList?.seats ?? []).some(
                        (seat) => seat.ox === 0 && seat.oy === 0
                    ) && (
                        <ul className="grid grid-cols-2 gap-2">
                            {seatList.seats
                                .filter(
                                    (seat) => seat.ox === 0 && seat.oy === 0
                                )
                                .map((seat) => (
                                    <DraggableSeat key={seat.id} seat={seat} />
                                ))}
                        </ul>
                    )}

                    <div className="mt-2 flex justify-between gap-2">
                        {currentPage < seatList.totalPages && (
                            <Button
                                variant="secondary"
                                onClick={handleLoadMore}>
                                Load More
                            </Button>
                        )}
                        <Button
                            variant="dashed"
                            onClick={() => setIsSeatModalOpen(true)}>
                            CREATE SEAT
                        </Button>
                        <Button variant="upload" onClick={saveLayoutSeat}>
                            SAVE LAYOUT
                        </Button>
                    </div>
                </div>
            )}

            <div
                className="cursor-pointer text-white font-semibold p-1"
                onClick={() => handleToggle("supplies")}>
                {expand ? "Management Supplies" : "Supply"}
            </div>
            <div className="px-4">
                {expand && section.includes("supplies") && (
                    <>
                        <div
                            className="flex gap-2 mt-2"
                            onClick={(e) => e.stopPropagation()}>
                            <Button
                                variant="secondary"
                                onClick={() => setIsObjectModalOpen(true)}>
                                ADD OBJECT
                            </Button>

                            <Button
                                onClick={seaveLayoutObject}
                                variant="upload">
                                SAVE LAYOUT
                            </Button>
                            <div>
                                <Button
                                    className="flex justify-center items-center"
                                    variant="secondary"
                                    onClick={handleClick}>
                                    <Frame /> PIC
                                </Button>
                                <input
                                    className="bg-white"
                                    type="file"
                                    ref={hiddenFileInput}
                                    onChange={handleChange}
                                    style={{display: "none"}}
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            {isOpenUpload && selectedFileName && (
                                <div>
                                    {selectedFileName && (
                                        <p className="bg-white mt-2">
                                            File Name: {selectedFileName}
                                        </p>
                                    )}
                                    <div className="flex justify-around mt-2 gap-2">
                                        <Button
                                            variant="upload"
                                            onClick={handleUpload}
                                            disabled={!selectedFile}>
                                            Upload
                                        </Button>
                                        <Button
                                            variant="primary-dark"
                                            onClick={handleCancel}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            <CreateSeatModal
                isOpen={isSeatModalOpen}
                onClose={() => setIsSeatModalOpen(false)}
                onSeatCreated={refreshSeats}
                roomId={roomid}
            />

            <CreateObjectModal
                isOpen={isObjectModalOpen}
                onClose={() => setIsObjectModalOpen(false)}
            />
            {isSaveLayout === true && (
                <Toast
                    time={1000}
                    position={ToastPosition.Bottom_Right}
                    type={ToastType.Success}
                    description="Save layout Success!"
                    isOpen={isSaveLayout}
                    onClose={() => setIsSaveLayout(false)}
                />
            )}
        </div>
    );
}

export default Navigation;
