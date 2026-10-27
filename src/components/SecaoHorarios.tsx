// src/SecaoHorarios.tsx
import { HORARIOS_DADOS } from "../data/horariosData"

export default function SecaoHorarios() {
  return (
    <div className="space-y-8 text-slate-700 text-base leading-relaxed">
      {/* Título e Introdução */}
      <div>
        <h2 className="text-3xl font-titulo text-slate-900 uppercase border-b-2 border-amber-500 pb-2 inline-block mb-4">
          Horários de Aula
        </h2>
        <p className="text-slate-600 font-normal">
          {HORARIOS_DADOS.introducao}
        </p>
      </div>

      {/* Grid de Cards com Efeito Glassmorphism & Blur */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HORARIOS_DADOS.turnos.map((turno, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br ${turno.destaqueColor} bg-white/70 backdrop-blur-md border border-white/80 shadow-md shadow-slate-200/50 flex flex-col items-center text-center`}
          >
            {/* Reflexo superior do vidro (Glassmorphism Glow) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            <span
              className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border mb-2 ${turno.badgeColor}`}
            >
              Período {turno.periodo}
            </span>

            <p className="text-2xl font-titulo font-bold text-slate-900 tracking-tight mt-1">
              {turno.horario}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
