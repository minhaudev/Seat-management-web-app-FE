import {request} from "../axios";

export const signInUser = async (email: string, password: string) => {
    console.log(email, password);
    try {
        const response = await request.post(`/auth/login`, {
            email,
            password
        });
        console.log("response", response);

        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
