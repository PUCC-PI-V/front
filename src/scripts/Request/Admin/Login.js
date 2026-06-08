const LOGIN_URL = 'http://localhost:8000/admin/login'

export async function loginAdmin({ email, password }) {
  const response = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      data.message ||
      data.detail ||
      data.error ||
      'Não foi possível entrar. Verifique email e senha.'

    throw new Error(typeof message === 'string' ? message : JSON.stringify(message))
  }

  return data
}
