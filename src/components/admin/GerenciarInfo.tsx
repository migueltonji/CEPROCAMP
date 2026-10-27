
import { useState } from 'react'
import { useContent } from '../../context/ContentContext'

export default function GerenciarInfo() {
  const { conteudo, atualizarSecao } = useContent()
  const [subAba, setSubAba] = useState<
    'institucional' | 'recursos' | 'sae' | 'somosNos'
  >('institucional')

  const [instForm, setInstForm] = useState(conteudo.informacoes.institucional)
  const [recursosForm, setRecursosForm] = useState(
    conteudo.informacoes.salaRecursos,
  )
  const [saeForm, setSaeForm] = useState(conteudo.informacoes.sae)
  const [somosNosForm, setSomosNosForm] = useState(
    conteudo.informacoes.somosNos,
  )
  const [notificacao, setNotificacao] = useState('')

  const handleSalvar = (
    secao: 'institucional' | 'salaRecursos' | 'sae' | 'somosNos',
  ) => {
    if (secao === 'institucional')
      atualizarSecao('informacoes', 'institucional', instForm)
    if (secao === 'salaRecursos')
      atualizarSecao('informacoes', 'salaRecursos', recursosForm)
    if (secao === 'sae') atualizarSecao('informacoes', 'sae', saeForm)
    if (secao === 'somosNos')
      atualizarSecao('informacoes', 'somosNos', somosNosForm)

    setNotificacao('Informações atualizadas com sucesso!')
    setTimeout(() => setNotificacao(''), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Sub-menu limpo estilo pills */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
        {[
          { id: 'institucional', label: 'Missão / Visão' },
          { id: 'recursos', label: 'Sala de Recursos' },
          { id: 'sae', label: 'SAE' },
          { id: 'somosNos', label: 'Somos Nós' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubAba(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              subAba === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {notificacao && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold">
          ✓ {notificacao}
        </div>
      )}

      {/* ABA: MISSÃO / VISÃO */}
      {subAba === 'institucional' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              Missão, Visão e Valores
            </h3>
            <button
              onClick={() => handleSalvar('institucional')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md cursor-pointer"
            >
              Salvar Alterações
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Introdução
              </label>
              <textarea
                rows={4}
                value={instForm.introducao}
                onChange={(e) =>
                  setInstForm({ ...instForm, introducao: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Missão
              </label>
              <textarea
                rows={4}
                value={instForm.missao}
                onChange={(e) =>
                  setInstForm({ ...instForm, missao: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Visão
              </label>
              <textarea
                rows={4}
                value={instForm.visao}
                onChange={(e) =>
                  setInstForm({ ...instForm, visao: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* ABA: SALA DE RECURSOS */}

      {subAba === 'recursos' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              Educação Inclusiva
            </h3>
            <button
              onClick={() => handleSalvar('salaRecursos')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md cursor-pointer"
            >
              Salvar Alterações
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Objetivo
              </label>
              <textarea
                rows={3}
                value={recursosForm.objetivo}
                onChange={(e) =>
                  setRecursosForm({ ...recursosForm, objetivo: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Trabalho Cooperativo
              </label>
              <textarea
                rows={2}
                value={recursosForm.trabalhoCooperativo}
                onChange={(e) =>
                  setRecursosForm({
                    ...recursosForm,
                    trabalhoCooperativo: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* ABA: SAE */}

      {subAba === 'sae' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              Serviço de Acolhimento
            </h3>
            <button
              onClick={() => handleSalvar('sae')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md cursor-pointer"
            >
              Salvar SAE
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Descrição
              </label>
              <textarea
                rows={2}
                value={saeForm.descricao}
                onChange={(e) =>
                  setSaeForm({ ...saeForm, descricao: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Horário de Funcionamento
              </label>
              <input
                type="text"
                value={saeForm.horario}
                onChange={(e) =>
                  setSaeForm({ ...saeForm, horario: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                E-mail de Contato
              </label>
              <input
                type="email"
                value={saeForm.email}
                onChange={(e) =>
                  setSaeForm({ ...saeForm, email: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* ABA: SOMOS NÓS */}
      {subAba === 'somosNos' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              Ceprocamp Somos Nós
            </h3>
            <button
              onClick={() => handleSalvar('somosNos')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md cursor-pointer"
            >
              Salvar Somos Nós
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Descrição
              </label>
              <textarea
                rows={3}
                value={somosNosForm.descricao}
                onChange={(e) =>
                  setSomosNosForm({
                    ...somosNosForm,
                    descricao: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Link do Portal
              </label>
              <input
                type="text"
                value={somosNosForm.linkPortal}
                onChange={(e) =>
                  setSomosNosForm({
                    ...somosNosForm,
                    linkPortal: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Link do Formulário
              </label>
              <input
                type="text"
                value={somosNosForm.linkFormulario}
                onChange={(e) =>
                  setSomosNosForm({
                    ...somosNosForm,
                    linkFormulario: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
