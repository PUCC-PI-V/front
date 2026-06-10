function semAcentos(texto) {
  return (texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function montarPayloadBudget({ nome, telefone, email, tamanho, sombreamento, colorido, estilo, areaTatuada, regiaoEspecifica, descricao }) {
  return {
    usuario: {
      nome: nome.trim(),
      telefone: telefone.trim(),
      email: email.trim(),
    },
    tatuagem: {
      cliente: nome.trim(),
      tamanho: semAcentos(tamanho),
      sombreamento: Boolean(sombreamento),
      colorido: Boolean(colorido),
      estilo: estilo.trim(),
      area_tatuada: semAcentos(areaTatuada),
      regiao_especifica: semAcentos(regiaoEspecifica),
      descricao: descricao.trim(),
    },
  }
}
