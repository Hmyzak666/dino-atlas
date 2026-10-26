> **Aktuálně 26. 10. 2026 — dávka 04, kandidát 1000004:** Pět nových ordovických scén; předchozí kambrická dávka vizuálně schválená. Zachováno 112 druhů, nahrazeno 17 z 30 plánovaných obrazů, zbývá 13 (karbon 6, perm 7). Testy a podepsané APK 1000004 se ověřují, zatím nepotvrzené. [Předání dávky 04](docs/VISUAL-REFRESH-BATCH04.md). Neslučovat do main. Starší údaje níže jsou historie.

# Dino Atlas

> **Aktuálně 26. 10. 2026 — dávka 03, kandidát 1000003:** Vložených šest nových kambrických scén; předchozí dvě trojice vizuálně schválené uživatelem. Celkem 112 druhů, 12 z 30 plánovaných obrazových náhrad; 18 zbývá. Lokální i GitHub testy prošly, podepsané APK 1000003 je hotové; čeká uživatelská kontrola dávky. [Aktuální předání](docs/VISUAL-REFRESH-BATCH03.md). Neslučovat do main. Starší údaje níže jsou historie.

> **Pracovní 1.0.0, kandidát build 1000002:** 112 druhů, šest ze třiceti plánovaných obrazových náhrad vloženo (první tři schválené uživatelem). Nově Acutiramus, Birkenia a Dunkleosteus. Zbývá 24 oprav; nejde o finální vydání. Lokální i GitHub testy prošly a podepsané APK 1000002 je hotové; čeká kontrola této dávky na telefonu. [Stav dávky](docs/VISUAL-REFRESH-BATCH02.md). **Neslučovat do main.**

Český atlas pravěkých zvířat pro děti i dospělé. Android aplikace používá společné HTML, CSS, JavaScript a JSON ve vestavěném WebView. Atlas, obrázky a kvíz fungují bez internetu; čtení používá stažený český hlas telefonu.

**Uživatelem na telefonu ověřená verze 0.9.0, sestavení 90001**, rozšiřuje atlas na **72 zvířat — 45 dinosaurů, 10 ptakoještěrů, 8 mořských plazů a 9 členovců**. Navazuje na ověřenou 0.8.1 (80101). Všech 42 původních záznamů a obrázků je zachováno. Uživatel potvrdil správnou funkčnost nové verze i automatického posunu kvízu.

Nová verze přidává nezávislé filtry kategorie a období v kvízu, přepínání období přímo v detailu a čitelné porovnání drobných členovců v centimetrech či milimetrech. Vědecké nejistoty rekonstrukcí a rozměrů jsou výslovně označené.
## Funkce

- Kategorie Vše, Dinosauři, Ptakoještěři Mořští plazi a Členovci; abecední řazení, hledání, filtry období a potravy.
- Oblíbená zvířata, uložený vzhled a zvolená kategorie.
- Podrobnosti, poznávací znaky, míra jistoty tvrzení a velikostní porovnání.
- Oddělené čtení samotného jména, popisu, základních údajů a podrobností; místní české TTS.
- Celý obrázek na obrazovce, přiblížení 1–4×, posun, dvojité klepnutí, tlačítka +/− a návrat pomocí Zpět; také v kvízu bez prozrazení odpovědi.
- Šipky a dotykové procházení detailů, zachování hledání a polohy při návratu.
- Obrázkový kvíz s nápovědou, vysvětlením a omezením zaměnitelných odpovědí.

## Hlavní soubory

| Cesta | Úloha |
|---|---|
| `index.html`, `style.css`, `app.js` | Jediné aktivní webové rozhraní |
| `dinosaurs.json` | Jediná aktivní databáze včetně interních vědeckých podkladů |
| `images/` | Pouze 72 obrázků odkazovaných databází |
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

Na GitHubu spusť **Actions → Dino Atlas — kontroly a APK → Run workflow** a pro aktuální stabilní verzi vyber větev **main**. Verzi načte workflow z `project.json`, použije původní podpisová tajemství a nabídne podepsané APK. Při pull requestu a pushi na `main` běží stejné testy a úplná kompilace. Interní pull request vlastníka projektu může po testech nabídnout i podepsané APK, pokud jsou dostupná původní podpisová secrets; ostatní kontroly se obejdou bez soukromého klíče.

ApplicationId zůstává **`cz.hmyzak.dinoatlas`**, minimem je Android 8.0. Podpisový klíč se negeneruje znovu. Postup, kontrola certifikátu a místní sestavení jsou v [ANDROID.md](ANDROID.md).

## Další vývoj

Nové pracovní větve zakládej z aktuální `main`, která obsahuje dokončený úklid i ověřené úpravy 0.8.1. Před změnami přečti [PROJECT_STATUS.md](PROJECT_STATUS.md) a [návod k vývoji](docs/DEVELOPMENT.md). Zjištění, původ ověřené verze a body návratu zachycuje [audit úklidu](docs/cleanup-audit-2026-10-20.md). Historické návody v `docs/history/` nejsou aktuální sestavovací postupy.
