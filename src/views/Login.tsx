// src/login.tsx
import React, { useState } from 'react'
import { apiService } from '../services/api'

interface LoginViewProps {
  onVoltar: () => void
  onLoginSucesso: () => void
}

export const LoginView: React.FC<LoginViewProps> = ({
  onVoltar,
  onLoginSucesso,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      await apiService.login(email, password)
      onLoginSucesso()
    } catch (err: any) {
      setErro(err.message || 'Erro ao realizar login.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md scale-105 opacity-80"
        style={{ backgroundImage: `url('/fundo_login.webp')` }}
      />
      <div className="absolute inset-0 bg-slate-900/30" />

      <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-slate-800 uppercase tracking-wider">
            Acesso ao <span className="text-blue-600">Painel</span>
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Insira suas credenciais para continuar
          </p>
        </div>

        {erro && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-lg text-center">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              E-mail
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@fumec.sp.gov.br"
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onVoltar}
              className="flex-1 py-3.5 px-4 bg-slate-100  hover:bg-amber-500 text-slate-700 font-bold rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all duration-200 uppercase tracking-wider text-sm cursor-pointer"
            >
              Voltar
            </button>
            <button
              type="submit"
              disabled={carregando}
              className="flex-1 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 uppercase tracking-wider text-sm cursor-pointer disabled:opacity-60"
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <a
            href="#esqueci-senha"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Esqueceu sua senha? Entre em contato com o suporte
          </a>
        </div>
      </div>
    </div>
  )
}
