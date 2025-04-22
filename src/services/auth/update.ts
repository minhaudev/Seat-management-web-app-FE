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
        firstName?: string;
        lastName?: string;
        projectId?: string;
        teamId?: string;
        phone?: string;
        roles?: string[];
        roomId?: string;
    }
) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(
                ([_, value]) =>
                    value !== "" && value !== null && value !== undefined
            )
        );

        const response = await request.patch(`/users/${id}`, filteredData);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
