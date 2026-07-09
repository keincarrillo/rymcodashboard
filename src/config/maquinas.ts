export interface MaquinaConfig {
  id: string
  nombre: string
  alias: string
}

export const MAQUINAS: MaquinaConfig[] = [
  { id: "mxm001", nombre: "Molino 1", alias: "Molino 1" },
  { id: "mxm002", nombre: "Molino 2", alias: "Molino 2" },
  { id: "mxm003", nombre: "Molino 3", alias: "Molino 3" },
  { id: "mxsl1", nombre: "Slitter", alias: "Slitter" },
  { id: "mxrs1", nombre: "Roscadora", alias: "Roscadora" },
]

export const MAQUINAS_IDS = MAQUINAS.map((m) => m.id)

export const getMaquinaConfig = (id: string) =>
  MAQUINAS.find((m) => m.id === id)
