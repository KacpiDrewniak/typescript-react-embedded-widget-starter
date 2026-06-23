import type { LatLng } from './types'

const PAIR_SEPARATOR = '||'
const POINT_SEPARATOR = ';'

/** Parsuje pojedynczą parę `"lat||lng"`. */
export function parseLatLng(pair: string): LatLng {
  const [latRaw, lngRaw] = pair.split(PAIR_SEPARATOR)

  if (latRaw === undefined || lngRaw === undefined) {
    throw new Error(`Invalid coordinate pair: "${pair}"`)
  }

  const lat = Number.parseFloat(latRaw)
  const lng = Number.parseFloat(lngRaw)

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    throw new Error(`Invalid coordinate values: "${pair}"`)
  }

  return { lat, lng }
}

/**
 * Parsuje pole `coordinates` z API.
 * Punkt: `"53.1325||23.1688"` → jeden element.
 * Trasa: `"lat||lng;lat||lng;..."` → wiele elementów.
 */
export function parseCoordinates(coordinates: string): LatLng[] {
  if (!coordinates.trim()) {
    return []
  }

  return coordinates.split(POINT_SEPARATOR).map(parseLatLng)
}

/** Zwraca pierwszy punkt (np. marker na mapie lub początek trasy). */
export function getPrimaryCoordinate(coordinates: string): LatLng | null {
  const [first] = parseCoordinates(coordinates)
  return first ?? null
}
