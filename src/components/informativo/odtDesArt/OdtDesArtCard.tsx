import { FileText, Package, Info } from "lucide-react"
import { Item } from "./Item"
import type { OdtArtDesc } from "../../../types"

interface OdtDesArtCardProps {
  odtArtDesc: OdtArtDesc
}

export function OdtDesArtCard({ odtArtDesc }: OdtDesArtCardProps) {
  const { odt, articulo, descripcion } = odtArtDesc

  return (
    <div className="panel accent-top p-5 space-y-3">
      <Item icon={FileText} label="ODT" value={odt} />
      <Item icon={Package} label="Articulo" value={articulo} />
      <Item icon={Info} label="Descripcion" value={descripcion} />
    </div>
  )
}
