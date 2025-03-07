import React from "react";
import { BottomPanel } from "../../features/bottom-navigation/ui/bottom-panel/bottom-panel"
import { Button } from "../../shared/ui/button/button";

import { useNavigate } from "react-router";

type MainLayoutProps = {
    children: React.ReactNode;
    isAdmin?: boolean
    isBottomPanel?: boolean
    isCreateApplication?: boolean
};

export const MainLayout = ({ children, isAdmin, isBottomPanel = true, isCreateApplication = false }: MainLayoutProps) => {

    const navigate = useNavigate()

    return (
        <>
            <div className={`${isBottomPanel ? 'bg-[#F5F5F5]' : 'bg-white'} min-h-[100vh] px-4`}>
                <main className="pt-10 pb-40 flex-1">{children}</main>
            </div >
            {isCreateApplication && <Button onClick={() => navigate('/admin/create-application')} className="bottom-26 fixed left-1/2 transform -translate-x-1/2" width="w-[90%]" variant="default" label="Создать заявку" />
            }
            {isBottomPanel && <BottomPanel isAdmin={isAdmin} />}
        </>
    )
}
