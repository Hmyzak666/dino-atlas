# Dino Atlas 0.3.0 — nahrání z telefonu

APK lze nainstalovat ihned. Obsahuje všech osm hesel a obrázků; nahrávání
na GitHub je záloha zdrojů a příprava pro další vývoj nebo sestavení.

## 1. Hlavní složka repozitáře

Rozbal `Dino-Atlas-0.3.0-hlavni-slozka.zip` a otevři:

<https://github.com/Hmyzak666/dino-atlas/upload/main>

Nahraj tyto soubory přímo vedle dosavadního `dinosaurs.json`:

- `index.html` — úplná stránka, verze 0.3.
- `style.css` — společný vzhled včetně opravené výšky obrázku kvízu.
- `app.js` — aplikační logika a správná chybová zpráva.
- `dinosaurs.json` — původních šest druhů a dva nové druhy se zdroji.
- `build_android.py` — sestavení APK, kontrola úplnosti HTML a označení verze.
- `IMAGE_PROMPTS-0.3.0.md` — nepovinná dokumentace obrázků.
- `NAHRANI-0.3.0.md` — tento postup, nepovinný pro běh aplikace.

Potvrď `Commit changes`. Tyto soubory nepatří do `images/`.
Pokud tam z předchozího nahrávání leží další kopie, nyní není nutné je mazat.

## 2. Dva obrázky

Rozbal `Dino-Atlas-0.3.0-obrazky.zip` a otevři:

<https://github.com/Hmyzak666/dino-atlas/upload/main/images>

Nahraj a potvrď:

- `velociraptor-mongoliensis.webp`
- `parasaurolophus-walkeri.webp`

Původních šest obrázků ponech. ZIP obsahuje soubory bez vnitřní složky;
vybírej rozbalené soubory, nikoli samotný ZIP.

## Instalace

Otevři `Dino-Atlas-v0.3.0.apk` na telefonu a zvol aktualizaci aplikace.
Má stejný identifikátor a podpis jako dodaná funkční verze 0.2.2.
Pokud přímé stažení APK z chatu nereaguje, stáhni `Dino-Atlas-v0.3.0-APK.zip`,
rozbal ho a otevři APK uvnitř. Starou aplikaci není potřeba odinstalovávat.

Po otevření zkontroluj osm dinosaurů, vyhledej `velo` nebo `parasau`
a spusť obrázkový kvíz. Kvíz vybírá pět otázek, proto se v každém kole
nemusí ukázat všechny druhy.

## Ověření této dodávky

Prošly kontroly databáze, hledání, filtrů, zachování původních hesel,
1 000 generovaných kol kvízu, úplnosti HTML, přítomnosti osmi obrázků
v APK, zarovnání APK a podpisu shodného s verzí 0.2.2.
Skutečné spuštění této nové verze na telefonu musí ověřit instalace.
