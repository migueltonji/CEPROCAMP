import { useState } from 'react'
import Info from './Info'
import { LoginView } from './Login'
import AdminDashboard from './AdminDashboard'
import { useContent } from '../context/ContentContext'
import Sobre from './Sobre'
import Noticias from './Noticias'

// ESTRUTURA DE DADOS DAS FOTOS DO CARROSSEL
const IMAGENS_CARROSSEL = [
  { id: 1, url: '/imgs/carrossel/inovationWeek_ceprocamp.webp' },
  { id: 2, url: '/imgs/carrossel/bolo_ceprocamp.webp' },
  { id: 3, url: '/imgs/carrossel/gestao_ceprocamp.webp' },
  { id: 4, url: '/imgs/carrossel/TST_ceprocamp.webp' },
  { id: 5, url: '/imgs/carrossel/auditorio_ceprocamp.webp' },
  { id: 6, url: '/imgs/carrossel/padaria_ceprocamp.webp' },
]

// DADOS DOS CURSOS
const CURSOS_OFERECIDOS = [
  {
    titulo: 'Técnico em Administração',
    desc: 'Capacita o profissional para atuar em rotinas administrativas, gestão de pessoas e finanças.',
    imgUrl: './imgs/icones/tec_adm_ceprocamp.webp',
  },
  {
    titulo: 'Técnico em Enfermagem',
    desc: 'Formação completa para atuação na área da saúde, cuidado com pacientes e apoio médico.',
    imgUrl: './imgs/icones/tec_enfermagem_ceprocamp.webp',
  },
  {
    titulo: 'Técnico em Segurança do Trabalho',
    desc: 'Prevenção de acidentes, gestão de riscos e implementação de normas regulamentadoras.',
    imgUrl: './imgs/icones/tec_tst_ceprocamp.webp',
  },
  {
    titulo: 'Técnico em Meio Ambiente',
    desc: 'Análise, preservação e gestão sustentável de recursos naturais e ecossistemas.',
    imgUrl: './imgs/icones/tec_meio_ambiente_ceprocamp.webp',
  },
  {
    titulo: 'Técnico em Química',
    desc: 'Atuação em laboratórios, controle de qualidade e processos industriais químicos.',
    imgUrl: '/imgs/icones/tec_quimica_ceprocamp.webp',
  },
  {
    titulo: 'QP Cuidador de Idosos',
    desc: 'Profissional responsável por auxiliar pessoas idosas em suas atividades diárias, garantindo bem-estar, segurança e qualidade de vida.',
    imgUrl: '/imgs/icones/cuidador_idoso_ceprocamp.webp',
  },
]

