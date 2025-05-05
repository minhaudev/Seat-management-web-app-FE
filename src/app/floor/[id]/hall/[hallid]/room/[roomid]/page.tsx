"use client";
import Joyride from "react-joyride";
import React, {useState, useEffect, useRef, use} from "react";
import LayoutContainer from "@/app/LayoutContainer";
import {useSeat, useUser} from "@/context/SeatContext";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    AssignUserParams,
    ReAssignUserParams,
    Seat,
    SeatListResponse
} from "@/interfaces/managerSeat";
import {DraggableSeat} from "@/components/atoms/DraggableSeat";
import {Tooltip} from "@nextui-org/react";
import ObjectComponent from "@/components/atoms/Rnd";
import Modal from "@/components/molecules/Modal";
import Input from "@/components/atoms/Input";

import {
    assignUser,
    createSeat,
    reassignUser,
    removeAssignUser
} from "@/services/manager/seat";
import Toast from "@/components/molecules/Toast";
import {ToastPosition, ToastType} from "@/enums/ToastEnum";
import {useParams} from "next/navigation";
import {URL_IMAGE} from "@/consts";
import Breadcrumb from "@/components/atoms/Breadcrumb";
import {HomeIcon} from "lucide-react";
import {newDate} from "react-datepicker/dist/date_utils";
import Countdown from "react-countdown";
import {toVNLocalISOString} from "@/utils";

