import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "../layout/layout";
// import { HomeScreen } from "../../pages/home-screen"; // Example
// import { ProfileScreen } from "../../pages/profile-screen"; // Example

export const MainRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            {/* <Route index element={<HomeScreen />} /> */}
            {/* <Route path="profile" element={<ProfileScreen />} /> */}
        </Route>
    )
);