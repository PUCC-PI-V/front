const URL = 'http://localhost:8000/budget/list'

export async function getOrçamento(token) {
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      data.message ||
      data.detail ||
      data.error ||
      'Não foi possível carregar os orçamentos.'

    throw new Error(typeof message === 'string' ? message : JSON.stringify(message))
  }

  return Array.isArray(data) ? data : []
}

export async function getOrcamentoById(token, id) {
  const response = await fetch(`http://localhost:8000/budget/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      data.message ||
      data.detail ||
      data.error ||
      'Não foi possível carregar o orçamento.'

    throw new Error(typeof message === 'string' ? message : JSON.stringify(message))
  }

  return data
}
