"use client";
import {useSeat} from "@/context/SeatContext";

export const parseNotification = (notification: string) => {
    if (!notification) return null;

    return {
        content: notification,
        timestamp: new Date().toISOString(),
        type: "seat_update",
        read: false
    };
};

export const useOrderNotice = () => {
    const {notifications} = useSeat();

    return {
        total: notifications.length,
        data: notifications
    };
};
