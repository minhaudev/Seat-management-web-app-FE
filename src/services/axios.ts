import axios from "axios";

const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export {request};
