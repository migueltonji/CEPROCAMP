// src/SecaoInstitucional.tsx
import { useContent } from "../context/ContentContext"

export default function SecaoInstitucional() {
  const { conteudo } = useContent()
  const inst = conteudo.informacoes.institucional

  return (
    <div className="space-y-6 text-slate-700 text-base leading-relaxed">
      {/* Título Principal */}
      <div>
        <h2 className="text-3xl font-titulo text-slate-900 uppercase border-b-2 border-amber-500 pb-2 inline-block mb-4">
          {inst.titulo}
        </h2>
        <p className="text-slate-600 font-normal">{inst.introducao}</p>
      </div>

      {/* Missão e Visão */}
      <div className="space-y-4">
        <div>
          <h3 className="font-titulo text-xl text-blue-700 uppercase mb-1">
            Missão
          </h3>
          <p className="text-slate-600 font-normal">{inst.missao}</p>
        </div>

        <div>
          <h3 className="font-titulo text-xl text-blue-700 uppercase mb-1">
            Visão
          </h3>
          <p className="text-slate-600 font-normal">{inst.visao}</p>
        </div>
      </div>

      {/* Valores */}
      <div className="pt-2">
        <h3 className="font-titulo text-xl text-blue-700 uppercase mb-3">
          Valores
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
          {inst.valores.map((valor, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span>{valor}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Conclusão */}
      <div className="pt-4 border-t border-slate-100">
        <p className="text-slate-800 font-semibold">{inst.conclusao}</p>
      </div>
    </div>
  )
}
