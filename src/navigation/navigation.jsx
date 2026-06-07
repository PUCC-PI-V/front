import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import Home from '@/pages/Home/Home'
import Login from '@/pages/Admin/Login/Login'
import Erro404 from '@/pages/Error/Erro404'
import About from '@/pages/About'
import FormTattoo from '@/pages/FormTattoo/FormTattoo'

export const ROUTES = {
  HOME: '/',
  ADMIN_LOGIN: '/admin/login',
  ABOUT: '/About',
  FORM_TATTOO: '/formTattoo',
}

const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.ADMIN_LOGIN, element: <Login /> },
  { path: ROUTES.ABOUT, element: <About /> },
  { path: ROUTES.FORM_TATTOO, element: <FormTattoo /> },
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
    goToAbout: () => navigate(ROUTES.ABOUT),
    goToFormTattoo: () => navigate(ROUTES.FORM_TATTOO),
    goTo: (path) => navigate(path),
  }
}