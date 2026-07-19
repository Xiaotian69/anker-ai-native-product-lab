import type {
  ConfidenceLevel,
  EvidenceItem,
  EvidenceType,
} from '../types'

export interface EvidenceFilters {
  query?: string
  scene?: string
  minSeverity?: number
  confidence?: ConfidenceLevel
  dataType?: EvidenceType
}

export const filterEvidence = (
  items: readonly EvidenceItem[],
  filters: EvidenceFilters,
): EvidenceItem[] => {
  const query = filters.query?.trim().toLocaleLowerCase() ?? ''
  const minimumSeverity = filters.minSeverity ?? 0

  return items.filter((item) => {
    const searchable = [
      item.id,
      item.title,
      item.problem,
      item.summary,
      ...item.tags,
    ]
      .join(' ')
      .toLocaleLowerCase()

    return (
      (!query || searchable.includes(query)) &&
      (!filters.scene || item.scene === filters.scene) &&
      item.severity >= minimumSeverity &&
      (!filters.confidence || item.confidence === filters.confidence) &&
      (!filters.dataType || item.dataType === filters.dataType)
    )
  })
}
