import { FileText, Package, Info } from "lucide-react"
import { Item } from "./Item"
import type { OdtArtDesc } from "../../../types"

interface OdtDesArtCardProps {
  odtArtDesc: OdtArtDesc
}

export function OdtDesArtCard({ odtArtDesc }: OdtDesArtCardProps) {
  const { odt, articulo, descripcion } = odtArtDesc

  return (
    <div className="bg-[var(--panel-color)] rounded-xl border border-gray-700 p-4">
      <h3 className="text-sm font-medium mb-3 opacity-70">Orden de Trabajo</h3>
      <div className="space-y-3">
        <Item icon={FileText} label="ODT" value={odt} />
        <Item icon={Package} label="Artículo" value={articulo} />
        <Item icon={Info} label="Descripción" value={descripcion} />
      </div>
    </div>
  )
}