export const DIFICULDADES = {
  facil: { label: 'Fácil', mult: 1, cor: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  medio: { label: 'Médio', mult: 1.15, cor: 'bg-amber-100 text-amber-800 border-amber-200' },
  dificil: { label: 'Difícil', mult: 1.3, cor: 'bg-orange-100 text-orange-800 border-orange-200' },
  muito_dificil: { label: 'Muito difícil', mult: 1.5, cor: 'bg-red-100 text-red-800 border-red-200' },
}

export const DIFICULDADE_SUBMIT = {
  facil: 'Fácil',
  medio: 'Média',
  dificil: 'Alta',
  muito_dificil: 'Muito Alta',
}

function textoSemAcentos(texto) {
  return (texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function normalizarDificuldade(dificuldade) {
  const valor = textoSemAcentos(dificuldade)

  if (valor.includes('muito')) return 'muito_dificil'
  if (valor.includes('alta') || valor.includes('dificil')) return 'dificil'
  if (valor.includes('med')) return 'medio'
  if (valor.includes('facil')) return 'facil'
  return 'medio'
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

export function valoresPadraoCalculo(tattoInfo) {
  return {
    precoTintaCm2: '20',
    areaCm2: String(estimarAreaCm2(tattoInfo.tamanho)),
    materiais: materiaisSugeridos(tattoInfo.colorido),
    taxaFixa: '30',
    valorHora: '120',
    tempoHoras: String(estimarTempoHoras(tattoInfo.tamanho, tattoInfo.sombreamento, tattoInfo.colorido)),
    dificuldadeKey: normalizarDificuldade(tattoInfo.dificuldade),
  }
}

export function valoresDeCalculateInfo(calculateInfo) {
  return {
    precoTintaCm2: String(calculateInfo.tinta ?? ''),
    areaCm2: String(calculateInfo.area ?? ''),
    materiais: String(calculateInfo.materiais ?? ''),
    taxaFixa: String(calculateInfo.taxa_fixa ?? ''),
    valorHora: String(calculateInfo.valor_hora ?? ''),
    tempoHoras: String(calculateInfo.tempo_estimado ?? ''),
    dificuldadeKey: normalizarDificuldade(calculateInfo.dificuldade),
  }
}

export function formatarCentavosBRL(centavos) {
  if (centavos == null || centavos === '') return null
  const reais = Number(centavos) / 100
  if (Number.isNaN(reais)) return null
  return reais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatarDataISO(dataISO) {
  if (!dataISO) return '—'
  const [ano, mes, dia] = dataISO.split('-')
  if (!ano || !mes || !dia) return dataISO
  return `${dia}/${mes}/${ano}`
}

export function obterAdminId() {
  try {
    const user = JSON.parse(localStorage.getItem('adminUser') || '{}')
    return user.id ?? user.usuario_id ?? null
  } catch {
    return null
  }
}

export function montarPayloadOrcamento({ pedido, calculateInfo, form, totalReais }) {
  const adminId = calculateInfo?.admin ?? obterAdminId()
  const usuarioId = calculateInfo?.usuario ?? pedido.usuario_id

  return {
    tatuagem: pedido.id,
    usuario: usuarioId,
    admin: adminId,
    email: pedido.email ?? '',
    nome: pedido.nome || pedido.cliente || '',
    tinta: Number(form.precoTintaCm2) || 0,
    materiais: Number(form.materiais) || 0,
    area: Number(form.areaCm2) || 0,
    taxa_fixa: Number(form.taxaFixa) || 0,
    valor_hora: Number(form.valorHora) || 0,
    tempo_estimado: Number(form.tempoHoras) || 0,
    dificuldade: DIFICULDADE_SUBMIT[form.dificuldadeKey] ?? 'Média',
    valor_orcamento: Math.round(totalReais * 100),
  }
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
