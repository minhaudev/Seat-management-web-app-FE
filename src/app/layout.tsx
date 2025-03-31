"use client";
import DragDropProvider from "@/components/atoms/DragDropProvider";
import {PopupProvider} from "@/context/PopupContext";
import {SeatProvider, UserInRoomProvider} from "@/context/SeatContext";
import {UserProvider} from "@/context/UserContext";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <DragDropProvider>
                    <SeatProvider>
                        <UserInRoomProvider>
                            <UserProvider>
                                <PopupProvider>{children}</PopupProvider>
                            </UserProvider>
                        </UserInRoomProvider>
                    </SeatProvider>
                </DragDropProvider>
            </body>
        </html>
    );
}
