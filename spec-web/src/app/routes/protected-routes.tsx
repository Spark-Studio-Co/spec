import { Outlet, Navigate } from "react-router";
import { useAuthData } from "../../entities/auth-user/api/use-auth-data";
import { useEffect } from "react";

export const ProtectedRoutes = () => {
    const { token } = useAuthData();

    useEffect(() => {
        console.log("✅ ProtectedRoutes Mounted");
    }, []);

    console.log("ProtectedRoutes token:", token);

    if (token === null) {
        return <div>Загрузка...</div>;
    }

    return token ? <Outlet /> : <Navigate to="/" />;
};