import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

import '../styles/fonts.css'
import '../styles/global.css'

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};