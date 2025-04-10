"use client";
import React, {createContext, useContext, useState, useEffect} from "react";
import {RoomValue, SeatListResponse, User} from "@/interfaces/managerSeat";
import {seatListInRoom} from "@/services/manager/seat";
import {getRoomChange, getValueRoom, userInRoom} from "@/services/manager/room";
import {useParams} from "next/navigation";
export interface RoomObject {
    id?: string | any;
    name: string;
    width: number;
    height: number;
    ox: number;
    oy: number;
    color: string;
}
interface ChangedData {
    id: string;
    name: string;
    width: number;
    height: number;
    ox: number;
    oy: number;
    color: string;
}
interface Approve {
    roomId: string;
    roomName: string;
    changedBy: string;
    status: "Pending" | "Approve" | "Reject";
    changedData?: ChangedData[];
}
interface SeatContextProps {
    notification: string;
    setNotification: (value: string) => void;
    objects: RoomObject[];
    setObjects: React.Dispatch<React.SetStateAction<RoomObject[]>>;
    refreshObject: () => void;
    valueApprove: Approve[];
    setValueApprove: React.Dispatch<React.SetStateAction<Approve[]>>;
    refreshApprove: () => void;
    addObject: (newObject: RoomObject) => void;
    roomValue: RoomValue | null;
    setRoomValue: React.Dispatch<React.SetStateAction<RoomValue | null>>;
    seatList: SeatListResponse;
    setSeatList: React.Dispatch<React.SetStateAction<SeatListResponse>>;
    refreshSeats: () => void;
    updateSeatPosition: (id: string, ox: number, oy: number) => void;
    updateObjectPosition: (
        id: string,
        width: number,
        height: number,
        ox: number,
        oy: number
    ) => void;
}

interface UserContextProps {
    userList: User[];
    refreshUsers: () => void;
}

const SeatContext = createContext<SeatContextProps | undefined>(undefined);
const UserContext = createContext<UserContextProps | undefined>(undefined);
export const SeatProvider = ({children}: {children: React.ReactNode}) => {
    const {roomid} = useParams() as {roomid: string};
    const [valueApprove, setValueApprove] = useState<Approve[]>([]);
    const [seatList, setSeatList] = useState<SeatListResponse>({
        seats: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 10
    });
    const [notification, setNotification] = useState<string>("");
    const [roomValue, setRoomValue] = useState<RoomValue | null>(null);
    const [objects, setObjects] = useState<RoomObject[]>([]);

    const fetchDataApprove = async () => {
        try {
            const res = await getRoomChange();
            if (res) {
                setValueApprove(res);
            }
        } catch (error) {}
    };
    const addObject = async (newObject: {
        name: string;
        width: number;
        height: number;
        ox: number;
        oy: number;
        color: string;
    }) => {
        setObjects((prevObjects) => [...prevObjects, newObject]);
    };

    const fetchObjects = async () => {
        try {
            const response = await getValueRoom(roomid);
            if (response && response.data) {
                setRoomValue(response.data);
                setObjects(response.data.object);
            }
        } catch (error) {
            console.error("Error fetching objects:", error);
        }
    };

    useEffect(() => {
        fetchObjects();
    }, []);

    const fetchSeats = async () => {
        try {
            const response = await seatListInRoom(roomid);
            if (response && response.code === 1000) {
                setSeatList({
                    seats:
                        Array.isArray(response.data.content) ?
                            response.data.content
                        :   [],

                    totalElements: response.data.totalElements ?? 0,
                    totalPages: response.data.totalPages ?? 0,
                    pageNumber: response.data.pageable.pageNumber ?? 0,
                    pageSize: response.data.pageable.pageSize ?? 10
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (roomid) {
            fetchSeats();
        }
    }, [roomid]);

    const updateSeatPosition = (id: string, ox: number, oy: number) => {
        setSeatList((prevSeats) => ({
            ...prevSeats,
            seats: prevSeats.seats.map((seat) =>
                seat.id === id ? {...seat, ox, oy} : seat
            )
        }));
    };
    const updateObjectPosition = (
        id: string,
        ox: number,
        oy: number,
        width: number,
        height: number
    ) => {
        setObjects((prevObjects) =>
            prevObjects.map((obj, i) =>
                obj.id === id ? {...obj, ox, oy, width, height} : obj
            )
        );
    };

    return (
        <SeatContext.Provider
            value={{
                refreshApprove: fetchDataApprove,
                valueApprove,
                setValueApprove,
                refreshObject: fetchObjects,
                notification,
                roomValue,
                objects,
                seatList,
                setNotification,
                setObjects,
                addObject,
                setSeatList,
                setRoomValue,
                refreshSeats: fetchSeats,
                updateSeatPosition,
                updateObjectPosition
            }}>
            {children}
        </SeatContext.Provider>
    );
};

export const UserInRoomProvider = ({children}: {children: React.ReactNode}) => {
    const {roomid} = useParams() as {roomid: string};
    const [userList, setUserList] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await userInRoom(roomid);
            if (response && response.code === 1000) {
                setUserList(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [roomid]);

    return (
        <UserContext.Provider value={{userList, refreshUsers: fetchUsers}}>
            {children}
        </UserContext.Provider>
    );
};

export const useSeat = () => {
    const context = useContext(SeatContext);
    if (!context) {
        throw new Error("useSeat must be used within a SeatProvider");
    }
    return context;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
