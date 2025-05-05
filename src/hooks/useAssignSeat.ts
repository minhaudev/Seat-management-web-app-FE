import {useState} from "react";
import {assignUser, reassignUser} from "@/services/manager/seat";

import {useSeat} from "@/context/SeatContext";
import {AssignUserParams, ReAssignUserParams} from "@/interfaces/managerSeat";

export function useAssignSeat() {
    const [isSaving, setIsSaving] = useState(false);
    const {refreshSeats} = useSeat();

    const assign = async (assignParams: AssignUserParams) => {
        setIsSaving(true);
        try {
            const response = await assignUser(
                assignParams.idSeat,
                assignParams.idUser,
                assignParams.typeSeat,
                assignParams.temporaryTime
            );
            if (response.code === 1000) {
                refreshSeats();
                return {success: true};
            }
            return {success: false, message: response.message};
        } finally {
            setIsSaving(false);
        }
    };

    const reassign = async (reassignParams: ReAssignUserParams) => {
        setIsSaving(true);
        try {
            const response = await reassignUser(
                reassignParams.oldSeat,
                reassignParams.idSeat
            );
            if (response.code === 1000) {
                refreshSeats();
                return {success: true};
            }
            return {success: false, message: response.message};
        } finally {
            setIsSaving(false);
        }
    };

    return {assign, reassign, isSaving};
}
