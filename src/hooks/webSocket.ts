import {useEffect, useState} from "react";
import {useSeat} from "@/context/SeatContext";

const useWebSockets = (roomId: string | null, enableSuperUser: boolean) => {
    const {refreshSeats, refreshObject, setNotification, refreshApprove} =
        useSeat();
    const [sockets, setSockets] = useState<{
        room?: WebSocket;
        superUser?: WebSocket;
    }>({});
    const [connectionStatus, setConnectionStatus] = useState<{
        room?: "Disconnected" | "Connected" | "Error" | "Closed";
        superUser?: "Disconnected" | "Connected" | "Error" | "Closed";
    }>({
        room: "Disconnected",
        superUser: "Disconnected"
    });

    useEffect(() => {
        let roomSocket: WebSocket | null = null;
        let superUserSocket: WebSocket | null = null;

        if (roomId) {
            roomSocket = new WebSocket(
                `ws://localhost:8080/api/data?roomId=${roomId}`
            );
            setupWebSocket(roomSocket, "room");
        }

        if (enableSuperUser) {
            superUserSocket = new WebSocket(
                `ws://localhost:8080/api/data?role=SUPERUSER`
            );
            setupWebSocket(superUserSocket, "superUser");
        }

        setSockets({
            room: roomSocket || undefined,
            superUser: superUserSocket || undefined
        });

        return () => {
            if (roomSocket) roomSocket.close();
            if (superUserSocket) superUserSocket.close();
        };
    }, [roomId, enableSuperUser]);

    const setupWebSocket = (ws: WebSocket, type: "room" | "superUser") => {
        ws.onopen = () => {
            console.log(`${type} WebSocket kết nối thành công`);
            setConnectionStatus((prev) => ({...prev, [type]: "Connected"}));
        };

        ws.onmessage = async (event: MessageEvent) => {
            try {
                const data = await JSON.parse(event.data);
                console.log("data", data);
                const {type, message} = data;
                if (type === "seat") {
                    refreshSeats();
                } else if (type === "object") {
                    refreshObject();
                } else if (type === "SUPERUSER") {
                    refreshApprove();
                }
                setNotification(message);
            } catch (error) {
                console.error(`[${type}] Lỗi phân tích JSON:`, error);
            }
        };

        ws.onerror = (error: Event) => {
            console.error(`${type} WebSocket lỗi:`, error);
            setConnectionStatus((prev) => ({...prev, [type]: "Error"}));
        };

        ws.onclose = () => {
            console.log(`${type} WebSocket đã đóng kết nối`);
            setConnectionStatus((prev) => ({...prev, [type]: "Closed"}));
        };
    };

    return {connectionStatus, sockets};
};

export default useWebSockets;
