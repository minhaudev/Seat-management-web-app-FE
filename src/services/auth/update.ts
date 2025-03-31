import {request} from "../axios";

export const ShowCompany = async (id: string, token: string) => {
    try {
        const response = await request.get(`/company/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("response", response);

        return response;
    } catch (error: any) {
        return error?.response;
    }
};

export const getUser = async (idUser: string, token: string) => {
    console.log(idUser, token);
    try {
        const response = await request.get(`/users/${idUser}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("response", response);

        return response;
    } catch (error: any) {
        return error?.response;
    }
};
