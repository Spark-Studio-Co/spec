import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { AuthLayout } from '../layout/auth-layout'
import { Layout } from '../layout/layout'
import { RegistrationScreen } from '../../pages/registration-screen'
import { CodeConfirmationScreen } from '../../pages/code-confirmation-screen'
import { AdminLogin } from '../../pages/admin-login-screen'
import { ApplicationScreen } from '../../pages/applications-screen'
import { ArchiveScreen } from '../../pages/archive-screen'
import { ProfileScreen } from '../../pages/profile-screen'
import { AdminApplicationScreen } from '../../pages/admin-applications-screen'
import { AdminArchiveScreen } from '../../pages/admin-archive-screen'
import { AdminProfileScreen } from '../../pages/admin-profile-screen'
import { AdminLayout } from '../layout/admin-layout'
import { LoaderScreen } from '../../pages/loader-screen'
import { useState, useEffect } from 'react'
import { useAuthData } from '../../entities/auth-user/api/use-auth-data'

const rootRoute = createRootRoute({
  component: () => {
    const { token, loadToken } = useAuthData()
    const [initialLoading, setInitialLoading] = useState<boolean>(true)

    useEffect(() => {
      const init = async () => {
        await loadToken()
        setInitialLoading(false)
      }
      init()
    }, [loadToken])

    useEffect(() => {
      if (!initialLoading) {
        window.location.reload
      }
    }, [token, initialLoading])

    if (initialLoading) {
      return <LoaderScreen />
    }

    return token ? <Layout /> : <AuthLayout />
  }
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: RegistrationScreen
})

const codeConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/code-confirmation',
  component: CodeConfirmationScreen
})

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-login',
  component: AdminLogin
})

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLayout
})

const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  component: Layout
})

const applicationsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/',
  component: ApplicationScreen
})

const archiveRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/archive',
  component: ArchiveScreen
})

const profileRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/profile',
  component: ProfileScreen
})

const adminApplicationsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/applications',
  component: AdminApplicationScreen
})

const adminArchiveRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/archive',
  component: AdminArchiveScreen
})

const adminProfileRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/profile',
  component: AdminProfileScreen
})

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    indexRoute,
    codeConfirmationRoute,
    adminLoginRoute,
    mainLayoutRoute.addChildren([
      applicationsRoute,
      archiveRoute,
      profileRoute
    ]),
    adminLayoutRoute.addChildren([
      adminApplicationsRoute,
      adminArchiveRoute,
      adminProfileRoute
    ])
  ]),
  defaultPreload: 'intent',
  defaultErrorComponent: ({ error }) => (
    <div className="p-4 text-red-500">
      <h1>Error: {error.message}</h1>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  )
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
