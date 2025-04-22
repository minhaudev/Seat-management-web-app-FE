import {request} from "../axios";

export const getRoomsByHall = async (id: string) => {
    try {
        const response = await request.get(`rooms/hall/${id}`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const listRoom = async () => {
    try {
        const response = await request.get(`rooms`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const showRoom = async (id: string) => {
    try {
        const response = await request.post(`rooms`, {id});
        return response.data;
    } catch (error) {
        return error;
        // return error?.data;
    }
};

export const userInRoom = async (id: string) => {
    try {
        const response = await request.get(`/users/room/${id}`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const saveLayoutRoom = async (id: string, objects: any[]) => {
    try {
        const response = await request.put(
            `/rooms/${id}/update-objects`,
            objects
        );
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const getValueRoom = async (id: string) => {
    try {
        const response = await request.get(`/rooms/${id}`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const uploadImageRoom = async (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
        const response = await request.post(`/rooms/${id}/upload`, formData);

        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const deleteObject = async (roomId: string, objectId: string) => {
    try {
        const response = await request.delete(
            `/rooms/${roomId}/objects/${objectId}`
        );
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const getRoomChange = async () => {
    try {
        const response = await request.get(`/rooms/update/layout`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const approveLayout = async (roomId: string) => {
    try {
        const response = await request.post(`/rooms/approve/${roomId}`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const rejectLayout = async (roomId: string) => {
    try {
        const response = await request.delete(`/rooms/reject/${roomId}`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
