import {request} from "../axios";

export const signInUser = async (email: string, password: string) => {
    console.log(email, password);
    try {
        const response = await request.post(`/auth/login`, {
            email,
            password
        });

        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
