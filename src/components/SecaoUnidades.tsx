// src/SecaoUnidades.tsx
import { UNIDADES_CEPROCAMP } from "../data/unidadesData"

export default function SecaoUnidades() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-titulo text-slate-900 uppercase border-b-2 border-amber-500 pb-2 inline-block">
          Unidades
        </h2>
        <p className="text-slate-600 leading-relaxed text-base">
          O CEPROCAMP está presente em pontos estratégicos de Campinas para
          facilitar o acesso da comunidade à educação profissional.
        </p>
      </div>

      {/* Grid de Unidades configurado para 2 colunas como o original */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {UNIDADES_CEPROCAMP.map((unidade, index) => (
          <div
            key={index}
            className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
          >
            <div>
              <h3 className="font-titulo text-xl text-blue-700 mb-2 uppercase tracking-tight leading-tight">
                {unidade.nome}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {unidade.endereco}
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-sm">
              {unidade.contatos.length > 0 && (
                <p className="text-slate-700">
                  <span className="font-bold text-slate-800">Contato:</span>{' '}
                  {unidade.contatos.join(' / ')}
                </p>
              )}
              {unidade.whatsapps.length > 0 && (
                <p className="text-slate-700">
                  <span className="font-bold text-slate-800">Whatsapp:</span>{' '}
                  {unidade.whatsapps.join(' / ')}
                </p>
              )}
              <p className="text-slate-700 break-all">
                <a
                  href={`mailto:${unidade.email}`}
                  className="text-blue-600 hover:underline"
                >
                  <span className="font-bold text-slate-800">E-mail:</span>{' '}
                  {unidade.email}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
