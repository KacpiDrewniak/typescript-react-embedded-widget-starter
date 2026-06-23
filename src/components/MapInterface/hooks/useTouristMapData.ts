import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createTouristRoutesClient,
  TouristRoutesApiError,
  type CategoryTreeNode,
  type Point,
  type TouristRoutesClient,
} from '../../../api'
import { getTouristRoutesApiConfig } from '../../../config/api'
import type { MapFilters } from '../types'
import { useDebounce } from './useDebounce'

interface UseTouristMapDataResult {
  api: TouristRoutesClient
  categories: CategoryTreeNode[]
  objects: Point[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  selectedPoint: Point | null
  detailLoading: boolean
  selectObject: (uuid: string) => Promise<void>
  clearSelection: () => void
}

export function useTouristMapData(filters: MapFilters): UseTouristMapDataResult {
  const api = useMemo(
    () => createTouristRoutesClient(getTouristRoutesApiConfig()),
    [],
  )
  const debouncedName = useDebounce(filters.name, 300)

  const [categories, setCategories] = useState<CategoryTreeNode[]>([])
  const [objects, setObjects] = useState<Point[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const [nextCategories, nextObjects] = await Promise.all([
        api.getCategories(),
        api.getObjects({
          name: debouncedName.trim() || undefined,
          categories:
            filters.categoryIds.length > 0 ? filters.categoryIds : undefined,
          availabilities: filters.accessibleOnly ? ['for_disabled'] : undefined,
          only_routes: filters.onlyRoutes || undefined,
        }),
      ])

      setCategories(nextCategories)
      setObjects(nextObjects)
    } catch (err) {
      const message =
        err instanceof TouristRoutesApiError
          ? `[${err.status}] ${err.message}`
          : err instanceof Error
            ? err.message
            : 'Nie udało się pobrać danych mapy'

      setError(message)
    } finally {
      setLoading(false)
    }
  }, [
    api,
    debouncedName,
    filters.accessibleOnly,
    filters.categoryIds,
    filters.onlyRoutes,
  ])

  useEffect(() => {
    void refetch()
  }, [refetch])

  const selectObject = useCallback(
    async (uuid: string) => {
      const fromList = objects.find((object) => object.uuid === uuid)
      if (fromList) {
        setSelectedPoint(fromList)
      }

      setDetailLoading(true)

      try {
        const point = await api.getObject(uuid)
        setSelectedPoint(point)
      } catch (err) {
        const message =
          err instanceof TouristRoutesApiError
            ? `[${err.status}] ${err.message}`
            : err instanceof Error
              ? err.message
              : 'Nie udało się pobrać szczegółów obiektu'

        setError(message)
      } finally {
        setDetailLoading(false)
      }
    },
    [api, objects],
  )

  const clearSelection = useCallback(() => {
    setSelectedPoint(null)
  }, [])

  return {
    api,
    categories,
    objects,
    loading,
    error,
    refetch,
    selectedPoint,
    detailLoading,
    selectObject,
    clearSelection,
  }
}
