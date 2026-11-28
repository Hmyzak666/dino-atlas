# Dino Atlas 1.1.0 — šestá desítka

18. 11. 2026. Pracovní větev `feature/paleozoic-1.0.0`. Build **1010006**, **172 zvířat**. Vloženo 60 ze 71 položek předání, **11 zbývá**.

1. Elasmotherium
2. Medvěd krátkočelý
3. Titanoboa
4. Hyracodon
5. Moeritherium
6. Pakicetus
7. Enhydriodon
8. Sivatherium
9. Homotherium
10. Dromornis

Každá karta má český přehled, základní údaje, tři poznávací znaky, šest tematických částí a muzejní nebo odborné zdroje. Osm nových savců, jeden plaz a jeden pták využívají stávající kategorie. Čtyři položky mají hlavní filtr Paleogén, dvě Neogén a čtyři Čtvrtohory. U rodových karet se širší časový rozsah a údaje konkrétních druhů vysvětlují v textu.

Použity dříve vybrané WebP 1536 × 1024 beze změny bajtů. Všechny předlohy vizuálně prohlédnuty, žádné nové generování ani úprava obrazových souborů neproběhly. Výběr ilustrace není potvrzením všech anatomických detailů.

## Obsahové podrobnosti

- Elasmotherium: mladší datování E. sibiricum a výslovná nejistota délky i tvaru nezachovaného rohu.
- Medvěd krátkočelý: Arctodus simus s pravděpodobně proměnlivou potravou. Filtr Všežravec nevylučuje doložený vysoký podíl masa u beringijských jedinců. Předloha skutečně míří vlevo; metadata to zachovávají a stávající atlas ji umí při zobrazení zrcadlit podle filtru potravy.
- Titanoboa: had z paleocénu, nikoli dinosaurus. Délkové srovnání používá odhad 12,8 m pro T. cerrejonensis se zveřejněnou modelovou nejistotou, nikoli měření kompletního jedince.
- Hyracodon: hyrakodont se třemi prsty na každé noze; není označen za koně nebo dnešního nosorožce.
- Moeritherium: raný chobotnatec s vysvětlením izotopových důkazů pro mokřadní život a novějších výsledků mikroopotřebení zubů.
- Pakicetus: raný kytovec z eocénu s končetinami schopnými chůze, nikoli mořský plaz nebo plně vodní moderní velryba.
- Enhydriodon: karta vysvětluje zvlášť velkého E. omoensis a možnost získávání potravy na souši. Údaje jedné formy se nevydávají za jistotu o celém rodu.
- Sivatherium: žirafovitý savec; odhad 1 246 kg pro model S. giganteum má široké rozmezí 857–1 812 kg.
- Homotherium: odlišení tvaru špičáků od Smilodona, druhová omezení potravních studií a nález zachovaného sibiřského mláděte.
- Dromornis: pravděpodobná býložravost je označená jako odhad. Výška kolem 3 m u D. stirtoni se nepoužívá jako délka těla v délkovém srovnání.

[Manifest](cenozoic-batch06.json) obsahuje původ obrázků, jejich hashe a směry i otisky všech předchozích 162 záznamů, obrázků a zdrojů.

## Kontroly

`npm test` PASS včetně šesti Python testů a Android `--check`: 172 zvířat, 172 obrázků. Ověřeno zachování předchozího obsahu, dekódování vybraných WebP a rozměry 1536 × 1024, české/vědecké názvy i aliasy, filtry tří období, kategorie a potrava, oblíbené, texty čtení, délkové srovnání a kvíz. `git diff --check` PASS.

Mobilní a telefonní ověření čeká; předchozí pokus o spuštění místního Chromium blokovalo prostředí (`socket() failed: Operation not permitted`). Kód aplikace se v této dávce neměnil. APK se sestaví až po dokončení celého seznamu; main se nemění.

Zbývá Peltephilus a deset položek dinosaurů z předání. Při zachování dávek po deseti následuje Peltephilus a prvních devět dinosaurů, potom poslední Lambeosaurus.

[Souhrn 1.1.0](RELEASE-1.1.0.md) · [Sestavení na GitHubu z telefonu](BUILD-ON-GITHUB.md).
