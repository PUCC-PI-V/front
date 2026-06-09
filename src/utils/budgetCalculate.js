export const DIFICULDADES = {
  facil: { label: 'Fácil', mult: 1, cor: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  medio: { label: 'Médio', mult: 1.15, cor: 'bg-amber-100 text-amber-800 border-amber-200' },
  dificil: { label: 'Difícil', mult: 1.3, cor: 'bg-orange-100 text-orange-800 border-orange-200' },
  muito_dificil: { label: 'Muito difícil', mult: 1.5, cor: 'bg-red-100 text-red-800 border-red-200' },
}

export function normalizarDificuldade(dificuldade) {
  const valor = dificuldade?.toLowerCase() ?? ''

  if (valor.includes('muito')) return 'muito_dificil'
  if (valor.includes('alta') || valor.includes('dif')) return 'dificil'
  if (valor.includes('med')) return 'medio'
  return 'facil'
}

export function estimarAreaCm2(tamanho) {
  const valor = tamanho?.toLowerCase() ?? ''

  if (valor.includes('pequen')) return 48
  if (valor.includes('grand')) return 200
  if (valor.includes('fech')) return 400
  return 96
}

export function estimarTempoHoras(tamanho, sombreamento, colorido) {
  const valor = tamanho?.toLowerCase() ?? ''
  let horas = 4

  if (valor.includes('pequen')) horas = 2
  else if (valor.includes('grand')) horas = 6
  else if (valor.includes('fech')) horas = 10

  if (sombreamento) horas += 1
  if (colorido) horas += 1.5

  return horas
}

export function materiaisSugeridos(colorido) {
  return colorido ? '60' : '45'
}

export function formatarDataISO(dataISO) {
  if (!dataISO) return '—'
  const [ano, mes, dia] = dataISO.split('-')
  if (!ano || !mes || !dia) return dataISO
  return `${dia}/${mes}/${ano}`
}

export function calcularOrcamento({
  precoTintaCm2,
  areaCm2,
  materiais,
  valorHora,
  tempoHoras,
  taxaFixa,
  dificuldadeKey,
  sombreamento,
  colorido,
}) {
  const dificuldade = DIFICULDADES[dificuldadeKey] ?? DIFICULDADES.medio

  const tinta = Number(precoTintaCm2) || 0
  const area = Number(areaCm2) || 0
  const mats = Number(materiais) || 0
  const hora = Number(valorHora) || 0
  const tempo = Number(tempoHoras) || 0
  const taxa = Number(taxaFixa) || 0

  const custoTinta = tinta * area
  const custoMaoObra = hora * tempo
  let subtotal = custoTinta + mats + custoMaoObra + taxa

  const ajusteSombra = sombreamento ? subtotal * 0.1 : 0
  const ajusteCor = colorido ? subtotal * 0.15 : 0
  subtotal += ajusteSombra + ajusteCor

  const total = subtotal * dificuldade.mult

  return {
    custoTinta,
    custoMaoObra,
    mats,
    taxa,
    ajusteSombra,
    ajusteCor,
    subtotal,
    total,
    mult: dificuldade.mult,
    dificuldade,
  }
}
