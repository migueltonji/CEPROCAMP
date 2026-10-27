export default function Sobre() {
  return (
    <main
      id="conteudo-principal"
      className="flex-grow max-w-5xl w-full mx-auto px-4 py-12 md:py-16 text-slate-800"
    >
      {/* CABEÇALHO DA PÁGINA */}
      <section className="space-y-4 mb-14" aria-label="Introdução Sobre Nós">
        <div className="flex gap-1" aria-hidden="true">
          <span className="w-3 h-1 bg-amber-500 rounded-full" />
          <span className="w-3 h-1 bg-amber-500 rounded-full" />
        </div>
        <h1 className="text-3xl md:text-4xl font-titulo tracking-tight text-slate-900 uppercase">
          CEPROCAMP : <span className="text-blue-600">Uma História</span>
        </h1>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl">
          Conheça a trajetória detrás responsável pela transformação social e
          qualificação profissional que une tradição ferroviária, patrimônio
          histórico e formação para o futuro de campinas.
        </p>
      </section>

      {/* BLOCO DA LINHA DO TEMPO (2001 - 2004) */}
      <section className="mb-16" aria-label="Marcos Históricos">
        <div className="border-l-2 border-slate-200 pl-6 md:pl-8 space-y-12 ml-2 md:ml-4">
          {/* MARCO 2001 */}
          <article className="relative">
            <span
              className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-white"
              aria-hidden="true"
            />
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Ano de 2001
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1 mb-3">
              O Início do Convênio e os Primeiros Investimentos
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Foi assinado em outubro de 2001 um convênio entre a{' '}
              <strong>FUMEC</strong> (Fundação Municipal para Educação
              Comunitária),
              <strong> SME</strong> (Secretaria Municipal de Educação),{' '}
              <strong>PROEP</strong> (Programa de Expansão da Educação
              Profissional) e o <strong>MEC</strong> (Ministério da Educação). O
              acordo destinou, na época, um investimento inicial de mais de 3
              milhões de reais para reforma do prédio e aquisição de
              equipamentos e mobiliário, propiciando a criação e o
              desenvolvimento para sua reestruturação. Iniciava ali uma nova
              história para Campinas, que despontava como metrópole e marco
              central de inovação, tecnologia e ensino.
            </p>
          </article>

          {/* MARCO 2001 - 2004 */}
          <article className="relative">
            <span
              className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white"
              aria-hidden="true"
            />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              2001 a 2004
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1 mb-3">
              Restauração do Patrimônio e Complexo Ferroviário
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Cerca de 3 milhões de reais foram investidos na construção do
              CEPROCAMP. A Secretaria de Cultura, Esporte e Turismo ficou
              responsável por executar as obras de restauração dos prédios que
              deixariam de ser um complexo ferroviário inativo para abrigar,
              além do{' '}
              <em>
                Centro Profissionalizante Prefeito Antônio da Costa Santos
              </em>
              , outras instituições públicas, dentre elas a 33ª Junta Militar e
              a Estação Cultura, ativas até os dias atuais.
            </p>
          </article>

          {/* MARCO 2004 */}
          <article className="relative">
            <span
              className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-white"
              aria-hidden="true"
            />
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Setembro de 2004
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1 mb-3">
              Inauguração e a realização de um Sonho
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              O prédio do CEPROCAMP, localizado na antiga Estação Fepasa, foi um
              dos primeiros a serem revitalizados, concretizando um sonho antigo
              e um novo conceito de urbanização ao recuperar a área histórica do
              Centro e preservar sua relevância para Campinas. A Unidade
              CEPROCAMP Centro foi inaugurada oficialmente em{' '}
              <strong>14 de setembro de 2004</strong> e tem como seu patrono o
              Sr. <strong>Antônio da Costa Santos (Toninho)</strong>, 53º
              Prefeito de Campinas, assassinado em 10 de setembro de 2001.
            </p>
          </article>
        </div>
      </section>

      <hr className="border-slate-200 mb-14" />

      {/* BLOCO DA EVOLUÇÃO EDUCACIONAL E CURSOS */}
      <section className="space-y-12" aria-label="Evolução dos Cursos">
        {/* INÍCIO DOS CURSOS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <h2 className="text-2xl font-titulo text-slate-900 uppercase">
              Início dos Cursos
            </h2>
          </div>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            No ano de 2004, conforme publicação do Caderno do Governo
            Democrático e Popular, o CEPROCAMP Centro proporcionou o curso de{' '}
            <strong>Informática Básica para 3,5 mil alunos</strong>. Sendo um
            dos primeiros cursos ofertados, já alinhava o uso dos recursos
            públicos à ambientação da população nas tecnologias emergentes da
            época. Hoje, reconhecida como uma cidade inteligente e conectada,
            Campinas vê o CEPROCAMP manter essa oferta para acompanhar a
            evolução contínua da comunidade.
          </p>
        </div>

        {/* CURSOS TÉCNICOS E QUALIFICAÇÃO PROFISSIONAL */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <h2 className="text-2xl font-titulo text-slate-900 uppercase">
              Cursos Técnicos e de Qualificação Profissional
            </h2>
          </div>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            A partir do quarto ano de funcionamento, o CEPROCAMP passou a
            atender <strong>6.160 novos alunos a cada ano</strong> em áreas como:
            Agropecuária, Artes, Lazer e Desenvolvimento Social, Meio Ambiente,
            Telecomunicações, Turismo e Hospitalidade. Os cursos técnicos foram
            introduzidos em 2005, iniciando com o Curso Técnico em Meio
            Ambiente.
          </p>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Até os dias atuais, a instituição abriu <strong>171 turmas</strong>{' '}
            nos seis cursos de formação técnica disponíveis:
            <span className="text-slate-800 font-medium">
              {' '}
              Enfermagem, Administração, Informática, Meio Ambiente, Segurança
              do Trabalho e Logística
            </span>
            .
          </p>
        </div>

        {/* CURSOS EM PARCERIAS */}
        <div className="p-6 md:p-8 bg-slate-100/70 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <h2 className="text-xl md:text-2xl font-titulo text-slate-900 uppercase">
              Cursos em Parcerias
            </h2>
          </div>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Para aproximar ainda mais as oportunidades dos moradores do
            município, o CEPROCAMP estabelece convênios com diversas
            instituições (governamentais e não governamentais) a fim de
            capacitar colaboradores, a comunidade local e grupos específicos.
            Atualmente, já foram firmados acordos de cooperação com{' '}
            <strong>mais de 29 entidades e organizações</strong> parceiras na
            oferta de qualificação profissional gratuita.
          </p>
        </div>
      </section>
    </main>
  )
}
