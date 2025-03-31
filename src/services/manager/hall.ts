import {request} from "../axios";

export const getHallsByFloor = async (id: string) => {
    try {
        const response = await request.get(`halls/floor/${id}`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const listHall = async () => {
    try {
        const response = await request.get(`halls`);
        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const updateHall = async (id: string, valueUpdate: string) => {
    try {
        const response = await request.patch(`halls/${id}`, {valueUpdate});
    } catch (error) {}
};
export const showFloor = async (id: string) => {
    try {
        const response = await request.post(`floors`, {id});
        return response.data;
    } catch (error) {
        return error;
        // return error?.data;
    }
};
