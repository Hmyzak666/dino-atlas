# Vizuální dávka 04 — Ordovik, kandidát 1.0.0 / 1000004

26. října 2026. Výhradně `feature/paleozoic-1.0.0`, výchozí commit `f77ed0b417420385e83fff83facbc9efc6734d32`. Uživatel schválil vzhled šesti kambrických obrázků dávky 03. Samostatné potvrzení instalace APK 1000003 není zaznamenáno. Nikdy neslučovat do main.

## Pět vložených náhrad

| Druh | Individuální vizuální kontrola |
| --- | --- |
| Isotelus rex | Osm trupových článků, široké hlavové a ocasní štíty, běžné oči bez dlouhých stopek, dvě tykadla. Bez dlouhých ostnů. |
| Asaphus kowalewskii | Osm trupových článků, dvě dlouhé oční stopky s koncovými očima, dvě samostatná tykadla při dně. |
| Aegirocassis benmoulai | První návrh odmítnut kvůli jediné čitelné řadě laloků na bližší straně. Opravená varianta má dvě oddělené řady, hlavové štíty, dvě oči a dvě jemné filtrační končetiny bez predátorských klepet. Překryté laloky vzdálené strany nelze všechny samostatně spočítat. |
| Arandaspis prionotolepis | Dva štíty s jemnou ornamentací, drobné oči a ústní otvor bez čelistí, postranní žaberní otvory; žádné párové ploutve. Zadní část těla a ocas zůstávají konzervativní rekonstrukcí, nikoli tvrzením o úplném fosilním nálezu. |
| Endoceras proteiforme | Dlouhá rovná zužující se schránka, hlava u širokého ústí, nenápadná nálevka a překrývající se koruna ramen. Přesný počet a stavba ramen, měkké tkáně i barevný vzor jsou nejisté; obraz je neprezentuje jako doložený druhový znak. |

Pět původních scén bylo vytvořeno vestavěným Imagegen bez nahrané cizí ilustrace. Všechny jednotlivě prohlédnuté, převedené do WebP 1152 × 768 px, bez doplněných rozmazaných okrajů, textu, koláže či ateliérového pozadí. Barvy a nedochované anatomické podrobnosti jsou ilustrativní. [Prompty a korekce](image-prompts/visual-refresh-04.md). Dávka čeká na hodnocení uživatele.

## Odborné podklady

Použité pro slovní anatomická zadání, nikoli jako kopírované obrazové předlohy:

- Rudkin et al. (2003), Isotelus rex: https://doi.org/10.1666/0022-3360(2003)077%3C0099:TWBTIR%3E2.0.CO;2 — původní popis, osm článků a štíty. Autorský text: https://www.researchgate.net/publication/228608132_The_world%27s_biggest_trilobite_-_Isotelus_rex_new_species_from_the_Upper_Ordovician_of_northern_Manitoba_Canada
- Asaphus: American Museum of Natural History, https://www.amnh.org/content/download/432038/6245021/file/trilobites-hall-of-fame.pdf — oční stopky; odborný abstrakt studia očí https://gsa.confex.com/gsa/2022AM/webprogram/Paper381674.html
- Van Roy, Daley & Briggs (2015), https://doi.org/10.1038/nature14256; výklad autorského týmu na Yale: https://news.yale.edu/2015/03/11/giant-sea-creature-hints-early-arthropod-evolution — dvojité laloky a filtrační aparát.
- Ritchie & Gilbert-Tomlinson (1977), Arandaspis, https://doi.org/10.1080/03115517708527770; abstrakt https://kirjandus.geoloogia.info/en/reference/48117/ a odborná revize neúplného materiálu https://publications.gc.ca/collections/collection_2017/rncan-nrcan/M44-90-9-eng.pdf.
- University of Minnesota: https://kirkby.esci.umn.edu/displays/basement-atrium/endoceras-cephalopod — rovná schránka, obývaná poslední komora. Měkké tkáně nejsou z tohoto zdroje druhově doložené.

## Zálohy a kontrola

Před výměnou uchováno pět originálů v `backups/visual-refresh-04/images/`; záložní manifest obsahuje původní obrazová metadata a SHA-256 všech 112 obrázků před dávkou. `visual-refresh-04.json` eviduje nové soubory a jejich hashe. Regresní test dávky 04 chrání pět záloh a 107 ostatních obrázků; test dávky 02 nadále chrání všechna neobrazová data 112 druhů. Předchozí schválené dávky jsou chráněné přesnými hashi. Aplikační kód, kvíz, české předčítání, oblíbené a texty se nemění.

Stav ověření při uložení: lokální `npm test` prošel; testy rozhraní běží a podepsané APK 1000004 zatím není potvrzené. Nevydávat tento zápis za dokončené sestavení.

## Pokračování po přerušení

Nezačínat znovu. Pět obrázků dávky 04 je vložených, nejdříve dokončit/ověřit testy a GitHub Actions pro versionCode 1000004 a doručit podepsané APK. Poté uživatelská kontrola. Celkem nahrazeno 17 z 30 plánovaných obrázků; zbývá **13**: Karbon 6 (Meganeura, Hylonomus, Greererpeton, Edestus, Petrolacosaurus, Crassigyrinus), Perm 7 (Dimetrodon, Inostrancevia, Scutosaurus, Mesosaurus, Diplocaulus, Helicoprion, Estemmenosuchus). Perm rozdělit na 5 + 2. Zbývající obrázky nejsou hotové.
