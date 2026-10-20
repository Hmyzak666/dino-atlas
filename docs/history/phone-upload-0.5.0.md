# Nahrání Dino Atlasu 0.5.0 přes telefon

Pro používání nové verze stačí nainstalovat APK. Následující kroky uloží stejné zdroje do repozitáře Hmyzak666/dino-atlas pro další práci přes GitHub.

Rozbal zdrojový ZIP. Soubory jsou přímo v jeho kořeni.

## Kořen repozitáře

V GitHubu otevři **Code → Add file → Upload files** a nahraď celý obsah:

- index.html
- style.css
- app.js
- dinosaurs.json
- build_android.py
- ANDROID.md

Přidej také NAHRANI-0.5.0.md a IMAGE_PROMPTS-0.5.0.md. Každý soubor se nahrazuje celý; není potřeba hledat jednotlivé řádky. Ulož přes **Commit changes**.

## Složka images

Na GitHubu otevři složku **images** a nahraj těchto osm nových souborů ze stejné složky v ZIPu:

- allosaurus-fragilis.webp
- iguanodon-bernissartensis.webp
- carnotaurus-sastrei.webp
- pachycephalosaurus-wyomingensis.webp
- therizinosaurus-cheloniformis.webp
- pterodactylus-antiquus.webp
- pteranodon-longiceps.webp
- quetzalcoatlus-northropi.webp

Původních deset obrázků ponech. ZIP je obsahuje také; při obnově projektu lze nahrát všech 18. Nevytvářej zanořenou složku images/images.

## Workflow

Nahraď celý soubor **.github/workflows/android-apk.yml** verzí z balíčku. Pokud jej správce souborů skrývá, otevři jej v GitHubu a vlož obsah přímo. Při vytváření souboru napiš přesnou cestu včetně složek.

Pak otevři **Actions → Sestavit Android APK → Run workflow**, zadej **0.5.0** a spusť sestavení. Výsledné APK se stahuje z Artifacts, nikoli z běhu Pages. Podrobnosti jsou v ANDROID.md.

Obrázky i JSON nahraj před spuštěním sestavení. APK poskytnuté v chatu už má všech 18 obrázků uvnitř a nemusí čekat na nahrání na GitHub.
