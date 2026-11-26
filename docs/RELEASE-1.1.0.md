# Dino Atlas 1.1.0 — souhrn novinek

**26. 11. 2026.** Pracovní větev `feature/paleozoic-1.0.0` obsahuje **236 zvířat** pro verzi 1.1.0 (1010009). Po 196 zvířatech v sestavení 1010008 přibyly čtyři desítky s českými kartami, včetně 32 bezobratlých. Nové druhy zasahují do všech 12 období atlasu.

## Nový obsah

| Dávka | Nová zvířata | Celkem v atlasu |
|---|---|---|
| 1 | Paraceratherium, Basilosaurus, Deinotherium, Gastornis, Hyaenodon, Megalodon, Phorusrhacos, Arsinoitherium, Rhizosmilodon, Chalicotherium | 122 |
| 2 | Megatherium, Uintatherium, Entelodon, Gomphotherium, Argentavis, Mesohippus, Megacerops, Ambulocetus, Platybelodon, Samotherium | 132 |
| 3 | Amphicyon, Eohippus, Dorudon, Deinogalerix, Merycoidodon, Pelagornis, Teleoceras, Synthetoceras, Daeodon, Aepycamelus | 142 |
| 4 | Mamut srstnatý, nosorožec srstnatý, Smilodon, velejelen, Glyptodon, lev jeskynní, medvěd jeskynní, Bootherium, Diprotodon, Thylacoleo | 152 |
| 5 | Pratur, moa, pravlk, mastodont americký, bobr obrovský, Procoptodon, Doedicurus, Toxodon, Megalania, Macrauchenia | 162 |
| 6 | Elasmotherium, medvěd krátkočelý, Titanoboa, Hyracodon, Moeritherium, Pakicetus, Enhydriodon, Sivatherium, Homotherium, Dromornis | 172 |
| 7 | Peltephilus, Carcharodontosaurus, Giganotosaurus, Albertosaurus, Baryonyx, Suchomimus, Amargasaurus, Shunosaurus, Euoplocephalus, Corythosaurus, Lambeosaurus | 183 |
| 8 | Stenonychosaurus, Tenontosaurus, Scelidosaurus, Falcarius, Australovenator, Skorpiovenator, Saurolophus, Guanlong, Monolophosaurus, Marshosaurus, Borealopelta, Einiosaurus, Udanoceratops | 196 |
| 9a | Cretapsara, Pemphix, Kalligramma, Saurichthys, Dapedium, Xiphactinus, Mastodonsaurus, Dactylioceras, Repenomamus, Confuciusornis | 206 |
| 9b | Triamyxa, Encrinus, Atopodentatus, Juracimbrophlebia, Mesolimulus, Antrimpos, Gryphaea, Protoischnurus, Ceratomyrmex, Hesperornis | 216 |
| 9c | Ottoia, Didymograptus, Favosites, Mucrospirifer, Archimedes, Ceratites, Clypeus, Ventriculites, Eophyllium, Paradoryphoribius | 226 |
| 9d | Meganeuropsis, Horridonia, Deltoblastus, Eurydesma, Acanthocladia, zrnovka sprašová, Copris pristinus, větevník dlanitý, Ditrupa, Panagrolaimus | 236 |

Nové ilustrace vycházejí z již vybraných souborů, ve formátu WebP 1536 × 1024. Nové české karty mají základní údaje, poznávací znaky, šest tematických částí a zdroje. Zapojují se do stávajícího hledání, oblíbených, čtení a kvízu.

Třicet obrázků je převzato z vybraných sad WebP. Prvních deset vychází z původních PNG. [Seznam souborů a kontrolních součtů](fauna-batch09.json).

## Filtry a srovnání

- V nabídce potravy lze vybrat filtrátory. Další způsoby výživy, například požírání bakterií nebo trusu, spadají pod „Jiná potrava“.
- Skupiny Savci a Ptáci.
- Tradiční filtr Třetihory, členěný na paleogén a neogén.
- Filtr Čtvrtohory s Megatheriem a dvaceti dalšími zvířaty; osm nových savců, moa a Megalania v páté dávce.
- Informační texty nových skupin a období dostupné offline.
- Rozpětí křídel u Argentavise a Pelagornise; rozměry konkrétních rekonstrukcí jsou označené jako odhady. Chybějící podklady se nenahrazují vymyšlenými čísly.

Čtyři starší karty mají novou ilustraci. Jde o rody Baryonyx, Corythosaurus, Lambeosaurus a Euoplocephalus. U dalších šesti souhlasil vybraný soubor s dosavadní ilustrací. [Všech 23 vybraných souborů](dinosaur-batch08.json).

## Kontroly zdrojů 1010009

Kontrola vstupů pro Android načetla 236 karet se samostatnými obrázky. Obsahové testy ověřily vyhledávání a kvíz pro všech 40 přírůstků a shodu obrázků s výběrem. V Chromiu prošly testy mobilního rozhraní včetně filtrů, navigace, čtení a zvětšení obrázku.

## Kontroly sestavení 1010008

Kontrola balení pro Android ověřila 196 karet a 196 obrázků. V mobilním zobrazení prohlížeče prošlo všech 23 vybraných ilustrací otevřením z galerie do detailu. Všechny se načetly v rozlišení 1536 × 1024 a aplikace zachovala jejich vybraný směr.

## Kontroly předchozího sestavení 1010007

Obsahové a regresní kontroly prošly včetně zachování všech předchozích záznamů, obrazů a zdrojů. Podklady pro Android sestavení prošly kontrolou pro 183 zvířat a 183 obrázků. Vizuální UI a telefonní ověření čeká; místní Chromium blokuje prostředí. Všechna domluvená zvířata jsou vložena a zdroje připravené k sestavení APK.

[První dávka a návod na PC](CENOZOIC-BATCH01.md) · [Druhá dávka](CENOZOIC-BATCH02.md).

[Sestavení na GitHubu z telefonu](BUILD-ON-GITHUB.md) · [Třetí dávka](CENOZOIC-BATCH03.md).

[Čtvrtá dávka](CENOZOIC-BATCH04.md). Z předání je nyní vloženo všech 71 nových položek.

[Pátá dávka](CENOZOIC-BATCH05.md). Celý seznam je nyní dokončený.

[Šestá dávka](CENOZOIC-BATCH06.md). U Arctoda je vysvětlená proměnlivost potravy, u Titanoboy modelová nejistota velikosti a u Dromornise nejistota jídelníčku.

[Posledních 11 zvířat](FINAL-BATCH07.md). Vybrané obrázky použity beze změny; deset nových dinosaurů doplňuje 61 kenozoických živočichů.