export default function RoomDetails() {
    const [isSaveLayout, setIsSaveLayout] = useState(false);
    const {
        seatList,
        roomValue,
        refreshSeats,
        updateSeatPosition,
        objects,
        refreshObject
    } = useSeat();
    const [creatingSeat, setCreatingSeat] = useState<Seat | null>(null);
    const {userList, refreshUsers} = useUser();
    const {roomid} = useParams() as {roomid: string};
    const [localSeats, setLocalSeats] = useState<SeatListResponse>(seatList);
    const dropContainerRef = useRef<HTMLDivElement | null>(null);
    const [menu, setMenu] = useState({visible: false, x: 0, y: 0, seatId: ""});
    const [isOpenAsign, setIsOpenAsign] = useState(false);
    const [isOpenReassign, setIsOpenReassign] = useState(false);
    const [role, setRole] = useState<string | null>(null);
    const [assign, setAssign] = useState<AssignUserParams>({
        temporaryTime: new Date(),
        idUser: "",
        idSeat: "",
        typeSeat: ""
    });
    const [reAssign, setReAssign] = useState<ReAssignUserParams>({
        oldSeat: "",
        idSeat: ""
    });
    const [isOn, setIsOn] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const toggleSwitch = () => {
        setIsOn(!isOn);
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

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        if (role === "USER") return;
        e.preventDefault();
        const typeSeatData = e.dataTransfer.getData("typeSeat");
        const seatData = e.dataTransfer.getData("seat");
        const positionMouse = e.dataTransfer.getData("positionMouse");
        const isCreateSeat = e.dataTransfer?.getData("iscreateseat");
        if (!positionMouse) return;

        let offsetX = 0,
            offsetY = 0;
        try {
            const positionParsed = JSON.parse(positionMouse);
            offsetX = positionParsed.offsetX;
            offsetY = positionParsed.offsetY;
        } catch (error) {
            console.error("Error parsing positionMouse:", error);
            return;
        }

        const rect = dropContainerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const newOx = e.clientX - rect.left - offsetX;
        const newOy = e.clientY - rect.top - offsetY;

        if (typeSeatData) {
            let newSeatType;
            try {
                newSeatType = JSON.parse(typeSeatData);
            } catch (error) {
                console.error("Error parsing typeSeatData:", error);
                return;
            }

            if (isCreateSeat && JSON.parse(isCreateSeat)) {
                const tempId = `temp-${Date.now()}`;
                const tempSeat: Seat = {
                    id: tempId,
                    name: "Creating...",
                    ox: newOx,
                    oy: newOy,
                    user: undefined
                };
                setCreatingSeat(tempSeat);
                await createSeat({
                    name: newSeatType.name,
                    ox: newOx,
                    oy: newOy,
                    roomId: roomid
                });
                await refreshSeats();
                setCreatingSeat(null);
                e.dataTransfer.setData("iscreateseat", JSON.stringify("false"));
            } else if (seatData) {
                let droppedSeat: Seat;
                try {
                    droppedSeat = JSON.parse(seatData);
                } catch (error) {
                    console.error("Error parsing seatData:", error);
                    return;
                }
                setLocalSeats((prevState) => {
                    const updatedSeats = prevState.seats.map((seat) =>
                        seat.id === droppedSeat.id ?
                            {...seat, ox: newOx, oy: newOy}
                        :   seat
                    );
                    return {...prevState, seats: updatedSeats};
                });

                updateSeatPosition(droppedSeat.id, newOx, newOy);
            }
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
            const response = await assignUser(
                assign.idSeat,
                assign.idUser,
                assign.typeSeat,
                assign.temporaryTime ?
                    toVNLocalISOString(assign.temporaryTime)
                :   ""
            );

            if (response.code === 1000) {
                setIsSaveLayout(true);
                setAssign({
                    idUser: "",
                    idSeat: "",
                    typeSeat: "",
                    temporaryTime: new Date()
                });
                setIsOpenAsign(false);
                await refreshSeats();
                await refreshUsers();

                if (assign.temporaryTime) {
                    const now = Date.now();
                    const expireAt = assign.temporaryTime.getTime();
                    const diffSeconds = Math.floor((expireAt - now) / 1000);

                    if (diffSeconds > 0) {
                        setSeatTimes((prev) => ({
                            ...prev,
                            [assign.idSeat]: diffSeconds
                        }));
                    }
                }
            }
        } catch (error) {
            console.error("Assign user failed:", error);
        }
    };

    const [seatTimes, setSeatTimes] = useState<{[seatId: string]: number}>({});

    useEffect(() => {
        const interval = setInterval(() => {
            setSeatTimes((prev) => {
                const updated: {[id: string]: number} = {};
                for (const id in prev) {
                    const newTime = prev[id] - 1;
                    if (newTime > 0) {
                        updated[id] = newTime;
                    }
                }
                return updated;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
                refreshSeats();
                await refreshUsers();
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

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setAssign((prev) => ({
                ...prev,
                temporaryTime: date
            }));
        }
    };

    const handleRemoveUser = async (id: string) => {
        const res = await removeAssignUser(id);
        await refreshSeats();
        await refreshUsers();
    };

    return (
        <LayoutContainer
            isNav={role === "USER" ? false : true}
            isFooter={false}>
            <div>
                <Breadcrumb
                    breadcrumbs={[
                        {
                            url: "/",
                            label: "Home",
                            prefixIcon: <HomeIcon size={16} />
                        },
                        {
                            url: `/floor/${roomValue?.floorId}`,
                            label: roomValue?.nameFloor
                        },
                        {
                            url: `/floor/${roomValue?.floorId}/hall/${roomValue?.hallId}`,
                            label: roomValue?.nameHall
                        },
                        {
                            url: `/room/${roomValue?.id}`,
                            label: roomValue?.name
                        }
                    ]}
                />
            </div>
            <div
                ref={dropContainerRef}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className=" relative h-full w-full bg-gray-100 p-4 "
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
                                    <DraggableSeat
                                        // timeRemaining={seatTimes[seat.id] ?? 0}
                                        seat={seat}
                                        onTimeout={() =>
                                            handleRemoveUser(seat.id)
                                        }
                                    />
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
                                                {seat.expiredAt && (
                                                    <p>
                                                        <strong>
                                                            Expired At:
                                                        </strong>{" "}
                                                        <Countdown
                                                            date={
                                                                new Date(
                                                                    seat.expiredAt
                                                                )
                                                            }
                                                            renderer={({
                                                                days,
                                                                hours,
                                                                minutes,
                                                                seconds
                                                            }) => (
                                                                <span>{`${days}d ${hours}h ${minutes}m ${seconds}s`}</span>
                                                            )}
                                                        />
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
                {creatingSeat && (
                    <div
                        key={creatingSeat.id}
                        style={{
                            left: `${creatingSeat.ox}px`,
                            top: `${creatingSeat.oy}px`,
                            position: "absolute"
                        }}>
                        <DraggableSeat seat={creatingSeat} />
                    </div>
                )}
                {menu.visible && (
                    <Tooltip
                        isOpen={menu.visible}
                        content={
                            <div className="text-[14px] bg-white text-gray-7 rounded-md">
                                {!localSeats.seats.find(
                                    (s) => s.id === menu.seatId
                                )?.user && (
                                    <div>
                                        <p
                                            className="cursor-pointer hover:text-gray-6 rounded"
                                            onClick={handleAssign}>
                                            Assign
                                        </p>
                                    </div>
                                )}
                                {localSeats.seats.find(
                                    (s) => s.id === menu.seatId
                                )?.user && (
                                    <div>
                                        <p
                                            className="cursor-pointer hover:text-gray-6 rounded"
                                            onClick={() =>
                                                setIsOpenReassign(true)
                                            }>
                                            Reassign
                                        </p>
                                        <p
                                            onClick={() =>
                                                handleRemoveUser(menu.seatId)
                                            }
                                            className="cursor-pointer hover:text-gray-6 rounded">
                                            Remove
                                        </p>
                                    </div>
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
                            label="User:"
                            require
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
                        <Input
                            label="TypeSeat:"
                            require
                            variant="select"
                            optionSelect={[
                                {label: "Temporary", value: "TEMPORARY"},
                                {label: "Permanent", value: "PERMANENT"}
                            ]}
                            value={assign.typeSeat}
                            handleSelectChange={(e: any) => {
                                setAssign((prev) => ({
                                    ...prev,
                                    typeSeat: e.target.value
                                }));
                            }}
                        />
                        {assign.typeSeat === "TEMPORARY" && (
                            <div>
                                <label>Choose Time (End time):</label>
                                <ReactDatePicker
                                    selected={assign.temporaryTime}
                                    onChange={handleDateChange}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    className="border border-gray-300 rounded px-2 py-1"
                                    minDate={new Date()}
                                    minTime={new Date()}
                                    maxTime={
                                        new Date(
                                            new Date().setHours(23, 59, 59)
                                        )
                                    }
                                />
                            </div>
                        )}
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
                <div className="flex justify-center gap-1 absolute top-[57px] z-50 right-[0px] ">
                    <div
                        onClick={toggleSwitch}
                        className={`w-11 h-5 flex items-center  rounded-full p-1 cursor-pointer transition-colors duration-300 ${
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
    );
}
