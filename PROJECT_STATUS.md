# Stav projektu Dino Atlas

Aktualizováno: 20. října 2026. Rozsah změny: technický úklid a ověření spolehlivosti; bez nové funkce či nového zvířete oproti nainstalované 0.8.0.

## Ověřený základ a verze

- Telefonem potvrzená verze: **0.8.0, versionCode 80000**.
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

Jediné workflow kontroluje pull requesty a `main`. Při ručním spuštění stejného workflow vzniká podepsané APK. Automatická kompilace z pull requestů nepotřebuje původní podpisový klíč a nevydává nepodepsaný soubor jako instalovatelnou aktualizaci.

## Ověření úklidu

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

Tyto kontroly nenahrazují poslech konkrétního hlasu a zkoušku aktualizace na fyzickém telefonu. U nové technické sestavy ještě nebyla provedena taková ruční telefonní zkouška. Původní 0.8.0 už uživatel v telefonu potvrdil.

Zápis větve do GitHubu při přípravě odmítlo připojení chybou 403. Změny jsou připravené v místní větvi `chore/project-cleanup-2026-10-20`; jejich automatické kontroly přímo na GitHubu je potřeba spustit po zpřístupnění zápisu. `main` na GitHubu se při této přípravě nezměnil.

## Další postup

Žádná nová funkce ani obsahová várka nyní není domluvená. Budoucí změny připravovat odděleně podle [DEVELOPMENT.md](docs/DEVELOPMENT.md). Při schválené změně obsahu záměrně aktualizovat očekávání i srovnávací podklad; u technického úklidu je zachovat.
