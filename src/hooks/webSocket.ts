"use client";
import {useEffect, useRef, useState} from "react";
import {useSeat} from "@/context/SeatContext";
import {NotificationItem} from "@/interfaces/managerSeat";
import {WEBSOCKET_URL} from "@/consts";

const useWebSockets = (roomId: string) => {
    const {
        refreshSeats,
        refreshObject,
        notifications,
        setNotifications,
        refreshApprove
    } = useSeat();

    const roomSocketRef = useRef<WebSocket | null>(null);
    const superUserSocketRef = useRef<WebSocket | null>(null);

    const [connectionStatus, setConnectionStatus] = useState<{
        room?: "Disconnected" | "Connected" | "Error" | "Closed";
        superUser?: "Disconnected" | "Connected" | "Error" | "Closed";
    }>({
        room: "Disconnected",
        superUser: "Disconnected"
    });

    useEffect(() => {
        if (roomSocketRef.current) {
            roomSocketRef.current.close();
            roomSocketRef.current = null;
        }

        if (superUserSocketRef.current) {
            superUserSocketRef.current.close();
            superUserSocketRef.current = null;
        }

        if (roomId) {
            const socket = new WebSocket(`${WEBSOCKET_URL}?roomId=${roomId}`);
            roomSocketRef.current = socket;
            setupWebSocket(socket, "room");
        }

        const role =
            typeof window !== "undefined" ? localStorage.getItem("role") : null;
        const isSuperUser = role === "SUPERUSER";

        if (isSuperUser) {
            const socket = new WebSocket(`${WEBSOCKET_URL}?role=SUPERUSER`);
            superUserSocketRef.current = socket;
            setupWebSocket(socket, "superUser");
        }

        return () => {
            roomSocketRef.current?.close();
            superUserSocketRef.current?.close();
        };
    }, [roomId]);

    const setupWebSocket = (
        ws: WebSocket,
        socketType: "room" | "superUser"
    ) => {
        ws.onopen = () => {
            console.log(`${socketType} WebSocket kết nối thành công`);
            setConnectionStatus((prev) => ({
                ...prev,
                [socketType]: "Connected"
            }));
        };

        ws.onmessage = async (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                const {type, message} = data;

                if (
                    (type === "SUPERUSER" && socketType !== "superUser") ||
                    (type !== "SUPERUSER" && socketType !== "room")
                ) {
                    return;
                }

                const isDuplicate = notifications.some(
                    (n) => n.content === message && n.type === type && !n.read
                );

                if (!isDuplicate) {
                    const newNotification: NotificationItem = {
                        content: message,
                        timestamp: new Date().toISOString(),
                        type,
                        read: false
                    };

                    setNotifications((prev: NotificationItem[]) => [
                        ...prev,
                        newNotification
                    ]);

                    if (type === "seat" || type === "object") {
                        refreshSeats();
                        refreshObject();
                    } else if (type === "SUPERUSER") {
                        if (socketType === "superUser") {
                            refreshApprove();
                        }
                    }
                }
            } catch (err) {
                console.error(`[${socketType}] Lỗi JSON:`, err);
            }
        };

        ws.onerror = (error: Event) => {
            console.error(`${socketType} WebSocket lỗi:`, error);
            setConnectionStatus((prev) => ({
                ...prev,
                [socketType]: "Error"
            }));
        };

        ws.onclose = () => {
            console.log(`${socketType} WebSocket đã đóng kết nối`);
            setConnectionStatus((prev) => ({
                ...prev,
                [socketType]: "Closed"
            }));
        };
    };

    return {
        connectionStatus,
        sockets: {
            room: roomSocketRef.current || undefined,
            superUser: superUserSocketRef.current || undefined
        }
    };
};

export default useWebSockets;
