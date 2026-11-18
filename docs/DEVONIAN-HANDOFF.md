# Dino Atlas 1.0.0 — Devon (8) / secure upload checkpoint

**Stav 25. 10. 2026:** Pracovní atlas nadále obsahuje 88 druhů. Připraveno je osm samostatných českých vědeckých draftů, sedm vlastních generovaných WebP obrazů a dočasný importní workflow, který jako osmý obrázek získá vědeckou rekonstrukci Dunkleostea z otevřeného zdroje CC BY 4.0. Uživatel dosud balíček nenahrál; importer zatím nebyl spuštěn.

## Obrazová sada

Soubor `Dino-Atlas-1.0.0-Devon-7-pracovnich-obrazku.zip`: 1 342 918 bajtů.
SHA-256: `7e827f22f651f4defb6881535291cfc6a7a5e44fc45fc307a91607874337ddf8`

Sedm samostatných WebP 1152 × 768:
- `images/tiktaalik-roseae.webp`
- `images/bothriolepis-canadensis.webp`
- `images/eusthenopteron-foordi.webp`
- `images/ichthyostega-stensioei.webp`
- `images/acanthostega-gunnari.webp`
- `images/cladoselache-fyleri.webp`
- `images/jaekelopterus-rhenaniae.webp`

Některé viditelné prsty v pracovní AI rekonstrukci Ichthyostegy a Acanthostegy mohou být uměle nepřesné; osm předních prstů Acanthostegy a sedm zadních prstů Ichthyostegy jsou zmiňovány správně v odborném textu. Obrázky nejsou vědeckým dokladem měkké anatomie, chování či zbarvení.

### Osmý obraz — **vědecká rekonstrukce, nikoli chybná AI ilustrace**

Dříve vytvořené AI obrázky Dunkleostea obsahovaly anatomicky zavádějící samostatné „žraločí“ tesáky. **Nepoužívat je.**

Při importu se stáhne přímo publikovaná rekonstrukce:
- **Autor:** Russell K. Engelman (2024).
- **Dílo:** `Dunkleosteus terrelli 2024 reconstruction.jpg`, z Engelman (2024), *Palaeontologia Electronica* 27(3):a45.
- **Zdroj souboru a metadata:** https://commons.wikimedia.org/wiki/File:Dunkleosteus_terrelli_2024_reconstruction.jpg
- **Původní článek:** https://doi.org/10.26879/1343
- **Licence:** Creative Commons Attribution 4.0 International (CC BY 4.0), https://creativecommons.org/licenses/by/4.0/
- **Soubor na Wikimedia (ověřit SHA-1):** `https://upload.wikimedia.org/wikipedia/commons/5/55/Dunkleosteus_terrelli_2024_reconstruction.jpg`
- **Očekávaná SHA-1:** `9bac927d432ba62c5f6b7ffecff4aad161267522`.
- **Úpravy v app:** převod JPEG na WebP, změna rozměru na cca 1110 × 610 px včetně doplněných jednobarevných okrajů na celkových 1152 × 768. Žádná změna anatomie ilustrace. Název souboru `images/dunkleosteus-terrelli.webp`.

Povinná atribuce je uložena do `dinosaurs.json` `image.note` a `image.sourceIds` a do dokumentace projektu. **Nesmí se vykazovat jako vlastní AI obrázek.**

## Nahrání a automatická kontrola

Uživatel stáhne ZIP se sedmi původními obrázky a **bez rozbalení** ho nahraje do kořene pracovní větve:

https://github.com/Hmyzak666/dino-atlas/upload/feature/paleozoic-1.0.0

Soubor `.github/workflows/import-devonian.yml` spustí ověřený importer `tools/import_devonian.py`. Ten:
1. ověří SHA-256 a všech sedm WebP;
2. stáhne licencovanou rekonstrukci a ověří její SHA-1;
3. zkonvertuje vědecký obrázek pomocí Pillow do WebP;
4. ověří 88 původních zvířat a připojí přesně osm nových druhů s obrazovými kredity;
5. spustí `npm test` i mobilní `npm run test:ui`;
6. po úspěchu do feature větve vytvoří commit, odstraní původní ZIP a jednorázový importní workflow.

Očekávaný stav: **96 aktivních živočichů a 96 obrázků**. Stabilní `main` zůstává verze 0.9.0 (90001).

Pokud stahování licencovaného obrázku z Wikimedia selže, workflow se bezpečně zastaví **bez částečného importu**; zjistit problém z Actions logů a zvolit ruční předání zdrojového souboru se stejným SHA-1. Nepoužívat předchozí anatomicky chybnou AI rekonstrukci jako náhradu.

Následuje karbon (8) a perm (8), cílově 112 druhů před vydáním 1.0.0.
