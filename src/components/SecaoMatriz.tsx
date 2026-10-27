// src/SecaoMatriz.tsx
import { useContent } from "../context/ContentContext"
import { MATRIZES_CURRICULARES } from "../data/matrizesData"

export default function SecaoMatriz() {
  const { conteudo } = useContent()
  const matriz = conteudo.informacoes.matriz

  return (
    <div className="space-y-6 text-slate-700 text-base leading-relaxed">
      <div>
        <h2 className="text-3xl font-titulo text-slate-900 uppercase border-b-2 border-amber-500 pb-2 inline-block mb-4">
          {matriz.titulo}
        </h2>
        <p className="text-slate-600 font-normal">{matriz.descricao}</p>
      </div>

      {/* Lista de Matrizes Curriculares (Links/PDFs) */}
      <div className="space-y-3 pt-2">
        {MATRIZES_CURRICULARES.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 transition-colors gap-3 shadow-xs"
          >
            <div>
              <p className="font-bold text-slate-800 text-base">{item.curso}</p>
              <p className="text-xs text-slate-500 font-medium">
                Turma / Período: {item.turmas}
              </p>
            </div>
            <a
              href={item.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-colors shrink-0"
            >
              📄 Baixar Matriz (PDF)
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
