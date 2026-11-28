# Anatomická dávka 01 — Cladoselache

29. 10. 2026. Základ `ee4302cba1003446bbfab99f11e19050daef0e3d`, pouze `feature/paleozoic-1.0.0`. Uživatel schválil náhled 02 a výslovně souhlasil s jeho zařazením a pokračováním Bothriolepisem.

## Zařazená změna

Cladoselache: schválený PNG převeden bez změny rozměrů či ořezu na WebP **1536 × 1024**, quality 94, method 6. Dvě hřbetní ploutve, odstraněný třetí hřbetní výběžek a nadbytečná ventrální silueta u ocasu. Uživatelské schválení vzhledu není nezávislou odbornou certifikací všech detailů. Viz [kontrola náhledu 02](audit-112/CLADOSELACHE-PREVIEW-02.md).

Před výměnou přesná záloha aktivního WebP a obrazových metadat do `backups/anatomy-01/`; manifest ukládá také SHA-256 všech 112 obrázků a celé databáze. Export a zdroj identifikuje `anatomy-01.json`. Původní obraz i nový kandidát jsou vlastní AI rekonstrukce bez externí obrazové licence. Veškeré kredity, zdroje a databáze zůstaly po bajtech nezměněné. Existující obecná poznámka o hypotetických znacích zůstává platná.

Zachováno všech 112 druhů, 111 ostatních obrazových souborů, texty, TTS, offline balení, kvíz, oblíbené a funkční kód. Historické testy dávek explicitně akceptují tento nový manifest; nové regresní ověření kontroluje přesnou zálohu, změnu jediného obrazu a celou databázi.

## Ověření a hranice

- `npm test`: **PASS** v čisté validační kopii přesně sledovaných a připravených souborů. Obsah, všechny historické dávky, nová anatomická kontrola, hledání, kompatibilita, 6 Python testů a kontrola Android balení.
- První běh v původní pracovní složce zastavil nesouvisející dřívější nesledovaný pomocný soubor v images. Ten zůstal nedotčený a není součástí commitu. Čistá kopie vyloučila pouze nesledované neprojektové soubory, nezměnila testy kvůli této překážce.
- `npm run test:ui`: **NEOVĚŘENO** — spuštění skončilo na chybějícím prohlížeči. Pokus o instalaci Playwright Chromium selhal na neplatném/neúplném ZIP. Nevykazovat jako úspěšnou kontrolu rozhraní.
- Finální CI a nové APK v tomto kroku nebyly spuštěny. Metadata sestavení zůstávají 1000010; poslední skutečně dodané a uživatelem schválené APK 1000010 tento nový Cladoselache ještě neobsahuje. Před příštím APK zvýšit versionCode, dokončit UI/CI a ověřit původní certifikát.

Bothriolepis má pouze [rozpracovaný náhled](audit-112/BOTHRIOLEPIS-PREVIEW-01.md); aktivní soubor se nemění. Zbývá zpřesnit pancíř/orbitální otvor a ploutve, teprve pak schválit integraci. Další anatomické opravy vybírat jednotlivě, dobré obrázky zachovat. Do main neslučovat.
