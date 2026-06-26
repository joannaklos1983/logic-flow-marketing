# VISUAL SPEC — Logic-Flow Landing Page
> Dokument stworzony na podstawie referencji wizualnej. Obowiązuje jako jedyne źródło prawdy.
> Przed każdą zmianą w CSS/HTML — sprawdź ten dokument.

---

## 1. PALETA KOLORÓW

| Token          | Hex / wartość           | Kiedy używać |
|----------------|-------------------------|--------------|
| `--navy`       | `#0A0F24`               | Tekst nagłówków, przyciski CTA, dolny pasek |
| `--ecru`       | `#F9F6F0`               | Tło 70% strony |
| `--white`      | `#FFFFFF`               | Tło kart, sekcja mechanizmu |
| `--gold`       | `#D4AF37`               | Eyebrow, italic lead, wyróżnienia tekstu ("szwajcarski zegarek"), ikona "—" |
| `--cyan`       | `#00F0FF`               | WYŁĄCZNIE: słowo "Flow" w logo |
| `--text-body`  | `#2D3748`               | Tekst akapitów |
| `--text-muted` | `#718096`               | Linki nav, subtelny tekst |

### Zasada użycia kolorów
- **70%** → ecru + white (tła sekcji)
- **20%** → navy (tekst, przyciski, pasek dolny)
- **7%** → gold (akcenty, wyróżnienia)
- **3%** → cyan (tylko logo "Flow")
- **ZERO** → cyan w przyciskach, sekcjach, gradientach

---

## 2. TYPOGRAFIA

| Element         | Rozmiar / waga           | Kolor       |
|-----------------|--------------------------|-------------|
| Logo "Logic"    | 1.2rem, 800              | `--navy`    |
| Logo "Flow"     | 1.2rem, 800              | `--cyan`    |
| Nav linki       | 0.85rem, 400             | `--text-muted` |
| Hero eyebrow    | 0.68rem, 600, uppercase, letter-spacing 0.18em | `--gold` z poziomą linią przed |
| Hero H1         | clamp(2.1rem, 4vw, 3.4rem), 800, letter-spacing -0.035em | `--navy` |
| Hero lead       | 1.1rem, 400, italic      | `--gold`    |
| Hero body       | 0.97rem, 400             | `--text-body` |
| Section eyebrow | 0.68rem, 600, uppercase  | `--gold`, ze strzałką "→" przed |
| Section H2      | clamp(1.8rem, 3vw, 2.6rem), 700 | `--navy` |
| Highlight w H2  | kolor `--gold`           | np. "szwajcarski zegarek" |
| Dolny pasek     | 0.75rem, 700, uppercase, letter-spacing 0.2em | `--gold` |

---

## 3. PRZYCISKI

### Primary — "Zamawiam bezpłatny audyt"
```
background: #0A0F24 (navy)
color: #F9F6F0 (ecru/white)
border-radius: 6px
padding: 14px 28px
font-size: 0.88rem, font-weight: 600
arrow icon "→" po tekście
hover: lekko jaśniejszy navy, translateY(-2px)
```

### Secondary — "Zobacz przykładowy raport"
```
background: transparent
border: 1.5px solid rgba(10, 15, 36, 0.20)
color: #0A0F24
border-radius: 6px
padding: 14px 28px
arrow icon "→" po tekście
hover: border-color: navy, translateY(-2px)
```

### Nav CTA — "Bezpłatny audyt"
```
background: #0A0F24 (navy)
color: white
border-radius: 6px
padding: 9px 20px + "→"
font-size: 0.82rem, 600
```

---

## 4. SEKCJE — KOLEJNOŚĆ I TŁO

```
1. NAV          → transparent → white blur on scroll
2. HERO         → white (lewo) + obraz (prawo), gradient ecru
3. MECHANISM    → WHITE (#FFFFFF) — jasna sekcja, NIE ciemna
4. [PROOF]      → ecru (#F9F6F0)
5. [FORM]       → white (#FFFFFF)
6. [ABOUT]      → ecru (#F9F6F0)
7. BOTTOM BAR   → navy (#0A0F24), kompaktowy pasek ~80px
```

---

## 5. HERO — szczegóły

### Układ
- **Dwie kolumny**: 44% tekst (lewo) | 56% obraz (prawo)
- Tło lewej kolumny: gradient `white → ecru`
- Prawa kolumna: `hero-main.jpeg` z `object-fit: cover`
- Blend na granicy: gradient `ecru → transparent` na lewej krawędzi obrazu

