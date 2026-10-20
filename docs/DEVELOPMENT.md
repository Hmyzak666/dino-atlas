# Návod k dalšímu vývoji

## Před změnou

Přečti `PROJECT_STATUS.md`, zkontroluj pracovní strom a vycházej z poslední schválené větve. Vytvoř samostatnou větev pro jednu změnu. Poslední telefonem ověřená aplikace při tomto úklidu je 0.8.0 se 42 zvířaty.

Technický úklid zachovává `index.html`, `style.css`, `app.js`, `dinosaurs.json` a všech 42 obrázků po bajtech. Obnovovací tagy a zdrojový původ popisuje [audit](cleanup-audit-2026-10-20.md).

## Kam změna patří

- Texty, údaje, evidence, aliasy, kategorie a cesty obrázků: `dinosaurs.json`.
- Rozhraní a jeho chování: kořenové `index.html`, `style.css` a `app.js`.
- Obrázky: pouze soubory odkazované databází v `images/`. Nepřidávat sem kopie kódu, návody ani celé aktualizační ZIPy.
- Android obal: `android/src/cz/hmyzak/dinoatlas/MainActivity.java`; manifest a prostředky mají vlastní soubory v `android/`.
- Údaje o vydání: `project.json`. Číslo sestavení musí být vyšší než poslední distribuované APK. Textová verze webové patičky je kontrolovaná proti tomuto souboru.
- Podklady k rekonstrukcím: `docs/image-prompts/`; vědecké poznámky: `docs/research/`.

Obsah i příprava obrázků mají zohlednit vědeckou nejistotu. Zachovat oddělení popisu a základních údajů při čtení. Zobrazované správné české texty nenahrazovat fonetickým pravopisem; úpravy výslovnosti zůstávají v čtecí vrstvě.

## Testy

```bash
npm ci
npm test
npx playwright install --with-deps chromium --only-shell
npm run test:ui
python3 build_android.py --unsigned
```

Poslední příkaz vyžaduje SDK. `npm test` zahrnuje obsah, 400 kvízů, vyhledávání, kompatibilitu a kontroly sestavování. Testy rozhraní ověřují malé i velké šířky, gesta, čtení, návrat do atlasu, kvíz a uložené preference.

Pro vlastní instalované Chromium lze nastavit `DINO_BROWSER_PATH`. Kontrolní snímky patří do `.qa/` nebo do složky z `DINO_QA_DIR`; nejsou součástí aplikace ani zdrojové historie.

## Srovnávací podklad

`tests/fixtures/verified-0.8.0.json` zachycuje skutečně potvrzené runtime soubory, obrázky, Java zdroj, ID, původ úložiště a certifikát. Při technické změně neměň podklad jen proto, aby test prošel: zjisti skutečný rozdíl.

Při výslovně schválené nové funkci nebo obsahové várce změň očekávání záměrně a v přehledu změn vysvětli důvod. Nový podklad založ až na prověřeném vydání. Zachovat původní ID existujících zvířat; případná migrace uživatelských dat vyžaduje samostatný návrh a testy.

## Kontrola před předáním

Zkontroluj celý diff, aktuálnost README a `PROJECT_STATUS.md`, nepřítomnost klíčů a vygenerovaných souborů a úspěšné testy. Otevři přehled změn pracovní větve. Podepsanou aktualizaci sestav pomocí původních secrets; projdi automatické ověření APK a podle rozsahu změny i test v telefonu.

V tomto úklidu jsou Java, vzhled i obsah stejné jako v 0.8.0. Po budoucí změně Android obalu věnuj zvláštní pozornost čtení, systémovému tlačítku Zpět, bezpečným okrajům displeje a zachování místního úložiště.

## Obnova

Ke starému projektu se vrať v nové větvi po načtení záložních větví z GitHubu:

```bash
git fetch origin
git switch -c recovery/pre-cleanup origin/backup/pre-cleanup-2026-10-20
```

K telefonem ověřenému zdrojovému základu slouží vzdálená větev `origin/backup/verified-0.8.0-before-cleanup`. Při obnově z předávacího Git bundle lze použít i tagy `pre-cleanup-2026-10-20` a `verified-0.8.0-before-cleanup`. Historii nepřepisuj silovým pushem; pro návrat již sloučené změny použij přehledný revert.
