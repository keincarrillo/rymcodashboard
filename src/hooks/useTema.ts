import { useContext } from "react"
import { TemaContext } from "../context/TemaContext"

export function useTema() {
  const context = useContext(TemaContext)
  if (!context) {
    throw new Error("useTema must be used within a TemaProvider")
  }
  return context
}