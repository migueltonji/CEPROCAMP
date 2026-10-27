// src/views/Noticias.tsx
import { useState, useEffect } from 'react'
import type { NoticiaPost } from '../types/noticias'
import { NOTICIAS_PADRAO } from '../data/noticiasData'

const STORAGE_NOTICIAS = 'ceprocamp_posts_noticias'

export default function Noticias() {
  const [noticiaAberta, setNoticiaAberta] = useState<NoticiaPost | null>(null)
  const [posts] = useState<NoticiaPost[]>(() => {
    const salvos = localStorage.getItem(STORAGE_NOTICIAS)
    if (salvos) {
      try {
        return JSON.parse(salvos)
      } catch {
        return NOTICIAS_PADRAO
      }
    }
    return NOTICIAS_PADRAO
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_NOTICIAS, JSON.stringify(posts))
  }, [posts])

  // Filtra as notícias marcadas como destaque (ou as 3 primeiras caso nada esteja marcado)
  const destaques = posts.filter((p) => p.destaque)
  const listaCarrossel = destaques.length > 0 ? destaques : posts.slice(0, 3)

  const [slideAtual, setSlideAtual] = useState(0)

  // Ajusta o índice se a quantidade de destaques mudar
  useEffect(() => {
    if (slideAtual >= listaCarrossel.length) {
      setSlideAtual(0)
    }
  }, [listaCarrossel.length, slideAtual])

  // Controles de swipe mobile
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const proximoSlide = () => {
    if (listaCarrossel.length === 0) return
    setSlideAtual((prev) => (prev === listaCarrossel.length - 1 ? 0 : prev + 1))
  }

  const slideAnterior = () => {
    if (listaCarrossel.length === 0) return
    setSlideAtual((prev) => (prev === 0 ? listaCarrossel.length - 1 : prev - 1))
  }

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distancia = touchStart - touchEnd
    if (Math.abs(distancia) > 50) {
      if (distancia > 0) proximoSlide()
      else slideAnterior()
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  const postDestaque = listaCarrossel[slideAtual]

  return (
    <main
      id="conteudo-principal"
      className="flex-grow max-w-5xl w-full mx-auto px-4 py-12 md:py-16 text-slate-800"
    >
      {/* CABEÇALHO */}
      <section className="space-y-4 mb-10" aria-label="Introdução das Notícias">
        <div className="flex gap-1" aria-hidden="true">
          <span className="w-3 h-1 bg-amber-500 rounded-full" />
          <span className="w-3 h-1 bg-amber-500 rounded-full" />
        </div>
        <h1 className="text-3xl md:text-4xl font-titulo tracking-tight text-slate-900 uppercase">
          Mural de <span className="text-blue-600">Notícias</span>
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-normal">
          Acompanhe os comunicados oficiais, eventos em destaque e processos
          seletivos do CEPROCAMP.
        </p>
      </section>

      {/* 1. CARROSSEL DE DESTAQUES */}
      {listaCarrossel.length > 0 && postDestaque && (
        <section
          className="mb-16 relative bg-slate-900 rounded-2xl overflow-hidden shadow-md select-none touch-pan-y"
          aria-roledescription="carrossel"
          aria-label="Notícias em Destaque"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative min-h-[380px] md:min-h-[420px] flex flex-col justify-end p-6 md:p-10">
            {postDestaque.imagemUrl ? (
              <img
                src={postDestaque.imagemUrl}
                alt={postDestaque.titulo}
                className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-blue-950 to-slate-900 opacity-90" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-[11px] font-bold uppercase tracking-wider">
                  Destaque • {postDestaque.categoria || 'Geral'}
                </span>
                <time className="text-xs text-slate-300 font-medium">
                  {postDestaque.dataPublicacao}
                </time>
              </div>

              <h2 className="text-2xl md:text-3xl font-titulo text-white uppercase tracking-tight leading-snug">
                {postDestaque.titulo}
              </h2>

              <p className="text-sm md:text-base text-slate-200 line-clamp-2 md:line-clamp-3 leading-relaxed">
                {postDestaque.conteudo}
              </p>

              {postDestaque.linkExterno?.url && (
                <div className="pt-2">
                  <a
                    href={postDestaque.linkExterno.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    {postDestaque.linkExterno.texto || 'Saber mais'}
                  </a>
                </div>
              )}
            </div>

            {/* Setas de navegação */}
            {listaCarrossel.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={slideAnterior}
                  aria-label="Destaque anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 md:p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-all border border-white/10 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={proximoSlide}
                  aria-label="Próximo destaque"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 md:p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-all border border-white/10 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div className="absolute bottom-3 right-6 flex gap-1.5 z-20">
                  {listaCarrossel.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSlideAtual(index)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        index === slideAtual
                          ? 'w-6 bg-amber-500'
                          : 'w-2 bg-white/50 hover:bg-white'
                      }`}
                      aria-label={`Ir para o slide ${index + 1}`}
                      aria-current={index === slideAtual}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* 2. TODAS AS PUBLICAÇÕES */}
      <section aria-label="Todas as publicações">
        <div className="border-b border-slate-200 pb-3 mb-8 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            Todas as Publicações
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            {posts.length} publicação(ões)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              {post.imagemUrl && (
                <div className="h-44 w-full bg-slate-100 overflow-hidden shrink-0 border-b border-slate-100">
                  <img
                    src={post.imagemUrl}
                    alt={post.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-5 flex-grow space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold uppercase">
                        {post.categoria || 'Geral'}
                      </span>
                    </div>
                    <time className="text-slate-400 font-medium text-[11px]">
                      {post.dataPublicacao}
                    </time>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {post.titulo}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-2">
                    {post.conteudo}
                  </p>
                </div>

                {post.linkExterno?.url && (
                  <div className="pt-3 border-t border-slate-100">
                    <a
                      href={post.linkExterno.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1.5"
                    >
                      🔗 {post.linkExterno.texto || 'Ver detalhes'}
                    </a>
                  </div>
                )}
                {/* Botão de abrir modal dentro do card */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setNoticiaAberta(post)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    Ler publicação completa →
                  </button>

                  {post.linkExterno?.url && (
                    <a
                      href={post.linkExterno.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-blue-700"
                    >
                      🔗 {post.linkExterno.texto || 'Link'}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        {/* MODAL / POP-UP DE LEITURA COMPLETA */}
        {noticiaAberta && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setNoticiaAberta(null)}
          >
            <div
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Topo com Categoria e Botão Fechar */}
              <div className="p-5 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-md z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide">
                    {noticiaAberta.categoria || 'Geral'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {noticiaAberta.dataPublicacao}
                  </span>
                </div>
                <button
                  onClick={() => setNoticiaAberta(null)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-sm font-bold"
                  aria-label="Fechar modal"
                >
                  ✕
                </button>
              </div>

              {/* Corpo da Matéria */}
              <div className="p-6 md:p-8 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                  {noticiaAberta.titulo}
                </h2>

                {noticiaAberta.imagemUrl && (
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950/5 max-h-[380px]">
                    <img
                      src={noticiaAberta.imagemUrl}
                      alt={noticiaAberta.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="text-base text-slate-700 leading-relaxed font-normal whitespace-pre-line space-y-4">
                  {noticiaAberta.conteudo}
                </div>

                {noticiaAberta.linkExterno?.url && (
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-blue-900 uppercase">
                        Documento / Link Oficial
                      </p>
                      <p className="text-xs text-blue-700 font-mono truncate">
                        {noticiaAberta.linkExterno.url}
                      </p>
                    </div>
                    <a
                      href={noticiaAberta.linkExterno.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shrink-0"
                    >
                      {noticiaAberta.linkExterno.texto || 'Acessar Link'} ↗
                    </a>
                  </div>
                )}
              </div>

              {/* Rodapé do Modal */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end sticky bottom-0">
                <button
                  onClick={() => setNoticiaAberta(null)}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
