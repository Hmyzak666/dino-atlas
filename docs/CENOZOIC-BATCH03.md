# Dino Atlas 1.1.0 — třetí desítka

18. 11. 2026. Pracovní větev `feature/paleozoic-1.0.0`. Verze 1.1.0, build 1010003, **142 zvířat**. Vloženo 30 z 71 nových položek, 41 zbývá. APK zatím nevzniká a main se nemění.

1. Amphicyon
2. Eohippus
3. Dorudon
4. Deinogalerix
5. Merycoidodon
6. Pelagornis
7. Teleoceras
8. Synthetoceras
9. Daeodon
10. Aepycamelus

Vloženy již vybrané obrázky, české přehledy, fakta, tři poznávací znaky a šest tematických částí každé karty se zdroji. Obrázky byly převedeny z původních PNG na WebP 1536 × 1024, quality 94, method 6, bez ořezu či změny rozměrů a bez nového generování. U Eohippa, Merycoidodona a Daeodona použity verze z následného výběru 17 variant. Všechny předlohy vizuálně prohlédnuty; jde o výtvarné rekonstrukce, ne o potvrzení každého anatomického detailu. Směry odpovídají skutečným předlohám.

Taxonomie Eohippa je uvedena s vysvětlením historie jména a zdrojem Froehlich 2002; nevydává se za automatické synonymum všech raných koňovitých. Dorudon je savec, nikoli mořský plaz. Pelagornis má srovnání rozpětí podle P. sandersi (odhad 6,4 m), nikoli délky těla. Karta uvádí, že rod zasahuje více geologických období; její hlavní filtr je neogén. Daeodon je veden jako odhadovaný všežravec s výslovně nejistým poměrem potravy. Teleoceras není na základě pouhé podobnosti s hrochem vydáván za vodního živočicha.

Doplněny české nadpisy kategorií „Poznej savce.“ a „Poznej ptáky.“ Staré mobilní testy resetování filtrů již počítají s aktuální databází místo pevného čísla 112; navíc ověřují nové nadpisy. Historický test druhé desítky je omezen na jeho původních prvních 132 položek. Všechny nové položky aktuálně kontroluje obsahový test a test třetí dávky.

[Manifest](cenozoic-batch03.json) obsahuje původ souborů, obrazové hashe i otisky všech předchozích 132 záznamů, obrázků a zdrojů. Ověřeno jejich úplné zachování.

Kontroly: `npm test` PASS včetně šesti Python testů a Android `--check` (142 zvířat a 142 obrázků). Všechny nové WebP dekódovány, potvrzeno 1536 × 1024. Syntaxe app.js a dotčených UI testů PASS; `git diff --check` PASS. UI testy nebyly provedeny v prohlížeči kvůli předchozímu omezení spouštění Chromium (`socket Operation not permitted`). Nové GitHub sestavení se nezadává.

Další desítka začíná mamutem srstnatým a končí Thylacoleem.

[Průběžný souhrn](RELEASE-1.1.0.md) · [Sestavení na GitHubu z telefonu](BUILD-ON-GITHUB.md).
