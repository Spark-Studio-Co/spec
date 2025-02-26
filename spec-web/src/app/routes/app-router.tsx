import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthRouter } from "./auth/auth-router";
import { MainRouter } from "./main/main-router";
import { LoaderScreen } from "../../pages/loader-screen";
import { useAuthStore } from "../model/use-auth-store";

import '../styles/fonts.css'
import '../styles/global.css'

export const AppRouter = () => {
    const { setAuth } = useAuthStore();
    const isAuth = useAuthStore((state) => state.isAuth);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setInitialLoading(false);
        }, 3000);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            console.log("🔓 Found stored token:", token);
            setAuth(true);
        }
    }, []);

    if (initialLoading) {
        return <LoaderScreen />;
    }

    return (
        <RouterProvider
            key={isAuth ? "auth" : "guest"}  // ✅ Forces re-render when isAuth changes
            router={isAuth ? MainRouter : AuthRouter}
        />
    );
};