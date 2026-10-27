> **Aktuálně 27. 10. 2026 — dávka 06 / 1000006:** Dva přesné ořezy (Pulmonoscorpius a Arthropleura) a nová rekonstrukce Edesta. 112 druhů zachováno. Zbývá sedm permských náhrad; finální CI testy databáze i rozhraní prošly. Podepsané APK 1000006 je hotové, původní certifikát a přesný obsah ověřeny v CI 40469603728. Edestus i zkouška aktualizace na telefonu čekají na hodnocení uživatele. [Předání](docs/VISUAL-REFRESH-BATCH06.md). Neslučovat do main. Starší údaje níže jsou historie.

> **Aktuálně 27. 10. 2026 — dávka 05 / 1000005:** Vloženo pět karbonských rekonstrukcí, celkem 22 z 30 náhrad. Edestus odmítnut, zůstává původní; zbývá osm oprav (Edestus + perm 7). Lokální i GitHub testy prošly, podepsané APK 1000005 je hotové. Čeká hodnocení uživatele. [Předání](docs/VISUAL-REFRESH-BATCH05.md). Neslučovat do main. Starší údaje níže jsou historie.

> **Aktuálně 26. 10. 2026 — dávka 04, kandidát 1000004:** Pět nových ordovických scén; předchozí kambrická dávka vizuálně schválená. Zachováno 112 druhů, nahrazeno 17 z 30 plánovaných obrazů, zbývá 13 (karbon 6, perm 7). Lokální i GitHub testy prošly; podepsané APK 1000004 je hotové a ověřené. Čeká uživatelská kontrola nové dávky. [Předání dávky 04](docs/VISUAL-REFRESH-BATCH04.md). Neslučovat do main. Starší údaje níže jsou historie.

# Stav projektu Dino Atlas

> **Aktuálně 26. 10. 2026 — dávka 03, kandidát 1000003:** Vložených šest nových kambrických scén; předchozí dvě trojice vizuálně schválené uživatelem. Celkem 112 druhů, 12 z 30 plánovaných obrazových náhrad; 18 zbývá. Lokální i GitHub testy prošly, podepsané APK 1000003 je hotové; čeká uživatelská kontrola dávky. [Aktuální předání](docs/VISUAL-REFRESH-BATCH03.md). Neslučovat do main. Starší údaje níže jsou historie.

## Aktuální kandidát 1.0.0 — 26. října 2026

Větev `feature/paleozoic-1.0.0`, 112 druhů. Poslední uživatelem schválený build je **1000001** (Eurypterus, Entelognathus, Qilinyu). Kandidát **1000002** přidává jednotlivě zkontrolované rekonstrukce Acutiramus, Birkenia a Dunkleosteus. Zbývá **24 plánovaných obrazových oprav**; nejde o finální vydání. Obsah druhů a funkční kód zůstávají beze změny. Zálohováno všech 40 prvohorních obrázků ze schváleného výchozího stavu.

Lokálně prošly `npm test` a `npm run test:ui` (Chromium 153). GitHub Actions 40325360063 úspěšně dokončil testy i podepsané APK 1000002 s původním certifikátem. Zkouška nových obrázků na telefonu zatím čeká. Podrobnosti a další pořadí: [dávka 02](docs/VISUAL-REFRESH-BATCH02.md). **Neslučovat do main.** Starší stav níže je historický.

Aktualizováno 25. října 2026. **Telefonem ověřená finální verze 0.9.0, versionCode 90001**, připravená ke sloučení do `main` po výslovném souhlasu uživatele. Základ: 0.8.1 (80101), commit `7d419272a9d86dc1d4a44ac7591eb6a9b6dd7fee`. Uživatel potvrdil funkčnost 0.9.0 (90000) i následné opravy automatického posunu kvízu v 90001.

## Obsah a funkce 0.9.0

- Přesně 30 nových druhů, celkem 72: 45 dinosaurů, 10 ptakoještěrů, 8 mořských plazů, 9 členovců. Seznam hlídá `tests/fixtures/additions-0.9.0.json`.
- Nové české popisy, tři poznávací znaky, šest rozbalitelných témat, výslovnost, interní vědecké odkazy a vlastní WebP rekonstrukce. Nejisté anatomické znaky a rozměry jsou označené, neznámé hmotnosti nejsou vymyšlené.
- Kategorie Členovci funguje v atlasu, hledání, oblíbených, náhodném výběru i kvízu. Obsahuje také ostrorepa a pavoukovce, nikoli jen hmyz.
- Kvíz má vlastní kombinované filtry kategorie a období. Možnosti odpovědi pocházejí ze stejného výběru; nedostatek vhodných zvířat má vysvětlení. Filtry atlasu se nemění.
- Detail nabízí Trias / Jura / Křída / Vše. Změna otevře první abecedně řazené zvíře daného období při zachování ostatních filtrů procházení. Šipky a gesta pokračují ve výběru. Návrat obnoví původní atlas včetně hledání.
- Malí členovci mají měřítko 1 nebo 10 cm místo nečitelné siluety člověka. Nejde o fyzické měřítko displeje.
- Zachované čtení, světlo/tma, oblíbení, zoom, kvízové nápovědy a offline obsah. Původních 42 záznamů a obrazových souborů chrání regresní test.

