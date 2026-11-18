# Dino Atlas 1.1.0 — posledních 11 zvířat

18. 11. 2026. Pracovní větev `feature/paleozoic-1.0.0`, build **1010007**.
**183 zvířat a 183 obrázků; vloženo všech 71 nových položek předání.**

Peltephilus, Carcharodontosaurus, Giganotosaurus, Albertosaurus, Baryonyx, Suchomimus, Amargasaurus, Shunosaurus, Euoplocephalus, Corythosaurus a Lambeosaurus.

Každá nová karta obsahuje český přehled, pět základních údajů, tři poznávací znaky, šest tematických částí a muzejní nebo odborné zdroje. Karty používají stávající vyhledávání, filtry, oblíbené, čtení a kvíz. Délková srovnání jsou označená jako odhady; pro Peltephila není nepodložená délka doplněna.

Použity dříve vybrané soubory WebP 1536 × 1024 beze změny bajtů. Všech 11 předloh vizuálně prohlédnuto; nové obrázky se negenerovaly. Směr popisuje zdrojovou ilustraci: pět masožravců vlevo, šest býložravců vpravo. Zakryté prsty nelze spolehlivě ověřit počítáním viditelných drápů.

## Obsahové podrobnosti

- Peltephilus: savec příbuzný pásovcům; pravděpodobná rostlinná potrava, nikoli jistý aktivní masožravý lovec. Výklad podzemních částí rostlin vychází ze studie P. pumilus a není jistotou pro celý rod.
- Carcharodontosaurus a Giganotosaurus: odhady velikosti nejsou vydávány za měření kompletních jedinců. Skupinový lov Giganotosaura zůstává hypotézou.
- Albertosaurus: dva hlavní prsty ruky; stáří A. sarcophagus čerpá z Australian Museum, nikoli ze staršího širšího rozpětí na stránce NHM.
- Baryonyx a Suchomimus: spinosauridi; rybí potrava neznamená jistou výhradní rybožravost ani doloženou konkrétní techniku lovu.
- Amargasaurus: měkkotkáňový krční hřeben podporuje histologie z roku 2022, ale jeho přesný tvar není znám.
- Shunosaurus: doložený ocasní kyj je na vybraném obrázku hůře čitelný. Datování je ponecháno obecně jako jura, protože muzejní podklady uvádějí odlišné číselné odhady.
- Euoplocephalus: ankylosaurid s ocasním kyjem; odlišen od Ankylosaura.
- Corythosaurus a Lambeosaurus: duté hřebeny s nosními cestami, proměnlivé během růstu; zahrnutý odborný podklad o jejich vnitřní anatomii.

## Kontroly a sestavení

Obsahové a regresní kontroly zahrnují všech 71 nových položek, zachování předchozích 172 záznamů, obrázků a zdrojů, hledání, filtry, oblíbené, čtení, srovnání i kvíz. `npm test` PASS, včetně šesti Python testů a kontroly Android podkladů pro 183 zvířat a 183 obrázků. Všech 183 WebP se dekóduje v rozlišení 1536 × 1024. `git diff --check` PASS.

Mobilní UI testy zůstávají neověřené: nainstalované Chromium se v tomto prostředí nespustí (`socket() failed: Operation not permitted`). Ověření na telefonu čeká.

[Manifest](final-batch07.json) uchovává původ vybraných ilustrací a kontrolní otisky předchozího obsahu. APK není součástí této dávky; zdroje jsou připravené k sestavení. Main se nemění.

[Souhrn 1.1.0](RELEASE-1.1.0.md) · [Sestavení na GitHubu z telefonu](BUILD-ON-GITHUB.md).
