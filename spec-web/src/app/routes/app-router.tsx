import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthRouter } from "./auth-router";
import { MainRouter } from "./main-router";
import { LoaderScreen } from "../../pages/loader-screen";

import '../styles/global.css'
import '../styles/fonts.css'

export const AppRouter = () => {
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Only run initial loading animation once when app starts
        const initializeApp = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            const hasToken = !!localStorage.getItem("token");
            setIsAuthenticated(hasToken);
            setInitialLoading(false);
        };

        initializeApp();
    }, []); // Empty dependency array ensures this only runs once

    if (initialLoading) {
        return <LoaderScreen />;
    }

    return <RouterProvider router={isAuthenticated ? MainRouter : AuthRouter} />;
};