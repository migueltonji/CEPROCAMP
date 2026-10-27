// src/types/noticias.ts

// 1. Lista com todas as categorias que você quiser (adicione ou remova aqui):
export const CATEGORIAS_NOTICIAS = [
    'Geral',
    'Avisos',
     'Eventos',
     'Editais',
     'Secretaria',
    'Núcleo',
     'Comunicação',
     'Pepi'
] as const

// 2. O TypeScript gera o tipo automaticamente a partir da lista acima
export type CategoriaNoticia = typeof CATEGORIAS_NOTICIAS[number]

// 3. Sua interface usa esse tipo sincronizado
export interface NoticiaPost {
  id: string
  titulo: string
  conteudo: string
  categoria?: CategoriaNoticia
  destaque?: boolean
  imagemUrl?: string
  linkExterno?: {
    texto: string
    url: string
  }
  dataPublicacao: string
  criadoEm: number
}