import { createHashRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "../../layout/layout";

// screens
import { ApplicationScreen } from "../../../pages/applications-screen";
import { ArchiveScreen } from "../../../pages/archive-screen";
import { ProfileScreen } from "../../../pages/profile-screen";
import { AdminApplicationScreen } from "../../../pages/admin-applications-screen";

export const MainRouter = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<ApplicationScreen />} />
            <Route path="archive" element={<ArchiveScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="admin-applications" element={<AdminApplicationScreen />} />
        </Route>
    )
);