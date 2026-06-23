import { requestJson } from './http'
import type {
  AdminCategoriesParams,
  Category,
  CategoryTreeNode,
  ClientCategoriesParams,
  ClientCredentials,
  ClientObjectsParams,
  ConfigResponse,
  FrontCategoriesParams,
  FrontObjectsParams,
  Paginator,
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

interface ClientCategoriesResponse {
  categories: CategoryTreeNode[]
}

type QueryParams = Record<
  string,
  string | number | boolean | (string | number | boolean)[] | undefined
>

export class TouristRoutesClient {
  private readonly config: TouristRoutesClientConfig

  constructor(config: TouristRoutesClientConfig) {
    this.config = config
  }

  withCredentials(credentials: ClientCredentials): TouristRoutesClient {
    return new TouristRoutesClient({
      ...this.config,
      clientCredentials: credentials,
    })
  }

  // --- Front (publiczne, widget mapy) ---

  getObjects(params: FrontObjectsParams = {}): Promise<Point[]> {
    return this.request<FrontObjectsResponse>('/front/objects', {
      name: params.name,
      categories: params.categories,
      availabilities: params.availabilities,
      only_routes: params.only_routes,
    }).then((response) => response.points)
  }

  getObject(uuid: string): Promise<Point> {
    return this.request<Point>(`/front/objects/${encodeURIComponent(uuid)}`)
  }

  getCategories(params: FrontCategoriesParams = {}): Promise<CategoryTreeNode[]> {
    return this.request<FrontCategoriesResponse>('/front/categories', {
      language_id: params.language_id,
    }).then((response) => response.categories)
  }

  // --- Config ---

  getConfig(): Promise<ConfigResponse> {
    return this.requestWithCredentials<ConfigResponse>('/config')
  }

  // --- Client (panel CRM) ---

  getClientObjects(params: ClientObjectsParams): Promise<Paginator<Point>> {
    return this.requestWithCredentials<Paginator<Point>>('/client/objects', {
      current_page: params.current_page,
      per_page: params.per_page,
      name: params.name,
    })
  }

  getClientObject(uuid: string): Promise<Point> {
    return this.requestWithCredentials<Point>(
      `/client/objects/${encodeURIComponent(uuid)}`,
    )
  }

  getClientCategories(
    params: ClientCategoriesParams = {},
  ): Promise<CategoryTreeNode[]> {
    return this.requestWithCredentials<ClientCategoriesResponse>(
      '/client/categories',
      { language_id: params.language_id },
    ).then((response) => response.categories)
  }

  // --- Admin (zarządzanie kategoriami) ---

  getAdminCategories(
    params: AdminCategoriesParams,
  ): Promise<Paginator<Category>> {
    return this.requestWithCredentials<Paginator<Category>>(
      '/admin/categories',
      {
        current_page: params.current_page,
        per_page: params.per_page,
        parent_id: params.parent_id,
        only_main: params.only_main,
        active: params.active,
      },
    )
  }

  getAdminCategory(uuid: string): Promise<Category> {
    return this.requestWithCredentials<Category>(
      `/admin/categories/${encodeURIComponent(uuid)}`,
    )
  }

  private requestWithCredentials<T>(path: string, query?: QueryParams): Promise<T> {
    if (!this.config.clientCredentials) {
      return Promise.reject(
        new Error('clientCredentials required for this endpoint'),
      )
    }

    return this.request<T>(path, query, this.config.clientCredentials)
  }

  private request<T>(
    path: string,
    query?: QueryParams,
    clientCredentials?: ClientCredentials,
  ): Promise<T> {
    return requestJson<T>({
      baseUrl: this.config.baseUrl,
      apiVersion: this.config.apiVersion ?? DEFAULT_API_VERSION,
      path,
      query,
      basicAuth: this.config.basicAuth,
      clientCredentials: clientCredentials ?? this.config.clientCredentials,
      fetchImpl: this.config.fetch ?? fetch.bind(globalThis),
    })
  }
}

export function createTouristRoutesClient(
  config: TouristRoutesClientConfig,
): TouristRoutesClient {
  return new TouristRoutesClient(config)
}
