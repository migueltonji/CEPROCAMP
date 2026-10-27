// src/components/admin/GerenciarNoticias.tsx
import React, { useState, useEffect } from 'react'
import type { NoticiaPost, CategoriaNoticia } from '../../types/noticias'
import { NOTICIAS_PADRAO } from '../../data/noticiasData'
import { CATEGORIAS_NOTICIAS } from '../../types/noticias'
const STORAGE_NOTICIAS = 'ceprocamp_posts_noticias'

const FORM_INICIAL: Omit<NoticiaPost, 'id' | 'criadoEm'> = {
  titulo: '',
  conteudo: '',
  categoria: 'Geral',
  destaque: false,
  imagemUrl: '',
  linkExterno: {
    texto: '',
    url: '',
  },
  dataPublicacao: new Date().toLocaleDateString('pt-BR'),
}

export default function GerenciarNoticias() {
  const [posts, setPosts] = useState<NoticiaPost[]>(() => {
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

  const [formData, setFormData] = useState(FORM_INICIAL)
  const [postEmEdicaoId, setPostEmEdicaoId] = useState<string | null>(null)
  const [notificacao, setNotificacao] = useState('')
  const [slideAtualPreview, setSlideAtualPreview] = useState(0)

  // Apenas as notícias com destaque ativado
  const destaques = posts.filter((p) => p.destaque)

  useEffect(() => {
    localStorage.setItem(STORAGE_NOTICIAS, JSON.stringify(posts))
  }, [posts])

  useEffect(() => {
    if (slideAtualPreview >= destaques.length && destaques.length > 0) {
      setSlideAtualPreview(0)
    }
  }, [destaques.length, slideAtualPreview])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagemUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Alterna o destaque com 1 clique direto na lista
  const alternarDestaque = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, destaque: !post.destaque } : post,
      ),
    )
    setNotificacao('Status do carrossel atualizado!')
    setTimeout(() => setNotificacao(''), 2500)
  }

  const iniciarEdicao = (post: NoticiaPost) => {
    setPostEmEdicaoId(post.id)
    setFormData({
      titulo: post.titulo,
      conteudo: post.conteudo,
      categoria: post.categoria || 'Geral',
      destaque: !!post.destaque,
      imagemUrl: post.imagemUrl || '',
      linkExterno: {
        texto: post.linkExterno?.texto || '',
        url: post.linkExterno?.url || '',
      },
      dataPublicacao: post.dataPublicacao,
    })
    window.scrollTo({ top: 320, behavior: 'smooth' })
  }

  const cancelarEdicao = () => {
    setPostEmEdicaoId(null)
    setFormData(FORM_INICIAL)
  }

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.titulo.trim() || !formData.conteudo.trim()) {
      alert('Preencha ao menos o título e o conteúdo.')
      return
    }

    if (postEmEdicaoId) {
      setPosts((prev) =>
        prev.map((item) =>
          item.id === postEmEdicaoId ? { ...item, ...formData } : item,
        ),
      )
      setNotificacao('Publicação atualizada!')
    } else {
      const novoPost: NoticiaPost = {
        id: `post-${Date.now()}`,
        criadoEm: Date.now(),
        ...formData,
      }
      setPosts((prev) => [novoPost, ...prev])
      setNotificacao('Nova publicação cadastrada!')
    }

    cancelarEdicao()
    setTimeout(() => setNotificacao(''), 3000)
  }

  const handleExcluir = (id: string, titulo: string) => {
    if (window.confirm(`Excluir a publicação: "${titulo}"?`)) {
      setPosts((prev) => prev.filter((p) => p.id !== id))
      if (postEmEdicaoId === id) cancelarEdicao()
      setNotificacao('Publicação removida com sucesso!')
      setTimeout(() => setNotificacao(''), 3000)
    }
  }

  const postPreview = destaques[slideAtualPreview]

  return (
    <div className="space-y-10">
      {notificacao && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold transition-all">
          ✓ {notificacao}
        </div>
      )}

      {/* 1. PREVIEW DO CARROSSEL DE DESTAQUES */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Preview do Carrossel ({destaques.length} ativas)
            </h3>
          </div>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            ★ {destaques.length} em Destaque
          </span>
        </div>

        {destaques.length > 0 && postPreview ? (
          <div className="relative bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-800 p-6 min-h-[200px] flex flex-col justify-end">
            {postPreview.imagemUrl ? (
              <img
                src={postPreview.imagemUrl}
                alt={postPreview.titulo}
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-blue-950 to-slate-900 opacity-80" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            <div className="relative z-10 space-y-1.5">
              <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-bold uppercase">
                Slide #{slideAtualPreview + 1} •{' '}
                {postPreview.categoria || 'Geral'}
              </span>
              <h4 className="text-base font-bold text-white uppercase tracking-tight line-clamp-1">
                {postPreview.titulo}
              </h4>
              <p className="text-xs text-slate-300 line-clamp-2 max-w-xl">
                {postPreview.conteudo}
              </p>
            </div>

            {destaques.length > 1 && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    setSlideAtualPreview((prev) =>
                      prev === 0 ? destaques.length - 1 : prev - 1,
                    )
                  }
                  className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs cursor-pointer"
                >
                  ◀
                </button>
                <span className="text-[11px] text-white font-bold px-1">
                  {slideAtualPreview + 1}/{destaques.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setSlideAtualPreview((prev) =>
                      prev === destaques.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs cursor-pointer"
                >
                  ▶
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl text-xs text-slate-500">
            Nenhuma notícia marcada como destaque. Clique no botão{' '}
            <strong>"☆ Ativar Destaque"</strong> em qualquer post abaixo para
            exibir no carrossel.
          </div>
        )}
      </section>

      {/* 2. FORMULÁRIO */}
      <section className="bg-slate-50/80 border border-slate-200/80 p-5 rounded-lg space-y-5">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            {postEmEdicaoId ? 'Editar Publicação' : 'Criar Nova Publicação'}
          </h3>
          {postEmEdicaoId && (
            <button
              type="button"
              onClick={cancelarEdicao}
              className="text-xs font-bold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              Cancelar ✕
            </button>
          )}
        </div>

        <form onSubmit={handleSalvar} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Título *
              </label>
              <input
                type="text"
                required
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Categoria
                </label>
                <select
                  value={formData.categoria}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categoria: e.target.value as CategoriaNoticia,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-xs text-slate-800"
                >
                  {CATEGORIAS_NOTICIAS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Conteúdo *
            </label>
            <textarea
              required
              rows={3}
              value={formData.conteudo}
              onChange={(e) =>
                setFormData({ ...formData, conteudo: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* CHECKBOX DE DESTAQUE */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center gap-2.5">
            <input
              type="checkbox"
              id="destaqueCheck"
              checked={formData.destaque}
              onChange={(e) =>
                setFormData({ ...formData, destaque: e.target.checked })
              }
              className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
            />
            <label
              htmlFor="destaqueCheck"
              className="text-xs font-bold text-amber-900 cursor-pointer select-none"
            >
              ★ Fixar esta publicação no Carrossel de Destaques
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Foto */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-600">
                Imagem (Opcional)
              </label>
              <div className="flex items-center gap-3">
                {formData.imagemUrl ? (
                  <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200 relative group">
                    <img
                      src={formData.imagemUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, imagemUrl: '' })
                      }
                      className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-slate-50 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs shrink-0">
                    Foto
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 cursor-pointer"
                />
              </div>
            </div>

            {/* Link */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-600">
                Link de Ação (Opcional)
              </label>
              <div className="space-y-1.5">
                <input
                  type="text"
                  placeholder="Texto (ex: Ver Edital)"
                  value={formData.linkExterno?.texto}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      linkExterno: {
                        texto: e.target.value,
                        url: formData.linkExterno?.url || '',
                      },
                    })
                  }
                  className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800"
                />
                <input
                  type="url"
                  placeholder="URL (https://...)"
                  value={formData.linkExterno?.url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      linkExterno: {
                        texto: formData.linkExterno?.texto || '',
                        url: e.target.value,
                      },
                    })
                  }
                  className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              {postEmEdicaoId ? 'Salvar Alterações' : 'Publicar Notícia'}
            </button>
          </div>
        </form>
      </section>

      {/* 3. LISTAGEM COM TOGGLE DIRETO */}
      <section className="space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
            Publicações Cadastradas ({posts.length})
          </h3>
          <p className="text-xs text-slate-500">
            Clique no botão de estrela para incluir ou remover a notícia do
            carrossel superior a qualquer momento.
          </p>
        </div>

        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`p-4 bg-white border rounded-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                post.destaque
                  ? 'border-amber-300 ring-1 ring-amber-300/40 bg-amber-50/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3 flex-grow">
                {post.imagemUrl ? (
                  <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img
                      src={post.imagemUrl}
                      alt={post.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 text-lg shrink-0">
                    📰
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        post.destaque
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {post.destaque ? '★ No Carrossel' : 'Apenas Feed'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold uppercase">
                      {post.categoria || 'Geral'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {post.dataPublicacao}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {post.titulo}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {post.conteudo}
                  </p>
                </div>
              </div>

              {/* Ações */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  type="button"
                  onClick={() => alternarDestaque(post.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                    post.destaque
                      ? 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                  title={
                    post.destaque
                      ? 'Remover do Carrossel'
                      : 'Adicionar ao Carrossel'
                  }
                >
                  {post.destaque ? '★ Destacada' : '☆ Ativar Destaque'}
                </button>

                <button
                  type="button"
                  onClick={() => iniciarEdicao(post)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all cursor-pointer"
                >
                  ✏️ Editar
                </button>

                <button
                  type="button"
                  onClick={() => handleExcluir(post.id, post.titulo)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 transition-all cursor-pointer"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
