// src/context/ContentContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { SiteContentSchema } from '../types/content'
import { DEFAULT_SITE_CONTENT } from '../data/defaultContent'

const STORAGE_KEY = 'ceprocamp_site_content'

interface ContentContextType {
  conteudo: SiteContentSchema
  atualizarSecao: <
    P extends keyof SiteContentSchema,
    S extends keyof SiteContentSchema[P]
  >(
    pagina: P,
    secao: S,
    novosDados: Partial<SiteContentSchema[P][S]>
  ) => void
  resetarParaPadrao: () => void
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conteudo, setConteudo] = useState<SiteContentSchema>(() => {
    const salvo = localStorage.getItem(STORAGE_KEY)
    if (salvo) {
      try {
        return JSON.parse(salvo)
      } catch {
        return DEFAULT_SITE_CONTENT
      }
    }
    return DEFAULT_SITE_CONTENT
  })

  // Sincroniza as alterações no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conteudo))
  }, [conteudo])

  // Função genérica e tipada para atualizar qualquer seção
  const atualizarSecao: ContentContextType['atualizarSecao'] = (
    pagina,
    secao,
    novosDados
  ) => {
    setConteudo((prev) => {
      const secaoAtual = prev[pagina][secao]
      return {
        ...prev,
        [pagina]: {
          ...prev[pagina],
          [secao]: {
            ...secaoAtual,
            ...novosDados,
          },
        },
      }
    })
  }

  // Restaura os textos e mídias originais caso o admin precise
  const resetarParaPadrao = () => {
    setConteudo(DEFAULT_SITE_CONTENT)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <ContentContext.Provider value={{ conteudo, atualizarSecao, resetarParaPadrao }}>
      {children}
    </ContentContext.Provider>
  )
}

// Hook personalizado para fácil consumo nos componentes
export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent deve ser utilizado dentro de um ContentProvider')
  }
  return context
}