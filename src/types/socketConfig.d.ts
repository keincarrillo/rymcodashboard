import { MaquinaData } from "./maquina"

type SocketContextType = {
  maquinasData: MaquinaData[]
  getMaquina: (id: string) => MaquinaData | undefined
  isConnected: boolean
  isMockMode: boolean
}

export type { SocketContextType }