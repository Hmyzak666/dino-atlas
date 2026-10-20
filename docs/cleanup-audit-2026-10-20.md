# Audit technického úklidu, 20. října 2026

## Stav před úklidem

Výchozí commit GitHubu: `cca339418dabb83b6da74c7829ac931ec2417b3a` na `main`. Prohlédnuto všech 22 dosavadních commitů od 16. do 19. října 2026.

| Součást | Zjištění |
|---|---|
| Kořenová databáze | 18 zvířat; všech 18 používaných obrázků existuje |
| Staré kopie v `images/` | `app.js`, `index.html`, `style.css`, `dinosaurs.json`, `build_android.py`; databáze kopie má 8 zvířat |
| Kořenové HTML | Označení 0.4.1 a odpovídající parametry cest JS/CSS |
| Android dokumentace a skript | Označení / výchozí verze 0.5.0 |
| Dvě APK workflow | `android-apk.yml` a `android-apk-1.yml`; liší se jen popisem a výchozí verzí 0.5.0/0.5.1 |
| README | Dva řádky, 48 bajtů |
| Testy a stav projektu | V původním Git stromu chyběly |
| Nejnovější zelené kontroly | Publikace GitHub Pages; poslední zaznamenané úspěšné Android sestavení je z 17. října |

Obě workflow spouštěla kořenový `build_android.py`. Ten do APK explicitně kopíroval kořenové webové soubory a obrázky odkazované databází. Staré kódy v `images/` se tímto postupem nebalily; přesto vytvářely nejednoznačnost při ručním nahrávání a údržbě.

## Určení správného základu

Uživatel v tomto vývojovém chatu potvrdil funkční Android 0.8.0. Úplné zdroje ze stejného vydání byly porovnány s hotovým APK. Shodují se JavaScript, CSS, databáze a všech 42 obrázků; HTML se shoduje po dosazení Android patičky. Novější obsah proto nelze odvozovat jen z posledního GitHub commitu.

- SHA-256 zdrojového ZIP: `c544e05ba2e7dabc48a06c38cefdb13eef0f470b92c174090e5be039f241965f`.
- SHA-256 potvrzeného APK: `d69083583e5ce7b2695b23e2f73b8ba0d29fad304465c8ecb3cb3bf974d9c5eb`.
- Všech 18 dosavadních obrázků z GitHubu má stejné bajty jako ve vydání 0.8.0.
- Kořenový Java obal v předchozím `main` už odpovídal ověřené verzi 0.8.0. Nebyl nahrazen starou kopií z `images/`.

Zdrojový základ byl přidán odděleným commitem `ee10cd6` a označen tagem `verified-0.8.0-before-cleanup`. Tag zachycuje potvrzené runtime soubory; nové CI patří až do technického úklidu. V tomto mezikroku zůstaly staré neaktivní kopie zachované; jejich odstranění patří do následujícího commitu.

## Body návratu a zachování historie

Původní `main` je zachycen tagem `pre-cleanup-2026-10-20`. Před úpravami vznikl samostatný Git bundle a jeho úplnost byla ověřena pomocí `git bundle verify`. Pracovní větev je `chore/project-cleanup-2026-10-20`.

Staré kopie kódu a druhé workflow jsou odebrány pouze z aktuálního stromu pracovní větve. V historii a předúklidovém tagu zůstávají obnovitelné. Historické textové návody a prompty byly přesunuty pod `docs/`, místo aby se tvářily jako současné instrukce.

Vzdálené vytvoření větve odmítla GitHub integrace chybou 403 `Resource not accessible by integration`; samostatný Git push neměl dostupné přihlášení. Všechny uvedené nové větve, tagy a commity jsou při tomto předání místní. Původní vzdálený `main` nebyl změněn a jeho historie nebyla přepsána.

## Výsledek a ověření

Podrobný aktuální stav a výsledky kontrol uvádí [PROJECT_STATUS.md](../PROJECT_STATUS.md). Sestavení 80001 je technická revize stejné verze 0.8.0. Má původní certifikát, applicationId, úložný původ a ID zvířat. Ruční telefonní zkouška nového sestavení a kontroly přímo na GitHubu zůstávají samostatnými kroky po předání.
