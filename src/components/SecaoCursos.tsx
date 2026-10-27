// src/SecaoCursos.tsx
import { useState, useEffect } from 'react'
import { CURSOS_DETALHADOS } from '../data/cursosData'

interface SecaoCursosProps {
  cursoSelecionado?: string | null
  onFecharModal?: () => void
}

export default function SecaoCursos({ cursoSelecionado: cursoProp, onFecharModal }: SecaoCursosProps) {
  const [filtroAtual, setFiltroAtual] = useState<'tecnico' | 'qp'>('tecnico')
  const [cursoSelecionado, setCursoSelecionado] = useState<any | null>(null)

  // Dispara quando o usuário clica em um card vindo da Home
  useEffect(() => {
    if (cursoProp) {
      const encontrado = CURSOS_DETALHADOS.find(
        (c) => c.titulo.toLowerCase().trim() === cursoProp.toLowerCase().trim()
      )
      if (encontrado) {
        setFiltroAtual(encontrado.tipo as 'tecnico' | 'qp')
        setCursoSelecionado(encontrado)
      }
    }
  }, [cursoProp])

  const cursosFiltrados = CURSOS_DETALHADOS.filter(
    (curso) => curso.tipo === filtroAtual
  )

  const handleFecharModal = () => {
    setCursoSelecionado(null)
    if (onFecharModal) {
      onFecharModal()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-titulo text-slate-900 uppercase border-b-2 border-amber-500 pb-2 inline-block">
        Nossos Cursos
      </h2>
      <p className="text-slate-600 leading-relaxed text-base">
        Selecione abaixo a modalidade desejada para explorar os cursos previstos em nossos editais:
      </p>

      {/* Botões de Filtro */}
      <div className="flex bg-slate-100 p-1.5 rounded-xl w-full md:w-max border border-slate-200">
        <button
          onClick={() => setFiltroAtual('tecnico')}
          className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
            filtroAtual === 'tecnico' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Cursos Técnicos
        </button>
        <button
          onClick={() => setFiltroAtual('qp')}
          className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
            filtroAtual === 'qp' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Qualificação Profissional
        </button>
      </div>

      {/* Grid de Cards - Cols-3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {cursosFiltrados.map((curso, index) => (
          <div key={index} className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="h-55 bg-slate-900 relative overflow-hidden shrink-0">
              <img src={curso.imgUrl} alt={curso.titulo} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <h3 className="font-bold text-g text-slate-900 mb-2 leading-tight">{curso.titulo}</h3>
              <p className="text-sm text-slate-600 flex-grow leading-relaxed line-clamp-3">{curso.desc}</p>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button onClick={() => setCursoSelecionado(curso)} className="w-full py-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer">
                  Mais informações
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Pop-up */}
      {cursoSelecionado && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-2xl font-titulo text-blue-700 uppercase pr-4">{cursoSelecionado.titulo}</h3>
              <button onClick={handleFecharModal} className="text-slate-400 hover:text-red-500 transition-colors p-2 cursor-pointer">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-6 text-slate-600">
              <p className="text-base leading-relaxed bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-900">{cursoSelecionado.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Duração</span>
                  <span className="font-medium text-slate-800">{cursoSelecionado.detalhes.duracao}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Carga Horária</span>
                  <span className="font-medium text-slate-800">{cursoSelecionado.detalhes.carga}</span>
                </div>
                <div className="sm:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pré-requisitos</span>
                  <span className="font-medium text-slate-800">{cursoSelecionado.detalhes.requisitos}</span>
                </div>
              </div>
              <div>
                <span className="block text-sm font-bold text-blue-700 uppercase tracking-wider mb-2 border-b border-slate-200 pb-2">Área de atuação / Mercado de trabalho</span>
                <p className="text-base leading-relaxed">{cursoSelecionado.detalhes.mercado}</p>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end sticky bottom-0">
              <button onClick={() => setCursoSelecionado(null)} className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors cursor-pointer">Voltar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}