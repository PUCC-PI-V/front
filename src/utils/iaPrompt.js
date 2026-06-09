export function montarPromptIA(pedido, pergunta) {
  const sombreamento = pedido.sombreamento ? 'sim' : 'não'
  const colorido = pedido.colorido ? 'sim' : 'não'

  return [
    'Contexto da tatuagem:',
    `Cliente: ${pedido.nome || pedido.cliente || '—'}`,
    `Descrição: ${pedido.ideia || '—'}`,
    `Área do corpo: ${pedido.area || '—'}`,
    `Local: ${pedido.local || '—'}`,
    `Estilo: ${pedido.estilo || '—'}`,
    `Tamanho: ${pedido.tamanho || '—'}`,
    `Sombreamento: ${sombreamento}`,
    `Colorido: ${colorido}`,
    `Dificuldade estimada: ${pedido.dificuldade || '—'}`,
    `Análise da IA: ${pedido.justificativaIA || '—'}`,
    '',
    `Pergunta: ${pergunta.trim()}`,
  ].join('\n')
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
