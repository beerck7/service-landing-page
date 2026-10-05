# Service Landing Page

Strona serwisu technologicznego DreamPC. Przedstawia ofertę, wyjaśnia przebieg naprawy i prowadzi do formularza zgłoszenia.

**[Otwórz stronę](https://beerck7.github.io/service-landing-page/)**

## Business Goal

Użytkownik powinien szybko ustalić, czy serwis zajmuje się jego problemem, poznać zasady wyceny i znaleźć formularz. Dlatego strona prowadzi od usług przez proces i odpowiedzi na pytania do zgłoszenia. Główny przycisk wraca w kilku miejscach, ale treść można spokojnie przeczytać bez wyskakujących okien.

To koncepcja strony usługowej. Oferta i ceny są przykładowe. Formularz nie wysyła wiadomości, a ilustracje nie udają zdjęć rzeczywistych napraw. Nie ma fikcyjnych opinii, certyfikatów ani statystyk skuteczności.

## Features

- Oferta naprawy laptopów, komputerów i wsparcia IT.
- Korzyści, cztery etapy naprawy i zasady dokumentowania prac.
- Porównanie przed/po sterowane suwakiem, także z klawiatury.
- Rozwijane odpowiedzi FAQ w natywnych elementach `details`.
- Menu mobilne z zamykaniem klawiszem Escape.
- Formularz z błędami przy polach, stanem przetwarzania, sukcesu i błędu.
- Wybór usługi w formularzu po kliknięciu odnośnika w karcie oferty.
- Subtelne animacje pojawiania się kart z obsługą `prefers-reduced-motion`.

## Tech Stack

HTML5, SCSS i Vanilla JavaScript z modułami ES. Sass jest jedyną zależnością deweloperską. Strona nie potrzebuje frameworka, bundlera ani serwera aplikacyjnego.

### Uruchomienie

Wymagany Node.js 22 lub nowszy.

```bash
npm ci
npm run styles
npm run dev
```

Strona działa pod `http://127.0.0.1:4190`. Podczas pracy nad SCSS uruchom w drugim terminalu:

```bash
npm run styles:watch
```

Weryfikacja i przygotowanie plików do publikacji:

```bash
npm test
npm run build
npm run check
```

`npm test` sprawdza reguły walidacji przez wbudowany runner Node.js. `npm run check` sprawdza składnię JS, odnośniki i podstawową strukturę HTML. Pliki CSS są też zapisane w repozytorium, więc odczyt strony na zwykłym hostingu nie wymaga kompilacji w przeglądarce.

### Formularz

Demonstracja odbywa się wyłącznie w przeglądarce. Krótkie opóźnienie pokazuje stan przetwarzania. Dane nie trafiają do sieci ani do `localStorage`. Sukces oznacza poprawne pola, nie przyjęcie zlecenia.

Stan błędu można sprawdzić pod adresem `/?demo=error` lokalnie lub przez dopisanie `?demo=error` do adresu opublikowanej strony. Po błędzie wpisane wartości pozostają w formularzu. Używaj przykładowych danych.

Podłączenie rzeczywistej obsługi wymaga endpointu, walidacji po stronie serwera i ustalenia sposobu przetwarzania danych. Samo usunięcie informacji o demonstracji nie uruchomi wysyłania.

## Mobile-first Approach

Podstawowy układ jest jednokolumnowy. Nawigacja rozwija się po kliknięciu przycisku, a pola formularza wypełniają dostępną szerokość. Reguły `min-width` rozszerzają układ:

- `48rem` — siatki usług, dwie kolumny sekcji i formularza;
- `64rem` — pełna nawigacja, cztery kroki procesu i większe odstępy.

Szerokość treści jest ograniczona do `76rem`. Sprawdzone szerokości: 360, 390, 768, 1024 i 1440 px.

## SCSS & BEM

```text
index.html
scss/
  _tokens.scss       kolory, odstępy i breakpointy
  _base.scss         typografia, kontener, bazowe style
  _components.scss  przyciski, menu, karty, suwak i formularz
  _sections.scss    układy poszczególnych sekcji
  main.scss         punkt wejścia Sass
js/
  app.js            inicjalizacja i animacje
  navigation.js     menu mobilne
  comparison.js     suwak przed/po
  form.js           obsługa formularza
  validation.js     reguły sprawdzania pól
assets/
  css/              wynik kompilacji
  images/           ilustracje SVG i obraz OpenGraph
  screenshots/      widok strony na komputerze i telefonie
scripts/            lokalny serwer, build i kontrola plików
test/               testy walidacji
```

Moduły SCSS są łączone przez `@use`. Mapa odstępów i mixin breakpointów pozwalają używać wspólnych wartości. BEM opisuje rolę klasy: `service-card` to blok, `service-card__bottom` jego element, a `button--dark` wariant przycisku. Zagnieżdżenia pozostają płytkie, żeby selektory były łatwe do przewidzenia.

## Accessibility

Strona ma jeden `h1`, logiczną hierarchię nagłówków, regiony `header`, `nav`, `main` i `footer` oraz odnośnik pomijający nawigację. Kontrolki działają z klawiatury i mają widoczny fokus. Przyciski oraz odnośniki nawigacyjne mają co najmniej 44 px wysokości.

Pola formularza mają etykiety i powiązane komunikaty błędów. Po niepoprawnym zgłoszeniu fokus trafia do pierwszego błędnego pola. `aria-invalid`, `aria-busy` i region `role="status"` opisują stan formularza. Suwak ma etykietę i tekstową wartość, a ikony dekoracyjne są pomijane przez czytniki ekranu.

Treść, FAQ i odnośniki pozostają dostępne bez JavaScript. Formularz jest wtedy wyłączony, aby nie wysłał danych przez przypadkowe żądanie GET. Obsługa ograniczonego ruchu wyłącza animacje i płynne przewijanie.

## Performance

Nie ma audio, particles, zewnętrznych fontów ani bibliotek ikon. Ilustracje są lokalnymi plikami SVG. Główna grafika ma wysoki priorytet pobierania; obrazy porównania poniżej pierwszego ekranu używają `loading="lazy"`. Wymiary obrazów są podane w HTML, żeby ograniczyć przesuwanie treści.

JavaScript jest podzielony na małe moduły. Animacje używają `IntersectionObserver`, kończą się po pierwszym pokazaniu karty i nie wymagają ciągłej pętli ani obsługi każdego zdarzenia przewijania.

## Screenshots

### Komputer

![Strona na komputerze](assets/screenshots/desktop.png)

### Telefon

![Strona na telefonie](assets/screenshots/mobile.png)

## Deployment

Workflow `.github/workflows/pages.yml` po zmianie na `main` instaluje Sass, buduje stronę, sprawdza pliki i uruchamia testy. Po powodzeniu publikuje katalog `dist/` w GitHub Pages. Nie wymaga dodatkowych sekretów.

W ustawieniach repozytorium źródłem Pages jest **GitHub Actions**. Wszystkie ścieżki do plików są względne, więc działają pod `/service-landing-page/`.

Na innym hostingu statycznym użyj:

```text
Build command: npm run build
Output directory: dist
```

Przy zmianie domeny zaktualizuj adresy `canonical`, OpenGraph, `robots.txt` i `sitemap.xml`. Przed użyciem strony przez rzeczywistą firmę uzupełnij ofertę, dane kontaktowe oraz obsługę zgłoszeń.
