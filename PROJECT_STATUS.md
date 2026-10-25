# Stav projektu Dino Atlas

Aktualizováno 25. října 2026. Kandidát **0.9.0, versionCode 90001** ve větvi `feature/atlas-0.9.0`; poslední telefonem potvrzená verze je **0.8.1 (80101)**. Základ: `7d419272a9d86dc1d4a44ac7591eb6a9b6dd7fee`. Do main neslučovat před vyzkoušením APK.

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

Stav konkrétního běhu a odkaz na APK patří do pull requestu; úspěšné statické testy samy nepotvrzují instalovatelné APK. Fyzický telefon a skutečný český hlas musí ještě vyzkoušet uživatel. Instalovat jako aktualizaci bez odinstalace.

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
