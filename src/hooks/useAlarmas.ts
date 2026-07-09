import { useContext } from "react"
import { AlarmaContext } from "../context/AlarmaContext"

export function useAlarmas() {
  const context = useContext(AlarmaContext)
  if (!context) {
    throw new Error("useAlarmas must be used within an AlarmaProvider")
  }
  return context
}