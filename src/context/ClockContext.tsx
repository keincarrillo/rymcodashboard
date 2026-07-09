import { createContext, useState, useEffect, type ReactNode } from "react"

interface ClockContextType {
  time: Date
  formatTime: () => string
  formatDate: () => string
}

export const ClockContext = createContext<ClockContextType>({
  time: new Date(),
  formatTime: () => "",
  formatDate: () => "",
})

export function ClockProvider({ children }: { children: ReactNode }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = () => {
    return time.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/Mexico_City",
    })
  }

  const formatDate = () => {
    return time.toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Mexico_City",
    })
  }

  return (
    <ClockContext.Provider value={{ time, formatTime, formatDate }}>
      {children}
    </ClockContext.Provider>
  )
}