import { Outlet } from "react-router-dom"
import { BottomPanel } from "../../features/bottom-navigation/ui/bottom-panel/bottom-panel"


export const Layout = () => {
    return (
        <>
            <div className="px-4 bg-[#F5F5F5] h-[100%] pb-24">
                <main className="pt-20"><Outlet /></main>
            </div>
            <BottomPanel />
        </>
    )
}
