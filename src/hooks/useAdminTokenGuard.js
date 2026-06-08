import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/navigation/routes'
import { clearTokenValidationCache, validateToken } from '@/scripts/Request/Admin/Token'

function clearAdminSession() {
  localStorage.removeItem('adminToken')
  localStorage.removeItem('adminUser')
  clearTokenValidationCache()
}

export function useAdminTokenGuard({ enabled = true } = {}) {
  const navigate = useNavigate()
  const [isValidating, setIsValidating] = useState(enabled)
  const [isAuthorized, setIsAuthorized] = useState(!enabled)
  const hasHandledFailure = useRef(false)

  useEffect(() => {
    if (!enabled) {
      setIsValidating(false)
      setIsAuthorized(true)
      return
    }

    hasHandledFailure.current = false
    let cancelled = false

    async function checkToken() {
      const token = localStorage.getItem('adminToken')

      if (!token) {
        if (!cancelled && !hasHandledFailure.current) {
          hasHandledFailure.current = true
          alert('O token está inválido.')
          clearAdminSession()
          navigate(ROUTES.ADMIN_LOGIN, { replace: true })
          setIsValidating(false)
        }
        return
      }

      try {
        await validateToken(token)
        if (!cancelled) {
          setIsAuthorized(true)
          setIsValidating(false)
        }
      } catch {
        if (!cancelled && !hasHandledFailure.current) {
          hasHandledFailure.current = true
          alert('O token está inválido.')
          clearAdminSession()
          navigate(ROUTES.ADMIN_LOGIN, { replace: true })
          setIsValidating(false)
        }
      }
    }

    setIsValidating(true)
    setIsAuthorized(false)
    checkToken()

    return () => {
      cancelled = true
    }
  }, [enabled, navigate])

  return { isValidating, isAuthorized }
}
