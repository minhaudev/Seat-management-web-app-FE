import {request} from "../axios";

export const getAllFloor = async () => {
    try {
        const response = await request.get(`floors`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const showFloor = async (id: string) => {
    try {
        const response = await request.post(`floors`, {id});
        return response.data;
    } catch (error) {
        return "error";
        // return error?.data;
    }
};
