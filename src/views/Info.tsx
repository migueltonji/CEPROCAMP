// src/Info.tsx
import { useState, useEffect } from 'react'
import ScrollToTop from '../components/ScrollToTop'
import SecaoCursos from '../components/SecaoCursos'
import SecaoMatriz from '../components/SecaoMatriz'
import SecaoUnidades from '../components/SecaoUnidades'
import SecaoInstitucional from '../components/SecaoInstitucional'
import SecaoSalaRecursos from '../components/SecaoSalaRecursos'
import SecaoCeprocamp from '../components/SecaoCeprocamp'
import SecaoSae from '../components/SecaoSae'
import SecaoHorarios from '../components/SecaoHorarios'

interface InfoProps {
  cursoSelecionadoId?: string | null
  onLimparCursoSelecionado?: () => void
}

export default function Info({
  cursoSelecionadoId,
  onLimparCursoSelecionado,
}: InfoProps) {
  const [abaAtiva, setAbaAtiva] = useState(
    cursoSelecionadoId ? 'cursos' : 'cursos',
  )

  useEffect(() => {
    if (cursoSelecionadoId) {
      setAbaAtiva('cursos')
    }
  }, [cursoSelecionadoId])

  const INFORMACOES_DADOS = [
    {
      id: 'cursos',
      titulo: '1 - Nossos Cursos',
      conteudo: (
        <SecaoCursos
          cursoSelecionado={cursoSelecionadoId}
          onFecharModal={onLimparCursoSelecionado}
        />
      ),
    },
    {
      id: 'matriz',
      titulo: '2 - Matriz Curricular',
      conteudo: <SecaoMatriz />,
    },
    {
      id: 'unidades',
      titulo: '3 - Unidades CEPROCAMP',
      conteudo: <SecaoUnidades />,
    },
    {
      id: 'missao',
      titulo: '4 - Missão, Visão e Valores',
      conteudo: <SecaoInstitucional />,
    },
    {
      id: 'sala',
      titulo: '5 - Sala de Recursos',
      conteudo: <SecaoSalaRecursos />,
    },
    {
      id: 'somosnos',
      titulo: '6 - Ceprocamp Somos Nós',
      conteudo: <SecaoCeprocamp />,
    },
    {
      id: 'sae',
      titulo: '7 - SAE (Serviço ao Estudante)',
      conteudo: <SecaoSae />,
    },
    {
      id: 'horarios',
      titulo: '8 - Horários de Aula',
      conteudo: <SecaoHorarios />,
    },
  ]

  const conteudoAtivo = INFORMACOES_DADOS.find((item) => item.id === abaAtiva)

  return (
    <main
      id="conteudo-informacoes"
      className="flex-grow bg-slate-50 py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-titulo text-slate-900 uppercase">
            Painel de <span className="text-blue-600">Informações</span>
          </h1>
          <p className="text-slate-600 mt-2">
            Selecione o tópico do seu interesse, para saber todos os detalhes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 flex flex-col gap-2">
            {INFORMACOES_DADOS.map((item) => {
              const isAtiva = abaAtiva === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setAbaAtiva(item.id)}
                  className={`text-left px-5 py-4 rounded-xl transition-all font-semibold text-[15px] cursor-pointer outline-none focus:ring-2 focus:ring-amber-500 ${
                    isAtiva
                      ? 'bg-blue-600 text-white shadow-md border-transparent transform scale-[1.02]'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {item.titulo}
                </button>
              )
            })}
          </div>

          <div className="lg:col-span-8 bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
            <div
              key={abaAtiva}
              className="animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              {conteudoAtivo?.conteudo}
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </main>
  )
}
