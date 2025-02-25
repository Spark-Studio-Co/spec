import { createBrowserRouter, createRoutesFromElements, Route, } from "react-router-dom";
import { AuthLayout } from "../../layout/auth-layout";
import { RegistrationScreen } from "../../../pages/registration-screen";
import { AdminLogin } from "../../../pages/admin-login-screen";
import { CodeConfirmationScreen } from "../../../pages/code-confirmation-screen";



export const AuthRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AuthLayout />}>
            <Route index element={<RegistrationScreen />} />
            <Route path="code-confirmation" element={<CodeConfirmationScreen />} handle={{ isBack: true }} />
            <Route path="admin" element={<AdminLogin />} />
        </Route>
    )
);