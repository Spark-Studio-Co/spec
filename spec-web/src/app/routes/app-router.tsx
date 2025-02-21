import { useState, useEffect } from 'react';
import {
    createHashRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';

import '../styles/global.css';
import '../styles/fonts.css';

// layouts

// import { Layout } from '../layout/layout';
import { AuthLayout } from '../layout/auth-layout';

// Screens
import { RegistrationScreen } from '../../pages/registration-screen';
import { LoaderScreen } from '../../pages/loader-screen';

export const AppRouter = () => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initializeApp = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            setLoading(false);
        };

        initializeApp();
    }, []);

    const routes = createRoutesFromElements(
        <Route path='/' element={<AuthLayout />}>
            <Route index element={<RegistrationScreen />} />
            <Route path='registration' element={<RegistrationScreen />} />
        </Route>
    );


    const router = createHashRouter(routes);

    return loading ? <LoaderScreen /> : <RouterProvider router={router} />;
};