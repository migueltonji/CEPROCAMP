// src/components/admin/GerenciarCursos.tsx
import { useState, useEffect } from 'react'
import type { CursoItem } from '../../types/admin'
import { apiService } from '../../services/api'

export default function GerenciarCursos() {
  const [cursos, setCursos] = useState<CursoItem[]>([])
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null)
  const [cursoTemp, setCursoTemp] = useState<CursoItem | null>(null)
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    apiService.getCursos().then(setCursos)
  }, [])

  const abrirEdicao = (index: number) => {
    setEditandoIndex(index)
    setCursoTemp(JSON.parse(JSON.stringify(cursos[index])))
  }

  const salvarModal = () => {
    if (cursoTemp !== null && editandoIndex !== null) {
      const novos = [...cursos]
      novos[editandoIndex] = cursoTemp
      setCursos(novos)
      apiService.saveCursos(novos)
      setEditandoIndex(null)
      setCursoTemp(null)
      setMensagem('Curso atualizado com sucesso!')
      setTimeout(() => setMensagem(''), 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gerenciar Cursos</h2>
          <p className="text-sm text-slate-500">Edite descrições, cargas horárias e requisitos dos cursos oferecidos.</p>
        </div>
      </div>

      {mensagem && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-medium">
          {mensagem}
        </div>
      )}

      {/* Tabela de Cursos */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <div className="divide-y divide-slate-100">
          {cursos.map((curso, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50">
              <div className="space-y-1">
                <span className={`text-[11px] font-extrabold px-4 py-0.5 rounded-lg uppercase ${curso.tipo === 'tecnico' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                  {curso.tipo === 'tecnico' ? 'Técnico' : 'Qualificação Profissional'}
                </span>
                <h3 className="font-bold text-slate-800 text-base">{curso.titulo}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{curso.desc}</p>
              </div>
              <button
                onClick={() => abrirEdicao(idx)}
                className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-md text-sm font-semibold transition-colors shrink-0 cursor-pointer"
              >
                Editar Dados
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Edição */}
      {cursoTemp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-800">Editar: {cursoTemp.titulo}</h3>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Título</label>
                <input
                  type="text"
                  value={cursoTemp.titulo}
                  onChange={(e) => setCursoTemp({ ...cursoTemp, titulo: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Descrição Curta</label>
                <textarea
                  rows={3}
                  value={cursoTemp.desc}
                  onChange={(e) => setCursoTemp({ ...cursoTemp, desc: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Duração</label>
                  <input
                    type="text"
                    value={cursoTemp.detalhes.duracao}
                    onChange={(e) =>
                      setCursoTemp({
                        ...cursoTemp,
                        detalhes: { ...cursoTemp.detalhes, duracao: e.target.value },
                      })
                    }
                    className="w-full p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Carga Horária</label>
                  <input
                    type="text"
                    value={cursoTemp.detalhes.carga}
                    onChange={(e) =>
                      setCursoTemp({
                        ...cursoTemp,
                        detalhes: { ...cursoTemp.detalhes, carga: e.target.value },
                      })
                    }
                    className="w-full p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Pré-requisitos</label>
                <input
                  type="text"
                  value={cursoTemp.detalhes.requisitos}
                  onChange={(e) =>
                    setCursoTemp({
                      ...cursoTemp,
                      detalhes: { ...cursoTemp.detalhes, requisitos: e.target.value },
                    })
                  }
                  className="w-full p-2.5 border border-slate-200 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Mercado de Trabalho</label>
                <textarea
                  rows={4}
                  value={cursoTemp.detalhes.mercado}
                  onChange={(e) =>
                    setCursoTemp({
                      ...cursoTemp,
                      detalhes: { ...cursoTemp.detalhes, mercado: e.target.value },
                    })
                  }
                  className="w-full p-2.5 border border-slate-200 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setCursoTemp(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-md text-sm font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={salvarModal}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold cursor-pointer"
              >
                Salvar Curso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}