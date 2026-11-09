# Dino Atlas 1.0.0 — Silur / třetí obsahová dávka

**Stav:** Připraveno přesně 5 draftů v `content-drafts/silurian-five.json` a 5 jedinečných pracovních digitálních ilustrací ve zvláštním ZIPu. Teprve úspěšný import vytvoří 88 aktivních hesel. Stabilní `main` zatím zůstává na 0.9.0.

## Nová hesla
1. **Eurypterus remipes** — klepítkatec s párem plovacích vesel; obvykle okolo 20 cm. Zdroje: [New York State Museum](https://nysm.nysed.gov/exhibitions/windows/eurypterid).
2. **Acutiramus bohemicus** — velký silurský kyjonožec známý z českého Barrandienu. Novější odhad délky cca **2,1 m**, nikoli starších 2,5 m; odhad pochází hlavně z klepítek. Zdroje: [Chlupáč 1994](https://www.arachnology.cz/literatura/pterygotid-eurypterids-arthropoda-chelicerata-in-the-silurian-and-devonian-of-bohemia.-2316.html), [Braddy et al. 2008](https://doi.org/10.1098/rsbl.2007.0491).
3. **Birkenia elegans** — anaspidní bezčelistnatý obratlovec ze Skotska; šikmé řady šupin, hřbetní štítky a hypocerkní asymetrický ocas. Pozor na historicky nesprávné obrácení ocasní osy. [Scottish Geology Trust](https://geoguide.scottishgeologytrust.org/p/gcr16/gcr16_chapter2silurianfishscotland).
4. **Entelognathus primordialis** — čínský pancéřnatý čelistnatý obratlovec starý cca 419 mil. let; zachovaný pancíř kolem 11 cm, celé tělo bylo přes 20 cm. [Nature](https://doi.org/10.1038/nature12617), [Čínská akademie věd](https://english.ivpp.cas.cn/rh/rp/202509/t20250902_1052190.html).
5. **Qilinyu rostrata** — čínská pancéřnatá ryba stará cca 423 mil. let; typový exemplář 12,6 cm, celé tělo přes 20 cm; protáhlý rypec a doložené prsní ploutve. [Science](https://doi.org/10.1126/science.aah3764), [Čínská akademie věd](https://www.eurekalert.org/news-releases/659466).

## Pracovní vizuální rekonstrukce
Pět samostatných originálních AI panelů, každý zkomponovaný do vlastního WebP 1152 × 768. Jde o ilustrace, nikoli o fosilní fotografie: odstíny, držení těla a některé měkké části zůstávají spekulativní. Druhy se nesmějí zaměňovat s dnešními štíry, kraby či vyvinutými moderními kostnatými rybami. Zvláště u Entelognathus/Qilinyu jsou struktury hlavy a čelistí rozlišitelné z fosilií, ale přesná měkká rekonstrukce je nejistá.

## Přenos ZIPu a GitHub kontrola
- Soubor: `Dino-Atlas-1.0.0-Silur-5-obrazku.zip`.
- Velikost ZIPu: **521 236 bajtů**.
- SHA-256: `c80efdc6af8430579f9d1ff72489feb7e75d17d27f431d8f7bbff66cbaf76f00`.
- Obsahuje přesně:
  `images/eurypterus-remipes.webp`,
  `images/acutiramus-bohemicus.webp`,
  `images/birkenia-elegans.webp`,
  `images/entelognathus-primordialis.webp`,
  `images/qilinyu-rostrata.webp`.

Uživatel nahraje **ZIP bez rozbalování**, do kořene větve **`feature/paleozoic-1.0.0`**:
https://github.com/Hmyzak666/dino-atlas/upload/feature/paleozoic-1.0.0

Připravený `.github/workflows/import-silurian.yml` provede kontrolu obsahu, hash, integritu WebP, kontrolu přesně 83 existujících druhů, vloží dalších 5 hesel a obrázků, spustí `npm test` i `npm run test:ui` a při úspěchu založí commit s **88 aktivními hesly i obrázky**. Pak sám odstraní jednorázový importer. Ověření podepsaného Androidu má dále provést standardní GitHub Actions workflow.

**Zatím neslučovat PR #4 do main**; finální verze 1.0.0 má obsahovat celkem 112 pravěkých živočichů. Další skupinou je devon s osmi druhy.