export default function App() {
  const { conteudo } = useContent()
  const { institucional, cursosIntro, pepi } = conteudo.home
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cursoSelecionadoId, setCursoSelecionadoId] = useState<string | null>(
    null,
  )

  // CONTROLE DE ESTADO DA TELA ATIVA E DA TELA ANTERIOR
  const [telaAtiva, setTelaAtiva] = useState<
    'inicio' | 'informacoes' | 'login' | 'admin' | 'sobre' | 'noticias'
  >('inicio')
  const [telaAnterior, setTelaAnterior] = useState<
    'inicio' | 'informacoes' | 'login' | 'admin' | 'sobre' | 'noticias'
  >('inicio')

  // Função auxiliar para navegar guardando o histórico
  const navegarPara = (
    novaTela: 'inicio' | 'informacoes' | 'login' | 'admin' | 'sobre' | 'noticias',
  ) => {
    setTelaAnterior(telaAtiva)
    setTelaAtiva(novaTela)
    setIsMenuOpen(false)
    window.scroll({ top: 0, behavior: 'instant' })

    if (novaTela !== 'informacoes') {
      setCursoSelecionadoId(null)
    }
  }

  // ESTADOS PARA SWIPE MOBILE
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const próximoSlide = () => {
    setCurrentSlide((prev) =>
      prev === IMAGENS_CARROSSEL.length - 1 ? 0 : prev + 1,
    )
  }

  const slideAnterior = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? IMAGENS_CARROSSEL.length - 1 : prev - 1,
    )
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distancia = touchStart - touchEnd
    if (Math.abs(distancia) > 50) {
      if (distancia > 0) próximoSlide()
      else slideAnterior()
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  // COMPONENTE HEADER COMPARTILHADO
  const SiteHeader = () => (
    <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-blue-600 focus:text-white rounded-md z-50"
        >
          Pular para o conteúdo principal
        </a>

        <div
          className="flex items-center w-40 shrink-0 cursor-pointer"
          onClick={() => navegarPara('inicio')}
        >
          <img
            className="h-10 md:h-12 w-auto object-contain"
            src="./logo.webp"
            alt="CEPROCAMP - FUMEC"
          />
        </div>

        <nav
          id="menu-principal"
          className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-20 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent border-b md:border-0 border-slate-200 p-6 md:p-0 flex-col md:flex-row flex-1 justify-center transition-all duration-200`}
          aria-label="Navegação principal"
        >
          <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-8 font-medium text-slate-600 w-full md:w-auto">
            <li>
              <button
                onClick={() => navegarPara('inicio')}
                className={`w-full md:w-auto text-left py-2 md:py-0 transition-colors cursor-pointer text-base font-semibold ${telaAtiva === 'inicio' ? 'text-blue-700 font-bold' : 'hover:text-blue-700'}`}
              >
                Inicio
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCursoSelecionadoId(null)
                  navegarPara('informacoes')
                }}
                className={`w-full md:w-auto text-left py-2 md:py-0 transition-colors cursor-pointer text-base font-semibold ${telaAtiva === 'informacoes' ? 'text-blue-700 font-bold' : 'hover:text-blue-700'}`}
              >
                Informações
              </button>
            </li>
            <li>
              <button
                onClick={() => navegarPara('sobre')}
                className={`w-full md:w-auto text-left py-2 md:py-0 transition-colors cursor-pointer text-base font-semibold ${
                  telaAtiva === 'sobre'
                    ? 'text-blue-700 font-bold'
                    : 'hover:text-blue-700'
                }`}
              >
                Sobre
              </button>
            </li>
             <li>
              <button
                onClick={() => navegarPara('noticias')}
                className={`w-full md:w-auto text-left py-2 md:py-0 transition-colors cursor-pointer text-base font-semibold ${
                  telaAtiva === 'noticias'
                    ? 'text-blue-700 font-bold'
                    : 'hover:text-blue-700'
                }`}
              >
                Notícias
              </button>
            </li>
            <li className="w-full md:hidden pt-4 border-t border-slate-100 text-center">
              <button
                onClick={() => navegarPara('login')}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-98 transition-all cursor-pointer"
              >
                Área Restrita (Login)
              </button>
            </li>
          </ul>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-slate-600 hover:text-blue-700 md:hidden rounded-md focus:outline-2 focus:outline-blue-600"
          aria-expanded={isMenuOpen}
          aria-controls="menu-principal"
          aria-label={
            isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
          }
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        <div className="hidden md:flex items-center justify-end w-40 shrink-0">
          <button
            onClick={() => navegarPara('login')}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs border border-blue-700 transition-colors focus:outline-2 focus:outline-blue-600 focus:outline-offset-4 active:scale-95 cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  )

  // COMPONENTE FOOTER COMPARTILHADO
  const SiteFooter = () => (
    <footer className="w-full bg-slate-900 text-slate-400 py-12 md:py-16 text-sm border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="font-bold text-lg text-slate-100">FUMEC</h3>
          <p className="font-semibold text-slate-100">
            Fundação Municipal para Educação Comunitária
          </p>
          <div className="space-y-1">
            <p>Rua Antônio Cesarino n° 985 - Centro - Campinas/SP</p>
            <p>CEP: 13015-291 - Tel: (19) 3519-4300</p>
          </div>
        </div>
        <div className="space-y-4 text-center md:text-left">
          <h3 className="font-bold text-lg text-slate-100">CEPROCAMP</h3>
          <p className="font-semibold text-slate-100">Unidade Centro</p>
          <div className="space-y-1">
            <p>Avenida 20 de Novembro, 145 – Centro – Campinas/SP</p>
            <p>Horário: Segunda a Sexta das 8h às 21h</p>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center border-t border-slate-800 pt-6">
        <p>&copy; 2026 CEPROCAMP - FUMEC. Todos os direitos reservados.</p>
      </div>
    </footer>
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* RENDERIZAÇÃO LÓGICA DAS TELAS */}

      {telaAtiva === 'inicio' && (
        <>
          <SiteHeader />

          {/* SEÇÃO DO CARROSSEL */}
          <section
            className="w-full aspect-[14/6] md:aspect-auto md:h-[650px] relative overflow-hidden flex items-center justify-center select-none touch-pan-y"
            aria-roledescription="carrossel"
            aria-label="Galeria de fotos institucionais"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={IMAGENS_CARROSSEL[currentSlide].url}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out"
            />
            <button
              onClick={slideAnterior}
              className="absolute left-2 md:left-4 z-20 p-2 md:p-2.5 rounded-full bg-slate-900/50 hover:bg-slate-900/90 text-white border border-slate-700/50 transition-colors focus:outline-2 focus:outline-blue-600 active:scale-95 shadow-md"
              aria-label="Foto anterior"
            >
              <svg
                className="h-4 w-4 md:h-5 md:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={próximoSlide}
              className="absolute right-2 md:right-4 z-20 p-2 md:p-2.5 rounded-full bg-slate-900/50 hover:bg-slate-900/90 text-white border border-slate-700/50 transition-colors focus:outline-2 focus:outline-blue-600 active:scale-95 shadow-md"
              aria-label="Próxima foto"
            >
              <svg
                className="h-4 w-4 md:h-5 md:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2.5 z-20">
              {IMAGENS_CARROSSEL.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-150 shadow-sm focus:outline-2 focus:outline-orange-300 ${index === currentSlide ? 'w-8 bg-orange-500' : 'w-2.5 bg-white/70 hover:bg-white'}`}
                  aria-label={`Ir para a foto ${index + 1}`}
                  aria-current={index === currentSlide ? 'true' : 'false'}
                />
              ))}
            </div>
          </section>

          {/* CONTEÚDO DA HOME */}
          {/* CONTEÚDO DA HOME DINÂMICO */}
          <main
            id="conteudo-principal"
            className="flex-grow max-w-7xl w-full mx-auto px-4 py-12 md:py-16"
          >
            {/* SEÇÃO INSTITUCIONAL */}
            <section
              className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-20"
              aria-label="Sobre o CEPROCAMP"
            >
              <div className="lg:col-span-3 space-y-6">
                <div className="flex gap-1" aria-hidden="true">
                  <span className="w-3 h-1 bg-amber-500 rounded-full" />
                  <span className="w-3 h-1 bg-amber-500 rounded-full" />
                </div>
                <h2 className="text-3xl md:text-4xl font-titulo tracking-tight text-slate-900 uppercase">
                  {institucional.titulo}
                </h2>
                <div className="text-base text-slate-600 leading-relaxed space-y-4 font-normal">
                  <p>{institucional.paragrafo1}</p>
                  <p>{institucional.paragrafo2}</p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => navegarPara('sobre')}
                    className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-xs transition-colors focus:outline-2 focus:outline-blue-600 focus:outline-offset-4 active:scale-95 cursor-pointer"
                  >
                    {institucional.botaoTexto}
                  </button>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="overflow-hidden rounded-[10px] border border-slate-200 shadow-xs group">
                  <img
                    src={institucional.imagem1}
                    alt="Fachada"
                    className="w-full h-58 sm:h-56 lg:h-58 object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-[10px] border border-slate-200 shadow-xs group">
                  <img
                    src={institucional.imagem2}
                    alt="Pátio"
                    className="w-full h-58 sm:h-56 lg:h-58 object-cover"
                  />
                </div>
              </div>
            </section>

            <hr className="border-slate-200 mb-20" />

            {/* SEÇÃO DE CURSOS */}
            <section
              aria-label="Cursos Técnicos e de Qualificação Profissional"
              className="mb-20"
            >
              <div className="max-w-4xl space-y-6 mb-12">
                <div className="flex gap-1" aria-hidden="true">
                  <span className="w-3 h-1 bg-amber-500 rounded-full" />
                  <span className="w-3 h-1 bg-amber-500 rounded-full" />
                </div>
                <h2 className="text-3xl md:text-4xl font-titulo tracking-tight text-slate-900 uppercase">
                  {cursosIntro.titulo}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  {cursosIntro.subtitulo}
                </p>
              </div>
              {/* GRID DE CARDS DOS CURSOS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-10 mt-6 backdrop-blur-[20px]">
                {CURSOS_OFERECIDOS.map((curso, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setCursoSelecionadoId(curso.titulo)
                      navegarPara('informacoes')
                    }}
                    className="relative overflow-hidden rounded-2xl group min-h-[280px] flex flex-col justify-end p-4 md:p-5 cursor-pointer shadow-sm hover:shadow-xl active:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={curso.imgUrl}
                      alt={curso.titulo}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 backdrop-blur-[5px]" />
                    <div className="relative z-10 bg-amber-950/30 backdrop-blur-md p-4 md:p-5 rounded-xl border border-white/10 transform translate-y-0 group-hover:-translate-y-1 group-active:-translate-y-1 transition-transform duration-300">
                      <h3 className="font-bold text-lg text-white mb-2 leading-tight">
                        {curso.titulo}
                      </h3>
                      <p className="text-sm text-slate-200 line-clamp-2">
                        {curso.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* BOTÃO PARA SABER MAIS */}
              <div className="mt-12 text-center">
                <button
                  onClick={() => {
                    setCursoSelecionadoId(null)
                    navegarPara('informacoes')
                  }}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-md transition-all focus:outline-2 focus:outline-slate-900 focus:outline-offset-4 cursor-pointer"
                >
                  {cursosIntro.botaoTexto}
                </button>
              </div>
            </section>

            <hr className="border-slate-200 mb-20" />

            {/* PEPI */}
            <section
              className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-20"
              aria-label="Oportunidades e Estágios - PEPI"
            >
              <div className="lg:col-span-3 space-y-6">
                <div className="flex gap-1" aria-hidden="true">
                  <span className="w-3 h-1 bg-amber-500 rounded-full" />
                  <span className="w-3 h-1 bg-amber-500 rounded-full" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                    {pepi.tag}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-titulo tracking-tight text-slate-900 uppercase">
                    {pepi.titulo}
                  </h2>
                </div>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  <strong>{pepi.descricao}</strong>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-slate-300/60">
                    <h3 className="font-bold text-sm text-slate-800 mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />{' '}
                      {pepi.card1Titulo}
                    </h3>
                    <p className="text-sm text-slate-900 leading-normal">
                      {pepi.card1Desc}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-300/60">
                    <h3 className="font-bold text-sm text-slate-800 mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />{' '}
                      {pepi.card2Titulo}
                    </h3>
                    <p className="text-sm text-slate-900 leading-normal">
                      {pepi.card2Desc}
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-base text-slate-600 leading-relaxed font-normal mb-4">
                    <strong>{pepi.chamadaEmpresas}</strong>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={pepi.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 bg-[#25D366] hover:bg-[#1EBE57] text-white font-medium rounded-xl shadow-sm transition-all focus:outline-2 focus:outline-[#25D366] focus:outline-offset-2 active:scale-95 w-full sm:w-auto"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:${pepi.emailContato}`}
                      className="flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition-all focus:outline-2 focus:outline-blue-600 focus:outline-offset-2 active:scale-95 w-full sm:w-auto"
                    >
                      E-mail
                    </a>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 w-full overflow-hidden rounded-1xl border border-slate-200 shadow-sm bg-slate-950">
                <video
                  controls
                  preload="metadata"
                  poster={pepi.videoPoster}
                  className="w-full aspect-[9/16] object-cover"
                >
                  <source src={pepi.videoUrl} type="video/webm" />
                  Seu navegador não suporta a reprodução de vídeos nativos.
                </video>
              </div>
            </section>
          </main>
          <SiteFooter />
        </>
      )}

      {telaAtiva === 'informacoes' && (
        <>
          <SiteHeader />
          <Info
            cursoSelecionadoId={cursoSelecionadoId}
            onLimparCursoSelecionado={() => setCursoSelecionadoId(null)}
          />
          <SiteFooter />
        </>
      )}

      {telaAtiva === 'sobre' && (
        <>
          <SiteHeader />
          <Sobre />
          <SiteFooter />
        </>
      )}

      {/* TELA DE LOGIN: Passando a função que volta exatamente para a tela anterior */}
      {telaAtiva === 'login' && (
        <LoginView
          onVoltar={() => setTelaAtiva(telaAnterior)}
          onLoginSucesso={() => setTelaAtiva('admin')}
        />
      )}

      {/* TELA EXCLUSIVA DO PAINEL ADMIN */}
      {telaAtiva === 'admin' && (
        <AdminDashboard onLogout={() => setTelaAtiva('inicio')} />
      )}

      {telaAtiva === 'noticias' && (
        <>
          <SiteHeader />
          <Noticias />
          <SiteFooter />
        </>
      )}
    </div>
  )
}
