import React, { useState } from 'react'
import { useContent } from '../../context/ContentContext'

export default function GerenciarHome() {
  const { conteudo, atualizarSecao } = useContent()

  // Estados locais para edição sem interferir antes de salvar
  const [instForm, setInstForm] = useState(conteudo.home.institucional)
  const [cursosForm, setCursosForm] = useState(conteudo.home.cursosIntro)
  const [pepiForm, setPepiForm] = useState(conteudo.home.pepi)
  const [notificacao, setNotificacao] = useState('')

  // Preview e upload para imagem1 e imagem2
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    campo: 'imagem1' | 'imagem2',
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setInstForm((prev) => ({ ...prev, [campo]: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSalvar = (secao: 'institucional' | 'cursosIntro' | 'pepi') => {
    if (secao === 'institucional') {
      atualizarSecao('home', 'institucional', instForm)
    } else if (secao === 'cursosIntro') {
      atualizarSecao('home', 'cursosIntro', cursosForm)
    } else if (secao === 'pepi') {
      atualizarSecao('home', 'pepi', pepiForm)
    }

    setNotificacao(`Seção "${secao}" atualizada com sucesso!`)
    setTimeout(() => setNotificacao(''), 3000)
  }

  return (
    <div className="space-y-10">
      {notificacao && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold transition-all">
          ✓ {notificacao}
        </div>
      )}

      {/* BLOCO 1: SEÇÃO INSTITUCIONAL DA HOME */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Seção Institucional (Boas-vindas)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Títulos, descrição principal e fotos de destaque.
            </p>
          </div>
          <button
            onClick={() => handleSalvar('institucional')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-md transition-all cursor-pointer shadow-xs"
          >
            Salvar Institucional
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Título da Seção
            </label>
            <input
              type="text"
              value={instForm.titulo}
              onChange={(e) =>
                setInstForm({ ...instForm, titulo: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Primeiro Parágrafo
            </label>
            <textarea
              rows={5}
              value={instForm.paragrafo1}
              onChange={(e) =>
                setInstForm({ ...instForm, paragrafo1: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Segundo Parágrafo
            </label>
            <textarea
              rows={5}
              value={instForm.paragrafo2}
              onChange={(e) =>
                setInstForm({ ...instForm, paragrafo2: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 text-xs leading-relaxed"
            />
          </div>

          {/* Imagem 1 */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-600">
              Foto Superior (Fachada)
            </label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 rounded-lg bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                <img
                  src={instForm.imagem1}
                  alt="Preview 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'imagem1')}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
          </div>

          {/* Imagem 2 */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-600">
              Foto Inferior (Pátio)
            </label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 rounded-lg bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                <img
                  src={instForm.imagem2}
                  alt="Preview 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'imagem2')}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 2: PEPI (PROJETO EMPREGO) */}
      <section className="space-y-4 pt-6 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-800">Seção PEPI</h3>
            <p className="text-xs text-slate-500">
              Textos, cards de atendimento e canais de contato.
            </p>
          </div>
          <button
            onClick={() => handleSalvar('pepi')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-md transition-all cursor-pointer shadow-xs"
          >
            Salvar PEPI
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Título
            </label>
            <input
              type="text"
              value={pepiForm.titulo}
              onChange={(e) =>
                setPepiForm({ ...pepiForm, titulo: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              WhatsApp (Link Direto)
            </label>
            <input
              type="text"
              value={pepiForm.whatsappLink}
              onChange={(e) =>
                setPepiForm({ ...pepiForm, whatsappLink: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Descrição Principal
            </label>
            <textarea
              rows={3}
              value={pepiForm.descricao}
              onChange={(e) =>
                setPepiForm({ ...pepiForm, descricao: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 text-xs leading-relaxed"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
