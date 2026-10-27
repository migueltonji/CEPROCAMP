import { useState, useEffect, useRef } from 'react'
import type { ImagemCarrosselItem } from '../../types/admin'
import { apiService } from '../../services/api'

export default function GerenciarCarrossel() {
  const [imagens, setImagens] = useState<ImagemCarrosselItem[]>([])
  const [novoTitulo, setNovoTitulo] = useState('')
  const [imagemPreview, setImagemPreview] = useState<string | null>(null)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    apiService.getCarrossel().then(setImagens)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setErro('')

    if (file) {
      if (!file.type.startsWith('image/')) {
        setErro(
          'Por favor, selecione um arquivo de imagem válido (PNG, JPG, WEBP).',
        )
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagemPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdicionar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!imagemPreview) {
      setErro('Selecione uma foto antes de adicionar.')
      return
    }

    const novoItem: ImagemCarrosselItem = {
      id: Date.now(),
      url: imagemPreview,
      titulo: novoTitulo.trim() || 'Nova Foto do Carrossel',
    }

    const listaAtualizada = [...imagens, novoItem]
    setImagens(listaAtualizada)

    // Limpa os campos do formulário
    setImagemPreview(null)
    setNovoTitulo('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemover = (id: number) => {
    setImagens(imagens.filter((img) => img.id !== id))
  }

  const handleSalvar = async () => {
    await apiService.updateCarrossel(imagens)
    setMensagem('Alterações no carrossel salvas com sucesso!')
    setTimeout(() => setMensagem(''), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Submódulo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Gerenciar Carrossel
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Selecione a foto da sua biblioteca para mudar os slides da
            página inicial.
          </p>
        </div>
        <button
          onClick={handleSalvar}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold rounded-md text-sm transition-all shadow-xs cursor-pointer"
        >
          Salvar Alterações
        </button>
      </div>

      {mensagem && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md text-sm font-medium animate-in fade-in duration-200">
          {mensagem}
        </div>
      )}

      {erro && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm font-medium animate-in fade-in duration-200">
          {erro}
        </div>
      )}

      {/* Área de Upload / Formulário */}
      <form
        onSubmit={handleAdicionar}
        className="bg-slate-50 p-6 rounded-md border border-slate-200 space-y-4 p-[20px]"
      >
        <h3 className="font-bold text-sm uppercase tracking-wide text-slate-700">
          Fazer Upload de Nova Foto
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Seletor do Arquivo */}
          <div className="md:col-span-7">
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
              Escolher Arquivo de Imagem
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer border border-slate-200 rounded-xl bg-white p-1.5"
            />
          </div>

          {/* Título da Foto */}
          <div className="md:col-span-5">
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
              Título / Identificador
            </label>
            <input
              type="text"
              value={novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
              placeholder="Ex: Semana de Inovação 2026"
              className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Pré-visualização da Foto Selecionada */}
        {imagemPreview && (
          <div className="flex items-center gap-4 p-3 bg-white border border-blue-100 rounded-lg">
            <div className="w-20 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
              <img
                src={imagemPreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <p className="text-xs font-bold text-blue-700">
                Foto selecionada para envio
              </p>
              <p className="text-xs text-slate-500 truncate">
                Pronta para ser inserida no carrossel
              </p>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              + Adicionar ao Carrossel
            </button>
          </div>
        )}
      </form>

      {/* Grid de Imagens Atuais no Carrossel */}
      <div>
        <h3 className="font-bold text-sm uppercase tracking-wide text-slate-700 mb-3">
          Fotos Atuais no Carrossel ({imagens.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {imagens.map((img) => (
            <div
              key={img.id}
              className="relative group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all"
            >
              <div className="h-44 bg-slate-900 relative">
                <img
                  src={img.url}
                  alt={img.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => handleRemover(img.id)}
                  className="absolute top-2 right-2 px-2.5 py-1 bg-red-600/90 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer backdrop-blur-xs"
                  title="Remover slide"
                >
                  ✕ Excluir
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {img.titulo || 'Sem título'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