### Floating info panels NA obrazie
Panel POWYŻEJ powierzchni wody (top: ~8%, right: ~5%):
```
background: rgba(255,255,255,0.92) + backdrop-blur
border: 1px solid rgba(255,255,255,0.6)
border-radius: 12px
Tytuł: "CO WIDZISZ KAŻDEGO DNIA" — uppercase, 0.62rem, muted
Ikony: małe outline icons (Lucide/Feather style)
Items: Strona WWW | Social media | Reklamy
```

Panel PONIŻEJ powierzchni wody (bottom: ~8%, right: ~5%):
```
background: rgba(10, 15, 36, 0.75) + backdrop-blur
border: 1px solid rgba(0, 240, 255, 0.15)
border-radius: 12px
Tytuł: "CO NAPRAWDĘ DECYDUJE O WYNIKACH" — uppercase, 0.62rem, cyan/muted
Ikony: outline icons, tinted cyan
Items: SEO i widoczność | CRM i leady | Automatyzacje | Lejek sprzedażowy | Analityka i dane | AI w obsłudze
```

---

## 6. MECHANISM SECTION — szczegóły

**TŁO: BIAŁE (#FFFFFF) — nie granatowe, nie ciemne.**

### Układ
- **Dwie kolumny**: 40% obraz (lewo) | 60% treść (prawo)
- Lewo: zdjęcie makro mechanizmu zegarka (naturalne oświetlenie, złote koła zębate)
- Prawo: tekst + siatka ikon

### Treść prawej kolumny
```
Eyebrow: "→ TWÓJ BIZNES TO SYSTEM" — gold, uppercase
H2: "Działa jak <gold>szwajcarski zegarek</gold>."
     — "szwajcarski zegarek" wyróżnione kolorem gold/italic
Paragraph: "Każdy element ma swoją funkcję..."

Icons 2×3 grid:
  [Strategia]    [Marketing]    [Strona WWW]
  [Automatyzacje] [CRM]         [AI i dane]
  — thin-line outline icons (Lucide/Feather)
  — label pod ikoną, 0.78rem, navy
```

---

## 7. BOTTOM BAR (kompaktowy)

```
background: #0A0F24 (navy)
height: ~80px
padding: 20px 32px
display: flex, align-items: center, justify-content: center

Tekst: "ODKRYJ. ZROZUM. DZIAŁAJ." — gold, uppercase, 0.72rem, letter-spacing 0.2em
       " Zacznij od bezpłatnego audytu. →" — inline, gold/ecru
```

---

## 8. IKONY

Styl: **thin-line outline** (Lucide Icons lub Feather Icons)
- Stroke width: 1.5px
- Rozmiar na hero panelach: 16px
- Rozmiar w mechanism grid: 28px
- Kolor domyślny: `--navy`
- Kolor na ciemnym panelu: `rgba(0, 240, 255, 0.7)`

Ikony potrzebne w hero panel (above):
- Globe / Monitor (Strona WWW)
- Share2 / Instagram (Social media)
- Megaphone (Reklamy)

Ikony potrzebne w hero panel (below):
- Search (SEO)
- Users (CRM)
- Zap (Automatyzacje)
- TrendingUp (Lejek)
- BarChart2 (Analityka)
- Cpu (AI)

Ikony w mechanism grid:
- Compass (Strategia)
- Megaphone (Marketing)
- Globe (Strona WWW)
- Zap (Automatyzacje)
- Database (CRM)
- Cpu (AI i dane)

---

## 9. GRADIENT TRANSITIONS

**TYLKO te gradienty istnieją na stronie:**

```
Hero background (lewy obszar):
  linear-gradient(150deg, #FFFFFF 0%, #F9F6F0 100%)

Blend lewej krawędzi obrazu hero:
  linear-gradient(to right, #F9F6F0 0%, transparent 100%) — 200px szerokości

Między sekcjami:
  BRAK sztucznych gradientów cyjanowych — sekcje po prostu zmieniają tło
```

**Cyjan NIE jest używany w żadnym gradiencie sekcji.**

---

## 10. ELEMENTY DO PRZEBUDOWY (delta vs. obecny kod)

| Element | Obecnie (błędnie) | Powinno być |
|---|---|---|
| Przyciski primary | Cyjan | Navy |
| Nav CTA | Cyjan | Navy |
| Mechanism section | Ciemna, granatowa | BIAŁA |
| Mechanism content | Numerowana lista | Siatka ikon 2×3 |
| Hero panels | Usunięte | PRZYWRÓCIĆ z ikonami |
| Sekcja gradienty | Cyjanowe gradient-wash | BRAK |
| Dolny CTA | Duża sekcja | Kompaktowy pasek |
| Cyjan w logo | Brak wyróżnienia | "Flow" = cyan |

---

*Dokument spec v1.0 — na podstawie referencji wizualnej użytkownika.*
*Data: 2026-06-23*
