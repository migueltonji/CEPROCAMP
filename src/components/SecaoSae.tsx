// src/SecaoSae.tsx
import { useContent } from "../context/ContentContext"

export default function SecaoSae() {
  const { conteudo } = useContent()
  const sae = conteudo.informacoes.sae

  return (
    <div className="space-y-6 text-slate-700 text-base leading-relaxed">
      <div>
        <h2 className="text-3xl font-titulo text-slate-900 uppercase border-b-2 border-amber-500 pb-2 inline-block mb-4">
          {sae.titulo}
        </h2>
        <h3 className="font-titulo text-xl text-blue-700 uppercase mb-2">
          {sae.subtitulo}
        </h3>
        <p className="text-slate-600 font-normal">{sae.descricao}</p>
      </div>

      <div className="space-y-2">
        <p className="text-slate-600 font-normal">{sae.publicoAlvo}</p>
        <p className="text-slate-800 font-bold">
          Horário de funcionamento:{' '}
          <span className="font-normal text-slate-600">{sae.horario}</span>
        </p>
      </div>

      <div className="space-y-2 pt-4 border-t border-slate-100">
        <p className="text-slate-600 font-normal">
          {sae.orientacaoAtendimento}
        </p>
        <p className="text-slate-800 font-bold">
          E-mail:{' '}
          <a
            href={`mailto:${sae.email}`}
            className="text-blue-600 hover:underline font-semibold break-all"
          >
            {sae.email}
          </a>
        </p>
      </div>
    </div>
  )
}
