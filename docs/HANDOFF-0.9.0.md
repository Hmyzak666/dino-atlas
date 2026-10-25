# Předání rozpracované verze 0.9.0 — 25. října 2026

Toto je pracovní checkpoint, nikoli dokončená ověřená verze. Uživatel musí přejít do nového chatu kvůli limitu délky konverzace.

## Zadání a stav

Dokončit Dino Atlas 0.9.0 (90000), přesně 30 nových druhů a 72 celkem. Základ main 0.8.1 (80101), commit 7d419272a9d86dc1d4a44ac7591eb6a9b6dd7fee. Pracovat ve feature/atlas-0.9.0, připravit PR, NESLUČOVAT main. Uživatel nejprve vyzkouší podepsané APK. Zachovat ApplicationId, původní certifikát, nativní obal, 42 původních záznamů i obrázků a storage klíče.

Implementováno: 30 druhů (přesný seznam tests/fixtures/additions-0.9.0.json), vlastní WebP obrázky, české texty, vědecké odkazy, výslovnost, nová kategorie arthropod, nezávislé filtry kategorie/období kvízu, přepínání období v detailu bez ztráty původních atlasových filtrů, cm/mm měřítko. Slovník periods v databázi umožní další období později; prvohory nyní nepřidávat.

Celkem 45 dinosaurů, 10 ptakoještěrů, 8 mořských plazů a 9 členovců. 30 nových obrázků dohromady 9,52 MiB. Původní obrázky nejsou měněné. Všechny 72 WebP byly dekódovány Pillow.

## Prošlo

- npm ci
- npm test: obsah, přesných 30 přírůstků, všechna průniková filtrování a kvízové pooly, výslovnost, vyhledávání, původní data/obrázky/nativní obal/certifikát/storage, šest Python sestavovacích testů, build_android.py --check (72 obrázků).
- git diff --check

## Zbývá — pokračovat skutečným dokončením

1. Projít obsah, obrázky a diff. U některých druhů je délka/hmotnost neznámá; doplňovat pouze podložená čísla. Vědecká rešerše a prompty jsou v docs/research/0.9.0.md a docs/image-prompts/0.9.0.md. U Microraptor, Ophthalmosaurus, Tapejara lze ještě dohledat dobře podložené rozměry. Nezaměnit rodové údaje za druhové.
2. Zkontrolovat quizLookalikeGroup nových raných teropodů proti původnímu small-early-saurischian (noví mají early-small-theropods) a podobné raptory; původní záznamy zachovat.
3. Spustit npm run test:ui. Místně Playwright 1.62.1 opakovaně stáhl neplatný prázdný ZIP Chromia 151.0.7922.34. apt-get nelze použít kvůli setgroups/setuid. NENÍ to průchod UI testů. Použít GitHub Actions, nebo existující Chromium přes DINO_BROWSER_PATH. Nové testy filters-0.9.0.test.cjs zatím nebyly v prohlížeči spuštěny. Mohou vyžadovat opravy; neopravovat očekávání slepě. Zvlášť ověřit touch gesta po přidání lišty období.
4. Připravit PR do main. Jediné workflow android-apk.yml spustí npm test, UI a úplný Android build. Vlastníkův interní PR může používat původní podpisová secrets a nabídnout podepsaný artefakt. Klíč nikdy neměnit ani nezveřejnit.
5. Opravit případné selhání CI a ověřit finální podepsané APK včetně očekávaného certifikátu. V tomto checkpointu hotové APK NENÍ.
6. Aktualizovat stav v PR a předat uživateli odkaz na APK. Fyzické zařízení a skutečný český hlas vyzkouší uživatel. Instalovat jako aktualizaci bez odinstalace, ověřit oblíbené a nastavení. Main neslučovat automaticky.

## Přístup ke GitHubu

Lokální git clone/read funguje, git push nemá přihlašovací údaje. Použít GitHub connector: create_blob (base64 pro WebP), create_tree, create_commit, update_ref s expected_sha a force=false. Větev existovala na výchozím commitu; znovu ověřit její aktuální stav. Neukládat klíče ani tokeny do souborů. Checkpoint se ukládá touto cestou.

## Relevantní soubory

README.md, PROJECT_STATUS.md, docs/DEVELOPMENT.md, project.json, app.js, index.html, style.css, dinosaurs.json, tests/*.cjs, tests/fixtures/original-0.8.1-records.json a additions-0.9.0.json. Dokumentace označuje 0.9.0 jako kandidáta, nikoli telefonem potvrzenou verzi.
