# Dino Atlas 1.1.0 — pátá desítka

18. 11. 2026. Pracovní větev `feature/paleozoic-1.0.0`. Build **1010005**, **162 zvířat**. Vloženo 50 ze 71 nových položek, **21 zbývá**.

1. Pratur
2. Moa
3. Pravlk
4. Mastodont americký
5. Bobr obrovský
6. Procoptodon
7. Doedicurus
8. Toxodon
9. Megalania
10. Macrauchenia

Každá karta má český přehled, základní údaje, tři poznávací znaky, šest tematických částí a muzejní nebo odborné zdroje. Všech deset je dostupných ve filtru Čtvrtohory: osm savců, jeden pták a jeden zástupce skupiny Další plazi. Stávající kategorie i jejich rozhraní byly dostačující; kód aplikace se neměnil.

Použity dříve vybrané WebP 1536 × 1024 beze změny bajtů. Pratur a Procoptodon mají verze z následného výběru 17 nejasných obrázků. Předlohy byly vizuálně prohlédnuty, žádné nové generování ani úprava ilustrací neproběhly. Jde o výtvarné rekonstrukce, nikoli potvrzení všech anatomických detailů.

## Obsahové podrobnosti

- Pratur přežil dobu ledovou až do roku 1627; není vydáván za živočicha vyhynulého už v pleistocénu.
- Karta moa představuje obří moa rodu Dinornis, s vysvětlením jižního druhu D. robustus. Výška ani dosah na větve se nepoužívají jako délka těla.
- Pravlk je veden jako Aenocyon dirus; starší jméno Canis dirus funguje jako vyhledávací alias.
- Mastodont americký patří do Mammutidae; není zaměněn s mamutem z Elephantidae.
- U bobra obrovského jsou stavba hrází a kácení stromů výslovně nejisté. Ocas není popisován jako široké pádlo dnešního bobra.
- Procoptodon je vačnatec, s popisem funkčně jednoprsté zadní nohy. Údaj 2 m je výška P. goliah, nikoli délka.
- Doedicurus má odlišený ocasní kyj od Glyptodona. Rohovité výčnělky jsou popsány jako interpretace úponů, ne jako zachovaná měkká tkáň.
- Toxodon není na základě podobnosti s hrochem vydáván za vodního savce.
- Megalania je varan Varanus priscus ve skupině Další plazi. Srovnání 5 m je odhad celkové délky včetně ocasu, nikoli přesný rozměr známé kompletní kostry.
- Macrauchenia je litoptern. U srovnání 3 m a odhadu hmotnosti je uveden M. patachonica; chobotek na ilustraci zůstává hypotetický.

U rodů zasahujících více období je rozsah uveden v textu; jediný hlavní filtr Čtvrtohory neznamená, že celý rod žil pouze tehdy. Neznámé tělesné rozměry se nenahrazují čísly bez podkladu.

[Manifest](cenozoic-batch05.json) eviduje původ obrázků a jejich hashe a obsahuje otisky všech předchozích 152 záznamů, obrázků a zdrojů.

## Kontroly

`npm test` PASS včetně šesti Python testů a Android `--check`: 162 zvířat a 162 obrázků. Ověřeno zachování předchozího obsahu, vybrané obrazové soubory a jejich rozměry, české/vědecké názvy i aliasy, kategorie, filtry, oblíbené, texty čtení, délkové srovnání a kvíz. `git diff --check` PASS.

Vizuální mobilní a telefonní ověření čeká. Předchozí pokus spustit místní Chromium skončil na `socket() failed: Operation not permitted`; obsahové testy tento limit nenahrazují.

APK se sestaví až po dokončení všech zvířat. Main se nemění. Další desítka začíná Elasmotheriem a končí Dromornisem; potom zbývá Peltephilus a deset dinosaurů.

[Souhrn 1.1.0](RELEASE-1.1.0.md) · [Sestavení na GitHubu z telefonu](BUILD-ON-GITHUB.md).
