# Dino Atlas pro Android — 0.5.0

Aplikace obsahuje celý atlas, databázi a obrázky přímo v APK. Nepotřebuje běžící web ani internet. Rozhraní tvoří společné HTML, CSS a JavaScript ve vestavěném WebView. Úpravy těchto souborů tedy rozvíjejí také aplikaci.

Vyžaduje Android 8.0 nebo novější. Identifikátor zůstává cz.hmyzak.dinoatlas. Aplikace nepožaduje síťová ani úložná oprávnění a neotevírá vnější odkazy. Český hlas pro čtení musí být dostupný místně v telefonu.

## Instalace aktualizace

1. Stáhni Dino-Atlas-v0.5.0.apk a otevři jej v telefonu.
2. Pokud klepnutí na APK nereaguje, stáhni Dino-Atlas-v0.5.0-APK.zip, rozbal jej a otevři APK ze správce souborů.
3. Android nabídne aktualizaci Dino Atlasu. Předchozí aplikaci neodinstalovávej; při běžné aktualizaci se zachovají oblíbené položky i vzhled.

APK používá stejný podpisový klíč jako dosavadní vydání. Pořadové číslo 50000 je vyšší než číslo předchozí verze 0.4.1 (40100). Nově se ukládá i volba Dinosauři / Ptakoještěři / Vše.

## Co je nové

- 18 hesel: 15 dinosaurů a 3 ptakoještěři, osm nových rekonstrukcí.
- Kategorie společné pro atlas a kvíz.
- Tři poznávací znaky u každého hesla.
- Velikostní měřítko vůči výšce dospělého nebo dítěte. U ptakoještěrů se srovnává rozpětí křídel, u dinosaurů délka těla.
- Rozšířené původní stručné popisy; dohromady 152 rozbalitelných částí.
- U Stegosaura obecný popis druhu, model hmotnosti USNM 4934 i samostatně vysvětlený příklad Sophie.
- Kvíz s nápovědou, vysvětlením odpovědi a cestou do detailu. U tří ptakoještěrů jsou tři různé otázky, u dinosaurů nebo společného kvízu pět.
- Propojení vybraných obyvatel podobného pravěkého prostředí. Samotné stejné období k propojení nestačí.
- Zachovaná oprava výslovnosti slov jako jedince pouze v mluveném textu.

## Které soubory upravit na GitHubu

V kořeni repozitáře Hmyzak666/dino-atlas nahraď celé soubory index.html, style.css, app.js, dinosaurs.json a build_android.py stejnojmennými soubory z balíčku. Databáze zůstává oddělená od logiky aplikace.

Do images/ přidej osm nových obrázků. Úplný zdrojový ZIP obsahuje všech 18 používaných obrázků pro případ obnovy projektu. Původní obrázky se nemění.

Nahraď také .github/workflows/android-apk.yml, kde je nyní předvyplněná verze 0.5.0. Přidej nové návody NAHRANI-0.5.0.md a IMAGE_PROMPTS-0.5.0.md a nahraď tento ANDROID.md. Podrobný postup je v NAHRANI-0.5.0.md.

## Jednorázové nastavení podpisu z telefonu

Soukromý balíček `Dino-Atlas-klic-SOUKROME.zip` si uschovej. **Nepřidávej jeho obsah mezi soubory veřejného repozitáře.** Obsahuje klíč pro první APK, jeho heslo a dva texty pro GitHub Secrets.

1. V repozitáři otevři **Settings → Secrets and variables → Actions → New repository secret**. Na telefonu může pomoci zobrazení webu pro počítač.
2. Vytvoř secret `ANDROID_KEYSTORE_BASE64`. Do hodnoty vlož celý obsah souboru `ANDROID_KEYSTORE_BASE64.txt` ze soukromého ZIPu.
3. Vytvoř secret `ANDROID_KEYSTORE_PASSWORD`. Do hodnoty vlož obsah souboru `ANDROID_KEYSTORE_PASSWORD.txt`.

Secrets se nevkládají do kódu workflow. Sestavení je použije k podepsání APK. Samotný klíč není součástí výsledného APK ani veřejného zdrojového balíčku.

## Jak sestavit další verzi pouze z telefonu

1. Nahraj změněné soubory do větve main a ulož změny.
2. Otevři **Actions → Sestavit Android APK → Run workflow**.
3. Zadej verzi, nyní **0.5.0**. Pro další opravy používej například 0.5.1.
4. Po úspěšném dokončení otevři detail právě tohoto sestavení.
5. V části **Artifacts** stáhni Dino-Atlas-Android-0.5.0, rozbal ZIP a otevři APK jako aktualizaci.

Zelené **pages build and deployment** pouze zveřejňuje web; nevytváří APK. Nahrání zdrojů na GitHub samo neaktualizuje již nainstalovanou aplikaci. K tomu je potřeba nové sestavení a instalace APK.

Podklady ke vědeckým tvrzením zůstávají jako editační metadata v JSON. Rozhraní z nich nevytváří internetové odkazy.

## Technické sestavení

GitHub workflow používá Python 3, Javu 17 a oficiální Android SDK (`platforms;android-35`, `build-tools;35.0.1`). Nevyžaduje Gradle ani další závislosti. `build_android.py` zpracuje zdroje pomocí AAPT2, přeloží malý Android obal, vytvoří DEX, zarovná APK a podepíše ho pomocí apksigner. Výsledný soubor projde kontrolou podpisu, zarovnání a obsahu archivu.

Při místním sestavení se zadávají proměnné `ANDROID_SDK_ROOT`, `DINO_KEYSTORE_PATH`, `DINO_STORE_PASSWORD` a `DINO_KEY_PASSWORD`. Alias klíče je `dinoatlas`. Volitelný `DINO_OUTPUT_DIR` určuje výstupní složku, jinak se používá `build-android/`. Hesla se nepředávají jako argumenty příkazové řádky a nepatří do Gitu.
