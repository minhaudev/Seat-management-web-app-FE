"use client";

import React, {useState, useEffect, useRef, use} from "react";
import LayoutContainer from "@/app/LayoutContainer";
import {useSeat, useUser} from "@/context/SeatContext";
import {Seat, SeatListResponse} from "@/interfaces/managerSeat";
import {DraggableSeat} from "@/components/atoms/DraggableSeat";
import {Tooltip} from "@nextui-org/react";
import ObjectComponent from "@/components/atoms/Rnd";
import Modal from "@/components/molecules/Modal";
import Input from "@/components/atoms/Input";
import {assignUser, reassignUser} from "@/services/manager/seat";
import Toast from "@/components/molecules/Toast";
import {ToastPosition, ToastType} from "@/enums/ToastEnum";
import useWebSockets from "@/hooks/webSocket";
import {useParams} from "next/navigation";
import {URL_IMAGE} from "@/consts";
// import AuthGuard from "@/components/molecules/AuthGuard";

interface AssignUserParams {
    idUser: string;
    idSeat: string;
}
interface ReAssignUserParams {
    oldSeat: string;
    idSeat: string;
}
export default function RoomDetails() {
    const [isSaveLayout, setIsSaveLayout] = useState(false);
    const {
        seatList,
        setSeatList,
        roomValue,
        refreshSeats,
        updateSeatPosition,
        objects,
        refreshObject
    } = useSeat();
    const {userList, refreshUsers} = useUser();
    const [localSeats, setLocalSeats] = useState<SeatListResponse>(seatList);
    const dropContainerRef = useRef<HTMLDivElement | null>(null);
    const [hasBackground, setHasBackground] = useState(true);
    const [menu, setMenu] = useState({visible: false, x: 0, y: 0, seatId: ""});
    const [isOpenAsign, setIsOpenAsign] = useState(false);
    const [isOpenReassign, setIsOpenReassign] = useState(false);
    const [role, setRole] = useState<string | null>(null);
    const [Notification, setNotification] = useState([]);
    const [assign, setAssign] = useState<AssignUserParams>({
        idUser: "",
        idSeat: ""
    });
    const [reAssign, setReAssign] = useState<ReAssignUserParams>({
        oldSeat: "",
        idSeat: ""
    });
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasBackground(e.target.checked);
    };

    useEffect(() => {
        setLocalSeats(seatList);
    }, [seatList]);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedRole = localStorage.getItem("role");
            setRole(storedRole);
        }
    }, []);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        if (role === "USER") return;

        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (role === "USER") return;
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
        backgroundImage: `url(${URL_IMAGE}${encodeURI(String(roomValue?.image))})`,
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
        try {
            const response = await assignUser(assign.idSeat, assign.idUser);
            if (response.code === 1000) {
                setAssign({idUser: "", idSeat: ""});
                setIsOpenAsign(false);
                setIsSaveLayout(true);
            }
        } catch (error) {}
    };

    const enableSuperUser = role === "SUPERUSER";
    const {roomid} = useParams() as {roomid: string};
    const {connectionStatus} = useWebSockets(roomid);

    const handleReAssignUser = async () => {
        try {
            const response = await reassignUser(
                reAssign.oldSeat,
                reAssign.idSeat
            );
            if (response.code === 1000) {
                setReAssign({oldSeat: "", idSeat: ""});
                setIsOpenReassign(false);
                setIsSaveLayout(true);
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
    useEffect(() => {
        refreshObject();
    }, []);

    return (
        // <AuthGuard>
        <LayoutContainer
            isNav={role === "USER" ? false : true}
            isFooter={false}>
            <div
                ref={dropContainerRef}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className=" relative h-full w-full bg-gray-100 p-4"
                style={{
                    ...(isOn ? backgroundStyle : {}),
                    position: "relative"
                }}>
                {localSeats?.seats && Array.isArray(localSeats.seats) ?
                    localSeats.seats
                        .filter((seat) => seat.ox !== 0 && seat.oy !== 0)
                        .map((seat) => {
                            const hasTooltipContent =
                                seat.user?.id ||
                                seat.user?.firstName ||
                                seat.user?.team ||
                                seat.user?.project;

                            const seatContent = (
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
                            );

                            return hasTooltipContent ?
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
                                                        <strong>
                                                            Project:
                                                        </strong>{" "}
                                                        {seat.user.project}
                                                    </p>
                                                )}
                                            </div>
                                        }
                                        placement="top">
                                        {seatContent}
                                    </Tooltip>
                                :   <React.Fragment key={seat.id}>
                                        {seatContent}
                                    </React.Fragment>;
                        })
                :   null}

                {menu.visible && (
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
                )}

                {objects?.map((object) => (
                    <>
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
                    </>
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
            {isSaveLayout === true && (
                <Toast
                    position={ToastPosition.Top_Right}
                    time={1000}
                    type={ToastType.Success}
                    description="Save layout Success!"
                    isOpen={isSaveLayout}
                    onClose={() => setIsSaveLayout(false)}
                />
            )}
            {roomValue?.image && (
                <div className="flex justify-center gap-1 absolute top-[57px] z-50 right-[0px]">
                    <div
                        onClick={toggleSwitch}
                        className={`w-11 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                            isOn ? "bg-green" : "bg-gray"
                        }`}>
                        <div
                            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                isOn ? "translate-x-6" : "translate-x-0"
                            }`}
                        />
                    </div>
                </div>
            )}
        </LayoutContainer>
        // </AuthGuard>
    );
}
