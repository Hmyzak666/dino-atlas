# Dino Atlas

Český atlas pravěkých zvířat pro děti i dospělé. Android aplikace používá společné HTML, CSS, JavaScript a JSON ve vestavěném WebView. Atlas, obrázky a kvíz fungují bez internetu; čtení používá stažený český hlas telefonu.

Tato větev vychází z telefonem ověřené **verze 0.8.0: 42 zvířat — 30 dinosaurů, 6 ptakoještěrů a 6 mořských plazů**. Technický úklid má sestavení **80001**. Kód rozhraní, obsah, obrázky i nativní chování odpovídají původnímu sestavení 80000.

## Funkce

- Kategorie Vše, Dinosauři, Ptakoještěři a Mořští plazi; abecední řazení, hledání, filtry období a potravy.
- Oblíbená zvířata, uložený vzhled a zvolená kategorie.
- Podrobnosti, poznávací znaky, míra jistoty tvrzení a velikostní porovnání.
- Oddělené čtení popisu, základních údajů a podrobností; místní české TTS.
- Šipky a dotykové procházení detailů, zachování hledání a polohy při návratu.
- Obrázkový kvíz s nápovědou, vysvětlením a omezením zaměnitelných odpovědí.

## Hlavní soubory

| Cesta | Úloha |
|---|---|
| `index.html`, `style.css`, `app.js` | Jediné aktivní webové rozhraní |
| `dinosaurs.json` | Jediná aktivní databáze včetně interních vědeckých podkladů |
| `images/` | Pouze 42 obrázků odkazovaných databází |
| `android/` | Manifest, nativní Java obal a prostředky Androidu |
| `project.json` | Verze, číslo sestavení, SDK a očekávaný podpis |
| `build_android.py` | Jediný vstupní bod sestavení APK |
| `tools/verify_apk.py` | Kontrola hotového APK, obsahu a certifikátu |
| `tests/` | Obsahové, regresní, sestavovací a mobilní testy |
| `.github/workflows/android-apk.yml` | Jediné workflow pro kontroly a APK |
| `docs/` | Vývoj, audit, vědecké a historické podklady |

## Rychlý začátek

Požadavky: Node.js 22+, Python 3.10+. Pro Android také Java 17 a Android SDK podle `project.json`.

```bash
npm ci
npm test
npx playwright install --with-deps chromium --only-shell
npm run test:ui
```

Pro místní webový náhled spusť z kořene projektu `python3 -m http.server 8000 --bind 127.0.0.1` a otevři `http://127.0.0.1:8000`.

## Android

Na GitHubu spusť **Actions → Dino Atlas — kontroly a APK → Run workflow**. Verzi načte workflow z `project.json`, použije původní podpisová tajemství a nabídne podepsané APK. Při pull requestu a pushi na `main` běží stejné testy a úplná kompilace bez soukromého klíče.

ApplicationId zůstává **`cz.hmyzak.dinoatlas`**, minimem je Android 8.0. Podpisový klíč se negeneruje znovu. Postup, kontrola certifikátu a místní sestavení jsou v [ANDROID.md](ANDROID.md).

## Další vývoj

Před změnami přečti [PROJECT_STATUS.md](PROJECT_STATUS.md) a [návod k vývoji](docs/DEVELOPMENT.md). Zjištění, původ ověřené verze a body návratu zachycuje [audit úklidu](docs/cleanup-audit-2026-10-20.md). Historické návody v `docs/history/` nejsou aktuální sestavovací postupy.
