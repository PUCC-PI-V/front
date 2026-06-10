const URL = 'http://localhost:8000/orcamento/submit'

export async function submitOrcamento(token, payload) {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      data.message ||
      data.detail ||
      data.error ||
      'Não foi possível confirmar o orçamento.'

    throw new Error(typeof message === 'string' ? message : JSON.stringify(message))
  }

  return data
}
