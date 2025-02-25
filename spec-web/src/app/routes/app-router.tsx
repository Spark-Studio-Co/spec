import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthRouter } from "./auth/auth-router";
import { MainRouter } from "./main/main-router";
import { LoaderScreen } from "../../pages/loader-screen";
import { useAuthStore } from "../model/use-auth-store";

import '../styles/global.css';
import '../styles/fonts.css';

export const AppRouter = () => {
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const { isAuth, setAuth } = useAuthStore();

    useEffect(() => {
        const initializeApp = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            setAuth(false);
            setInitialLoading(false);
        };

        initializeApp();
    }, []);

    if (initialLoading) {
        return <LoaderScreen />;
    }

    return <RouterProvider router={isAuth ? MainRouter : AuthRouter} />;
};