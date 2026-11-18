# Dino Atlas 1.1.0 — druhá desítka

18. 11. 2026. Pracovní větev `feature/paleozoic-1.0.0`. Verze 1.1.0, build 1010002, celkem **132 zvířat**. Na přání uživatele bez sestavení APK a bez sloučení do main; sestavení na PC proběhne až po doplnění všech položek.

1. Megatherium
2. Uintatherium
3. Entelodon
4. Gomphotherium
5. Argentavis
6. Mesohippus
7. Megacerops
8. Ambulocetus
9. Platybelodon
10. Samotherium

Každá karta obsahuje český přehled, základní údaje, tři poznávací znaky, šest tematických sekcí, čtení stávajícím systémem a odborné či muzejní zdroje. Číselné rozměry jsou odhady; údaje konkrétního druhu nebo kostry jsou tak označeny a nejsou automaticky přeneseny na celý rod. U Argentavise se porovnává rozpětí křídel, nikoli délka těla. Entelodon je veden jako všežravec na základě mikroskopického opotřebení zubů. Megatherium aktivuje již připravený filtr čtvrtohor; doplněn jeho informační text. Mesohippus uvádí přesah eocén–oligocén, oba v paleogénu.

Použity existující vybrané ilustrace z předání 71 zvířat; Megatherium podle následného výběru variant. Žádné generování. PNG převedena na WebP, quality 94, method 6, 1536 × 1024 bez změny rozměrů, ořezu nebo zrcadlení. `image.facing` odpovídá skutečné orientaci. Všechny výstupy byly dekódovány a rozměry zkontrolovány; vizuálně prohlédnuto všech deset předloh. Jde o výtvarné rekonstrukce, nikoli potvrzení každého anatomického detailu.

Původ a SHA-256 zdrojů i výsledků: [manifest](cenozoic-batch02.json). Tentýž manifest obsahuje otisky každého z předchozích 122 záznamů, jejich obrazů a dosavadních zdrojů. Nový test ověřuje zachování všech těchto údajů, přesnou novou desítku, filtry, hledání, rozpětí a kvíz. Test první desítky je omezen na původních prvních 122 položek, jeho rozsah a očekávání se tím nemění; aktuální celou databázi kontrolují obsahové testy i test druhé dávky.

Ověření: `npm test` PASS včetně šesti Python testů a Android `--check` (132 zvířat/obrázků); syntaxe JavaScriptu PASS; deset WebP dekódováno a ověřeno na 1536 × 1024; `git diff --check` PASS. UI a telefonní test neproveden: spuštění Chromium bylo v předchozí dávce blokované prostředím (`socket Operation not permitted`). Nové APK se nezadává ani netvoří.

Hotovo **20 z 71 nových zvířat**, zbývá 51. Další desítka: Amphicyon, Eohippus, Dorudon, Deinogalerix, Merycoidodon, Pelagornis, Teleoceras, Synthetoceras, Daeodon, Aepycamelus.

[Průběžný souhrn 1.1.0](RELEASE-1.1.0.md) · [Sestavení na PC](CENOZOIC-BATCH01.md#sestavení-na-pc). Skript načítá aktuální verzi a počet ze zdrojů; ruční přepisování buildů v příkazech není potřeba. Instalovatelná aktualizace vyžaduje původní podpisový klíč.
