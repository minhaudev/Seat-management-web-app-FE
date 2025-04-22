import {request} from "../axios";

export const createTeam = async (value: any) => {
    try {
        const response = await request.post(`teams`, value);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const showAllName = async () => {
    try {
        const response = await request.get(`teams/names`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const GetColors = async () => {
    try {
        const response = await request.get(`colors`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
