const URL = 'http://127.0.0.1:8000/ia/prompt'

export async function enviarPromptIA(prompt) {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ prompt }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      data.message ||
      data.detail ||
      data.error ||
      'Não foi possível obter resposta da IA.'

    throw new Error(typeof message === 'string' ? message : JSON.stringify(message))
  }

  return data
}
