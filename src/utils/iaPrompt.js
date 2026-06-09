export function montarContextoTatuagem(pedido) {
  const partes = []

  if (pedido.ideia) partes.push(pedido.ideia)

  if (pedido.estilo) partes.push(`estilo ${pedido.estilo}`)

  if (pedido.tamanho) partes.push(`tamanho ${pedido.tamanho}`)

  const local = [pedido.area, pedido.local].filter(Boolean).join(', ')
  if (local) partes.push(`área ${local}`)

  partes.push(pedido.sombreamento ? 'com sombreamento' : 'sem sombreamento')
  partes.push(pedido.colorido ? 'colorido' : 'sem colorido')

  if (pedido.dificuldade) partes.push(`dificuldade ${pedido.dificuldade}`)

  if (pedido.justificativaIA) partes.push(pedido.justificativaIA)

  return partes.join(', ')
}

export function extrairRespostaIA(data) {
  if (typeof data === 'string') return data
  if (data?.response) return data.response
  if (data?.resposta) return data.resposta
  if (data?.message) return data.message
  if (data?.answer) return data.answer
  if (data?.text) return data.text
  if (data?.content) return data.content
  return JSON.stringify(data, null, 2)
}
