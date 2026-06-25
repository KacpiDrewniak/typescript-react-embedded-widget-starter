# Trasy turystyczne — widget frontowy

Osadzalny komponent React wyświetlający mapę z punktami i trasami turystycznymi. Pobiera dane z mikroserwisu tras przez publiczne endpointy `/front/*` i jest osadzany na stronach KM oraz Multisite jako paczka Composer (`trasy-turystyczne-frontend`).

## Language

**Mikroserwis (serwer)**:
Oddzielna aplikacja Laravel z bazą danych i REST API tras turystycznych, instalowana jako kontener na VM Multisite lub KM.
_Avoid_: backend, API server (w rozmowach wewnętrznych dopuszczalne, ale w dokumentacji domenowej używamy „mikroserwis”)

**Paczka client**:
Composer package (`trasy-turystyczne-client`) — panel CRM do zarządzania obiektami i (opcjonalnie) kategoriami przez API. Nie dotyczy tego repozytorium.
_Avoid_: admin panel, wtyczka administracyjna

**Paczka frontend**:
Composer package (`trasy-turystyczne-frontend`) zawierający ten widget. Osadza mapę na stronie publicznej.
_Avoid_: wtyczka frontowa (w kodzie OK), plugin (ang.)

**Klient API**:
Para `client_id` + `client_secret` identyfikująca instalację Multisite lub KM względem mikroserwisu. Używana przez paczkę client i (opcjonalnie) do endpointów chronionych. Endpointy `/front/*` są publiczne.
_Avoid_: użytkownik, tenant (chyba że mowa o infrastrukturze)

**Klient admin**:
Klient API z flagą `admin: true` w konfiguracji mikroserwisu. Ma dostęp do CRUD kategorii (`/admin/categories`). Uprawnienia egzekwowane po stronie serwera, nie UI.
_Avoid_: administrator, superuser

**Obiekt**:
Punkt na mapie lub trasa turystyczna przechowywana w mikroserwisie. Rozróżnienie przez `is_tourist_route`.
_Avoid_: POI, marker (w UI mapy dopuszczalne)

**Punkt**:
Obiekt z jedną współrzędną (`is_tourist_route = 0`, `coordinates`: `"lat||lng"`).
_Avoid_: waypoint (waypoint to element trasy)

**Trasa turystyczna**:
Obiekt z wieloma współrzędnymi (`is_tourist_route = 1`, `coordinates`: `"lat||lng;lat||lng;..."`) oraz metadanymi trasy (`distance`, `route_time`, `route_type`, `route_color`).
_Avoid_: szlak, path

**Kategoria obiektu**:
Centralnie zarządzana klasyfikacja (np. Zabytki, Zamki). Może być globalna lub przypisana do wybranych `client_id`. Drzewo kategorii z podkategoriami.
_Avoid_: tag, typ

**Dostępność obiektu**:
Cecha obiektu publicznego oznaczająca dostępność dla osób z niepełnosprawnościami (`for_disabled`). Na froncie filtrowana przez `availabilities[]`.
_Avoid_: availability (w kodzie API OK)

**Współrzędne**:
Tekstowy format pozycji: punkt `"lat||lng"`, trasa `"lat||lng;lat||lng;..."` (separator pary: `||`, separator punktów trasy: `;`).
_Avoid_: GeoJSON (inny format), coordinates array

**Tryb launcher**:
Sposób osadzenia bez parametru `anchor` — widget dodaje pływający przycisk otwierający mapę (domyślnie w rogu strony).
_Avoid_: floating button (w kodzie OK), popup mode

**Tryb inline**:
Sposób osadzenia z parametrem `anchor` — mapa renderowana bezpośrednio w wskazanym elemencie strony hosta (`id` kontenera).
_Avoid_: embedded mode (w kodzie OK), iframe

**Motyw**:
Zestaw siedmiu kolorów semantycznych (`primary`, `accent`, `surface`, `text`, `muted`, `border`, `dot`) przekazywanych przy osadzeniu widgetu. `dot` to domyślny kolor kropek przy kategoriach (gdy kategoria nie ma własnego koloru z API). Domyślnie paleta czarno-biała (grayscale); host może nadpisać wybrane wartości (np. samymi odcieniami niebieskiego).
_Avoid_: theme CSS (to implementacja), brand colors (zbyt ogólne)
