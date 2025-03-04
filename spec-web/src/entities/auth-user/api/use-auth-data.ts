import { useState } from "react";
import reactQueryClient from "../../../app/api/query-client";

export const useAuthData = () => {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("auth_token");
    });

    const [requestId, setRequestId] = useState<string | null>(() => {
        return localStorage.getItem("requestId");
    })

    const saveRequestId = (requestId: string) => {
        localStorage.setItem('requestId', requestId);
        setRequestId(requestId);
    }

    const removeRequestId = () => {
        localStorage.removeItem("requestId");
        setRequestId(null);
    };

    const loadToken = async () => {
        const storedToken = localStorage.getItem('auth_token');
        setToken(storedToken);
        return storedToken;
    }

    const saveToken = (newToken: string) => {
        localStorage.setItem("auth_token", newToken);
        setToken(newToken);
    };

    const removeToken = () => {
        localStorage.removeItem("auth_token");
        reactQueryClient.resetQueries();
        reactQueryClient.clear();
        setToken(null);
    };

    return { token, saveToken, removeToken, requestId, saveRequestId, removeRequestId, loadToken };
};