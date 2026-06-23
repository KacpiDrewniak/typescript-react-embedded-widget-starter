import { TouristRoutesApiError, VersionIncompatibleError, NotFoundError } from './errors'
import type { ApiErrorBody } from './types'

type QueryValue = string | number | boolean

type QueryParams = Record<string, QueryValue | QueryValue[] | undefined>

export function buildQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(`${key}[]`, String(item))
      })
      return
    }

    searchParams.append(key, String(value))
  })

  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

function toBasicAuthHeader(username: string, password: string): string {
  const credentials = `${username}:${password}`

  if (typeof btoa === 'function') {
    return `Basic ${btoa(credentials)}`
  }

  throw new Error('Basic auth is not supported in this environment')
}

async function parseErrorBody(response: Response): Promise<ApiErrorBody | null> {
  const contentType = response.headers.get('content-type')

  if (!contentType?.includes('application/json')) {
    return null
  }

  try {
    return (await response.json()) as ApiErrorBody
  } catch {
    return null
  }
}

export interface RequestOptions {
  baseUrl: string
  apiVersion: string
  path: string
  query?: QueryParams
  basicAuth?: {
    username: string
    password: string
  }
  fetchImpl: typeof fetch
}

export async function requestJson<T>(options: RequestOptions): Promise<T> {
  const { baseUrl, apiVersion, path, query, basicAuth, fetchImpl } = options
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '')
  const url = `${normalizedBaseUrl}${path}${buildQueryString(query ?? {})}`

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'X-Api-Version': apiVersion,
  }

  if (basicAuth) {
    headers.Authorization = toBasicAuthHeader(
      basicAuth.username,
      basicAuth.password,
    )
  }

  const response = await fetchImpl(url, { headers })

  if (response.ok) {
    return (await response.json()) as T
  }

  const body = await parseErrorBody(response)
  const message = body?.error ?? `Request failed with status ${response.status}`

  if (response.status === 404) {
    throw new NotFoundError(message)
  }

  if (response.status === 409 && body?.reason) {
    throw new VersionIncompatibleError(body)
  }

  throw new TouristRoutesApiError(message, response.status, body)
}
