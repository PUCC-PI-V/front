const URL = 'http://localhost:8000/token/validate'

let inFlightValidation = null
let inFlightToken = null
let lastValidToken = null

export function clearTokenValidationCache() {
  inFlightValidation = null
  inFlightToken = null
  lastValidToken = null
}

export async function validateToken(token) {
  if (lastValidToken === token) {
    return true
  }

  if (inFlightValidation && inFlightToken === token) {
    return inFlightValidation
  }

  inFlightToken = token
  inFlightValidation = (async () => {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      const message =
        data.message ||
        data.detail ||
        data.error ||
        'Não foi possível validar o token.'

      throw new Error(typeof message === 'string' ? message : JSON.stringify(message))
    }

    lastValidToken = token
    return true
  })().finally(() => {
    inFlightValidation = null
    inFlightToken = null
  })

  return inFlightValidation
}
