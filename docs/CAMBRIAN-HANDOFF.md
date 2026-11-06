# Dino Atlas 1.0.0 — předání kambria / import šesti obrazů

Pracovní větev: `feature/paleozoic-1.0.0`. Stabilní `main` je 0.9.0 build 90001 a **nesmí se měnit** při importu.

## Připravené soubory
- `content-drafts/cambrian-six.json`: 6 českých kandidátních hesel; zůstanou samostatným archivem i po importu.
- `docs/image-prompts/1.0.0-cambrian.md`: anatomický kontrolní seznam.
- `tools/import_cambrian.py`: ověření šesti obrázků a zapsání záznamů do `dinosaurs.json`.
- `.github/workflows/import-cambrian.yml`: jednorázový import po nahrání ZIPu do správné větve. Při úspěchu se workflow samo odebere.
- `tests/cambrian-drafts-1.0.0.test.cjs` a upravené regresní testy: ověřují jak 72 původních hesel před importem, tak 78 po něm.

## Jeden zbývající uživatelský krok
V ChatGPT byl vytvořen soubor `Dino-Atlas-1.0.0-Kambrium-6-obrazku.zip` (593 464 B).
SHA-256: `357ffe2fbaa7fc84d56dad827a8715a5f072504c9b80e468504a00960cefb376`

Jde o šest individuálních WebP obrazů, každý 1152 × 768. Jsou to **pracovní AI rekonstrukce**, nikoli potvrzené vědecké fotografie; rekonstruované barvy jsou hypotetické. Zdrojově byly vybrány předem vyjmenované druhy Burgess Shale.

Uživatel nahraje ZIP bez rozbalení do **kořene** větve:
https://github.com/Hmyzak666/dino-atlas/upload/feature/paleozoic-1.0.0

GitHub Actions `Import six reviewed Cambrian pictures` ověří otisk archivu, jména, WebP strukturu, délku a úplnost původních 72 hesel. Následně přidá 6 obrazů a 6 hesel. Cílový stav: přesně **78 aktivních živočichů** a 78 obrazů; žádné změny do `main`.

## Po importu
1. Zkontrolovat úspěch jednorázového importu na Actions.
2. Ověřit plný běh `Dino Atlas — kontroly a APK` po commitu, včetně mobilního Playwright a podepsaného Android buildu.
3. Prověřit na telefonu přepínání **Vše / Prvohory / Druhohory → Kambrium** a nezávislé filtry kvízu; zvláště počet 6 a zařazení Pikaia mezi rané strunatce, Marrella mezi členovce.
4. Je-li potřeba opravit výstupy, změny jen v pracovní větvi. **Nevydávat 1.0.0 ani neslučovat PR #4**, dokud nedodáme všech 40 nových druhů.
5. Následuje ordovik 5 druhů, pak silur 5, devon 8, karbon 8 a perm 8.

Pozn.: soubor ZIP není uložen v repozitáři, dokud uživatel nepotvrdí jednorázové nahrání. Aktuální samotná pracovní větev obsahuje zatím jen drafty a importní automatizaci.
