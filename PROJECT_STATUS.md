# Stav projektu Dino Atlas

Aktualizováno: 21. října 2026. Aktuální uživatelem ověřená verze je **0.8.1, versionCode 80101**. Obsah 42 zvířat se nemění.

## Hlavní větev a body návratu

Technický úklid z [návrhu č. 1](https://github.com/Hmyzak666/dino-atlas/pull/1) a úpravy 0.8.1 z [návrhu č. 2](https://github.com/Hmyzak666/dino-atlas/pull/2) tvoří společný základ v `main`. Další vývoj zahajuj samostatnou větví z aktuální `main`. Změny se slučují se zachováním historie.

Před sloučením byly zachovány zálohy `backup/main-before-merge-2026-10-21` (původní hlavní větev) a `backup/verified-0.8.1-build80101` (přesné zdroje uživatelem potvrzeného APK). Starší body návratu zůstávají v historii a záložních větvích.

Při dokončení se mění pouze dokumentace a historie větví. Runtime soubory, databáze, obrázky, sestavování a podpis odpovídají ověřenému sestavení 80101, takže nová instalace aplikace není potřeba. Kontroly po sloučení sleduj v GitHub Actions pro větev `main`; podepsané APK se vytváří ručním spuštěním stejného workflow s výběrem `main`.

## Oprava prohlížeče obrázků, sestavení 80101

Uživatel vyzkoušel sestavení 80100 a doložil světlé okraje obrázku a příliš malé zobrazení naležato. Ovládání prohlížeče se v sestavení 80101 překrývá s obrazem a neubírá mu prostor; obrázek se přizpůsobuje celému displeji na tmavém pozadí ve světlém i tmavém vzhledu. Detail zachovává přirozený poměr stran bez pevného výškového stropu. Původní obsah obrázků se nemění.

Regresní testy ověřují skutečnou velikost a barvu pozadí v obou vzhledech, otočení otevřeného prohlížeče, krátké displeje naležato, zachování přiblížení a ovládání. Uživatel následně potvrdil funkčnost opravného sestavení 80101 a spokojenost s výsledkem.

## Vyžádané změny 0.8.1

- V čtecí vrstvě se Diplodocus a jeho české tvary vyslovují s tvrdým k, například Diplodokovi v popisu Camarasaura. Psané názvy jsou zachované.
- U názvu zvířete je samostatné tlačítko pro přečtení pouze jeho jména.
- Obrázek v detailu i v kvízu lze otevřít přes celou obrazovku. Má přiblížení 1–4× dvěma prsty, posun jedním prstem, dvojité klepnutí, tlačítka +/− a návrat k celému obrázku. Zavření a systémové Zpět vracejí na původní místo. Kvízový obrázek neprozrazuje jméno správné odpovědi.
- Filtry období mají pořadí **Trias · Jura · Křída · Vše**.

Úpravy vznikly ve větvi `feature/image-viewer-reading-0.8.1` a v návrhu č. 2 po technickém úklidu v č. 1. [Ověření sestavení 80101](https://github.com/Hmyzak666/dino-atlas/actions/runs/39479422173) úspěšně prošlo obsahovými, kompatibilními a prohlížečovými testy i úplným podepsaným Android sestavením. V době přípravy této verze bylo místní prostředí nedostupné, takže ověření proběhlo přes GitHub Actions. Připomínku k obrázku ze sestavení 80100 vyřešilo uživatelem potvrzené 80101.

Databáze, 42 obrázků, Java zdroj, manifest, nativní prostředky, certifikát a klíče uživatelského úložiště zůstávají stejné. Původní podklad `verified-0.8.0.json` zůstává zachovaný; změny tří webových souborů mají výslovný podklad `approved-0.8.1.json`.

## Ověřený základ a verze

- Aktuální uživatelem potvrzená verze: **0.8.1, versionCode 80101**.
- Telefonem potvrzený výchozí základ úklidu: **0.8.0, versionCode 80000**.
- Obsah: **42 hesel a 42 WebP obrázků**; 30 dinosaurů, 6 ptakoještěrů, 6 mořských plazů. Trias zahrnuje 11 hesel.
- Zdrojový základ: úplný `Dino-Atlas-0.8.0-zdroje.zip`. Jeho čtyři webové soubory a všech 42 obrázků byly porovnány s hotovým APK; liší se pouze záměrně generované označení sestavení v patičce.
- Uklizené sestavení: **0.8.0, versionCode 80001**, aby aktualizovalo dosavadní APK. Zobrazené funkce, texty, obrázky a chování jsou zachované.
- `project.json` je hlavní zdroj údajů pro sestavení. Webová patička se kontroluje proti jeho verzi. Rozdílná verze předaná přes starý argument `--version` je odmítnuta.

## Zachované chování

Výchozí světlý vzhled a dosavadní přepínání vzhledu, zelené záhlaví, karty, srdíčka a rozložení jsou stejné. Zůstávají všechny čtyři kategorie, české abecední řazení, hledání podle jména a aliasů, období a potrava, oblíbené položky, náhodný výběr, šipky posunu a gesta.

Detail dál ukazuje název, vědecké jméno a stáří nad obrázkem, poznávací znaky, základní údaje, rozbalitelné části a porovnání délky nebo rozpětí s dospělým či dítětem. Barevné značky jistoty zůstávají. V rozhraní nejsou přidané veřejné odkazy.

Hledání určuje výchozí zvíře; při přechodu na další se zachovají ostatní filtry a hledaný text se vrátí při návratu do atlasu. Kvíz zachovává nápovědu, vysvětlení, návrat z detailu a skupiny vzhledově podobných zvířat.

Čtení popisu, základních údajů, poznávacích znaků, porovnání a rozbalených částí zůstává oddělené. Původní úpravy české výslovnosti, zastavení, přepnutí čtené části a ochrana proti opožděným událostem TTS jsou zachované.

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

## Předchozí ověření úklidu 0.8.0

Místně prošly:

- `npm ci` s uzamčenou verzí Playwright a `npm test`.
- Databáze, obrázky, oddělené předčítání, české řazení a 400 generovaných kvízů.
- Vyhledávání, aliasy, kombinace filtrů a chybějící stará ID v oblíbených.
- Shoda čtyř runtime souborů, všech obrázků a Java zdroje s potvrzenou verzí 0.8.0.
- Odmítnutí neúplného HTML, opakovaných JSON klíčů, zkráceného obrázku, staré kopie v `images/`, neplatné cesty a klesající verze.
- Mobilní rozhraní v šířkách 320, 360, 412 a 900 px, skutečné dotykové gesto, návrat do seznamu, přepínání TTS, kvíz a obnovení uložených voleb v novém kontextu.
- Dekódování všech 42 obrázků v prohlížeči.
- Kontrola jediného workflow nástrojem actionlint 1.7.12 a kontrola aktivních dokumentačních odkazů.
- Úplná kompilace Java, DEX a prostředků z Android SDK, balení, zarovnání a podpis původním klíčem. Nativní prostředky v hotovém APK jsou shodné s původním APK.

Tyto kontroly nenahrazují poslech konkrétního hlasu a zkoušku aktualizace na fyzickém telefonu. Uživatel následně potvrdil funkčnost technického sestavení 80001 v telefonu. Samsung tablet vyžadoval stažení českého systémového hlasu. Zkouška sestavení 80100 odhalila výše popsané okraje a malé zobrazení obrázku.

Připojení GitHubu původně odmítalo zápis chybou 403; po autorizaci bylo obnoveno. Historii úklidu zachycuje návrh č. 1 a větev `chore/project-cleanup-2026-10-20`. Původní stav chrání větev `backup/pre-cleanup-2026-10-20`, ověřený základ větev `backup/verified-0.8.0-before-cleanup`. Po potvrzení funkčnosti uživatelem navazuje dokončení sloučením obou návrhů do `main`, ze které se má vycházet při dalším vývoji.

## Další postup

Domluvené úpravy 0.8.1 jsou vyjmenované výše; další obsahová várka nyní není domluvená. Budoucí změny připravovat odděleně podle [DEVELOPMENT.md](docs/DEVELOPMENT.md). Při schválené změně obsahu záměrně aktualizovat očekávání i srovnávací podklad; u technického úklidu je zachovat.
