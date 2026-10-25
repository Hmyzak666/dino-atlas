# Dino Atlas 1.0.0 — Karbon: checkpoint a předání rozpracovaného obrazového materiálu

**Aktuální stav:** V pracovní větvi je aktivních **96 živočichů / 96 WebP**. Karbon má připraveno **8 českých hesel** v `content-drafts/carboniferous-eight.json`, všechna s vědeckými zdroji, výslovností, určovacími znaky a kvízovými otázkami. Žádný karbonský druh zatím není aktivován. Stabilní `main` zůstává 0.9.0 (90001).

## Obrazový audit
- `arthropleura-armata.webp` — samostatná fotorealistická AI rekonstrukce 1152 × 768; anatomicky přibližně souhlasí s plochým mnohačlánkovým trupem a velkým množstvím krátkých nohou podle výzkumu hlavy z 2024. Je **pracovní kandidát**, ne fosilní fotografie.
- `meganeura-monyi.webp` — **nedokončený pracovní kandidát** vyříznutý z větší koláže; křídla jsou od sebe rozlišitelná, ale kompozice vyžaduje zlepšení (rozmazané okraje). Nepovažovat za finálně schválený obrázek.
- **Chybí** anatomicky ověřené samostatné obrázky `pulmonoscorpius-kirktonensis.webp`, `hylonomus-lyelli.webp`, `greererpeton-burkemorani.webp`, `edestus-heinrichi.webp`, `petrolacosaurus-kansensis.webp` a `crassigyrinus-scoticus.webp`.
- Opakované generování celé karbonské série vytvářelo nepřesné koláže a nevybrané druhy (např. Pterygotus, Helicoprion, Eryops). **Nezaměňovat** tyto živočichy za některého z osmi vybraných druhů ani nepoužívat popisky z koláží.
- Přesná anatomie a zdroje jsou v `docs/image-prompts/1.0.0-carboniferous.md`.

## Obrazový archiv k předání
Konverzační pracovní soubor `DinoAtlas_Karbon_pracovni_kontrola_2_druhy.zip` (350 098 B, SHA-256 `2e5128f9e71f05ca94a261202114fe15a16adae224887abfad762d854c176aa0`) obsahuje dva kandidáty a manifest `REVIEW-NOT-FOR-IMPORT.json`. Soubor **není** úplným balíčkem k nahrání na GitHub; není v repozitáři a není spouštěčem automatického importu.

Zapsané kandidátní soubory:
- `images/arthropleura-armata.webp` — 268 094 B, SHA-256 `2fc32e687fe698e81ab2b923b76460bd04870175cf46dcfbbfdbdc834816e9de`.
- `images/meganeura-monyi.webp` — 80 980 B, SHA-256 `df632cdcebd57be2dfc23c7f6cb4fa5c977f4e9a9216709f5370b0f2ebb06da8`.

## Bezpečný import
- `tools/import_carboniferous.py` má připravené důsledné kontroly vstupu: přesná jména osmi WebP, dekódování v Pillow, rozměry, ochrana před přepsáním původních 96 hesel a předem **schválený SHA-256** archivu.
- Import **nelze aktivovat**, dokud neexistuje přesně osm zkontrolovaných obrázků a nový jednoúčelový GitHub workflow nepředá SHA-256 kompletního ZIPu přes proměnnou `CARBONIFEROUS_SHA256`.
- `tests/carboniferous-drafts-1.0.0.test.cjs` již kontroluje 8 nových textových hesel, kvíz a hypotetický stav s 104 položkami.
- Po kompletní obrazové revizi připravit archiv `DinoAtlas_Karbon_8_images_GitHub.zip`, jeho hash pevně zakotvit do importního workflow, spustit `npm test`, mobilní Playwright, build Androidu a ověřit **104 hesel i obrázků**.
- Potom pokračovat osmi druhy permu do celkových **112**, testovat aktualizační APK se zachováním certifikátu a teprve následně navrhnout sloučení do `main`.

**Není správné** používat současných 96 jako údajných 104, nebo vydat osm draftů bez příslušných obrazů.
