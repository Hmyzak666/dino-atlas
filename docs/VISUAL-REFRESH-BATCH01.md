# Dino Atlas 1.0.0 – vizuální refresh / první ověřená obrazová dávka

**Stav:** Pouze připravený ZIP. Pracovní aplikace stále obsahuje 112 původních obrázků; žádný nový obrázek zatím nebyl importován. `main` zůstává beze změny.

## Tři nové digitální ilustrace

| Druh | Audit | Vědecké hranice |
|---|---|---|
| *Eurypterus remipes* | přirozené podvodní prostředí, ostré okraje, plovací vesla, špičatý telson; bez obřích úchopových klepítek | Velikost a barevnost jsou ilustrativní; detaily jednotlivých nohou zůstávají uměleckou rekonstrukcí |
| *Entelognathus primordialis* | odlišitelná pancéřnatá čelistnatá ryba, souvislé podvodní pozadí bez pruhů | Část anatomie těla a uspořádání ploutví jsou rekonstruované; v atlasu se tato nejistota výslovně uvádí |
| *Qilinyu rostrata* | dlouhý rypec, pancéřovaná přední část těla a prsní ploutve, souvislé mořské pozadí | Zadní trup a ocas nejsou bezpečně doloženy do detailů, proto zůstávají pracovní rekonstrukcí |

**Nepřijaty:** Chybný Acutiramus s rybí ocasní ploutví, Birkenia s podezřelým rozsahem dlouhé ploutve, Dunkleosteus s oddělenými špičáky místo řezných kostěných desek. Ani nové koláže s textem nejsou instalovatelnými obrázky.

Obrazové vzory byly nově vytvořeny jako digitální rekonstrukce, nikoli odvozeniny konkrétních externích licencovaných ilustrací; všechny tři obrazy je potřeba označit jako rekonstrukci, ne přímý fosilní důkaz. Původní autorská metadata ostatních 109 obrázků se nesmějí měnit.

## Balíček a povinná kontrola

Název: `DinoAtlas_VisualRefresh_01_3_images.zip`.

SHA-256 celého ZIPu:
`056c5ba8b5c90b280ae71b47371b577d2ba73973ad1f436d976a4d41f86f2024`.

Uvnitř přesně:
- `images/eurypterus-remipes.webp`, SHA-256 `61622939bcb325ba71b895fa00879a295f1216a0573d53e4406d12191634be71`
- `images/entelognathus-primordialis.webp`, SHA-256 `1e88cefd5fd4d4ec5956d3b7089b01ca2cc6fcc56e31e783ab1d50ba18210f49`
- `images/qilinyu-rostrata.webp`, SHA-256 `26e8747af950ffa7bf673bc39ebd6d538936a8ccbf7ff3030a45e5c2c4d86f6a`

Všechny obrázky jsou 1152×768 px, WebP, se skutečně souvislým podvodním pozadím.

## Import a návratnost

Uživatel bez rozbalení nahraje ZIP do kořene větve:
https://github.com/Hmyzak666/dino-atlas/upload/feature/paleozoic-1.0.0

Jednorázový GitHub Actions workflow `.github/workflows/import-visual-refresh-01.yml` spustí `tools/import_visual_refresh_01.py`. Skript:
- porovná archivní SHA a individuální WebP SHA,
- ověří dosavadní **112 jedinečných druhů** a původní `versionCode=1000000`,
- ověří **SHA-256 původních tří WebP z reálně otestovaného APK**,
- uloží staré soubory do `docs/backups/visual-refresh-01/images/` a jejich manifest,
- změní pouze tři vyjmenované obrázky, vysvětlivky `image.note` a `project.json` (`versionCode=1000001`),
- spustí `npm test` a mobilní `npm run test:ui`, odstraní dočasný workflow a vytvoří commit do pracovní větve, nikoliv do `main`.

Při jakémkoliv nesouladu kontrol se nic necommituje a původní instalace není změněná. Po zeleném sestavení lze stáhnout a otestovat **podepsanou aktualizaci 1.0.0 build 1000001** přímo přes instalaci 1000000 se zachováním oblíbených a nastavení.

**Další plánované šarže:** další silurští živočichové, kteří vyžadují přesnější anatomické rekonstrukce, poté kambrium + ordovik a část karbonu/permu bez přirozeného pozadí. Neprovádět plošnou výměnu bez průběžného vizuálního auditu.


## Automatický import proveden
Importní workflow [40308476854](https://github.com/Hmyzak666/dino-atlas/actions/runs/40308476854) úspěšně vyměnil tři obrázky, uložil jejich původní verze do `docs/backups/visual-refresh-01/` a změnil `versionCode` na **1000001**. Původní archivační ZIP byl po importu odstraněn ze stromu projektu. Všech 112 původních ID se zachovalo.

GitHub Actions bot odeslal commit `13f71175ad5540a8c05b62a029278cb454b8bf29` a jeho následný PR workflow byl označen `action_required` bez spuštěných jobs. Tento lidsky autorizovaný dokumentační commit vyžaduje nový standardní CI průchod a podpisový build na aktuální větvi. Nezaměňovat dokončený import se schváleným finálním APK.
