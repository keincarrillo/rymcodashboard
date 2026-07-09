import { createContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useSocket } from "../hooks/useSocket"
import { crearAlarma } from "../utils/alarmLogic"
import type { Alarma, AlarmasContextType } from "../types"

export const AlarmaContext = createContext<AlarmasContextType>({
  alarmas: [],
  alarmasActivas: [],
  limpiarAlarma: () => {},
})

export function AlarmaProvider({ children }: { children: ReactNode }) {
  const { maquinasData } = useSocket()
  const [alarmas, setAlarmas] = useState<Alarma[]>([])

  useEffect(() => {
    const nuevasAlarmas: Alarma[] = []

    for (const maquina of maquinasData) {
      for (const [key, variable] of Object.entries(maquina.variables)) {
        if (!variable) continue

        const { actual, maxMinNom } = variable
        const { dbp_valmin, dbp_valmax } = maxMinNom

        const alarma = crearAlarma(
          maquina.id,
          maquina.nombre,
          key,
          variable.nombre || key,
          actual,
          dbp_valmin,
          dbp_valmax
        )

        if (alarma) {
          nuevasAlarmas.push(alarma)
        }
      }
    }

    setAlarmas(nuevasAlarmas)
  }, [maquinasData])

  const limpiarAlarma = useCallback((id: string) => {
    setAlarmas((prev) =>
      prev.map((a) => (a.id === id ? { ...a, activa: false } : a))
    )
  }, [])

  const alarmasActivas = alarmas.filter((a) => a.activa)

  return (
    <AlarmaContext.Provider value={{ alarmas, alarmasActivas, limpiarAlarma }}>
      {children}
    </AlarmaContext.Provider>
  )
}