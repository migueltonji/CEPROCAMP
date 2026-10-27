
export interface HomeInstitucionalContent {
  titulo: string
  paragrafo1: string
  paragrafo2: string
  imagem1: string
  imagem2: string
  botaoTexto: string
}

export interface HomeCursosIntroContent {
  titulo: string
  subtitulo: string
  botaoTexto: string
}

export interface HomePepiContent {
  tag: string
  titulo: string
  descricao: string
  card1Titulo: string
  card1Desc: string
  card2Titulo: string
  card2Desc: string
  chamadaEmpresas: string
  videoPoster: string
  videoUrl: string
  whatsappLink: string
  emailContato: string
}

export interface InfoMatrizContent {
  titulo: string
  descricao: string
}

export interface InfoInstitucionalContent {
  titulo: string
  introducao: string
  missao: string
  visao: string
  valores: string[]
  conclusao: string
}

export interface InfoSalaRecursosContent {
  titulo: string
  introducao: string
  objetivo: string
  trabalhoCooperativo: string
  servicos: string[]
}

export interface InfoSomosNosContent {
  titulo: string
  subtitulo: string
  descricao: string
  linkPortal: string
  responsaveis: string
  linkFormulario: string
  slogan: string
}

export interface InfoSaeContent {
  titulo: string
  subtitulo: string
  descricao: string
  publicoAlvo: string
  horario: string
  orientacaoAtendimento: string
  email: string
}

export interface SiteContentSchema {
  home: {
    institucional: HomeInstitucionalContent
    cursosIntro: HomeCursosIntroContent
    pepi: HomePepiContent
  }
  informacoes: {
    matriz: InfoMatrizContent
    institucional: InfoInstitucionalContent
    salaRecursos: InfoSalaRecursosContent
    somosNos: InfoSomosNosContent
    sae: InfoSaeContent
  }
}