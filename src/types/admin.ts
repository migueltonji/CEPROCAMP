export interface ImagemCarrosselItem {
  id: number
  url: string
  titulo?: string
}

export interface CursoItem {
  id?: string | number
  titulo: string
  desc: string
  imgUrl: string
  tipo: 'tecnico' | 'qp'
  detalhes: {
    duracao: string
    carga: string
    requisitos: string
    mercado: string
  }
}

export interface UnidadeItem {
  id?: string | number
  nome: string
  endereco: string
  contatos: string[]
  whatsapps: string[]
  email: string
}
