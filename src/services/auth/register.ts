import {request} from "../axios";

export const GetAllCompany = async () => {
    const reponse = await request.get("/company");

    return reponse;
};
export const RegisterUser = async (
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    confirmPassword: string,
    companyId: string,
    birthday: string
) => {
    try {
        const response = await request.post(`/users`, {
            username,
            password,
            firstName,
            lastName,
            confirmPassword,
            companyId,
            birthday
        });

        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};
