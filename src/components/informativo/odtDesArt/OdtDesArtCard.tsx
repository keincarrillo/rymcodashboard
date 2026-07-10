import { FileText, Package, Info } from "lucide-react"
import { Item } from "./Item"
import type { OdtArtDesc } from "../../../types"

interface OdtDesArtCardProps {
  odtArtDesc: OdtArtDesc
}

export function OdtDesArtCard({ odtArtDesc }: OdtDesArtCardProps) {
  const { odt, articulo, descripcion } = odtArtDesc

  return (
    <div className="panel overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[var(--border-color)] flex items-center gap-2">
        <span className="w-1 h-3 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent-glow)]" />
        <h3 className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)] font-medium">Orden de Trabajo</h3>
      </div>
      <div className="p-5 space-y-3">
        <Item icon={FileText} label="ODT" value={odt} />
        <Item icon={Package} label="Articulo" value={articulo} />
        <Item icon={Info} label="Descripcion" value={descripcion} />
      </div>
    </div>
  )
}
