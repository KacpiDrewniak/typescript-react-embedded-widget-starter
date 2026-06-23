import type { ApiErrorBody, VersionIncompatibleReason } from './types'

export class TouristRoutesApiError extends Error {
  readonly status: number

  readonly body: ApiErrorBody | null

  constructor(message: string, status: number, body: ApiErrorBody | null = null) {
    super(message)
    this.name = 'TouristRoutesApiError'
    this.status = status
    this.body = body
  }
}

export class VersionIncompatibleError extends TouristRoutesApiError {
  readonly reason: VersionIncompatibleReason

  readonly serverVersion?: string

  readonly clientVersion?: string | null

  readonly minClientVersion?: string

  constructor(body: ApiErrorBody) {
    super(body.error ?? 'API version incompatible', 409, body)
    this.name = 'VersionIncompatibleError'
    this.reason = body.reason ?? 'invalid_client_version'
    this.serverVersion = body.server_version
    this.clientVersion = body.client_version
    this.minClientVersion = body.min_client_version
  }
}

export class NotFoundError extends TouristRoutesApiError {
  constructor(message = 'Resource not found') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}
