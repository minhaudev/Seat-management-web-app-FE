import {request} from "../axios";

export const getRoomsByHall = async (id: string) => {
    try {
        const response = await request.get(`rooms/hall/${id}`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const seatListInRoom = async (id: string) => {
    try {
        const response = await request.get(`seats/${id}/room`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
interface CreateSeatParams {
    name?: string;
    ox: number;
    oy: number;
    roomId?: string;
}
export const createSeat = async ({name, ox, oy, roomId}: CreateSeatParams) => {
    try {
        const payload = {name, ox, oy, roomId};
        const response = await request.post(`seats`, payload);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const assignUser = async (
    id: string,
    idUser: string,
    typeseat: string,
    temporaryTime: string
) => {
    try {
        const response = await request.post(
            `seats/${id}/assign?idUser=${idUser}`,
            {typeSeat: typeseat, expiredAt: temporaryTime}
        );
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const reassignUser = async (id: string, idSeat: string) => {
    try {
        const response = await request.post(
            `seats/${id}/reassign?idSeat=${idSeat}`
        );
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const savePositionSeat = async (
    seatList: {id: string; ox: number; oy: number}[],
    roomid: string
) => {
    try {
        const response = await request.put(
            `/seats/update-positions?roomid=${roomid}`,
            seatList
        );
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const paginationSeat = async (
    roomId: string,
    page: number,
    size: number
) => {
    try {
        const response = await request.get(`/seats/${roomId}/room`, {
            params: {page, size}
        });
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const removeAssignUser = async (idSeat: string) => {
    try {
        const response = await request.post(`/seats/${idSeat}/remove`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const getAllTypeSeat = async () => {
    try {
        const res = await request.get(`/typeseats`);
        return res.data;
    } catch (err: any) {
        return err.response?.data;
    }
};
export const deleteTypeSeat = async (id: string) => {
    try {
        const res = await request.delete(`/typeseats/${id}`);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const createTypeSeat = async (name: string) => {
    try {
        const res = await request.post(`/typeseats`, {name: name});
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
};
