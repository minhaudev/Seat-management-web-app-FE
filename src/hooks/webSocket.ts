"use client";

import {useEffect, useState} from "react";
import {useSeat} from "@/context/SeatContext";

const useWebSocket = (roomId: string) => {
    const {refreshSeats, refreshObject, notification, setNotification} =
        useSeat();
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [connectionStatus, setConnectionStatus] =
        useState<string>("Disconnected");

    useEffect(() => {
        if (!roomId) return;
        const ws = new WebSocket(
            `ws://localhost:8080/api/data?roomId=${roomId}`
        );

        ws.onopen = () => {
            console.log("WebSocket kết nối thành công");
            setConnectionStatus("Connected");
        };

        ws.onmessage = async (event: MessageEvent) => {
            try {
                if (event.data) {
                    console.log("event data", event.data);
                    if (event.data === "seat") {
                        await refreshSeats();
                    } else {
                        await refreshObject();
                    }
                    setNotification(event.data);
                }
            } catch (error) {
                console.error("Lỗi phân tích JSON:", error);
            }
        };

        ws.onerror = (error: Event) => {
            console.error("WebSocket lỗi:", error);
            setConnectionStatus("Error");
        };

        ws.onclose = () => {
            console.log("WebSocket đã đóng kết nối");
            setConnectionStatus("Closed");
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [roomId]);
    return {connectionStatus, socket};
};

export default useWebSocket;
