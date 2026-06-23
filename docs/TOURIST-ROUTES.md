# Trasy turystyczne — kontekst projektu

Dokument zbiorczy na podstawie zgłoszenia [skarzysko] i specyfikacji OpenAPI v1.0.0. Dotyczy całego ekosystemu trzech paczek; sekcja **Ten repozytorium** opisuje zakres Kacpra.

## Architektura (3 paczki)

```
┌─────────────────────────────────────────────────────────────────┐
│  Mikroserwis (trasy-turystyczne-serwer) — Laravel               │
│  Baza: kategorie, obiekty (punkty + trasy)                      │
│  API: /config, /admin/*, /client/*, /front/*                    │
└───────────────┬─────────────────────────────┬───────────────────┘
                │ REST + client_id/secret       │ REST (front publiczny)
                ▼                               ▼
┌───────────────────────────┐     ┌─────────────────────────────────┐
│ trasy-turystyczne-client  │     │ trasy-turystyczne-frontend      │
│ Composer → panel CRM      │     │ Composer → div + JS na stronie  │
│ Multisite + KM            │     │ React widget (TEN REPO)         │
│ Odpowiedzialność: Jakub   │     │ Odpowiedzialność: Kacper        │
└───────────────────────────┘     └─────────────────────────────────┘
```

### Flow

1. **Mikroserwis** trzyma dane i wystawia API.
2. **Client** (Jakub) — menu w CRM, listy (mylist3 → API zamiast modeli), formularze obiektów. Admin UI włączany po `GET /config` gdy `is_admin: true`; serwer i tak blokuje `/admin/*` bez uprawnień.
3. **Frontend** (Kacper) — widget mapy łączy się z `/front/*`, pobiera obiekty i kategorie, renderuje mapę z filtrami. Kolorystyka z zmiennych CSS hosta.

### Wersjonowanie

- Każde żądanie: nagłówek `X-Api-Version` (np. `1.0.0`).
- Serwer zwraca `X-Api-Version` w odpowiedzi.
- Niezgodność MAJOR lub wersja klienta < `min_client_version` → **409** z `reason`: `missing_client_version` | `invalid_client_version` | `major_mismatch` | `client_too_old`.
- Paczki Composer wersjonowane niezależnie; kontrakt API musi być zgodny.

## Środowisko testowe

| Parametr | Wartość |
|----------|---------|
| Base URL | `https://trasy-server.bprog.pl/api/v1/tourist-routes` |
| Wersja API | `1.0.0` |
| HTTP Basic (warstwa serwera) | user: `trasy-server`, pass: `rev12345` |
| Klient ADMIN | id: `multisite_admin`, secret: `b96c5b0edfd1c83fa7518a1414d7098d83df384bf6a962b7` |
| Klient CLIENT | id: `multisite_client`, secret: `940cba50151f0b2b7951eafc266284249a9ad59599fbab6a` |

Endpointy `/front/*` są **publiczne** (bez `X-Client-Id` / `X-Client-Secret`) — klucze i tak byłyby widoczne w przeglądarce.

### Przykładowe żądanie (config — dla paczki client)

```bash
curl 'https://trasy-server.bprog.pl/api/v1/tourist-routes/config' \
  -H 'X-Api-Version: 1.0.0' \
  -H 'X-Client-Id: multisite_client' \
  -H 'X-Client-Secret: 940cba50151f0b2b7951eafc266284249a9ad59599fbab6a' \
  -u 'trasy-server:rev12345'
```

## API — endpointy istotne dla frontu

Pełna specyfikacja: [`tourist-routes.openapi.json`](./tourist-routes.openapi.json) (Swagger Editor).

| Metoda | Ścieżka | Opis |
|--------|---------|------|
| GET | `/front/objects` | Lista obiektów na mapę. Query: `name`, `categories[]`, `availabilities[]`, `only_routes` |
| GET | `/front/objects/{uuid}` | Szczegóły pojedynczego obiektu |
| GET | `/front/categories` | Drzewo aktywnych kategorii. Query: `language_id` |

Wymagany nagłówek: `X-Api-Version: 1.0.0`.

### Model obiektu (skrót)

