import axios from "axios";
import { useAuthStore } from "../../entities/auth-user/api/use-auth-data";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            console.error("API Error:", status, data);

            if (status === 401) {
                window.location.href = '/';
            }
        }
    }
)