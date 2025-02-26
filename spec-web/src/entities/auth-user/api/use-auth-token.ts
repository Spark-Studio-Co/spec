import { useState } from "react";

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
        console.log("🔒 RequestId stored:", requestId);
    }

    const removeRequestId = () => {
        localStorage.removeItem("requestId");
        setRequestId(null);
        console.log("🚪 ReqId removed, user logged out!");
    };

    const saveToken = (newToken: string) => {
        localStorage.setItem("auth_token", newToken);
        setToken(newToken);
        console.log("🔒 Token stored:", newToken);
    };

    const removeToken = () => {
        localStorage.removeItem("auth_token");
        setToken(null);
        console.log("🚪 Token removed, user logged out!");
    };

    return { token, saveToken, removeToken, requestId, saveRequestId, removeRequestId };
};