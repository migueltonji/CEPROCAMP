# 🎓 Portal Institucional CEPROCAMP & CMS Integrado

> Modernização da plataforma digital do Centro Profissionalizante de Campinas (CEPROCAMP / FUMEC), unindo um portal público informativo a um painel administrativo (CMS) completo para gestão de cursos, notícias e conteúdos institucionais.

---

## 📌 Visão Geral

O projeto foi concebido para atender às demandas de comunicação pública da instituição educacional, oferecendo uma experiência fluida, acessível e responsiva para alunos e cidadãos, além de uma interface de administração independente para a equipe pedagógica.

### Principais Funcionalidades

* **Arquitetura SPA Reativa:** Navegação desacoplada baseada em estados sem dependências de roteamento externas complexas, com controle de histórico, restauração automática de scroll e sincronização entre seções.
* **Catálogo Dinâmico de Cursos:** Apresentação de cursos técnicos e de qualificação profissional com filtros por modalidade e modal com detalhes acadêmicos (duração, carga horária, mercado e requisitos).
* **Mural de Notícias & Carrossel Híbrido:**
  * Carrossel de destaques no topo com suporte nativo a gestos de toque no mobile (*touch swipe*).
  * Grade completa de publicações com resumos (`line-clamp`) e **Modal de Leitura Completa**.
  * Controle direto de "Destaque" configurável pelo administrador.
* **Painel Administrativo Completo (CMS):**
  * Gerenciamento de seções institucionais da Home (Boas-vindas, PEPI, Contatos).
  * CRUD completo de notícias com suporte a upload de imagens (Base64) e links externos.
  * Sessão administrativa persistente, permitindo alternar livremente entre o painel de gestão e a visualização do portal público sem perda de login.
  * Monitor de status de conexão com o back-end.

---
 ## PROJETO: https://ceprocamp-nine.vercel.app/
---

## 🛠️ Tecnologias Utilizadas

* **Front-End:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Gerenciamento de Estado:** React Context API + Custom Hooks (*Lifting State Up*)
* **Persistência Temporária:** Browser `localStorage` (com fallback para mock tipado)
* **Back-End (Em Integração):** Node.js / Express hospedado no [Render](https://render.com/)

---

## 📁 Estrutura de Pastas

```text
src/
├── assets/          # Ícones, vetores e imagens estáticas
├── components/      # Componentes reutilizáveis
│   ├── admin/       # Módulos de gestão (GerenciarNoticias, GerenciarHome, etc.)
│   ├── info/        # Seções de detalhes (SecaoCursos, SecaoMatriz, etc.)
│   └── layout/      # Componentes estruturais (Header, Footer, ScrollToTop)
├── context/         # ContentContext (estado global institucional)
├── data/            # Dados mockados e estruturas padrão de inicialização
├── services/        # Camada de comunicação com API e autenticação
├── types/           # Interfaces e tipos estritos do TypeScript
├── views/           # Páginas principais da aplicação (Home, Info, Noticias, Sobre, Login, Admin)
├── App.tsx          # Orquestrador de telas e transições
└── main.tsx         # Ponto de entrada do React DOM
