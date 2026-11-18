# Dino Atlas 1.1.0 — čtvrtá desítka

18. 11. 2026. Pracovní větev `feature/paleozoic-1.0.0`. Build **1010004**, **152 zvířat**. Vloženo 40 ze 71 nových položek, 31 zbývá.

1. Mamut srstnatý
2. Nosorožec srstnatý
3. Smilodon
4. Velejelen
5. Glyptodon
6. Lev jeskynní
7. Medvěd jeskynní
8. Bootherium
9. Diprotodon
10. Thylacoleo

Každá karta má český přehled, základní údaje, tři poznávací znaky, šest tematických částí a muzejní nebo odborné zdroje. Všech deset patří do skupiny Savci a filtru Čtvrtohory. Pleistocén je uveden v textu stáří; u mamuta a velejelena také přežití do holocénu. Smilodon, Glyptodon, Diprotodon a Thylacoleo zůstávají rodovými kartami; údaje konkrétních druhů jsou označené.

Použity dříve vybrané WebP 1536 × 1024, beze změny bajtů. Žádné nové obrázky nevznikly. U mamuta, Diprotodona a Thylacolea zachované varianty z následného výběru 17 nejasných obrázků. Všechny předlohy byly vizuálně prohlédnuty. Jde o výtvarné rekonstrukce, nikoli potvrzení každého anatomického detailu.

Medvěd jeskynní je veden podle převážně rostlinné potravy, nikoli automaticky jako masožravec kvůli příslušnosti k řádu šelem. Karta zohledňuje rozdíly rostlinného jídelníčku popsané ve studii Meleg a kol. 2025. Diprotodon a Thylacoleo jsou vačnatci. Srovnání délky 3,8 m a 1,5 m je výslovně vázané na D. optatum a T. carnifex; šířka velejelenova paroží se nevydává za délku těla. U ostatních karet se chybějící rozměry nenahrazují odhadem bez podkladu.

[Manifest](cenozoic-batch04.json) eviduje původ, původní identifikátory a obrazové hashe; obsahuje otisky všech předchozích 142 záznamů, obrázků a zdrojů. Testy potvrzují jejich zachování.

## Kontroly

- `npm test` PASS včetně šesti Python testů a Android `--check`: 152 zvířat, 152 obrázků. Po obnově pracovního prostředí zopakováno.
- Nové WebP plně dekódovány, potvrzeno 1536 × 1024 a přesné hashe vybraných souborů.
- Česká a vědecká jména, aliasy, čtvrtohorní filtr, potrava, oblíbené, čtení, srovnání a kvíz ověřeny v obsahových testech.
- `npm run test:ui` se v předchozí fázi nepodařilo spustit: Chromium končí na `socket() failed: Operation not permitted`. Mobilní rozhraní a telefonní test čekají.
- `git diff --check` PASS.

APK se nesestavuje; sestavení je plánované po doplnění všech zvířat. Main se nemění. Další desítka začíná praturem a končí Macrauchenií.

[Průběžný souhrn](RELEASE-1.1.0.md) · [Sestavení na GitHubu z telefonu](BUILD-ON-GITHUB.md).
