import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import reactQueryClient from "./api/query-client";

import { RegistrationScreen } from "../pages/registration-screen";
import { CodeConfirmationScreen } from "../pages/code-confirmation-screen";
import { ApplicationScreen } from "../pages/applications-screen";
import { ArchiveScreen } from "../pages/archive-screen";
import { ProfileScreen } from "../pages/profile-screen";

import { LoaderScreen } from "../pages/loader-screen";

// Layouts
import { MainLayout } from "./layout/main-layout";
import { AuthLayout } from "./layout/auth-layout";

// Auth Hook
import { useAuthData } from "../entities/auth-user/api/use-auth-data";

// Styles
import "./styles/global.css";
import "./styles/fonts.css";


function App() {
  const [loading, setLoading] = useState(true);
  const { token, loadToken } = useAuthData();

  useEffect(() => {
    loadToken()
  }, [])

  useEffect(() => {
    if (token) {
      reactQueryClient.refetchQueries()
    } else {
      reactQueryClient.resetQueries()
      reactQueryClient.clear()
    }
  }, [token])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <QueryClientProvider client={reactQueryClient}>
      <BrowserRouter>
        <Routes>
          {token ? (
            <>
              <Route path="/application" element={<MainLayout><ApplicationScreen /></MainLayout>} />
              <Route path="/archive" element={<MainLayout><ArchiveScreen /></MainLayout>} />
              <Route path="/profile" element={<MainLayout><ProfileScreen /></MainLayout>} />
              <Route path="*" element={<Navigate to="/application" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<AuthLayout><RegistrationScreen /></AuthLayout>} />
              <Route path="/code-confirmation" element={<AuthLayout><CodeConfirmationScreen /></AuthLayout>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;