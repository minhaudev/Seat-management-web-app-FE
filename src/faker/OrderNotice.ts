"use client";
import {useSeat} from "@/context/SeatContext";

export const parseNotification = (notification: string) => {
    if (!notification) return null;

    const idMatch = notification.match(/SeatResponse\(id=([\w-]+),/);

    const roomIdMatches = Array.from(notification.matchAll(/roomId=([\w-]+)/g));
    const idRoom = roomIdMatches.pop()?.[1] || "unknown";

    const nameMatch = notification.match(/name=([\w\s]+)/);
    const createdMatch = notification.match(/update=([\d-T:.]+)/);

    return {
        id: idMatch ? idMatch[1] : "unknown",
        idRoom,
        content: `Seat ${idMatch ? ` ID: ${idMatch[1]},  name ${nameMatch ? nameMatch[1] : "N/A"}` : "N/A"} updated.`,
        timestamp: createdMatch ? createdMatch[1] : new Date().toISOString(),
        type: "seat_update",
        read: false
    };
};

export const useOrderNotice = () => {
    const {notification} = useSeat();
    const notices =
        notification ?
            notification.split(";").map(parseNotification).filter(Boolean)
        :   [];

    return {
        total: notices.length,
        data: notices
    };
};
