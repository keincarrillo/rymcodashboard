import { describe, it, expect } from "vitest"
import { generateMockMaquina, generateMockData } from "../mockData"

describe("generateMockMaquina", () => {
  it("returns a MaquinaData object with correct id and nombre", () => {
    const result = generateMockMaquina("mxm001", "Molino 1")
    expect(result.id).toBe("mxm001")
    expect(result.nombre).toBe("Molino 1")
  })

  it("includes informativo section", () => {
    const result = generateMockMaquina("mxm001", "Molino 1")
    expect(result.informativo).toBeDefined()
    expect(result.informativo.estadoYRun).toBeDefined()
    expect(result.informativo.odtArtDesc).toBeDefined()
    expect(typeof result.informativo.tonelaje).toBe("number")
  })

  it("includes variables section", () => {
    const result = generateMockMaquina("mxm001", "Molino 1")
    expect(result.variables).toBeDefined()
    expect(result.variables.presNitrogeno).toBeDefined()
    expect(result.variables.tempZinc).toBeDefined()
    expect(result.variables.flujoNitrogeno).toBeDefined()
    expect(result.variables.tempCombustion).toBeDefined()
  })

  it("generates values within expected ranges", () => {
    const result = generateMockMaquina("mxm001", "Molino 1")
    const n2 = result.variables.presNitrogeno!
    expect(n2.actual).toBeGreaterThanOrEqual(4.0)
    expect(n2.actual).toBeLessThanOrEqual(7.0)
    expect(n2.maxMinNom.dbp_valmin).toBe(4.0)
    expect(n2.maxMinNom.dbp_valmax).toBe(7.0)
  })

  it("generates different values on each call", () => {
    const a = generateMockMaquina("mxm001", "Molino 1")
    const b = generateMockMaquina("mxm001", "Molino 1")
    // At least one value should differ (statistically guaranteed with random)
    const valuesA = Object.values(a.variables).map((v) => v?.actual)
    const valuesB = Object.values(b.variables).map((v) => v?.actual)
    const allSame = valuesA.every((v, i) => v === valuesB[i])
    expect(allSame).toBe(false)
  })
})

describe("generateMockData", () => {
  it("returns data for all 5 machines", () => {
    const result = generateMockData()
    expect(Object.keys(result)).toHaveLength(5)
    expect(result.mxm001).toBeDefined()
    expect(result.mxm002).toBeDefined()
    expect(result.mxm003).toBeDefined()
    expect(result.mxsl1).toBeDefined()
    expect(result.mxrs1).toBeDefined()
  })

  it("each machine has correct id", () => {
    const result = generateMockData()
    expect(result.mxm001.id).toBe("mxm001")
    expect(result.mxsl1.id).toBe("mxsl1")
    expect(result.mxrs1.id).toBe("mxrs1")
  })
})
