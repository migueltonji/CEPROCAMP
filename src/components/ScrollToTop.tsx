import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visivel, setVisivel] = useState(false)

  // Monitora a rolagem da página para mostrar/esconder o botão
  useEffect(() => {
    const checarScroll = () => {
      if (window.scrollY > 300) {
        setVisivel(true)
      } else {
        setVisivel(false)
      }
    }

    window.addEventListener('scroll', checarScroll, { passive: true })
    return () => window.removeEventListener('scroll', checarScroll)
  }, [])

  // Função nativa de rolagem suave até o topo
  const voltarAoTopo = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!visivel) return null

  return (
    <button
      onClick={voltarAoTopo}
      aria-label="Voltar ao topo da página"
      className="fixed bottom-6 right-6 z-50 p-3.5 bg-blue-600 hover:bg-blue-700 active:scale-90 text-white rounded-full shadow-lg shadow-blue-900/30 backdrop-blur-md transition-all duration-300 animate-in fade-in zoom-in-75 cursor-pointer touch-manipulation border border-white/20"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}