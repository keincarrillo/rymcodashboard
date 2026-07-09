import type { Alarma, AlarmaSeveridad } from "../types"

export function getSeveridad(valor: number, min: number, max: number): AlarmaSeveridad {
  if (min === 0 && max === 0) return "sin_rango"
  if (valor < min || valor > max) return "critica"

  const media = (min + max) / 2
  const rangoInferior = (min + media) / 2
  const rangoSuperior = (media + max) / 2

  if (valor < rangoInferior || valor > rangoSuperior) return "preventivo"

  return "preventivo"
}

export function crearAlarma(
  maquinaId: string,
  maquinaNombre: string,
  variableKey: string,
  variableNombre: string,
  valor: number,
  min: number,
  max: number
): Alarma | null {
  const severidad = getSeveridad(valor, min, max)

  if (severidad === "sin_rango") return null

  return {
    id: `${maquinaId}-${variableKey}-${Date.now()}`,
    maquinaId,
    maquinaNombre,
    variableKey,
    variableNombre,
    valor,
    min,
    max,
    severidad,
    timestamp: Date.now(),
    activa: true,
  }
}