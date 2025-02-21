import { Outlet } from "react-router-dom"


export const Layout = () => {
    return (
        <div className="px-4">
            <main><Outlet /></main>
        </div>
    )
}
