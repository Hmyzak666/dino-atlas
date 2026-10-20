# Dino Atlas pro Android — 0.8.0

Atlas obsahuje 42 hesel: 30 dinosaurů, 6 ptakoještěrů a 6 mořských plazů. Databáze i všech 42 obrázků jsou přímo v APK. Pro prohlížení a kvíz není potřeba internet. Čtení používá místní český hlas telefonu.

## Instalace

Stáhni `Dino-Atlas-v0.8.0.apk` a nainstaluj jej jako aktualizaci. Dosavadní aplikaci neodinstalovávej. Pokud stažení APK selže, rozbal `Dino-Atlas-v0.8.0-APK.zip` a otevři APK ze správce souborů.

Aplikace vyžaduje Android 8.0 nebo novější. Identifikátor zůstává `cz.hmyzak.dinoatlas`; podpisový certifikát odpovídá verzi 0.6.0 a číslo verze je 80000. Aktualizace zachová oblíbená zvířata a uložené volby. Nahrání na GitHub není podmínkou používání APK.

## Nová triasová várka 0.8.0

Přibylo devět zvířat, všechna z triasu:

- Dinosauři: Eoraptor lunensis, Herrerasaurus ischigualastensis, Eodromaeus murphi, Saturnalia tupiniquim a Riojasaurus incertus.
- Ptakoještěři: Eudimorphodon ranzii a Peteinosaurus zambellii.
- Mořští plazi: Nothosaurus mirabilis a Shonisaurus popularis.

Každé nové heslo má vlastní rekonstrukci, krátký popis, tři poznávací znaky, základní údaje, šest rozbalitelných částí a velikostní porovnání. Délka či rozpětí jsou odhady s vysvětleným rozsahem; číselná hmotnost je uvedena jen tam, kde máme použitelný podklad. U Shonisaura se přibližně 30 t vztahuje k patnáctimetrovému modelu. U Nothosaura porovnání používá ne zcela dospělou typovou kostru, nikoli největší odhad druhu.

Původních 33 hesel a jejich obrázky jsou zachované beze změny. Podpora mořských plazů rozpoznává také Nothosauria, aby Nothosaurus nebyl nesprávně označen za plesiosaura. Podobní drobní noví dinosauři ani oba noví triasoví ptakoještěři se nenabízejí proti sobě v jedné kvízové otázce. Rozhraní a výslovnostní úpravy zůstávají stejné.

Zdroje a vědecké poznámky jsou v `RESEARCH-0.8.0.md`, prompty a omezení obrázků v `IMAGE_PROMPTS-0.8.0.md`. Odkazy se v samotné aplikaci nezobrazují.

## Procházení výsledků hledání (od 0.7.1)

Po otevření výsledku hledání lze přejít na další a předchozí zvíře podle abecedy. Procházení zachová kategorii, období, potravu a výběr oblíbených; hledaný text omezuje pouze atlas. Při návratu do atlasu zůstává dotaz i místo v seznamu zachované.

`node tests/search-navigation.test.cjs` ověřuje přesné hledání, šipky, dotykové gesto, filtry, oblíbené, hranice seznamu a návrat přes tlačítko Zpět. Používá stejné nastavení Playwright jako ostatní testy rozhraní.

## Obsah a funkce od verze 0.7.0

- Přibyli Apatosaurus louisae, Brontosaurus excelsus, Camarasaurus lentus, Ceratosaurus nasicornis, Megalosaurus bucklandii, Liopleurodon ferox a Rhamphorhynchus muensteri. Všech sedm patří do jury.
- Atlas a procházení vybraného seznamu jsou řazené podle české abecedy.
- Název, vědecké jméno, období, stáří a srdíčko jsou nad obrázkem. Detail se po otevření posune k tomuto záhlaví.
- „Přečíst popis“ čte jen úvodní popis. „Přečíst základní údaje“ samostatně čte období, stáří, původ, délku nebo rozpětí, hmotnost a další základní údaje.
- Rozbalené podrobnosti mají čtení hned na začátku části. Číst lze i poznávací znaky a velikostní porovnání. Stav a zastavení se zobrazují u právě čtené části.
- Úzká výslovnostní úprava pomáhá se slovy jako „severoamerický“. Viditelný text zůstává správně napsaný. Výsledek je třeba poslechnout s konkrétním hlasem telefonu.
- Apatosaurus a Brontosaurus se v jedné kvízové otázce nenabízejí jako vzájemně zaměnitelné odpovědi, protože jejich vnější vzhled je velmi podobný.

