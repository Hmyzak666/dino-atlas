# Nahrání Dino Atlasu 0.8.0 z telefonu

Pro používání aplikace stačí nainstalovat nové APK jako aktualizaci. Dosavadní aplikaci neodinstalovávej; zachová se oblíbený výběr. GitHub lze doplnit později.

`Dino-Atlas-0.8.0-zdroje.zip` je úplný současný balíček. Obsahuje všech 42 hesel, všech 42 obrázků, dosavadní funkce i poslední triasovou várku. Starší ZIPy není třeba postupně nahrávat.

## Soubory

Rozbal ZIP a nahraď v repozitáři `Hmyzak666/dino-atlas` soubory `index.html`, `style.css`, `app.js`, `dinosaurs.json`, `build_android.py`, `ANDROID.md` a `.gitignore`. Přidej také aktuální dokumenty `NAHRANI-0.8.0.md`, `RESEARCH-0.8.0.md`, `IMAGE_PROMPTS-0.8.0.md`, předchozí obrazové podklady a složku `tests/`.

## Obrázky

Do `images/` nahraj všech 42 obrázků z balíčku, zvlášť pokud je na GitHubu starší verze. Původních 33 z verze 0.7.1 je beze změny; nově přibyly:

- `eoraptor-lunensis.webp`
- `herrerasaurus-ischigualastensis.webp`
- `eodromaeus-murphi.webp`
- `saturnalia-tupiniquim.webp`
- `riojasaurus-incertus.webp`
- `eudimorphodon-ranzii.webp`
- `peteinosaurus-zambellii.webp`
- `nothosaurus-mirabilis.webp`
- `shonisaurus-popularis.webp`

## Workflow

Nahraď `.github/workflows/android-apk.yml` přiloženou verzí. Když složku `.github` správce souborů skrývá, lze vložit celý obsah samostatného souboru `android-apk.yml` přímo na GitHubu na tuto cestu.

V Actions spusť „Sestavit Android APK“ s verzí `0.8.0`. Podpisová tajemství `ANDROID_KEYSTORE_BASE64` a `ANDROID_KEYSTORE_PASSWORD` zůstávají stejná. Soukromý podpisový klíč a heslo patří mimo veřejný repozitář.

Nahrávají se rozbalené soubory na uvedené cesty, nikoli samotný ZIP. Hotové APK funguje i bez okamžitého nahrání zdrojů na GitHub.
