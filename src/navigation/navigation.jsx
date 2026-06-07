import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import Home from '@/pages/Home/Home'
import Login from '@/pages/Admin/Login/Login'
import Erro404 from '@/pages/Error/Erro404'
import AdminPanel from '@/pages/Admin/Panel/AdminPanel'
import CalculatePage from '@/pages/Admin/Calculate/CalculatePage'

export const ROUTES = {
  HOME: '/',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_PANEL: '/admin/panel',
  ADMIN_CALCULATE: '/admin/calculate/:id',
}

const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.ADMIN_LOGIN, element: <Login /> },
  { path: ROUTES.ADMIN_PANEL, element: <AdminPanel /> },
  { path: ROUTES.ADMIN_CALCULATE, element: <CalculatePage /> },
  { path: '*', element: <Erro404 /> },
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
    goTo: (path) => navigate(path),
  }
}