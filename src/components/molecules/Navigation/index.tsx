"use client";
import React, {useEffect, useRef, useState} from "react";
import Menu from "@/assets/svgs/menu.svg";
import Button from "@/components/atoms/Button";
import "../../../app/globals.css";
import {useSeat} from "@/context/SeatContext";
import {useParams} from "next/navigation";
import {
    savePositionSeat,
    paginationSeat,
    getAllTypeSeat
} from "@/services/manager/seat";
import {DraggableSeat} from "@/components/atoms/DraggableSeat";
import Toast from "../Toast";
import {ToastPosition, ToastType} from "@/enums/ToastEnum";
import CreateSeatModal from "@/components/atoms/CreateSeatModal/CreateSeatModal";
import Frame from "@/assets/svgs/frame_v2.svg";
import {saveLayoutRoom, uploadImageRoom} from "@/services/manager/room";
import {GetColors} from "@/services/manager/team";
import {Spinner} from "@nextui-org/react";
import Joyride from "react-joyride";
// import useWebSocket from "@/hooks/webSocket";
interface color {
    id: string;
    name: string;
    color: string;
}
interface ItypeSeat {
    id: string;
    name: string;
    description: string | null;
}
function Navigation() {
    const {roomid} = useParams() as {roomid: string};
    const {
        seatList,
        setSeatList,
        setRoomValue,
        objects,
        refreshSeats,
        updateSeatPosition,
        addObject
    } = useSeat();
    const [typeSeat, setTypeSeat] = useState<ItypeSeat[]>([]);
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
    const [loadingMore, setLoadingMore] = useState(false);

    const [teams, setTeams] = useState<color[]>();
    const [projects, setProjects] = useState<color[]>();

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

        setLoadingMore(false);
    };

    const handleLoadMore = () => {
        setLoadingMore(true);
        setPage((prev) => prev + 1);
    };
    const saveLayoutSeat = async () => {
        try {
            const formattedSeats = seatList.seats.map(({id, ox, oy}) => ({
                id,
                ox,
                oy
            }));
            await savePositionSeat(formattedSeats, roomid);
        } catch (error) {
            console.error("Error saving layout:", error);
        }
    };

    const seaveLayoutObject = async () => {
        try {
            const formattedObject = objects.map(
                ({id, name, ox, oy, width, height, color}) => ({
                    id: id.startsWith("temp-") ? id.replace("temp-", "") : id,
                    name,
                    ox,
                    oy,
                    width,
                    height,
                    color
                })
            );

            const role =
                typeof window !== "undefined" ?
                    localStorage.getItem("role")
                :   " ";

            const response = await saveLayoutRoom(roomid, formattedObject);

            if (response && response.code === 1000) {
                if (role === "SUPERUSER") {
                    setIsSaveLayout(true);
                } else {
                    alert("waiting for response from admin!");
                }
            }
        } catch (error) {
            console.error("Error saving layout:", error);
        }
    };

    const prevFormattedRef = useRef<string>("");

    const handleSaveLayout = () => {
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

        const currentStr = JSON.stringify(formattedObject);
        seaveLayoutObject();
        saveLayoutSeat();
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
    const getColors = async () => {
        const res = await GetColors();
        if (res) {
            setTeams(res.teams || []);
            setProjects(res.projects || []);
        }
    };
    const getTypeSeats = async () => {
        const res = await getAllTypeSeat();
        if (res?.code === 1000) {
            setTypeSeat(res?.data);
        }
    };
    useEffect(() => {
        getTypeSeats();
        getColors();
    }, []);

    const [run, setRun] = useState(false);
    useEffect(() => {
        const isFirstLogin = localStorage.getItem("isFirstLogin") !== "false";
        if (isFirstLogin) {
            localStorage.setItem("isFirstLogin", "false");
            setTimeout(() => setRun(true), 100);
        }
    }, []);

    const steps = [
        {
            target: ".first-step",
            content: "click to open Navbar."
        },
        {
            target: ".second-step",
            content: "create type seat."
        },
        {
            target: ".third-step",
            content: `Create add object such as "Wall", 
        "Door", "Table" ...`
        },
        {
            target: ".four-step",
            content: `create image as wallpaper`
        },
        {
            target: ".five-step",
            content: `saves layout information`
        }
    ];

    return (
        <div
            className={`min-h-screen z-10 transition-width duration-100 ${expand ? "w-64" : "w-14"} bg-primary pb-4`}>
            <Joyride
                steps={steps}
                run={run}
                continuous
                showSkipButton
                showProgress
                scrollToFirstStep
                disableScrolling={false}
                debug={true}
                styles={{
                    options: {
                        zIndex: 10000,
                        primaryColor: "#4CAF50"
                    }
                }}
                callback={(data) => {
                    const {index, type, status} = data;

                    if (type === "step:before") {
                        if (!expand) {
                            setExpand(true);
                            handleToggle("seat");
                        }

                        if (
                            (index === 1 || index === 2) &&
                            !section.includes("seat")
                        ) {
                            handleToggle("seat");
                        }

                        if (index === 3 && !section.includes("notes")) {
                            handleToggle("notes");
                        }
                    }

                    if (["finished", "skipped"].includes(status)) {
                        setRun(false);
                    }
                }}
            />
            <div className="sticky top-0 h-14 z-50 bg-primary flex items-center justify-between px-2">
                {expand && (
                    <p className="text-[32px] font-semibold text-white ">
                        Smart
                    </p>
                )}
                <Button
                    isIcon
                    className="first-step"
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
                        Total Type:{" "}
                        {typeSeat?.length ?
                            typeSeat.length.toString().padStart(2, "0")
                        :   "0"}
                    </p>

                    <ul className="grid grid-cols-2 gap-2">
                        {typeSeat.map((seatType) => (
                            <li
                                key={seatType.id}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData(
                                        "typeSeat",
                                        JSON.stringify(seatType)
                                    );
                                    e.dataTransfer.setData(
                                        "iscreateseat",
                                        JSON.stringify("true")
                                    );
                                    const rect =
                                        e.currentTarget.getBoundingClientRect();
                                    const offsetX = e.clientX - rect.left;
                                    const offsetY = e.clientY - rect.top;
                                    e.dataTransfer.setData(
                                        "positionMouse",
                                        JSON.stringify({offsetX, offsetY})
                                    );
                                }}
                                className="p-1 text-center border border-gray bg-white cursor-grab w-[108px] h-[45px] flex justify-center items-center">
                                {seatType.name}
                            </li>
                        ))}
                    </ul>

                    <p className="text-white font-semibold">Select functions</p>
                    <div className="mt-2 grid grid-cols-2 gap-2 ">
                        <Button
                            className="third-step"
                            onClick={() =>
                                addObject({
                                    id: "temp-" + crypto.randomUUID(),
                                    name: "New Object",
                                    ox: 50,
                                    oy: 50,
                                    width: 100,
                                    height: 50,
                                    color: "#cccccc"
                                })
                            }>
                            ADD OBJECT
                        </Button>

                        <Button
                            variant="dashed"
                            className="second-step"
                            onClick={() => setIsSeatModalOpen(true)}>
                            ADD TYPE
                        </Button>

                        <Button
                            className="!px-1 four-step"
                            variant="secondary"
                            onClick={handleClick}>
                            <p className="flex">
                                <Frame /> PICTURE
                            </p>
                        </Button>
                        <input
                            className="bg-white"
                            type="file"
                            ref={hiddenFileInput}
                            onChange={handleChange}
                            style={{display: "none"}}
                        />
                    </div>
                    <div className="mt-2">
                        {isOpenUpload && selectedFileName && (
                            <div className="mb-2">
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
                        <Button
                            className="five-step"
                            variant="upload"
                            onClick={handleSaveLayout}>
                            SAVE LAYOUT
                        </Button>
                    </div>
                </div>
            )}
            <div
                className="cursor-pointer text-white p-1 font-semibold"
                onClick={() => handleToggle("notes")}>
                {expand ? "Notion teams & project" : "notes"}
            </div>
            {expand && section.includes("notes") && (
                <div className="px-4 pb-4 space-y-4">
                    <div>
                        <p className="text-white p-1 font-semibold">TEAMS:</p>
                        <div className="space-y-2">
                            {teams?.map((team) => (
                                <div
                                    key={team?.id}
                                    className="flex items-center space-x-2">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{
                                            backgroundColor: team?.color
                                        }}></div>
                                    <span className="text-white">
                                        {team?.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-white p-1 font-semibold">
                            PROJECTS:
                        </p>
                        <div className="space-y-2">
                            {projects?.map((project) => (
                                <div
                                    key={project?.id}
                                    className="flex items-center space-x-2">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{
                                            backgroundColor: project?.color
                                        }}></div>
                                    <span className="text-white">
                                        {project?.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <CreateSeatModal
                isOpen={isSeatModalOpen}
                onClose={() => setIsSeatModalOpen(false)}
                roomId={roomid}
                getTypeSeats={getTypeSeats}
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
