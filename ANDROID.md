# Sestavení Android aplikace

Aktuální údaje čte sestavování z `project.json`. Tento technický úklid používá verzi **0.8.0, sestavení 80001**. Android obal je v `android/`, webové soubory v kořeni projektu. Gradle se nepoužívá.

## GitHub Actions

1. Nahraj nebo sluč úplné změny pracovní větve, včetně složek `android/`, `tools/` a `tests/`, `project.json`, `package.json` a `package-lock.json`.
2. Ověř úspěch kontrol v jediném workflow **Dino Atlas — kontroly a APK**.
3. V **Actions → Dino Atlas — kontroly a APK → Run workflow** vyber požadovanou větev a spusť sestavení. Verzi workflow načítá z projektu.
4. Stáhni artefakt `Dino-Atlas-Android-0.8.0-build80001`, rozbal jej a nainstaluj APK jako aktualizaci existující aplikace.

Secrets zůstávají **`ANDROID_KEYSTORE_BASE64`** a **`ANDROID_KEYSTORE_PASSWORD`**. Musí obsahovat dosavadní soukromý klíč; alias je `dinoatlas`. Nový klíč by nevytvořil kompatibilní aktualizaci. Skript porovná podpis hotového APK s veřejným otiskem v `project.json` a při odlišném certifikátu sestavení odmítne.

Na pull requestech a při pushi na `main` běží kontroly i úplná kompilace bez podpisového klíče. Nepodepsaný výsledek slouží jen ke kontrole kompilace. Ruční spuštění vytváří podepsanou aktualizaci po úspěšných testech.

## Místní sestavení

Potřeba je Python 3.10+, Java 17 a oficiální SDK balíčky `platforms;android-35` a `build-tools;35.0.1`. Nainstaluj je pomocí Android Studio nebo `sdkmanager`. Názvy balíčků se mají řídit `project.json`.

Nejprve spusť:

```bash
npm ci
npm test
npm run test:ui
python3 build_android.py --check
```

Pro úplnou kompilaci bez soukromého klíče nastav `ANDROID_SDK_ROOT` a spusť:

```bash
python3 build_android.py --unsigned
```

Pro podepsané APK nastav také `DINO_KEYSTORE_PATH`, `DINO_STORE_PASSWORD` a `DINO_KEY_PASSWORD` na původní klíč a jeho hesla. Potom spusť:

```bash
python3 build_android.py
```

Výstup je v `build-android/`; cestu lze změnit proměnnou `DINO_OUTPUT_DIR`. Hesla se předávají prostředím a v příkazové řádce se nevypisují. Soukromé soubory ukládej mimo repozitář. `--version-code` umožňuje výslovně zvýšit číslo sestavení; nesmí klesnout pod nakonfigurovanou verzi.

## Co sestavení kontroluje

- Úplnost HTML, jednoznačná ID, platnou databázi bez opakovaných klíčů a existenci obrázků.
- Prázdné či zkrácené WebP, neplatné cesty a cizí soubory ve složce `images/`.
- Soulad patičky a verze projektu, Java balíčku a manifestu.
- Úplnou kompilaci přes `aapt2`, Java compiler a `d8`.
- Přesný seznam APK assets a jejich shodu s kořenem projektu; historické dokumenty ani staré kopie kódu se nebalí.
- ApplicationId, versionName, versionCode, min/target SDK, oprávnění, ZIP, zarovnání a původní podpis.

## Zachování uživatelských dat

`cz.hmyzak.dinoatlas`, zabezpečený lokální původ WebView, cesty a klíče `dinoatlas-favorites`, `dinoatlas-theme` a `dinoatlas-category` jsou zachované. Obsahová ID se nemění. Aktualizaci instaluj přes současnou aplikaci; její odinstalování by místní data odstranilo.

Další vydání musí mít `versionCode` vyšší než poslední distribuované sestavení. Při změně veřejné verze uprav `project.json` a kontrolovanou patičku `index.html`; postup je v [návodu k vývoji](docs/DEVELOPMENT.md).
