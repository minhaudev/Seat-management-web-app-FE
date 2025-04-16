"use client";
import DragDropProvider from "@/components/atoms/DragDropProvider";
import {SeatProvider, UserInRoomProvider} from "@/context/SeatContext";

import "./globals.css";
export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <DragDropProvider>
                    <SeatProvider>
                        <UserInRoomProvider>{children}</UserInRoomProvider>
                    </SeatProvider>
                </DragDropProvider>
            </body>
        </html>
    );
}
