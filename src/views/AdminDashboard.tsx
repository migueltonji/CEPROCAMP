// src/views/AdminDashboard.tsx
import { useState } from 'react'
import GerenciarCarrossel from '../components/admin/GerenciarCarrossel'
import GerenciarCursos from '../components/admin/GerenciarCursos'
import GerenciarUnidades from '../components/admin/GerenciarUnidades'
import GerenciarHome from '../components/admin/GerenciarHome'
import GerenciarInfo from '../components/admin/GerenciarInfo'
import { apiService } from '../services/api'
import GerenciarNoticias from '../components/admin/GerenciarNoticias'

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [abaAtiva, setAbaAtiva] = useState<
    | 'carrossel'
    | 'cursos'
    | 'unidades'
    | 'homeSecoes'
    | 'infoSecoes'
    | 'noticias'
  >('homeSecoes')

  const handleSair = () => {
    apiService.logout()
    onLogout()
  }

  const itensMenu = [
    { id: 'homeSecoes', label: 'Inicio' },
    { id: 'carrossel', label: 'Carrossel Principal' },
    { id: 'infoSecoes', label: 'Informações' },
    { id: 'cursos', label: 'Cursos Ofertados' },
    { id: 'unidades', label: 'Unidades e Polos' },
    { id: 'noticias', label: 'Notícias Principais' },
  ]

  return (
    <div className="relative min-h-screen w-full flex flex-col  antialiased bg-slate-950 text-slate-800 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Imagem de Fundo com Blur */}
      <div
        className="fixed inset-0 bg-cover bg-center filter blur-md scale-105 opacity-85 pointer-events-none"
        style={{ backgroundImage: `url('/fundo_login.webp')` }}
      />
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-[2px] pointer-events-none" />

      {/* Topo do Painel */}
      <header className="relative z-20 bg-slate-900/90 backdrop-blur-md border-b border-white/10 text-white px-6 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <span className="bg-blue-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-md tracking-wider uppercase">
            ADMIN
          </span>
          <h1 className="text-sm sm:text-base font-bold tracking-tight text-white p-2.5">
            Painel de Gestão <span className="text-blue-400">CEPROCAMP</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-blue-600 text-white px-3.5 py-2 rounded-xl border border-white/10 transition-all cursor-pointer"
          >
            Voltar ao Portal
          </button>

          <button
            onClick={handleSair}
            className="inline-flex items-center gap-2 text-xs font-bold bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white px-3.5 py-2 rounded-xl transition-all cursor-pointer border border-slate-700/50"
          >
            Encerrar Sessão
          </button>
        </div>
      </header>

      {/* Grid Principal */}
      <div className="relative z-10 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Menu Lateral */}
        <aside className="lg:col-span-3 bg-white/95 backdrop-blur-md p-3 rounded-md border border-white/20 shadow-2xl flex flex-col gap-1">
          <div className="px-3 py-2 mb-1 border-b border-slate-100">
            <span className="text-[12px] font-bold uppercase tracking-wider text-amber-600">
              Gerenciamento
            </span>
          </div>

          {itensMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => setAbaAtiva(item.id as any)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md font-semibold text-[14px] transition-all cursor-pointer ${
                abaAtiva === item.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20 translate-x-1'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </aside>

        {/* Área Central */}
        <main className="lg:col-span-9 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-lg border border-white/20 shadow-2xl min-h-[550px]">
          {abaAtiva === 'homeSecoes' && <GerenciarHome />}
          {abaAtiva === 'infoSecoes' && <GerenciarInfo />}
          {abaAtiva === 'carrossel' && <GerenciarCarrossel />}
          {abaAtiva === 'cursos' && <GerenciarCursos />}
          {abaAtiva === 'unidades' && <GerenciarUnidades />}
          {abaAtiva === 'noticias' && <GerenciarNoticias />}
        </main>
      </div>
    </div>
  )
}
