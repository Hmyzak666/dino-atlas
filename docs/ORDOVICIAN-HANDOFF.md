# Dino Atlas 1.0 — ordovik / druhá obsahová dávka

Stav: přesně **5 zdrojovaných kandidátních hesel** v `content-drafts/ordovician-five.json` a **pět různých pracovních WebP ilustrací** v samostatném balíčku; zatím **nejsou aktivované**. Stabilní verze 0.9.0 na `main` zůstává nedotčená.

## Vědecké poznámky a zásady pěti ilustrací
- **Isotelus rex** — velký oválný trilobit se třemi podélnými oblastmi těla, širokým zaobleným ocasním štítem. Fosilie přes 70 cm z Manitoby, nikoli velikost všech trilobitů. Žádné gigantické hroty neodvozené z kostry. [Původní práce](https://doi.org/10.1666/0022-3360(2003)077%3C0099:TWBTIR%3E2.0.CO;2)
- **Asaphus kowalewskii** — trilobit se **dvěma velmi dlouhými očními stopkami**, ne s tykadly; kalcitové složené oči. Možné vyčnívání očí nad sediment je hypotéza. Délka 8 cm v měřítku je *orientační pro rod*, nikoli druhově přesná. [GSA 2022](https://gsa.confex.com/gsa/2022AM/webprogram/Paper381674.html)
- **Aegirocassis benmoulai** — velký *filtrující* radiodont, blízký vyhynulý příbuzný členovců; přední filtrační přívěsky s jemnými štětinami, **dvě řady plovacích laloků** po stranách těla. Ještě v textu starší původní práce se objevuje *benmoulae*, opravené jméno je *benmoulai*. [Nature](https://doi.org/10.1038/nature14256), [oprava a nové poznatky](https://doi.org/10.3389/fevo.2023.1214109)
- **Arandaspis prionotolepis** — dávný *bezčelistnatý obratlovec*, ne trilobit a ne čelistnatá ryba. Tuhé hřbetní a břišní štíty vpředu; zadní část těla a ocas **nejsou fosilně dostatečně známé**. Na obraze nepřidávat moderní rybí čelisti ani párové ploutve. [Australský fosilní katalog](https://www.ga.gov.au/bigobj/GA14368.pdf)
- **Endoceras proteiforme** — vyhynulý *hlavonožec*, který měl dlouhou téměř přímou komůrkovanou schránku, velký bočně uložený sifon. Historické odhady délky schránek 3–4,5 m jsou **nejisté**; měkké tělo a přesný počet chapadel nejsou bezpečně rekonstruovatelné, a obrázek je ilustrační. [Atlas of Ordovician Life](https://www.ordovicianatlas.org/atlas/mollusca/cephalopoda/endocerida/endoceratidae/endoceras/endoceras-proteiforme/)

Všech pět ilustrací pochází z nově generované společné kompozice, jednotlivé panely jsou nezávisle vyříznuté a převedené do WebP. Barvy a pozadí jsou uměleckou rekonstrukcí, **nikoli vědecky doloženým zbarvením**. Zvlášť u Arandaspis a Endoceras má vyobrazení neurčitou anatomii; před veřejným vydáním je vhodný další odborný vizuální audit.

## Přesný ZIP a postup
- `Dino-Atlas-1.0.0-Ordovik-5-obrazku.zip`, 560 775 bajtů.
- SHA-256 `3241f1d0b703215ec5da10916499f20372887e2728d423ab9cf386e1785b0b30`.
- Obsah: `images/isotelus-rex.webp`, `images/asaphus-kowalewskii.webp`, `images/aegirocassis-benmoulai.webp`, `images/arandaspis-prionotolepis.webp`, `images/endoceras-proteiforme.webp`.

Uživatel nahraje **neextrahovaný ZIP** do kořene pracovní větve přes:
https://github.com/Hmyzak666/dino-atlas/upload/feature/paleozoic-1.0.0

Jednorázové workflow `Import five reviewed Ordovician pictures` a `tools/import_ordovician.py` ověří přesný hash, všech pět WebP, starých 78 hesel, vědecké zdroje a testy. Při úspěchu přidá 5 hesel a 5 obrázků a samo odstraní svůj workflow soubor. Nový stav má být přesně **83 aktivních hesel i obrázků**.

Zatím nic neslučovat do `main`; finální verze 1.0.0 má cílově **112 druhů**. Další skupinou je silur (5).
