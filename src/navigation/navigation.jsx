import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import Home from '@/pages/Home/Home'
import Login from '@/pages/Admin/Login/Login'
import Erro404 from '@/pages/Error/Erro404'

export const ROUTES = {
  HOME: '/',
  ADMIN_LOGIN: '/admin/login',
}

const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.ADMIN_LOGIN, element: <Login /> },
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
    goTo: (path) => navigate(path),
  }
}
