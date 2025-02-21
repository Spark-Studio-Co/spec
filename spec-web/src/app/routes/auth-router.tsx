import { createHashRouter, createRoutesFromElements, Route } from "react-router-dom";
import { AuthLayout } from "../layout/auth-layout";
import { RegistrationScreen } from "../../pages/registration-screen";
import { CodeConfitmationScreen } from "../../pages/code-confirmation-screen";

export const AuthRouter = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={<AuthLayout />}>
            <Route index element={<RegistrationScreen />} />
            <Route path="code-confirmation" element={<CodeConfitmationScreen />} handle={{ isBack: true }} />
        </Route>
    ),
    {
        future: {
            v7_normalizeFormMethod: true
        }
    }
);