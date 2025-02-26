import { useState } from "react";

export const useAuthToken = () => {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("auth_token");
    });

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

    return { token, saveToken, removeToken };
};