| Pole | Znaczenie |
|------|-----------|
| `uuid` | Identyfikator |
| `name`, `lead`, `description` | Treści |
| `coordinates` | `"lat||lng"` lub `"lat||lng;..."` dla trasy |
| `is_tourist_route` | `0` punkt, `1` trasa |
| `distance`, `route_time`, `route_type`, `route_color` | Metadane trasy (`route_type`: `foot` \| `bike` \| `car`) |
| `for_disabled` | Dostępność (0/1) |
| `btn_text`, `btn_link` | CTA |
| `image`, `gallery`, `multimedia`, `multimedia_type` | Media |
| `category_ids` | Przypisane kategorie |
| `additional_data` | Rozszerzenia |

### Model kategorii (drzewo)

`CategoryTreeNode`: `uuid`, `id`, `name`, `icon`, `color`, `is_route`, `children[]`.

## API — pozostałe grupy (kontekst)

| Grupa | Ścieżki | Auth | Kto |
|-------|---------|------|-----|
| Config | `GET /config` | client_id + secret | Client package |
| Client | `/client/objects`, `/client/categories` | client_id + secret | Client package |
| Admin | `/admin/categories`, `/admin/categories/sort`, `/admin/categories/{uuid}` | client_id + secret + `admin: true` | Client package (admin) |

Źródło prawdy pól obiektów: implementacja z **Karty Mieszkańca** (KM). Jakub może zgłaszać brakujące pola w API w trakcie prac nad clientem.

## Ten repozytorium (zakres Kacpra)

**Cel:** widget React osadzany jako `div` + skrypt JS na podstronie KM/Multisite, spakowany w `trasy-turystyczne-frontend`.

### Wyzwania do rozwiązania

1. **Osadzenie** — wzorzec z tego startera: klasa `EmbeddedWidget` mountuje React w izolowanym kontenerze (`cleanslate`). Build → pojedynczy bundle JS do wstrzyknięcia przez Composer.
2. **API** — klient HTTP do `/front/objects` i `/front/categories`; `X-Api-Version` konfigurowalny; base URL z konfiguracji paczki Composer (nie hardcode produkcyjnego URL).
3. **Theming** — wspólny HTML/CSS na KM i Multi; zmienne kolorystyczne hosta mapowane na CSS custom properties widgetu (np. `--tr-primary`, `--tr-accent`). Paczka Composer przekazuje wartości z stylów projektu.
4. **Mapa** — wyświetlanie punktów i tras, filtry (kategorie, dostępność, trasy), szczegóły obiektu (lead, multimedia, galeria, CTA).
5. **Technologia** — React (zgodnie z tym repo); decyzja React vs Vue w paczce Composer już ustawiona na React.

### Zależności od innych osób

| Osoba | Dostarcza | Kacper potrzebuje |
|-------|-----------|-------------------|
| Maksym | Stabilne `/front/*`, dane testowe | Mockup/wygląd mapy, feedback o brakujących polach |
| Jakub | — | Nie blokuje prac frontu; wspólny model `Point` |
| Hubert | Produkcja serwera na bprog, klucze per instalacja | Docelowy `baseUrl` i ewentualnie `language_id` |

### Status (19.06.2026)

- Backend Maksyma: **gotowy** do przekazania (v1.0.0 na `trasy-server.bprog.pl`).
- Testowe punkty, kategorie i trasy w API — Jakub i Kacper mogą pracować równolegle.
- Kolejny krok infrastrukturalny: stała instalacja serwera + dane klientów produkcyjnych.

## Komunikacja zespołu

Praca nad trzema paczkami jednocześnie wymaga synchronizacji:

- Zmiany w kształcie `Point` / filtrów frontowych → informować Maksyma (API) i Jakuba (formularze).
- Nowe pola z KM → Maksym uzupełnia API, Jakub formularz client, Kacper wyświetlanie.
- Zmiana wersji API → zsynchronizować wersje wszystkich trzech paczek Composer.

## Repozytoria (planowane)

| Repo | Stack | Odpowiedzialny |
|------|-------|----------------|
| `trasy-turystyczne-serwer` | Laravel | Maksym |
| `trasy-turystyczne-client` | PHP Composer | Jakub |
| `trasy-turystyczne-frontend` | PHP Composer + React (ten kod) | Kacper |
