import { describe, it, expect } from "vitest"
import { getSeveridad, crearAlarma } from "../alarmLogic"

describe("getSeveridad", () => {
  it("returns sin_rango when min and max are 0", () => {
    expect(getSeveridad(50, 0, 0)).toBe("sin_rango")
  })

  it("returns critica when value is below min", () => {
    expect(getSeveridad(-5, 0, 100)).toBe("critica")
  })

  it("returns critica when value is above max", () => {
    expect(getSeveridad(150, 0, 100)).toBe("critica")
  })

  it("returns preventivo when value is in warning zone", () => {
    expect(getSeveridad(10, 0, 100)).toBe("preventivo")
  })

  it("returns preventivo when value is in safe zone", () => {
    expect(getSeveridad(50, 0, 100)).toBe("preventivo")
  })
})

describe("crearAlarma", () => {
  it("returns null when severidad is sin_rango", () => {
    const result = crearAlarma("id1", "Molino 1", "var1", "Presión", 50, 0, 0)
    expect(result).toBeNull()
  })

  it("creates an alarma with correct fields", () => {
    const result = crearAlarma("id1", "Molino 1", "var1", "Presión", 5, 4, 7)
    expect(result).not.toBeNull()
    expect(result!.id).toContain("id1-var1-")
    expect(result!.maquinaId).toBe("id1")
    expect(result!.maquinaNombre).toBe("Molino 1")
    expect(result!.variableKey).toBe("var1")
    expect(result!.variableNombre).toBe("Presión")
    expect(result!.valor).toBe(5)
    expect(result!.min).toBe(4)
    expect(result!.max).toBe(7)
    expect(result!.activa).toBe(true)
  })

  it("creates alarma with critica severidad when out of range", () => {
    const result = crearAlarma("id1", "Molino 1", "var1", "Presión", 10, 4, 7)
    expect(result!.severidad).toBe("critica")
  })

  it("creates alarma with preventivo severidad when in warning zone", () => {
    const result = crearAlarma("id1", "Molino 1", "var1", "Presión", 4.5, 4, 7)
    expect(result!.severidad).toBe("preventivo")
  })
})