## Ověření a předání

`npm test` kontroluje 72 záznamů, obrázky, výslovnost, vyhledávání, kombinace filtrů, kvízy, kompatibilitu a sestavování. `npm run test:ui` kontroluje skutečný prohlížeč na malých i velkých obrazovkách, gesta, zoom, TTS, návraty a nezávislé filtry. Úplné Android sestavení v jediném GitHub workflow ověřuje také obsah APK a původní podpis.

Poslední sestavení 90001 prošlo automatickými testy, úplným Android buildem s původním podpisovým certifikátem a ověřením přímo na telefonu uživatele. Instalace aktualizace proběhla bez odinstalování předchozí verze. Viz [GitHub Actions](https://github.com/Hmyzak666/dino-atlas/actions/runs/40184888132).

## Kompatibilita aktualizace

| Vlastnost | Zachovaná hodnota |
|---|---|
| ApplicationId | `cz.hmyzak.dinoatlas` |
| Lokální původ WebView | `https://appassets.androidplatform.net` |
| Počáteční stránka | `/assets/index.html#atlas` |
| Oblíbené | `dinoatlas-favorites` |
| Vzhled | `dinoatlas-theme` |
| Kategorie | `dinoatlas-category` |
| Android | min SDK 26, target SDK 35 |
| Alias původního klíče | `dinoatlas` |
| SHA-256 certifikátu | `4008bd7e1dbf92662a5d2de90fa090e1cbb63a6b0020fd687a2927e711da522c` |

ID všech zvířat jsou zachovaná. Java zdroj je po oddělení ze skriptu shodný po jednotlivých bajtech s ověřenou verzí. Původní certifikát je kontrolovaný po podepsání; jinak podepsané APK se neponechá jako výstup úspěšného sestavení. Klíč ani hesla nejsou součástí repozitáře.

## Struktura a automatizace

Aktivní web zůstává v kořeni kvůli stabilním cestám i prostému webovému náhledu. `images/` obsahuje jen odkazované obrázky. Nativní manifest, Java a prostředky jsou v `android/`; sestavování je v jediném `build_android.py` a kontrola výsledku v `tools/verify_apk.py`.

Dokumentace k obrázkům je v `docs/image-prompts/`, vědecké poznámky v `docs/research/` a staré návody v `docs/history/`. Staré kopie kódu nejsou součástí aktivního stromu; lze je obnovit z Git historie a bodů návratu uvedených v auditu.

Jediné workflow kontroluje pull requesty a `main`. Při ručním spuštění stejného workflow vzniká podepsané APK. U interního pull requestu založeného vlastníkem projektu může po testech vzniknout podepsané APK, pokud jsou původní podpisová secrets dostupná. Ostatní kontroly nepotřebují soukromý klíč; nepodepsaná kompilace se nevydává jako instalovatelná aktualizace.

## Vědecké podklady a další vývoj

Podrobnosti k novým druhům a nejistotám: [vědecké poznámky](docs/research/0.9.0.md). Zadání rekonstrukcí: [obrázky](docs/image-prompts/0.9.0.md). Postup: [DEVELOPMENT.md](docs/DEVELOPMENT.md).

Slovník `periods` v databázi určuje dostupná období a jejich pořadí. Nové období lze později přidat bez pevného tříčlenného filtru. Tato aktualizace obsahuje pouze trias, juru a křídu, žádné prvohorní organismy.

## Body návratu

`main` na výše uvedeném commitu a `backup/verified-0.8.1-build80101` uchovávají výchozí verzi. Historii nepřepisovat, původní zálohy nemazat. Úklid a jeho původ popisuje [audit](docs/cleanup-audit-2026-10-20.md); předchozí funkční změny jsou v PR #1 a #2.

## Aktualizace chování kvízu v sestavení 90001

Po otevření kvízu, změně filtrů a přechodu na další otázku se na displejích na výšku automaticky posune obrazovka k obrázku a volbám odpovědí. Na šířku se vynucené posouvání neuplatňuje. Prohlížečové regresní testy ověřují viditelnost obrázku a odpovědí. Sestavení 90001 navazuje na telefonem otestované 90000; před vydáním ověřit aktualizaci na telefonu.