Semafory míry jistoty zůstávají. Veřejné internetové odkazy se v rozhraní nezobrazují. U rozměrů a hmotnosti se odlišují modely, jednotlivé exempláře a údaje pro celý rod; nejistá hmotnost není nahrazena vymyšleným číslem.

## Úplné zdroje

`Dino-Atlas-0.8.0-zdroje.zip` obsahuje kompletní současné zdroje, všech 42 obrázků a aktuální workflow. Nepotřebuješ postupně nahrávat starší balíčky. GitHub lze doplnit později podle `NAHRANI-0.8.0.md`.

## Sestavení přes GitHub Actions

V repozitáři `Hmyzak666/dino-atlas` spusť **Actions → Sestavit Android APK → Run workflow** a ponech verzi `0.8.0`. Po dokončení stáhni artefakt `Dino-Atlas-Android-0.7.1`, rozbal ho a nainstaluj APK.

Dosavadní secrets `ANDROID_KEYSTORE_BASE64` a `ANDROID_KEYSTORE_PASSWORD` zůstávají stejné. Soukromý balíček `Dino-Atlas-klic-SOUKROME.zip` uschovej mimo veřejný repozitář. Klíč ani heslo nejsou součástí zdrojového balíčku.

## Úplné místní sestavení

Workflow používá Python 3, Javu 17 a oficiální Android SDK s balíčky `platforms;android-35` a `build-tools;35.0.1`. Sestavovací skript nepoužívá Gradle.

Nastav `ANDROID_SDK_ROOT`, `DINO_KEYSTORE_PATH`, `DINO_STORE_PASSWORD`, `DINO_KEY_PASSWORD` a případně `DINO_OUTPUT_DIR`. Alias klíče je `dinoatlas`. Spusť `python3 build_android.py --version 0.8.0`. Skript kontroluje úplnost HTML a obrázků, sestaví nativní obal a ověří podpis APK. Hesla se nepředávají jako otevřené argumenty příkazů.

## Kontroly

`node tests/content.test.cjs` ověřuje databázi, všechny obrázky, oddělení předčítání, původní český pravopis, řazení, filtry a 400 kvízů.

`node tests/ui.test.cjs` používá Playwright a Chromium k ověření mobilního rozložení, předčítání přes simulované nativní rozhraní, skutečných dotykových gest, oblíbených, návratu do seznamu a kvízu. Vyžaduje dostupný balíček `playwright`; `DINO_BROWSER_PATH` může určit instalované Chromium a `DINO_QA_DIR` složku pro kontrolní snímky. Automatická kontrola neověřuje zvuk konkrétního hlasu v telefonu.

## Stav domluvených úprav

Triasová várka 5 dinosaurů, 2 ptakoještěrů a 2 mořských plazů je hotová. Další obsahová várka ani nová funkce není rozpracovaná.

## Ověření této dodávky

Obsahové testy a 400 generovaných kvízů prošly. Testy rozhraní prošly v šířkách 320, 360, 412 a 900 px, včetně obrázků všech devíti nových zvířat, filtru všech 11 triasových hesel a odděleného čtení základních údajů. Procházení výsledků hledání prošlo včetně skutečného dotykového gesta a zachování filtrů. Zvuk konkrétního českého hlasu je stále nutné poslechnout v telefonu.

APK obsahuje aktuální offline soubory a všech 42 obrázků; podpis v2 a v3 je ověřen proti původnímu certifikátu. Nativní WebView obal je shodný s 0.7.1, mění se pouze verze a offline obsah. Úplné sestavení ze zdrojů zůstává dostupné přes `build_android.py` a přiložené GitHub Actions.
