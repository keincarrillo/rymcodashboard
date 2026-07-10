import type { Colors } from "../types"

export function getColor(
  valor: number,
  min: number,
  max: number,
  estado: string
): Colors {
  if (isNaN(valor) || isNaN(min) || isNaN(max)) return "black"
  if (estado === "Detenido") return "stop"
  if (min === 0 && max === 0) return "accent"

  if (valor < min || valor > max) return "red"

  const media = (min + max) / 2
  const rangoInferior = (min + media) / 2
  const rangoSuperior = (media + max) / 2

  if (valor >= rangoInferior && valor <= rangoSuperior) return "accent"

  return "orange"
}