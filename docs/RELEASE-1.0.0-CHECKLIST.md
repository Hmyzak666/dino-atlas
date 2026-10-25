# Dino Atlas 1.0.0 – předání finálního kandidáta k testu

**Stav:** Obsah první generace prvohor dokončen v pracovní větvi `feature/paleozoic-1.0.0`. Verze **1.0.0 (build 1000000)** je kandidátem k instalaci a mobilnímu testu, **nikoli dosud schváleným vydáním**.

## Obsah
- 112 druhů celkem: 72 původně ve stabilní 0.9.0 a **40 nových prvohorních**.
- Přesný rozpis nových druhů: Kambrium 6, Ordovik 5, Silur 5, Devon 8, Karbon 8, Perm 8.
- 112 jednotlivých WebP assetů. Původních 72 zůstává kompatibilních, 40 dalších má vědecké zdroje a pracovní obrazové rekonstrukce.
- Dynamické rozdělení času na **Prvohory / Druhohory**, šest nových geologických období a rozšířené kategorie.
- Nezávislé filtry času a skupin v kvízu, mobilní scroll a přechody mezi druhy.
- U jednotlivých obrázků na Commons je kredit autora a licence v `image.note` a `image.sourceIds`; **při jakékoliv grafické změně zachovat podmínky ShareAlike**.
- Připraveno na další rozšíření o kenozoikum nebo další druhohorní skupiny, ale tato obsahová dávka je úmyslně omezená na prvohory.

## Zachovat bez výjimky
- Aplikace `cz.hmyzak.dinoatlas` a původní podpisový certifikát SHA-256 `4008bd7e1dbf92662a5d2de90fa090e1cbb63a6b0020fd687a2927e711da522c`.
- Úložiště, oblíbené záznamy, světlý/tmavý režim, offline, český TTS, kvíz, zoom, hledání a všech 42 záznamů 0.8.1 (testují se zvlášť).
- Android `versionCode` **1000000**, tedy vyšší než poslední uživatelem nainstalovaný 90001. Sestavení označit **1.0.0**.
- Především nikdy automaticky **neslučovat do `main`** před reálným telefonním testem uživatele.

## Ověření
- `npm test`: původních 72 položek, 40 prvohorních, ID a taxonomie, 112 skutečných obrázků, výslovnost, obsah/zdroje, offline a podpisový projekt.
- `npm run test:ui`: viewporty, filtry v obou érách, kvíz, gesta, favorite a návratové stavy. Po testech kompletní Android build a podpis původním klíčem.
- Nově důležité: na telefonu s dosavadní verzí 90001 instalovat **přes aplikaci, neodinstalovat**, ověřit neztracené oblíbené a nastavení. Projít všechny nové období a kvíz, TTS, obrázky a filtry.
- Část předloh obsahuje ilustrace a muzejní modely místo sjednoceného realistického stylu; jejich obrazová podoba může být esteticky revidována i před release.

## Odkazy
- Vývoj a revize: https://github.com/Hmyzak666/dino-atlas/pull/4
- Obrazový audit permu: https://github.com/Hmyzak666/dino-atlas/actions/runs/40222818901
- Úspěšný úplný import permu: https://github.com/Hmyzak666/dino-atlas/actions/runs/40223279909
- Kredity permu: `docs/PERMIAN-ARTWORK-LICENSES.md`
- Kredity karbonu: `docs/CARBONIFEROUS-ARTWORK-LICENSES.md`

**Před merge do main:** stáhnout podepsané APK jako artifact z úspěšného běhu `Dino Atlas — kontroly a APK`, uživatel jej nainstaluje a vyzkouší. Chyby opravovat ve stejné pracovní větvi a zvýšit versionCode, pokud už byl kandidát nainstalován.

## Stav po telefonním testu 25. 10. 2026 – vizuální vydání ještě NEODSOUHLASENO

Uživatel potvrdil funkčnost 1.0.0 build 1000000 na telefonu, ale upozornil, že **většina nových prvohorních obrázků má rozmazané levé/pravé či horní/dolní okraje, bílé/nepřirozené pozadí a nesjednocený styl**. Tato zpětná vazba **blokuje sloučení do `main`**; dřívější formulace „čeká test na telefonu“ zde již neplatí. Podrobný audit 30 ze 40 kandidátů k výměně: `docs/VISUAL-REFRESH-1.0.0.md`.

**Kvalitativní brána:** 
- Nejprve vyrobit 2 **druhově přesné, samostatné, beztextové** testovací obrazy bez rozmazaných/umělých okrajů, neprezentovat koláž ani diagram jako hotovou ilustraci.
- Vysoká priorita: silurští Eurypterus remipes a Acutiramus bohemicus musí mít **rozlišitelnou anatomii**: Eurypterus nemá obrovská lovecká klepítka, Acutiramus naopak ano.
- Nevkládat přeznačené cizí druhy, AI halucinované údy ani zrcadlené části těla, neprovádět hromadné změny před vizuálním a vědeckým auditem první dvojice.
- Ponechat všech 112 druhů, vědecké texty, kvíz, původní podpis i data oblíbených, a zachovat autorské licence/atribuce původních obrázků.
- Po úspěšném obrazovém auditu zvýšit `versionCode` z **1000000** na **1000001** (protože build 1000000 už uživatel instaloval), znovu sestavit podepsané APK a otestovat aktualizaci na telefonu.
- Dokud neprojde testovaný visual-polish kandidát, **nevydávat verzi 1.0.0 a nemergovat PR #4 do main**.

