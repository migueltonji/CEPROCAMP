// src/SecaoSalaRecursos.tsx
import { useContent } from "../context/ContentContext"

export default function SecaoSalaRecursos() {
  const { conteudo } = useContent()
  const sala = conteudo.informacoes.salaRecursos

  return (
    <div className="space-y-6 text-slate-700 text-base leading-relaxed">
      {/* Título Principal */}
      <div>
        <h2 className="text-3xl font-titulo text-slate-900 uppercase border-b-2 border-amber-500 pb-2 inline-block mb-4">
          {sala.titulo}
        </h2>
        <p className="text-slate-600 font-normal">{sala.introducao}</p>
      </div>

      {/* Objetivo */}
      <div className="space-y-2">
        <h3 className="font-titulo text-xl text-blue-700 uppercase">
          Objetivo
        </h3>
        <p className="text-slate-600 font-normal">{sala.objetivo}</p>
      </div>

      {/* Trabalho Cooperativo */}
      <div className="p-4 bg-slate-100/70 rounded-xl border border-slate-200">
        <p className="text-slate-700 font-medium">{sala.trabalhoCooperativo}</p>
      </div>

      {/* Serviços Oferecidos */}
      <div className="pt-2">
        <h3 className="font-titulo text-xl text-blue-700 uppercase mb-3">
          Serviços e Atividades
        </h3>
        <ul className="space-y-2 text-slate-600">
          {sala.servicos.map((servico, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span>{servico}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
