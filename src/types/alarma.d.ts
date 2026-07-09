type AlarmaSeveridad = "critica" | "preventivo" | "sin_rango"

interface Alarma {
  id: string
  maquinaId: string
  maquinaNombre: string
  variableKey: string
  variableNombre: string
  valor: number
  min: number
  max: number
  severidad: AlarmaSeveridad
  timestamp: number
  activa: boolean
}

type AlarmasContextType = {
  alarmas: Alarma[]
  alarmasActivas: Alarma[]
  limpiarAlarma: (id: string) => void
}

export type { Alarma, AlarmaSeveridad, AlarmasContextType }