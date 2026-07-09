import type { MaquinaData } from "../types"

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

export function generateMockMaquina(id: string, nombre: string): MaquinaData {
  return {
    id,
    nombre,
    informativo: {
      estadoYRun: {
        piezas: Math.floor(Math.random() * 500),
        estado: Math.random() > 0.2 ? "Produciendo" : "Detenido",
        turno: ["A", "B", "C"][Math.floor(Math.random() * 3)],
      },
      odtArtDesc: {
        odt: `ODT-${1000 + Math.floor(Math.random() * 9000)}`,
        articulo: `ART-${Math.floor(Math.random() * 999)}`,
        descripcion: "Tubo conduit 1/2 pulgada",
      },
      tonelaje: Math.floor(Math.random() * 10000),
    },
    variables: {
      presNitrogeno: {
        nombre: "Presión N₂",
        actual: randomInRange(4.5, 6.5),
        maxMinNom: {
          ma_desmac: id,
          MolSuc: "01",
          dbp_device: "PLC1",
          ar_codice: "N2",
          ma_codice: "pres",
          dbp_valmin: 4.0,
          dbp_valnom: 5.5,
          dbp_valmax: 7.0,
        },
      },
      tempZinc: {
        nombre: "Temp. Zinc",
        actual: randomInRange(440, 470),
        maxMinNom: {
          ma_desmac: id,
          MolSuc: "01",
          dbp_device: "PLC1",
          ar_codice: "ZN",
          ma_codice: "temp",
          dbp_valmin: 430,
          dbp_valnom: 450,
          dbp_valmax: 480,
        },
      },
      flujoNitrogeno: {
        nombre: "Flujo N₂",
        actual: randomInRange(15, 25),
        maxMinNom: {
          ma_desmac: id,
          MolSuc: "01",
          dbp_device: "PLC1",
          ar_codice: "FL",
          ma_codice: "flujo",
          dbp_valmin: 10,
          dbp_valnom: 20,
          dbp_valmax: 30,
        },
      },
      tempCombustion: {
        nombre: "Temp. Combustión",
        actual: randomInRange(1100, 1300),
        maxMinNom: {
          ma_desmac: id,
          MolSuc: "01",
          dbp_device: "PLC1",
          ar_codice: "TC",
          ma_codice: "comb",
          dbp_valmin: 1050,
          dbp_valnom: 1200,
          dbp_valmax: 1350,
        },
      },
    },
  }
}

export function generateMockData(): Record<string, MaquinaData> {
  return {
    mxm001: generateMockMaquina("mxm001", "Molino 1"),
    mxm002: generateMockMaquina("mxm002", "Molino 2"),
    mxm003: generateMockMaquina("mxm003", "Molino 3"),
    mxsl1: generateMockMaquina("mxsl1", "Slitter"),
    mxrs1: generateMockMaquina("mxrs1", "Roscadora"),
  }
}
