"use client";

import React, {useState, useEffect, useRef} from "react";
import LayoutContainer from "@/app/LayoutContainer";
import {useSeat, useUser} from "@/context/SeatContext";
import {Seat, SeatListResponse} from "@/interfaces/managerSeat";
import {DraggableSeat} from "@/components/atoms/DraggableSeat";
import {Tooltip} from "@nextui-org/react";
import ObjectComponent from "@/components/atoms/Rnd";
import Modal from "@/components/molecules/Modal";
import Input from "@/components/atoms/Input";
import {assignUser, reassignUser} from "@/services/manager/seat";
import useWebSocket from "@/hooks/webSocket";
import {useParams} from "next/navigation";
interface AssignUserParams {
    idUser: string;
    idSeat: string;
}
interface ReAssignUserParams {
    oldSeat: string;
    idSeat: string;
}
export default function RoomDetails() {
    const {seatList, roomValue, refreshSeats, updateSeatPosition, objects} =
        useSeat();
    const {userList, refreshUsers} = useUser();
    const [localSeats, setLocalSeats] = useState<SeatListResponse>(seatList);
    const dropContainerRef = useRef<HTMLDivElement | null>(null);
    const [hasBackground, setHasBackground] = useState(true);
    const [menu, setMenu] = useState({visible: false, x: 0, y: 0, seatId: ""});
    const [isOpenAsign, setIsOpenAsign] = useState(false);
    const [isOpenReassign, setIsOpenReassign] = useState(false);
    const [assign, setAssign] = useState<AssignUserParams>({
        idUser: "",
        idSeat: ""
    });
    const [reAssign, setReAssign] = useState<ReAssignUserParams>({
        oldSeat: "",
        idSeat: ""
    });

    useEffect(() => {
        setHasBackground(!!roomValue?.image);
    }, [roomValue?.image]);

    useEffect(() => {
        setLocalSeats(seatList);
    }, [seatList]);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const seatData = e.dataTransfer.getData("seat");
        const positionMouse = e.dataTransfer.getData("positionMouse");
        if (!seatData) return;

        const {offsetX, offsetY} = JSON.parse(positionMouse);
        const droppedSeat: Seat = JSON.parse(seatData);
        const rect = dropContainerRef.current?.getBoundingClientRect();
        if (rect) {
            const newOx = e.clientX - rect.left - offsetX;
            const newOy = e.clientY - rect.top - offsetY;

            setLocalSeats((prevState) => ({
                ...prevState,
                seats: prevState.seats.map((seat) =>
                    seat.id === droppedSeat.id ?
                        {...seat, ox: newOx, oy: newOy}
                    :   seat
                )
            }));

            updateSeatPosition(droppedSeat.id, newOx, newOy);
        }
    };

    const backgroundStyle = {
        backgroundImage: `url(http://localhost:8080${encodeURI(String(roomValue?.image))})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    };

    const handleContextMenu = (
        e: React.MouseEvent<HTMLDivElement>,
        seat: Seat
    ) => {
        e.preventDefault();

        const rect = dropContainerRef.current?.getBoundingClientRect();
        if (rect) {
            const menuX = seat.ox + 50;
            const menuY = seat.oy;

            setMenu({visible: true, x: menuX, y: menuY, seatId: seat.id});

            setAssign((prev) => ({
                ...prev,
                idSeat: seat.id
            }));
            setReAssign((prev) => ({
                ...prev,
                oldSeat: seat.id
            }));
        }
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setMenu({visible: false, x: 0, y: 0, seatId: ""});
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleAssign = () => {
        setIsOpenAsign(true);
        setMenu({visible: false, x: 0, y: 0, seatId: ""});
    };

    const handleAssignUser = async () => {
        if (!assign?.idSeat || !assign?.idUser) {
            alert("Vui lòng chọn ghế và nhập ID User.");
            return;
        }

        try {
            const response = await assignUser(assign.idSeat, assign.idUser);

            if (response.code === 1000) {
                refreshUsers();
                alert("Assign success!");
            } else {
                alert(response.message || "Assign failed!");
            }
        } catch (error) {
            console.error("Assign error:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    const handleReAssignUser = async () => {
        try {
            const response = await reassignUser(
                reAssign.oldSeat,
                reAssign.idSeat
            );
            console.log("response data asgin", response);
            if (response.code === 1000) {
                refreshUsers();
                alert("Asign success!");
            }
        } catch (error) {}
    };
    const seatOptions =
        seatList?.seats ?
            seatList.seats
                .filter((seat) => seat.user === undefined)
                .map((seat) => ({
                    value: seat.id,
                    label: `${seat.number} ${seat.name} `
                }))
        :   [];

    const userOptions = userList.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName} (${user.email})`
    }));

    return (
        <LayoutContainer isFooter={false}>
            <div
                ref={dropContainerRef}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="relative w-full h-full bg-gray-100 p-4"
                style={{
                    ...(hasBackground ? backgroundStyle : {}),

                    position: "relative"
                }}>
                {localSeats?.seats ?
                    localSeats.seats
                        .filter((seat) => seat.ox !== 0 && seat.oy !== 0)
                        .map((seat) => (
                            <Tooltip
                                key={seat.id}
                                content={
                                    <div className="text-left">
                                        {seat.user?.id && (
                                            <p>
                                                <strong>ID:</strong>{" "}
                                                {seat.user.id}
                                            </p>
                                        )}
                                        {seat.user?.firstName && (
                                            <p>
                                                <strong>Name:</strong>{" "}
                                                {seat.user.firstName}
                                            </p>
                                        )}
                                        {seat.user?.team && (
                                            <p>
                                                <strong>Team:</strong>{" "}
                                                {seat.user.team}
                                            </p>
                                        )}
                                        {seat.user?.project && (
                                            <p>
                                                <strong>Project:</strong>{" "}
                                                {seat.user.project}
                                            </p>
                                        )}
                                    </div>
                                }
                                placement="top">
                                <div
                                    onContextMenu={(e) =>
                                        handleContextMenu(e, seat)
                                    }
                                    style={{
                                        left: `${seat.ox}px`,
                                        top: `${seat.oy}px`,
                                        position: "absolute"
                                    }}>
                                    <DraggableSeat seat={seat} />
                                </div>
                            </Tooltip>
                        ))
                :   null}

                {menu?.visible ?
                    <Tooltip
                        isOpen={menu.visible}
                        content={
                            <div className="text-[14px] bg-white text-gray-7 rounded-md">
                                {!localSeats.seats.find(
                                    (s) => s.id === menu.seatId
                                )?.user && (
                                    <p
                                        className="cursor-pointer hover:text-gray-6 rounded"
                                        onClick={handleAssign}>
                                        Assign
                                    </p>
                                )}
                                {localSeats.seats.find(
                                    (s) => s.id === menu.seatId
                                )?.user && (
                                    <p
                                        className="cursor-pointer hover:text-gray-6 rounded"
                                        onClick={() => setIsOpenReassign(true)}>
                                        Reassign
                                    </p>
                                )}
                            </div>
                        }
                        placement="right"
                        color="default">
                        <div
                            className="absolute"
                            style={{
                                left: `${menu.x}px`,
                                top: `${menu.y}px`,
                                width: "1px",
                                height: "1px",
                                zIndex: 1000
                            }}
                        />
                    </Tooltip>
                :   null}

                {!hasBackground &&
                    objects.map((object) => (
                        <ObjectComponent
                            key={object.id}
                            id={object.id}
                            ox={object.ox}
                            oy={object.oy}
                            width={object.width}
                            height={object.height}
                            color={object.color}
                            value={object.name}
                        />
                    ))}
                {isOpenAsign && (
                    <Modal
                        onClick={handleAssignUser}
                        isOpen={isOpenAsign}
                        name="Asign Seat"
                        nameBtn="Asign"
                        onClose={() => setIsOpenAsign(false)}>
                        <Input
                            value={assign.idUser ?? ""}
                            handleSelectChange={(e: any) => {
                                setAssign((prev) => ({
                                    ...prev,
                                    idUser: e.target.value
                                }));
                            }}
                            variant="select"
                            optionSelect={userOptions}
                            placeholder="User Asign"
                        />
                    </Modal>
                )}
                {isOpenReassign && (
                    <Modal
                        onClick={handleReAssignUser}
                        isOpen={isOpenReassign}
                        name="Reassgin Seat"
                        nameBtn="Reassign"
                        onClose={() => setIsOpenReassign(false)}>
                        <Input
                            value={reAssign.idSeat ?? ""}
                            handleSelectChange={(e: any) => {
                                setReAssign((prev) => ({
                                    ...prev,
                                    idSeat: e.target.value
                                }));
                            }}
                            variant="select"
                            optionSelect={seatOptions}
                        />
                    </Modal>
                )}
            </div>
        </LayoutContainer>
    );
}
