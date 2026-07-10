import { FileText, Package, Info } from "lucide-react"
import { Item } from "./Item"
import type { OdtArtDesc } from "../../../types"

interface OdtDesArtCardProps {
  odtArtDesc: OdtArtDesc
}

export function OdtDesArtCard({ odtArtDesc }: OdtDesArtCardProps) {
  const { odt, articulo, descripcion } = odtArtDesc

  return (
    <div className="bg-[var(--surface-color)] radius-panel border border-[var(--border-color)] overflow-hidden">
      <div className="px-3 py-2 border-b border-[var(--border-color)]">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)] font-medium">Orden de Trabajo</h3>
      </div>
      <div className="p-3 space-y-2">
        <Item icon={FileText} label="ODT" value={odt} />
        <Item icon={Package} label="Articulo" value={articulo} />
        <Item icon={Info} label="Descripcion" value={descripcion} />
      </div>
    </div>
  )
}
