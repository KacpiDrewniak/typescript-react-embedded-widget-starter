import React from 'react'
import type { RouteType } from '../../api'
import { RouteMetaBadge, RouteMetaRow } from './styles'

const routeTypeLabels: Record<RouteType, string> = {
  foot: 'Pieszo',
  bike: 'Rower',
  car: 'Samochód',
}

interface RouteMetaProps {
  distance?: string | null
  routeTime?: string | null
  routeType?: RouteType | null
}

const RouteMeta = ({ distance, routeTime, routeType }: RouteMetaProps) => {
  if (!distance && !routeTime && !routeType) {
    return null
  }

  return (
    <RouteMetaRow>
      {routeType && (
        <RouteMetaBadge>{routeTypeLabels[routeType]}</RouteMetaBadge>
      )}
      {distance && <RouteMetaBadge>{distance} km</RouteMetaBadge>}
      {routeTime && <RouteMetaBadge>{routeTime}</RouteMetaBadge>}
    </RouteMetaRow>
  )
}

export default RouteMeta
