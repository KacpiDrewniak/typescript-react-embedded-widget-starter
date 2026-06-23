import React, { useMemo, useState } from 'react'
import {
  createTouristRoutesClient,
  TouristRoutesApiError,
} from '../../api'
import { getTouristRoutesApiConfig } from '../../config/api'
import {
  ErrorMessage,
  PanelBody,
  PanelHeader,
  ResponsePre,
  StatusBar,
  TestButton,
  TestButtonRow,
  UuidInput,
} from './styles'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

const DEFAULT_TEST_UUID = '6723ba9f-9394-40d3-af4f-f0a8ff243170'

const ApiTestPanel = () => {
  const api = useMemo(() => createTouristRoutesClient(getTouristRoutesApiConfig()), [])
  const [status, setStatus] = useState<RequestStatus>('idle')
  const [lastLabel, setLastLabel] = useState<string | null>(null)
  const [response, setResponse] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [objectUuid, setObjectUuid] = useState(DEFAULT_TEST_UUID)

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

  return (
    <PanelBody>
      <PanelHeader>Test API — trasy turystyczne</PanelHeader>

      <TestButtonRow>
        <TestButton
          type="button"
          disabled={status === 'loading'}
          onClick={() =>
            runRequest('GET /front/objects', () => api.getObjects())
          }
        >
          GET /front/objects
        </TestButton>
        <TestButton
          type="button"
          disabled={status === 'loading'}
          onClick={() =>
            runRequest('GET /front/objects?only_routes=true', () =>
              api.getObjects({ only_routes: true }),
            )
          }
        >
          GET /front/objects (trasy)
        </TestButton>
        <TestButton
          type="button"
          disabled={status === 'loading'}
          onClick={() =>
            runRequest('GET /front/objects?categories[]=1', () =>
              api.getObjects({ categories: [1] }),
            )
          }
        >
          GET /front/objects (kat. 1)
        </TestButton>
        <TestButton
          type="button"
          disabled={status === 'loading'}
          onClick={() =>
            runRequest('GET /front/categories', () => api.getCategories())
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
          disabled={status === 'loading' || !objectUuid.trim()}
          onClick={() =>
            runRequest(`GET /front/objects/${objectUuid}`, () =>
              api.getObject(objectUuid.trim()),
            )
          }
        >
          GET /front/objects/:uuid
        </TestButton>
      </TestButtonRow>

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
