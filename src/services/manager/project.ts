import {request} from "../axios";

export const createProject = async (value: any) => {
    try {
        const response = await request.post(`teams`, value);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const showAllProject = async () => {
    try {
        const response = await request.get(`projects/names`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
