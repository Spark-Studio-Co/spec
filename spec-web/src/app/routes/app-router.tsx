import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthRouter } from "./auth-router";
import { MainRouter } from "./main-router";
import { LoaderScreen } from "../../pages/loader-screen";
import { useAuthStore } from "../model/use-auth-store";

import '../styles/global.css'
import '../styles/fonts.css'

export const AppRouter = () => {
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const { isAuth, setAuth } = useAuthStore()

    useEffect(() => {
        // Only run initial loading animation once when app starts
        const initializeApp = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            // const hasToken = !!localStorage.getItem("token");
            setAuth(true);
            setInitialLoading(false);
        };

        initializeApp();
    }, []); // Empty dependency array ensures this only runs once

    if (initialLoading) {
        return <LoaderScreen />;
    }

    return <RouterProvider router={isAuth ? MainRouter : AuthRouter} />;
};