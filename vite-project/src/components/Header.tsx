import React, { useEffect, useState } from 'react'

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [today, setToday] = useState<string>('')

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: '2-digit'
      })
    )
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-30 transition-colors duration-300 ${scrolled ? 'bg-[#134b47]/90 backdrop-blur border-b border-[#0e3a37]' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between rounded-full bg-white/90 border border-gray-200 px-4 py-2 shadow-sm">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="size-8 rounded bg-black text-white flex items-center justify-center text-xs font-bold">PR</div>
            <span className="font-semibold lowercase tracking-tight">pr tracker</span>
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-600 hidden sm:inline" aria-label={`Today is ${today}`}>{today}</span>
            {/* <button className="text-xs text-white bg-[#0f7a6e] hover:bg-[#0d665c] px-3 py-1 rounded-full">login →</button> */}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
