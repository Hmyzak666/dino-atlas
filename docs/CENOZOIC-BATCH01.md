# Dino Atlas 1.1.0 — první desítka

18. 11. 2026. Pracovní větev `feature/paleozoic-1.0.0`, verze 1.1.0, build 1010001. Celkem 122 zvířat. APK se na přání uživatele nesestavuje; sestavení proběhne na jeho PC. Žádné slučování do main.

Nově přidáno:

1. Paraceratherium
2. Basilosaurus
3. Deinotherium
4. Gastornis
5. Hyaenodon
6. Megalodon (Otodus megalodon)
7. Phorusrhacos
8. Arsinoitherium
9. Rhizosmilodon
10. Chalicotherium

Přidány české popisky, šest tematických částí každé karty, poznávací znaky, zdroje a nejistoty; fungují stávající čtení, oblíbené a kvíz. Nové skupiny Savci a Ptáci; tradiční filtr Třetihory s paleogénem a neogénem. Deinotherium je víceobdobní rod: karta uvádí přesah do čtvrtohor, filtrováno je hlavní období neogén. Rodová jména se nedoplňují na odhadnutý druh jen podle obrázku. Velikosti bez dostatečného podkladu zůstávají označené jako neurčené, není přidáno nepodložené číselné srovnání.

Všechny obrázky jsou dříve vytvořené a vybrané soubory z předání 71 zvířat; Basilosaurus podle následného výběru 17 variant. Žádné nové generování. Převedeno PNG → WebP quality 94, method 6, 1536 × 1024 bez ořezu, zrcadlení a změny rozměrů. `image.facing` odpovídá skutečnému pohledu každého obrázku. Identifikátory a SHA-256 zdrojů/výsledků obsahuje `cenozoic-batch01.json`.

Původní databáze je přesně uložená v `backups/cenozoic-batch01/dinosaurs.json`. Test první desítky kontroluje všech 112 původních záznamů i obrazových hashů proti nezměněnému podkladu. Historické obrazové testy čtou tento podklad, aby jejich starší celodatabázové otisky zůstaly platné. Aktuální obsah, nové filtry a počty testují běžné obsahové testy a `cenozoic-batch01.test.cjs`.

Ověření: `npm test` PASS včetně šesti Python testů a `build_android.py --check` (122 zvířat, 122 obrázků). Syntaxe app.js a knowledge.js PASS. UI testy se nespustily: Chromium v tomto prostředí odmítá vytvořit socket (`Operation not permitted`). Vizuální a telefonní ověření čeká. Podepsané ani nepodepsané APK nevzniklo.

Zbývá 61 položek z předávacího seznamu 71; další desítka začíná Megatheriem a končí Samotheriem.

## Sestavení na PC

Tento projekt používá vlastní Python skript, **ne Gradle**. Potřeba: Git, Node.js 22+, Python 3.10+, Java JDK 17+ a Android SDK s balíčky `platforms;android-35` a `build-tools;35.0.1`. SDK lze nainstalovat v Android Studiu přes SDK Manager. `ANDROID_SDK_ROOT` nastav na skutečnou složku SDK.

V existující čisté kopii repozitáře:

```bash
git fetch origin
git switch feature/paleozoic-1.0.0
git pull --ff-only
npm ci
npm test
```

Pokud nemáš místní změny uložené, nejprve je ulož do vlastního commitu nebo jiné složky. Nepoužívej reset --hard.

V nové kopii:

```bash
git clone --single-branch --branch feature/paleozoic-1.0.0 https://github.com/Hmyzak666/dino-atlas.git
cd dino-atlas
npm ci
npm test
```

Pro místní kontrolu rozhraní:

```bash
npx playwright install chromium --only-shell
npm run test:ui
```

Na Windows používej `python`, pokud nemáš příkaz `python3`. Samostatná kontrola bez SDK:

```bash
python3 build_android.py --check
```

Úplné **nepodepsané** sestavení s nainstalovaným SDK:

```bash
python3 build_android.py --unsigned
```

Výstup bude v `build-android/`. Nepodepsané APK nelze běžně nainstalovat; tento příkaz kontroluje kompilaci.

Pro instalovatelnou aktualizaci je potřeba původní podpisový klíč se stejným certifikátem. Nastav `DINO_KEYSTORE_PATH`, `DINO_STORE_PASSWORD` a `DINO_KEY_PASSWORD` v prostředí a spusť `python3 build_android.py` bez `--unsigned`. Klíč ani hesla nedávej do repozitáře. Skript kontroluje původní certifikát proti project.json; nový klíč by neumožnil aktualizaci stávající aplikace. Pokud je původní klíč dostupný pouze v GitHub Actions, lze později sestavit podepsané APK tam.
