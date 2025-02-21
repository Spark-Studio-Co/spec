import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        <div className="flex flex-col h-screen px-4 py-20">
            <main className="flex-grow"><Outlet /></main>
        </div>
    );
};