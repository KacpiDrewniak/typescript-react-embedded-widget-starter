import React, { useEffect, useMemo } from 'react'
import L from 'leaflet'
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { CategoryTreeNode, Point } from '../../api'
import { parseCoordinates } from '../../api'
import { LeafletMapRoot } from './styles'
import { DEFAULT_THEME } from '../../theme/defaults'
import { buildCategoryColorMap, getObjectMarkerColor } from './utils'

const DEFAULT_CENTER: [number, number] = [52, 19]
const DEFAULT_ZOOM = 6

function createMarkerIcon(color: string | null, accessible: boolean): L.DivIcon {
  const markerColor = color || DEFAULT_THEME.primary
  const className = accessible
    ? 'tr-map-marker tr-map-marker--accessible'
    : 'tr-map-marker'

  return L.divIcon({
    className: '',
    html: `<div class="${className}" style="--marker-color: ${markerColor}; background: ${markerColor}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}

interface FitBoundsProps {
  objects: Point[]
}

function FitBounds({ objects }: FitBoundsProps) {
  const map = useMap()

  useEffect(() => {
    const coordinates = objects.flatMap((object) => {
      try {
        return parseCoordinates(object.coordinates)
      } catch {
        return []
      }
    })

    if (coordinates.length === 0) {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM)
      return
    }

    const bounds = L.latLngBounds(
      coordinates.map((coordinate) => [coordinate.lat, coordinate.lng]),
    )

    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 })
  }, [map, objects])

  return null
}

interface MapCanvasProps {
  objects: Point[]
  categories: CategoryTreeNode[]
  onSelect: (uuid: string) => void
}

const MapCanvas = ({ objects, categories, onSelect }: MapCanvasProps) => {
  const colorMap = useMemo(
    () => buildCategoryColorMap(categories),
    [categories],
  )

  const points = objects.filter((object) => object.is_tourist_route === 0)
  const routes = objects.filter((object) => object.is_tourist_route === 1)

  return (
    <LeafletMapRoot>
      <MapContainer center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds objects={objects} />

        {routes.map((route) => {
          let coordinates: [number, number][] = []

          try {
            coordinates = parseCoordinates(route.coordinates).map(
              (coordinate) => [coordinate.lat, coordinate.lng],
            )
          } catch {
            return null
          }

          if (coordinates.length < 2) {
            return null
          }

          return (
            <Polyline
              key={route.uuid}
              positions={coordinates}
              pathOptions={{
                color: route.route_color || '#0a5ed7',
                weight: 4,
              }}
              eventHandlers={{
                click: () => onSelect(route.uuid),
              }}
            >
              <Popup>{route.name}</Popup>
            </Polyline>
          )
        })}

        {points.map((point) => {
          let coordinate: [number, number] | null = null

          try {
            const [first] = parseCoordinates(point.coordinates)
            if (first) {
              coordinate = [first.lat, first.lng]
            }
          } catch {
            return null
          }

          if (!coordinate) {
            return null
          }

          const markerColor = getObjectMarkerColor(point.category_ids, colorMap)

          return (
            <Marker
              key={point.uuid}
              position={coordinate}
              icon={createMarkerIcon(markerColor, point.for_disabled === 1)}
              eventHandlers={{
                click: () => onSelect(point.uuid),
              }}
            >
              <Popup>{point.name}</Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </LeafletMapRoot>
  )
}

export default MapCanvas
