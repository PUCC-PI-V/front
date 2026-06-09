export const ORCAMENTO_STATUS = {
  RECEM_CHEGADO: 'recem_chegado',
  NOVO: 'novo',
  ANTIGO: 'antigo',
  VELHO: 'velho',
}

export function parseDataBR(dataStr) {
  const [dia, mes, ano] = dataStr.split('/').map(Number)
  return new Date(ano, mes - 1, dia)
}

export function diasDesdeData(dataStr, referencia = new Date()) {
  const hoje = new Date(referencia)
  hoje.setHours(0, 0, 0, 0)

  const dataOrcamento = parseDataBR(dataStr)
  dataOrcamento.setHours(0, 0, 0, 0)

  return Math.floor((hoje - dataOrcamento) / (1000 * 60 * 60 * 24))
}

export function classificarOrcamentoPorData(dataStr, referencia = new Date()) {
  const dias = diasDesdeData(dataStr, referencia)

  if (dias <= 0) return ORCAMENTO_STATUS.RECEM_CHEGADO
  if (dias <= 7) return ORCAMENTO_STATUS.NOVO
  if (dias <= 30) return ORCAMENTO_STATUS.ANTIGO
  return ORCAMENTO_STATUS.VELHO
}

export function enriquecerOrcamento(orcamento) {
  return {
    ...orcamento,
    status: classificarOrcamentoPorData(orcamento.data),
  }
}
