import {createSeat} from "@/services/manager/seat";
import {Seat} from "@/interfaces/managerSeat";

export const handleDropSeat = async ({
    e,
    dropContainerRef,
    role,
    roomid,
    setCreatingSeat,
    refreshSeats,
    updateSeatPosition,
    setLocalSeats
}: any) => {
    if (role === "USER") return;
    e.preventDefault();

    const typeSeatData = e.dataTransfer.getData("typeSeat");
    const seatData = e.dataTransfer.getData("seat");
    const positionMouse = e.dataTransfer.getData("positionMouse");
    const isCreateSeat = e.dataTransfer?.getData("iscreateseat");

    if (!positionMouse) return;

    let offsetX = 0,
        offsetY = 0;
    try {
        const positionParsed = JSON.parse(positionMouse);
        offsetX = positionParsed.offsetX;
        offsetY = positionParsed.offsetY;
    } catch (error) {
        console.error("Error parsing positionMouse:", error);
        return;
    }

    const rect = dropContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newOx = e.clientX - rect.left - offsetX;
    const newOy = e.clientY - rect.top - offsetY;

    if (typeSeatData) {
        let newSeatType;
        try {
            newSeatType = JSON.parse(typeSeatData);
        } catch (error) {
            console.error("Error parsing typeSeatData:", error);
            return;
        }

        if (isCreateSeat && JSON.parse(isCreateSeat)) {
            const tempId = `temp-${Date.now()}`;
            const tempSeat: Seat = {
                id: tempId,
                name: "Creating...",
                ox: newOx,
                oy: newOy,
                user: undefined
            };
            setCreatingSeat(tempSeat);
            await createSeat({
                name: newSeatType.name,
                ox: newOx,
                oy: newOy,
                roomId: roomid
            });
            await refreshSeats();
            setCreatingSeat(null);
            e.dataTransfer.setData("iscreateseat", JSON.stringify("false"));
        } else if (seatData) {
            let droppedSeat: Seat;
            try {
                droppedSeat = JSON.parse(seatData);
            } catch (error) {
                console.error("Error parsing seatData:", error);
                return;
            }
            setLocalSeats((prevState: any) => {
                const updatedSeats = prevState.seats.map((seat: Seat) =>
                    seat.id === droppedSeat.id ?
                        {...seat, ox: newOx, oy: newOy}
                    :   seat
                );
                return {...prevState, seats: updatedSeats};
            });

            updateSeatPosition(droppedSeat.id, newOx, newOy);
        }
    }
};
