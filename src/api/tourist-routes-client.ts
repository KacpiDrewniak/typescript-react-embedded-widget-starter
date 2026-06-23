import { requestJson } from './http'
import type {
  CategoryTreeNode,
  FrontCategoriesParams,
  FrontObjectsParams,
  Point,
  TouristRoutesClientConfig,
} from './types'

const DEFAULT_API_VERSION = '1.0.0'

interface FrontObjectsResponse {
  points: Point[]
}

interface FrontCategoriesResponse {
  categories: CategoryTreeNode[]
}

export class TouristRoutesClient {
  private readonly baseUrl: string

  private readonly apiVersion: string

  private readonly basicAuth?: TouristRoutesClientConfig['basicAuth']

  private readonly fetchImpl: typeof fetch

  constructor(config: TouristRoutesClientConfig) {
    this.baseUrl = config.baseUrl
    this.apiVersion = config.apiVersion ?? DEFAULT_API_VERSION
    this.basicAuth = config.basicAuth
    this.fetchImpl = config.fetch ?? fetch.bind(globalThis)
  }

  /** Lista obiektów do wyświetlenia na mapie. */
  getObjects(params: FrontObjectsParams = {}): Promise<Point[]> {
    return this.request<FrontObjectsResponse>('/front/objects', {
      name: params.name,
      categories: params.categories,
      availabilities: params.availabilities,
      only_routes: params.only_routes,
    }).then((response) => response.points)
  }

  /** Szczegóły pojedynczego obiektu. */
  getObject(uuid: string): Promise<Point> {
    return this.request<Point>(`/front/objects/${encodeURIComponent(uuid)}`)
  }

  /** Drzewo aktywnych kategorii. */
  getCategories(params: FrontCategoriesParams = {}): Promise<CategoryTreeNode[]> {
    return this.request<FrontCategoriesResponse>('/front/categories', {
      language_id: params.language_id,
    }).then((response) => response.categories)
  }

  private request<T>(
    path: string,
    query?: Record<string, string | number | boolean | (string | number | boolean)[] | undefined>,
  ): Promise<T> {
    return requestJson<T>({
      baseUrl: this.baseUrl,
      apiVersion: this.apiVersion,
      path,
      query,
      basicAuth: this.basicAuth,
      fetchImpl: this.fetchImpl,
    })
  }
}

export function createTouristRoutesClient(
  config: TouristRoutesClientConfig,
): TouristRoutesClient {
  return new TouristRoutesClient(config)
}
