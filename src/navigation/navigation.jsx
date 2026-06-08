import { createBrowserRouter, Outlet, RouterProvider, useLocation, useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import { useAdminTokenGuard } from '@/hooks/useAdminTokenGuard'
import Home from '@/pages/Home/Home'
import Login from '@/pages/Admin/Login/Login'
import Erro404 from '@/pages/Error/Erro404'
import About from '@/pages/About/About'
import FormTattoo from '@/pages/FormTattoo/FormTattoo'
import AdminPanel from '@/pages/Admin/Panel/AdminPanel'
import CalculatePage from '@/pages/Admin/Panel/CalculatePage'
import { ROUTES } from '@/navigation/routes'

export { ROUTES } from '@/navigation/routes'

function SiteLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

function AdminLayout() {
  const location = useLocation()
  const isLoginPage = location.pathname === ROUTES.ADMIN_LOGIN
  const { isValidating, isAuthorized } = useAdminTokenGuard({ enabled: !isLoginPage })

  if (!isLoginPage && (isValidating || !isAuthorized)) {
    return null
  }

  return <Outlet />
}

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.ABOUT, element: <About /> },
      { path: ROUTES.FORM_TATTOO, element: <FormTattoo /> },
      { path: '*', element: <Erro404 /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: ROUTES.ADMIN_LOGIN, element: <Login /> },
      { path: ROUTES.ADMIN_PANEL, element: <AdminPanel /> },
      { path: ROUTES.ADMIN_CALCULATE, element: <CalculatePage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}

export function useAppNavigation() {
  const navigate = useNavigate()

  return {
    goHome: () => navigate(ROUTES.HOME),
    goToAdminLogin: () => navigate(ROUTES.ADMIN_LOGIN),
    goToAdminPanel: () => navigate(ROUTES.ADMIN_PANEL),
    goToCalculate: (id) => navigate(`/admin/calculate/${id}`),
    goToAbout: () => navigate(ROUTES.ABOUT),
    goToFormTattoo: () => navigate(ROUTES.FORM_TATTOO),
    goTo: (path) => navigate(path),
  }
}