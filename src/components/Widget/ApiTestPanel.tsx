import React, { useMemo, useState } from 'react'
import {
  createTouristRoutesClient,
  TouristRoutesApiError,
} from '../../api'
import { getTouristRoutesApiConfig, testClientCredentials } from '../../config/api'
import {
  ErrorMessage,
  PanelBody,
  PanelHeader,
  PanelHint,
  PanelSection,
  PanelSectionTitle,
  ResponsePre,
  StatusBar,
  TestButton,
  TestButtonRow,
  TestButtonSecondary,
  UuidInput,
} from './styles'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

const DEFAULT_OBJECT_UUID = '6723ba9f-9394-40d3-af4f-f0a8ff243170'
const DEFAULT_CATEGORY_UUID = '93078821-2420-4dbf-a402-19713b6f6bf2'

const ApiTestPanel = () => {
  const baseApi = useMemo(
    () => createTouristRoutesClient(getTouristRoutesApiConfig()),
    [],
  )
  const clientApi = useMemo(
    () => baseApi.withCredentials(testClientCredentials.client),
    [baseApi],
  )
  const adminApi = useMemo(
    () => baseApi.withCredentials(testClientCredentials.admin),
    [baseApi],
  )

  const [status, setStatus] = useState<RequestStatus>('idle')
  const [lastLabel, setLastLabel] = useState<string | null>(null)
  const [response, setResponse] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [objectUuid, setObjectUuid] = useState(DEFAULT_OBJECT_UUID)
  const [categoryUuid, setCategoryUuid] = useState(DEFAULT_CATEGORY_UUID)

  const runRequest = async (label: string, request: () => Promise<unknown>) => {
    setStatus('loading')
    setLastLabel(label)
    setError(null)
    setResponse('')

    try {
      const data = await request()
      setResponse(JSON.stringify(data, null, 2))
      setStatus('success')
    } catch (err) {
      const message =
        err instanceof TouristRoutesApiError
          ? `[${err.status}] ${err.message}${err.body ? `\n${JSON.stringify(err.body, null, 2)}` : ''}`
          : err instanceof Error
            ? err.message
            : 'Unknown error'

      setError(message)
      setStatus('error')
    }
  }

  const isLoading = status === 'loading'

  return (
    <PanelBody>
      <PanelHeader>Test API — trasy turystyczne</PanelHeader>
      <PanelHint>
        Front (żółte) — widget mapy, bez kluczy. Client/Admin (szare) — wymagają
        X-Client-Id + X-Client-Secret. Zapis (POST/DELETE) nie jest w panelu — użyj
        Postmana lub paczki CRM.
      </PanelHint>

      <PanelSection>
        <PanelSectionTitle>Front — publiczne (3 endpointy)</PanelSectionTitle>
        <TestButtonRow>
          <TestButton
            type="button"
            disabled={isLoading}
            onClick={() =>
              runRequest('GET /front/objects', () => baseApi.getObjects())
            }
          >
            GET /front/objects
          </TestButton>
          <TestButton
            type="button"
            disabled={isLoading}
            onClick={() =>
              runRequest('GET /front/objects?only_routes=true', () =>
                baseApi.getObjects({ only_routes: true }),
              )
            }
          >
            tylko trasy
          </TestButton>
          <TestButton
            type="button"
            disabled={isLoading}
            onClick={() =>
              runRequest('GET /front/objects?categories[]=1', () =>
                baseApi.getObjects({ categories: [1] }),
              )
            }
          >
            kat. 1
          </TestButton>
          <TestButton
            type="button"
            disabled={isLoading}
            onClick={() =>
              runRequest('GET /front/objects?availabilities[]=for_disabled', () =>
                baseApi.getObjects({ availabilities: ['for_disabled'] }),
              )
            }
          >
            dostępne
          </TestButton>
          <TestButton
            type="button"
            disabled={isLoading}
            onClick={() =>
              runRequest('GET /front/categories', () => baseApi.getCategories())
            }
          >
            GET /front/categories
          </TestButton>
        </TestButtonRow>
        <TestButtonRow>
          <UuidInput
            type="text"
            value={objectUuid}
            onChange={(event) => setObjectUuid(event.target.value)}
            placeholder="UUID obiektu"
          />
          <TestButton
            type="button"
            disabled={isLoading || !objectUuid.trim()}
            onClick={() =>
              runRequest(`GET /front/objects/${objectUuid}`, () =>
                baseApi.getObject(objectUuid.trim()),
              )
            }
          >
            GET /front/objects/:uuid
          </TestButton>
        </TestButtonRow>
      </PanelSection>

      <PanelSection>
        <PanelSectionTitle>Config + Client — multisite_client</PanelSectionTitle>
        <TestButtonRow>
          <TestButtonSecondary
            type="button"
            disabled={isLoading}
            onClick={() =>
              runRequest('GET /config', () => clientApi.getConfig())
            }
          >
            GET /config
          </TestButtonSecondary>
          <TestButtonSecondary
            type="button"
            disabled={isLoading}
            onClick={() =>
              runRequest('GET /client/objects', () =>
                clientApi.getClientObjects({ current_page: 1, per_page: 20 }),
              )
            }
          >
            GET /client/objects
          </TestButtonSecondary>
          <TestButtonSecondary
            type="button"
            disabled={isLoading}
            onClick={() =>
              runRequest('GET /client/categories', () =>
                clientApi.getClientCategories(),
              )
            }
          >
            GET /client/categories
          </TestButtonSecondary>
          <TestButtonSecondary
            type="button"
            disabled={isLoading || !objectUuid.trim()}
            onClick={() =>
              runRequest(`GET /client/objects/${objectUuid}`, () =>
                clientApi.getClientObject(objectUuid.trim()),
              )
            }
          >
            GET /client/objects/:uuid
          </TestButtonSecondary>
        </TestButtonRow>
      </PanelSection>

      <PanelSection>
        <PanelSectionTitle>Admin — multisite_admin</PanelSectionTitle>
        <TestButtonRow>
          <TestButtonSecondary
            type="button"
            disabled={isLoading}
            onClick={() =>
              runRequest('GET /admin/categories', () =>
                adminApi.getAdminCategories({ current_page: 1, per_page: 20 }),
              )
            }
          >
            GET /admin/categories
          </TestButtonSecondary>
          <TestButtonSecondary
            type="button"
            disabled={isLoading}
            onClick={() =>
              runRequest('GET /admin/categories?only_main=true', () =>
                adminApi.getAdminCategories({
                  current_page: 1,
                  per_page: 20,
                  only_main: true,
                }),
              )
            }
          >
            tylko główne
          </TestButtonSecondary>
          <TestButtonSecondary
            type="button"
            disabled={isLoading}
            onClick={() =>
              runRequest('GET /config (admin)', () => adminApi.getConfig())
            }
          >
            GET /config (admin)
          </TestButtonSecondary>
        </TestButtonRow>
        <TestButtonRow>
          <UuidInput
            type="text"
            value={categoryUuid}
            onChange={(event) => setCategoryUuid(event.target.value)}
            placeholder="UUID kategorii"
          />
          <TestButtonSecondary
            type="button"
            disabled={isLoading || !categoryUuid.trim()}
            onClick={() =>
              runRequest(`GET /admin/categories/${categoryUuid}`, () =>
                adminApi.getAdminCategory(categoryUuid.trim()),
              )
            }
          >
            GET /admin/categories/:uuid
          </TestButtonSecondary>
        </TestButtonRow>
      </PanelSection>

      <StatusBar $status={status}>
        {status === 'loading' && `Ładowanie: ${lastLabel}…`}
        {status === 'success' && `OK: ${lastLabel}`}
        {status === 'error' && `Błąd: ${lastLabel}`}
        {status === 'idle' && 'Wybierz endpoint do przetestowania'}
      </StatusBar>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {response && <ResponsePre>{response}</ResponsePre>}
    </PanelBody>
  )
}

export default ApiTestPanel
