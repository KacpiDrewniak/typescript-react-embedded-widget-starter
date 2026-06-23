export interface MapFilters {
  name: string
  categoryIds: number[]
  accessibleOnly: boolean
  onlyRoutes: boolean
}

export const defaultMapFilters: MapFilters = {
  name: '',
  categoryIds: [],
  accessibleOnly: false,
  onlyRoutes: false,
}
