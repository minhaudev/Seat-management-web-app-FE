import {request} from "../axios";

export const forgotPassword = async (email: string) => {
    try {
        const response = await request.post(`/auth/forgot-password`, {
            email
        });

        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const recoverPassword = async (token: string, newPassword: string) => {
    try {
        const response = await request.post(`/auth/reset-password`, {
            token: token,
            newPassword: newPassword
        });

        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const getAllUser = async () => {
    try {
        const res = await request.get(`/users`);
        return res.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
export const updateUser = async (id: string, data: any) => {
    try {
        const res = await request.patch(`/users/${id}`, data);
        return res.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const deleteUser = async (id: string) => {
    try {
        const res = await request.delete(`/users/${id}`);
        return res.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
