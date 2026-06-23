export type RouteType = 'foot' | 'bike' | 'car'

export type MultimediaType = 'audio' | 'video' | 'youtube'

export type VersionIncompatibleReason =
  | 'missing_client_version'
  | 'invalid_client_version'
  | 'major_mismatch'
  | 'client_too_old'

export interface LatLng {
  lat: number
  lng: number
}

export interface PointMultimedia {
  type?: string
  src?: string
  video_poster?: string | null
  title?: string
}

export interface Point {
  uuid: string
  name: string
  lead?: string
  description?: string
  coordinates: string
  is_tourist_route: 0 | 1
  distance?: string | null
  route_time?: string | null
  route_type?: RouteType | null
  route_color?: string | null
  address?: string | null
  for_disabled?: 0 | 1
  btn_text?: string
  btn_link?: string
  image?: string | null
  category_ids?: number[]
  multimedia_type?: MultimediaType | null
  multimedia?: PointMultimedia[]
  gallery?: string[]
  additional_data?: Record<string, unknown> | unknown[]
}

export interface CategoryTreeNode {
  uuid: string
  id: number
  name: string
  icon?: string | null
  color?: string | null
  is_route: 0 | 1
  children: CategoryTreeNode[]
}

export interface FrontObjectsParams {
  name?: string
  categories?: number[]
  availabilities?: string[]
  only_routes?: boolean
}

export interface FrontCategoriesParams {
  language_id?: number
}

export interface TouristRoutesClientConfig {
  /** Pełny URL API, np. `https://trasy-server.bprog.pl/api/v1/tourist-routes` */
  baseUrl: string
  /** Domyślnie `1.0.0` */
  apiVersion?: string
  /** Opcjonalne HTTP Basic Auth (warstwa serwera/nginx) */
  basicAuth?: {
    username: string
    password: string
  }
  /** Nadpisanie fetch (testy) */
  fetch?: typeof fetch
}

export interface ApiErrorBody {
  error?: string
  reason?: VersionIncompatibleReason
  server_version?: string
  client_version?: string | null
  min_client_version?: string
}
