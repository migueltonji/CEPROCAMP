
import { useContent } from '../context/ContentContext'

export default function SecaoCeprocamp() {
  const { conteudo } = useContent()
  const somosNos = conteudo.informacoes.somosNos

  return (
    <div className="space-y-6 text-slate-700 text-base leading-relaxed">
      <div>
        <h2 className="text-3xl font-titulo text-slate-900 uppercase border-b-2 border-amber-500 pb-2 inline-block mb-4">
          {somosNos.titulo}
        </h2>
        <h3 className="font-titulo text-xl text-blue-700 uppercase mb-2">
          {somosNos.subtitulo}
        </h3>
        <p className="text-slate-600 font-normal">{somosNos.descricao}</p>
      </div>

      <div className="space-y-3 pt-2">
        <p className="text-slate-800 font-medium">
          Acesse o portal para conhecer o projeto:{' '}
          <a
            href={somosNos.linkPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold break-all"
          >
            {somosNos.linkPortal}
          </a>
        </p>

        <p className="text-slate-800 font-bold">
          Responsáveis:{' '}
          <span className="font-normal text-slate-600">
            {somosNos.responsaveis}
          </span>
        </p>

        <p className="text-slate-800 font-medium">
          Quer contribuir com o acervo? Mande através do formulário:{' '}
          <a
            href={somosNos.linkFormulario}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold break-all"
          >
            Acessar Formulário de Contribuição
          </a>
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <p className="font-bold text-lg text-slate-900 italic">
          "{somosNos.slogan}"
        </p>
      </div>
    </div>
  )
}
