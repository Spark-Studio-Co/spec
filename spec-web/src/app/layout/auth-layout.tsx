import React from "react";

type AuthLayoutProps = {
    children: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="flex flex-col relative max-w-[90%] m-auto">
            <div className="flex flex-col h-screen w-full pt-24 pb-14 overflow-y-hidden">
                <main className="flex-grow">{children}</main>
            </div>
        </div>
    );
};