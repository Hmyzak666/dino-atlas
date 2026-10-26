# Vizuální dávka 03 — Kambrium, kandidát 1.0.0 / 1000003

26. října 2026. Výhradně větev `feature/paleozoic-1.0.0`. Výchozí commit `78bdb54c083796e7fcdf2e7395144113b59c3aa2`. Uživatel schválil vzhled předchozí trojice Acutiramus, Birkenia, Dunkleosteus a požádal o další dávku; samostatné potvrzení instalace buildu 1000002 není zaznamenáno.

## Vložená dávka

| Druh | Individuální kontrola |
| --- | --- |
| Anomalocaris canadensis | Dvě oči a dvě článkované přední končetiny, boční plovací laloky, ocasní vějíř; opraveny jednoduché ostny končetin na jemné větvené endity. Bez krabích klepet a kráčivých nohou. |
| Opabinia regalis | První čtyřoký návrh odmítnut; finální obraz má pět jednotlivě viditelných očí, jeden chobot s drobným uchopovacím zakončením, boční laloky a ocasní vějíř. Sporné spodní končetiny nejsou zdůrazněné. |
| Hallucigenia sparsa | První neúplný počet trnů opraven; finálně sedm párů směřujících vzhůru, měkké nohy dolů, jemné přední výběžky, malá hlava a dlouhý krk. |
| Marrella splendens | Hlavový štítek s dlouhými dozadu směřujícími ostny, dlouhá tykadla, krátké plovací hlavové končetiny a jemné trupové končetiny/žaberní větve; bez velkého ocasního vějíře. |
| Wiwaxia corrugata | Šupinovité sklerity, měkká spodní plocha, bez vymyšlené tváře a nohou; původní nejasná jediná řada dlouhých ostnů opravena na dvě oddělené řady. |
| Pikaia gracilens | Pásovité měkké tělo se svalovými pruhy, drobná hlava a jemné výběžky; orientace žaberních výběžků podle reinterpretace z roku 2024, bez rybích čelistí, šupin, párových ploutví a nápadných očí. |

Každý výsledný návrh byl vizuálně kontrolován samostatně. Všech šest výsledných WebP má 1152 × 768 px a přirozenou celoplošnou podmořskou scénu bez textu, koláže, bílého ateliéru nebo doplněných rozmazaných pruhů. Přirozená hloubka ostrosti není doplňovaný okraj. Barvy, povrchové struktury a nedochované měkké tkáně jsou ilustrativní; obrazy nejsou tvrzením o úplné jistotě rekonstrukce. Počty překrývajících se drobných trupových struktur nelze v perspektivě všechny nezávisle ověřit. Nová dávka čeká na hodnocení uživatele.

## Vědecké podklady a původ

Odborné popisy Royal Ontario Museum (morfologie a prostředí; ne obrazové předlohy):

- https://burgess-shale.rom.on.ca/fossils/anomalocaris-canadensis/
- https://burgess-shale.rom.on.ca/fossils/opabinia-regalis/
- https://burgess-shale.rom.on.ca/fossils/hallucigenia-sparsa/
- https://burgess-shale.rom.on.ca/fossils/marrella-splendens/
- https://burgess-shale.rom.on.ca/fossils/wiwaxia-corrugata/
- https://burgess-shale.rom.on.ca/fossils/pikaia-gracilens/ (starší orientace těla není přebírána).

Pikaia: Mussini et al. (2024), https://doi.org/10.1016/j.cub.2024.05.026, https://pubmed.ncbi.nlm.nih.gov/38866005/ a autorský text https://durham-repository.worktribe.com/OutputFile/2515077. Anomalocaris: Bicknell et al. (2023), https://doi.org/10.1098/rspb.2023.0638.

Použit vestavěný imagegen; žádná cizí ilustrace nebyla nahrána jako předloha nebo upravována. [Prompty a korekce](image-prompts/visual-refresh-03.md). Původní kredity jsou zachované v záložních metadatech. Texty a vědecké zdroje záznamů se nemění.

## Zálohy a testy

- Šest originálů před výměnou: `backups/visual-refresh-03/images/`; jsou shodné i s dřívější zálohou všech 40 prvohorních obrázků v dávce 02.
- Záložní manifest obsahuje původní obrazová metadata a SHA-256 všech 112 aktivních obrázků před touto dávkou.
- `visual-refresh-03.json` obsahuje rozměry a SHA-256 nových šesti WebP.
- Regresní test dávky 03 hlídá přesně šest výměn, zálohy a 106 nezměněných obrázků. Test dávky 02 dále hlídá neobrazová data všech 112 druhů; pro šest výslovně nových obrázků používá manifest dávky 03. První dvě schválené dávky zůstávají chráněné.
- Lokální `npm test` a `npm run test:ui`: probíhají. Podepsané APK 1000003: čeká. Výsledky budou doplněné po skutečném dokončení.

## Předání při přerušení

Nezačínat znovu. Nejdřív zkontrolovat větev, tento zápis, manifest a poslední GitHub Actions. Pokud sestavení již existuje, nevyrábět zbytečně jiné. Nikdy neslučovat do main.

Po vložení této dávky je nahrazeno 12 z 30 plánovaných obrazů. **Zbývá 18:** Ordovik 5 (Isotelus, Asaphus, Aegirocassis, Arandaspis, Endoceras), Karbon 6 (Meganeura, Hylonomus, Greererpeton, Edestus, Petrolacosaurus, Crassigyrinus), Perm 7 (Dimetrodon, Inostrancevia, Scutosaurus, Mesosaurus, Diplocaulus, Helicoprion, Estemmenosuchus), poslední rozdělit na 5 + 2. Vždy nejvýše šest v dávce, jednotlivá anatomická kontrola, zálohy, testy a vyšší versionCode. Neoznačovat zbylých 18 za hotové.
