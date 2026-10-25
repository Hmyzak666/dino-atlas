# Průběžné ověření kandidáta Dino Atlas 0.9.0

Datum kontroly: 25. října 2026. Tento archiv je **rozpracovaný kandidát**, nikoli schválená vydaná verze.

## Výsledky v dostupném prostředí

- `npm test` — **PASS**. Obsahuje kontrolu všech 72 živočichů, přesných 30 nových hesel, 9 členovců, kategorií a období, 500 kvízů, hledání, české výslovnosti, původních dat a kompatibility, šesti Python testů a `build_android.py --check`.
- Všech 72 obrázků WebP dekódováno knihovnou Pillow. Každý má rozlišení 1536 × 1024 px.
- Náhradní prohlížečová kontrola pomocí Python Playwright a místního Chromia — **PASS** pro šířky 320, 412 a 900 px. Prošla základní navigace atlas/detail/kvíz, přepínání období přímo v detailu, 20 kombinací kategorie a období kvízu na každé šířce, omezené pooly i návrat do kvízu.

## Omezení ověření

- Původní JS `npm run test:ui` nebyl spuštěn: v prostředí nejsou dostupné závislosti Node Playwright a `npm ci` se kvůli síťovému omezení nedokončilo. Náhradní test není ekvivalentem všech původních UI/regresních testů.
- Python Playwright testoval statické HTML/CSS/JS s databází načtenou do paměti, nikoli přes běžný HTTP server; ověření načítání obrázků v reálném browser originu vyžaduje CI / instalované APK.
- Android SDK a podpisová secrets nejsou v tomto prostředí dostupné. Podepsané instalovatelné APK **nebylo sestaveno**.
- Přenos úplného balíčku (včetně 30 nových WebP souborů) do GitHub větve se zatím neprovedl. GitHub větev `feature/atlas-0.9.0` zůstává v původním stavu `main`.
- Nebylo provedeno fyzické testování telefonu ani skutečného českého hlasu.

## Následující krok

Přenést tento balíček do pracovní větve `feature/atlas-0.9.0` bez změny `main`, spustit všechna CI a podepsané sestavení v GitHub Actions, následně předat APK k uživatelskému ověření. Základní verzi 0.8.1 neměnit před potvrzením aktualizace.
