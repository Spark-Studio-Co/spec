import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import reactQueryClient from "./api/query-client";

// Screens
import { RegistrationScreen } from "../pages/registration-screen";
import { CodeConfirmationScreen } from "../pages/code-confirmation-screen";
import { ApplicationScreen } from "../pages/applications-screen";
import { ArchiveScreen } from "../pages/archive-screen";
import { ProfileScreen } from "../pages/profile-screen";

// Admin Screens
import { AdminLogin } from "../pages/admin-login-screen";
import { AdminApplicationScreen } from "../pages/admin-applications-screen";
import { AdminArchiveScreen } from "../pages/admin-archive-screen";
import { AdminCreateApplication } from "../pages/admin-create-application";
import { AdminProfileScreen } from "../pages/admin-profile-screen";

import { LoaderScreen } from "../pages/loader-screen";

// Layouts
import { MainLayout } from "./layout/main-layout";
import { AuthLayout } from "./layout/auth-layout";

// Auth Hook
import { useAuthData } from "../entities/auth-user/api/use-auth-data";

// Styles
import "./styles/global.css";
import "./styles/fonts.css";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const { token, role } = useAuthData();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = role === "admin";
  const isAuthPage = ["/", "/admin", "/code-confirmation"].includes(location.pathname);
  const isProtectedPage = !isAuthPage;

  useEffect(() => {
    if (!token && isProtectedPage) {
      navigate("/", { replace: true });
    }
  }, [token, navigate, isProtectedPage]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <QueryClientProvider client={reactQueryClient}>
      <Routes>
        {token ? (
          isAdmin ? (
            <>
              <Route path="/admin/profile" element={<MainLayout isAdmin={isAdmin}><AdminProfileScreen /></MainLayout>} />
              <Route path="/admin/create-application" element={<MainLayout isBottomPanel={false}><AdminCreateApplication /></MainLayout>} />
              <Route path="/admin/archive" element={<MainLayout isAdmin={isAdmin}><AdminArchiveScreen /></MainLayout>} />
              <Route path="/admin/application" element={<MainLayout isAdmin={isAdmin} isCreateApplication><AdminApplicationScreen /></MainLayout>} />
              <Route path="*" element={<Navigate to="/admin/application" replace />} />
            </>
          ) : (
            <>
              <Route path="/application" element={<MainLayout><ApplicationScreen /></MainLayout>} />
              <Route path="/archive" element={<MainLayout><ArchiveScreen /></MainLayout>} />
              <Route path="/profile" element={<MainLayout><ProfileScreen /></MainLayout>} />
              <Route path="*" element={<Navigate to="/application" replace />} />
            </>
          )
        ) : (
          <>
            <Route path="/admin" element={<AuthLayout><AdminLogin /></AuthLayout>} />
            <Route path="/" element={<AuthLayout><RegistrationScreen /></AuthLayout>} />
            <Route path="/code-confirmation" element={<AuthLayout><CodeConfirmationScreen /></AuthLayout>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </QueryClientProvider>
  );
};