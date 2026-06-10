const URL = 'http://localhost:8000/budget/submit'

export async function submitBudget(payload) {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      data.message ||
      data.detail ||
      data.error ||
      'Não foi possível enviar o orçamento.'

    throw new Error(typeof message === 'string' ? message : JSON.stringify(message))
  }

  return data
}
