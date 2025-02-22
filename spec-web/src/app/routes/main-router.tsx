import { createHashRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "../layout/layout";

// screens
import { ApplicationScreen } from "../../pages/applications-screen";

export const MainRouter = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<ApplicationScreen />} />
        </Route>
    )
);