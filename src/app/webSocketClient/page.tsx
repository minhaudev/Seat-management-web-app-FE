"use client";
import React, {useEffect, useState} from "react";

const WebSocketClient: React.FC = () => {
    const [connectionStatus, setConnectionStatus] =
        useState<string>("Connecting...");
    const [receivedMessage, setReceivedMessage] = useState<string | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(
            "ws://localhost:8080/api/data?roomId=06edb764-842b-4365-a2f5-8869010dcf14"
        );

        ws.onopen = () => {
            console.log("WebSocket kết nối thành công");
            setConnectionStatus("Connected");
        };

        ws.onmessage = (event: MessageEvent) => {
            console.log("Tin nhắn từ server:", event.data);
            try {
                const data = JSON.parse(event.data);
                setReceivedMessage(JSON.stringify(data, null, 2));
            } catch (error) {
                console.error("Lỗi phân tích JSON:", error);
                setReceivedMessage(event.data); // Nếu không phải JSON, hiển thị thô
            }
        };

        ws.onerror = (error: Event) => {
            console.error("WebSocket lỗi:", error);
            setConnectionStatus("Error");
        };
        ws.onclose = () => {
            console.log("WebSocket kết nối đã bị đóng");
            setConnectionStatus("Closed");
        };

        setSocket(ws);

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    // Gửi tin nhắn đến server
    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send("Hello from client!");
        }
    };

    return (
        <div>
            <h1>WebSocket Client</h1>
            <p>Connection Status: {connectionStatus}</p>
            <button onClick={sendMessage}>Send Message to Server</button>
            <div>
                <h3>Received Message</h3>
                <pre>{receivedMessage}</pre>
            </div>
        </div>
    );
};

export default WebSocketClient;
