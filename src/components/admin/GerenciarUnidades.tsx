// src/components/admin/GerenciarUnidades.tsx
import { useState, useEffect } from 'react'
import type { UnidadeItem } from '../../types/admin'
import { apiService } from '../../services/api'

export default function GerenciarUnidades() {
  const [unidades, setUnidades] = useState<UnidadeItem[]>([])
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [unidadeTemp, setUnidadeTemp] = useState<UnidadeItem | null>(null)
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    apiService.getUnidades().then(setUnidades)
  }, [])

  const abrirEdicao = (index: number) => {
    setEditIndex(index)
    setUnidadeTemp(JSON.parse(JSON.stringify(unidades[index])))
  }

  const salvarModal = () => {
    if (unidadeTemp !== null && editIndex !== null) {
      const novas = [...unidades]
      novas[editIndex] = unidadeTemp
      setUnidades(novas)
      apiService.saveUnidades(novas)
      setEditIndex(null)
      setUnidadeTemp(null)
      setMensagem('Unidade atualizada com sucesso!')
      setTimeout(() => setMensagem(''), 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Gerenciar Unidades
        </h2>
        <p className="text-sm text-slate-500">
          Atualize endereços, contatos telefônicos, WhatsApp e e-mails de
          atendimento.
        </p>
      </div>

      {mensagem && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-medium">
          {mensagem}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {unidades.map((unidade, idx) => (
          <div
            key={idx}
            className="p-4 bg-white border border-slate-200 rounded-lg flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">{unidade.nome}</h3>
              <p className="text-xs text-slate-500">{unidade.endereco}</p>
              <div className="text-xs text-slate-600 space-y-0.5">
                {unidade.contatos.length > 0 && (
                  <p>☎️ {unidade.contatos.join(' / ')}</p>
                )}
                {unidade.whatsapps.length > 0 && (
                  <p>📱 {unidade.whatsapps.join(' / ')}</p>
                )}
                <p>✉️ {unidade.email}</p>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => abrirEdicao(idx)}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Edição de Unidade */}
      {unidadeTemp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800">
              Editar: {unidadeTemp.nome}
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  value={unidadeTemp.endereco}
                  onChange={(e) =>
                    setUnidadeTemp({ ...unidadeTemp, endereco: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-200 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Telefones (Separados por vírgula)
                </label>
                <input
                  type="text"
                  value={unidadeTemp.contatos.join(', ')}
                  onChange={(e) =>
                    setUnidadeTemp({
                      ...unidadeTemp,
                      contatos: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 border border-slate-200 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  WhatsApp (Separados por vírgula)
                </label>
                <input
                  type="text"
                  value={unidadeTemp.whatsapps.join(', ')}
                  onChange={(e) =>
                    setUnidadeTemp({
                      ...unidadeTemp,
                      whatsapps: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 border border-slate-200 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={unidadeTemp.email}
                  onChange={(e) =>
                    setUnidadeTemp({ ...unidadeTemp, email: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-200 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setUnidadeTemp(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-md text-sm font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={salvarModal}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold cursor-pointer"
              >
                Salvar Unidade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
