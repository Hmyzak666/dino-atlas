# Vizuální dávka 02 — kandidát 1.0.0 / 1000002

Datum: 26. 10. 2026. Výchozí commit `a479c60919794443282f86e8909f77ae51e14131`, schválený build 1000001. Práce pouze ve `feature/paleozoic-1.0.0`, bez sloučení do main.

## Vložené rekonstrukce

| Druh | Individuální kontrola a opravy | Nejistoty |
| --- | --- | --- |
| Acutiramus bohemicus | Vodní eurypterid, velké chelicery, čtyři páry kráčivých končetin a pár plovacích vesel; článkovaný zadeček bez nohou, široký plochý telson bez štířího bodce. Pokusy s nadpočetnými nohami vyřazeny, finální obraz zkontrolován samostatně. | Zbarvení a drobné povrchové znaky jsou ilustrativní. |
| Birkenia elegans | Bezčelistný anaspid, šikmá řada žaberních otvorů, šupiny a hřbetní štítky, ocasní osa směřuje do dolního laloku. Původní pokus s opačným ocasem a velkým trnem vyřazen. | Měkké tkáně, barvy a přesný vzhled ploutevního lemu jsou rekonstruované. |
| Dunkleosteus terrelli | Krátké hluboké tělo, tupý rypec, přední párové ploutve a dermální pancíř. První pokus se samostatnými zuby vyřazen; finální téměř zavřená tlama má souvislé kostěné řezné hrany. | Zadní část těla, ocas a měkké tkáně nejsou přímo kompletně doložené. |

Všechny tři soubory jsou WebP 1152 × 768 px, celé samostatné přirozené mořské scény bez textu, koláže, studiového pozadí a doplňovaných rozmazaných okrajů. Finální WebP byly jednotlivě znovu prohlédnuty. Jde o pracovní AI rekonstrukce, nikoli fosilní důkaz nebo uživatelem schválené finální ilustrace. Metadata směru Acutiramus opravena na `right`, aby stávající aplikace správně řídila orientaci.

## Zdroje a licence

Nové scény byly generovány z textových instrukcí; žádná cizí ilustrace nebyla obrazovým vstupem. Vědecká fakta čerpají z následujících odborných zdrojů:

- Engelman (2024), rekonstrukce Dunkleosteus: https://palaeo-electronica.org/content/2024/5307-dunkleosteus-reconstruction — https://doi.org/10.26879/1343.
- Janvier, Anaspida: https://tolweb.org/Anaspida — anatomie bezčelistných anaspidů a hypocerkální ocas.
- Chlupáč (1994), pterygotidi českého siluru/devonu: https://www.jgeosci.org/content/Chlupac_1994.pdf (bibliografický zdroj; celý PDF nebyl v této relaci dostupný k otevření).

Původní obrázek Dunkleosteus od Russell K. Engelman (2024), CC BY 4.0, zůstává v záloze. Jeho původní poznámka, zdrojové ID a původní databázový zdroj jsou zachovány; licence https://creativecommons.org/licenses/by/4.0/. Nový samostatně generovaný obraz není úpravou tohoto diagramu. Prompty: [image-prompts/visual-refresh-02.md](image-prompts/visual-refresh-02.md).

## Záloha a ověření

- `backups/visual-refresh-02/images/`: všech 40 prvohorních obrázků z buildu 1000001, zachováno před výměnou. Dřívější původní obrazy první trojice jsou v `visual-refresh-01`.
- Manifest zálohy obsahuje obrazová metadata, SHA-256 všech 112 aktivních obrázků a kanonický hash všech nezměněných neobrazových dat 112 druhů.
- `visual-refresh-02.json`: SHA-256 tří přijatých nových WebP a rozměry.
- `npm test`: prošel; ověřuje data, TTS cíle, kvízy, kompatibilitu, původní podpisový certifikát a sestavovací kontrolu. Nový regresní test hlídá přesně tři výměny a zálohy.
- `npm run test:ui`: prošel lokálně v Chromium 153; šířky 320/360/412/900, zoom, návraty, dotykové procházení, oblíbené, filtry a ovládání TTS. Nejde o poslech skutečného českého hlasu na telefonu.
- GitHub Actions [40325360063](https://github.com/Hmyzak666/dino-atlas/actions/runs/40325360063): testy dat a rozhraní i podepsané Android sestavení prošly. Ověřeno 112 druhů, přesná shoda zabalených souborů, applicationId a původní podpisový certifikát. Zdrojový commit `6fce1777956af24e210572fec3e08b27b1a90104`.
- [APK 1.0.0 / 1000002 v archivu GitHub](https://github.com/Hmyzak666/dino-atlas/actions/runs/40325360063/artifacts/12651301264), 29 370 625 bajtů. Telefonní kontrola této dávky dosud neproběhla.

## Zbývající práce

Po této dávce je vloženo 6 z 30 plánovaných náhrad, z toho první 3 má uživatel schválené. **24 náhrad stále není dokončeno.** Navazovat v dávkách nejvýše 5–6:

1. Kambrium (6): Anomalocaris, Opabinia, Hallucigenia, Marrella, Wiwaxia, Pikaia.
2. Ordovik (5): Isotelus, Asaphus, Aegirocassis, Arandaspis, Endoceras.
3. Karbon (6): Meganeura, Hylonomus, Greererpeton, Edestus, Petrolacosaurus, Crassigyrinus.
4. Perm rozdělit 5 + 2 (7): Dimetrodon, Inostrancevia, Scutosaurus, Mesosaurus, Diplocaulus, Helicoprion, Estemmenosuchus.

Zachovat všech 112 druhů i schválené obrázky; před dalšími náhradami aktualizovat odpovídající regresní očekávání pouze pro vědomě kontrolovanou dávku. Finální verzi 1.0.0 neoznačovat za hotovou, dokud nebudou zbývající scény, testy a kontrola telefonu skutečně dokončené.
