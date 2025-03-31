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
export const createSeat = async (
    userId: string,
    name: string,
    typeSeat: string,
    roomId: string,
    description?: string
) => {
    try {
        const payload: any = {name, typeSeat, roomId, description};

        if (userId.trim() !== "") {
            payload.userId = userId;
        }

        const response = await request.post(`seats`, payload);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const assignUser = async (id: string, idUser: string) => {
    try {
        const response = await request.post(
            `seats/${id}/assign?idUser=${idUser}`
        );
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const reassignUser = async (id: string, idSeat: string) => {
    console.log("idSeatOld:", id, "idSeatNew:", idSeat);

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
    seatList: {id: string; ox: number; oy: number}[]
) => {
    try {
        const response = await request.put(`/seats/update-positions`, seatList);
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
