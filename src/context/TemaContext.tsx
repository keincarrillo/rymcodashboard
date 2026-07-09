import { createContext, useState, useEffect, type ReactNode } from "react"

interface TemaContextType {
  isDark: boolean
  toggleTema: () => void
}

export const TemaContext = createContext<TemaContextType>({
  isDark: true,
  toggleTema: () => {},
})

export function TemaProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("tema")
    return saved ? saved === "dark" : true
  })

  useEffect(() => {
    localStorage.setItem("tema", isDark ? "dark" : "light")
    document.documentElement.classList.toggle("light", !isDark)
  }, [isDark])

  const toggleTema = () => setIsDark(!isDark)

  return (
    <TemaContext.Provider value={{ isDark, toggleTema }}>
      {children}
    </TemaContext.Provider>
  )
}