import { Outlet } from "react-router-dom"
import { BottomPanel } from "../../features/bottom-navigation/ui/bottom-panel/bottom-panel"


export const Layout = () => {
    return (
        <>
            <div className="h-screen bg-[#F5F5F5] px-4">
                <main className="pt-20 flex-1"><Outlet /></main>
            </div>
            <BottomPanel />
        </>
    )
}
