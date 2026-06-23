import type { TouristRoutesClientConfig } from '../api'

function isLocalDevHost(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  )
}

/**
 * Lokalnie (yarn dev) żądania idą przez webpack proxy — ten sam origin,
 * bez CORS i bez Basic Auth w przeglądarce (auth dodaje proxy).
 *
 * Na produkcji nginx wymaga Basic Auth; przeglądarka nie może przejść
 * preflight OPTIONS z nagłówkiem Authorization — to trzeba naprawić po stronie serwera
 * (wyłączyć auth dla OPTIONS albo dla /front/*).
 */
export function getTouristRoutesApiConfig(): TouristRoutesClientConfig {
  const useDevProxy = isLocalDevHost()

  return {
    baseUrl: useDevProxy
      ? `${window.location.origin}/api/v1/tourist-routes`
      : 'https://trasy-server.bprog.pl/api/v1/tourist-routes',
    apiVersion: '1.0.0',
    basicAuth: useDevProxy
      ? undefined
      : {
          username: 'trasy-server',
          password: 'rev12345',
        },
  }
}

export const touristRoutesApiConfig = getTouristRoutesApiConfig()
