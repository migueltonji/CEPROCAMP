// src/services/api.ts
import type {
  ImagemCarrosselItem,
  CursoItem,
  UnidadeItem,
} from '../types/admin'
import { CURSOS_DETALHADOS } from '../data/cursosData'
import { UNIDADES_CEPROCAMP } from '../data/unidadesData'

// Inicializa dados no localStorage se não existirem
const initMockData = () => {
  if (!localStorage.getItem('admin_cursos')) {
    localStorage.setItem('admin_cursos', JSON.stringify(CURSOS_DETALHADOS))
  }
  if (!localStorage.getItem('admin_unidades')) {
    localStorage.setItem('admin_unidades', JSON.stringify(UNIDADES_CEPROCAMP))
  }
  if (!localStorage.getItem('admin_carrossel')) {
    const defaultCarrossel: ImagemCarrosselItem[] = [
      {
        id: 1,
        url: '/imgs/carrossel/inovationWeek_ceprocamp.webp',
        titulo: 'Innovation Week',
      },
      {
        id: 2,
        url: '/imgs/carrossel/bolo_ceprocamp.webp',
        titulo: 'Confeitaria',
      },
      { id: 3, url: '/imgs/carrossel/gestao_ceprocamp.webp', titulo: 'Gestão' },
      {
        id: 4,
        url: '/imgs/carrossel/TST_ceprocamp.webp',
        titulo: 'Segurança do Trabalho',
      },
      {
        id: 5,
        url: '/imgs/carrossel/auditorio_ceprocamp.webp',
        titulo: 'Auditório',
      },
      {
        id: 6,
        url: '/imgs/carrossel/padaria_ceprocamp.webp',
        titulo: 'Padaria',
      },
    ]
    localStorage.setItem('admin_carrossel', JSON.stringify(defaultCarrossel))
  }
}

initMockData()
const AUTH_KEY = 'ceprocamp_auth_token'
export const apiService = {
  login: async (usuario: string, senha: string): Promise<boolean> => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
    const adminSenha = import.meta.env.VITE_ADMIN_PASSWORD

    // Valida sem expor os valores no código-fonte
    if (
      adminEmail &&
      adminSenha &&
      usuario === adminEmail &&
      senha === adminSenha
    ) {
      localStorage.setItem(AUTH_KEY, 'sessao_admin_ativa')
      return true
    }

    return false
  },

  isAutenticado: (): boolean => {
    return localStorage.getItem(AUTH_KEY) === 'sessao_admin_ativa'
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY)
  },

  // CARROSSEL
  getCarrossel: async (): Promise<ImagemCarrosselItem[]> => {
    return JSON.parse(localStorage.getItem('admin_carrossel') || '[]')
  },
  updateCarrossel: async (items: ImagemCarrosselItem[]): Promise<void> => {
    localStorage.setItem('admin_carrossel', JSON.stringify(items))
  },

  // CURSOS
  getCursos: async (): Promise<CursoItem[]> => {
    return JSON.parse(localStorage.getItem('admin_cursos') || '[]')
  },
  saveCursos: async (cursos: CursoItem[]): Promise<void> => {
    localStorage.setItem('admin_cursos', JSON.stringify(cursos))
  },

  // UNIDADES
  getUnidades: async (): Promise<UnidadeItem[]> => {
    return JSON.parse(localStorage.getItem('admin_unidades') || '[]')
  },
  saveUnidades: async (unidades: UnidadeItem[]): Promise<void> => {
    localStorage.setItem('admin_unidades', JSON.stringify(unidades))
  },
}
