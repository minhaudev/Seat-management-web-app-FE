import UserInfo from "@/interfaces/user";
import {request} from "../axios";

export const getInfoPersonal = async () => {
    try {
        const response = await request.get(`/users/info`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const updateUser = async (
    id: string,
    data: {
        firstName: string;
        lastName: string;
        phone: string;
        roles: string[];
        roomId: string;
    }
) => {
    try {
        const response = await request.patch(`/users/${id}`, data);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
