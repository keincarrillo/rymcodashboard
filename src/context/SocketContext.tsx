import { createContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react"
import type { MaquinaData, SocketContextType } from "../types"
import { MAQUINAS_IDS, MAQUINAS } from "../config/maquinas"
import { generateMockMaquina } from "../mocks/mockData"

export const SocketContext = createContext<SocketContextType>({
  maquinasData: [],
  getMaquina: () => undefined,
  isConnected: false,
  isMockMode: false,
})

export function SocketProvider({ children }: { children: ReactNode }) {
  const [maquinasData, setMaquinasData] = useState<MaquinaData[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isMockMode, setIsMockMode] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<number | null>(null)
  const mockIntervalRef = useRef<number | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5

  const getMaquina = useCallback(
    (id: string) => maquinasData.find((m) => m.id === id),
    [maquinasData]
  )

  const startMockMode = useCallback(() => {
    console.log("[Socket] Modo mock activado — datos simulados")
    setIsMockMode(true)
    setIsConnected(false)

    const updateMocks = () => {
      setMaquinasData(
        MAQUINAS.map((m) => generateMockMaquina(m.id, m.nombre))
      )
    }

    updateMocks()
    mockIntervalRef.current = window.setInterval(updateMocks, 3000)
  }, [])

  const stopMockMode = useCallback(() => {
    if (mockIntervalRef.current) {
      clearInterval(mockIntervalRef.current)
      mockIntervalRef.current = null
    }
    setIsMockMode(false)
  }, [])

  const connect = useCallback(() => {
    const useMocks = import.meta.env.VITE_USE_MOCKS === "true"

    if (useMocks) {
      startMockMode()
      return
    }

    const url = import.meta.env.VITE_SOCKET_URL || "ws://localhost:8080"

    try {
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        console.log("[Socket] Conectado a", url)
        setIsConnected(true)
        reconnectAttempts.current = 0
        stopMockMode()
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          const filtered: MaquinaData[] = []

          for (const id of MAQUINAS_IDS) {
            if (data[id]) {
              filtered.push({
                id,
                nombre: data[id].nombre || id,
                informativo: data[id].informativo || {
                  estadoYRun: { piezas: 0, estado: "Desconocido", turno: "-" },
                  odtArtDesc: { odt: "-", articulo: "-", descripcion: "-" },
                  tonelaje: 0,
                },
                variables: data[id].variables || {},
              })
            }
          }

          setMaquinasData(filtered)
        } catch (err) {
          console.error("[Socket] Error parseando mensaje:", err)
        }
      }

      ws.onclose = () => {
        console.log("[Socket] Desconectado")
        setIsConnected(false)
        wsRef.current = null
        scheduleReconnect()
      }

      ws.onerror = (err) => {
        console.error("[Socket] Error:", err)
        ws.close()
      }
    } catch (err) {
      console.error("[Socket] Error creando conexión:", err)
      scheduleReconnect()
    }
  }, [startMockMode, stopMockMode])

  const scheduleReconnect = useCallback(() => {
    if (reconnectAttempts.current >= maxReconnectAttempts) {
      console.log("[Socket] Máximo de reconexiones alcanzado — activando modo mock")
      startMockMode()
      return
    }

    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000)
    console.log(`[Socket] Reconectando en ${delay}ms (intento ${reconnectAttempts.current + 1})`)

    reconnectTimeoutRef.current = window.setTimeout(() => {
      reconnectAttempts.current++
      connect()
    }, delay)
  }, [connect, startMockMode])

  useEffect(() => {
    connect()

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
      }
      stopMockMode()
    }
  }, [connect, stopMockMode])

  return (
    <SocketContext.Provider value={{ maquinasData, getMaquina, isConnected, isMockMode }}>
      {children}
    </SocketContext.Provider>
  )
}