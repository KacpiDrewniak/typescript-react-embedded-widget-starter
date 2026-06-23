import React, { useCallback, useMemo, useState } from 'react'
import CategoryPanel from './CategoryPanel'
import MapCanvas from './MapCanvas'
import ObjectDetailPanel from './ObjectDetailPanel'
import TopBar from './TopBar'
import { useMediaQuery } from './hooks/useMediaQuery'
import { useTouristMapData } from './hooks/useTouristMapData'
import {
  ErrorBanner,
  MainLayout,
  MapArea,
  MapOverlay,
  OverlayCard,
  RetryButton,
  ThemeRoot,
} from './styles'
import { defaultMapFilters, type MapFilters } from './types'

const MapInterface = () => {
  const isNarrow = useMediaQuery('(max-width: 768px)')
  const [filters, setFilters] = useState<MapFilters>(defaultMapFilters)

  const {
    categories,
    objects,
    loading,
    error,
    refetch,
    selectedPoint,
    detailLoading,
    selectObject,
    clearSelection,
  } = useTouristMapData(filters)

  const toggleCategory = useCallback((categoryId: number) => {
    setFilters((current) => {
      const exists = current.categoryIds.includes(categoryId)
      return {
        ...current,
        categoryIds: exists
          ? current.categoryIds.filter((id) => id !== categoryId)
          : [...current.categoryIds, categoryId],
      }
    })
  }, [])

  const categoryPanel = useMemo(
    () => (
      <CategoryPanel
        categories={categories}
        selectedIds={filters.categoryIds}
        variant={isNarrow ? 'chips' : 'sidebar'}
        onToggle={toggleCategory}
      />
    ),
    [categories, filters.categoryIds, isNarrow, toggleCategory],
  )

  return (
    <ThemeRoot>
      <TopBar
        name={filters.name}
        accessibleOnly={filters.accessibleOnly}
        onlyRoutes={filters.onlyRoutes}
        disabled={loading}
        onNameChange={(name) => setFilters((current) => ({ ...current, name }))}
        onAccessibleToggle={() =>
          setFilters((current) => ({
            ...current,
            accessibleOnly: !current.accessibleOnly,
          }))
        }
        onRoutesToggle={() =>
          setFilters((current) => ({
            ...current,
            onlyRoutes: !current.onlyRoutes,
          }))
        }
      />

      {isNarrow && categoryPanel}

      {error && (
        <ErrorBanner>
          <span>{error}</span>
          <RetryButton type="button" onClick={() => void refetch()}>
            Spróbuj ponownie
          </RetryButton>
        </ErrorBanner>
      )}

      <MainLayout>
        {!isNarrow && categoryPanel}

        <MapArea>
          <MapCanvas
            objects={objects}
            categories={categories}
            onSelect={(uuid) => void selectObject(uuid)}
          />

          {loading && (
            <MapOverlay>
              <OverlayCard>Ładowanie mapy...</OverlayCard>
            </MapOverlay>
          )}

          {!loading && objects.length === 0 && !error && (
            <MapOverlay>
              <OverlayCard>Brak obiektów dla wybranych filtrów</OverlayCard>
            </MapOverlay>
          )}

          <ObjectDetailPanel
            point={selectedPoint}
            loading={detailLoading}
            isMobile={isNarrow}
            onClose={clearSelection}
          />
        </MapArea>
      </MainLayout>
    </ThemeRoot>
  )
}

export default MapInterface
