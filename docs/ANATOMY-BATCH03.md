# Anatomická dávka 03 — Qilinyu

29. 10. 2026. Základ c2b8f2c7cae8268a3dd025b9f1b6869cc4b4f66a, pouze feature/paleozoic-1.0.0. Uživatel výslovně schválil náhled 03 pro zařazení do atlasu.

Schválený exec-f2f95082-9d8d-45cf-9e20-ff3d3b36379d.png exportován do WebP 1536 × 1024, quality 94, method 6, bez ořezu či změny rozměrů. Žádné nové generování. Krátký zaoblený rypec, ústa pod převisem a odstraněný izolovaný boční tmavý otvor před okem. Nejistoty rekonstrukce, zdroj Zhu et al. 2016 a přesná zadání jsou v [náhledech](audit-112/QILINYU-PREVIEW-03.md); nejde o odbornou certifikaci celé anatomie.

Před výměnou přesně zálohován původní WebP, obrazová metadata a kredity do backups/anatomy-03/. Manifest obsahuje otisky všech 112 obrazů i databáze. Obě verze jsou vlastní AI rekonstrukce bez cizích obrazových kreditů; stávající upozornění na hypotetické znaky zachováno. Databáze, všechny texty, české předčítání a funkční kód jsou po bajtech nezměněné. Ostatních 111 aktivních obrázků včetně Cladoselache a Bothriolepise zůstalo zachovaných.

## Ověření a zbývající práce

- Export vizuálně prohlédnut: celý živočich, poměr 3:2, bez nového rámu či ořezu.
- npm test: PASS v čisté kopii všech sledovaných/připravených souborů; obsahové a regresní kontroly, 6 Python testů a build_android.py --check. Nový regresní test kontroluje přesnou zálohu, jedinou výměnu a nezměněnou databázi. Historické testy obsahují explicitní výjimku pouze pro schválenou dávku.
- Nesouvisející nesledovaný pomocný soubor v images zůstal nedotčený a nebyl zahrnut do validační kopie ani commitu.
- UI/CI pro tuto sérii nadále neověřené; předchozí problém s chybějícím prohlížečem a selhaným stažením se v tomto kroku znovu netestoval.
- Nové APK nevzniklo. Poslední dodané a schválené APK 1000010 neobsahuje nové integrace Cladoselache, Bothriolepis ani Qilinyu. Před dalším APK zvýšit versionCode a ověřit CI i původní podpis.

Tři uživatelem vybrané anatomické opravy integrované. Z původních sedmi auditních podezření zbývají Mecochirus, Tylosaurus, Ichthyostega a Edestus; nejde u všech o stejnou míru jistoty. Další kandidát pro individuální kontrolu: Mecochirus. Dobré obrázky zachovat, nic dalšího automaticky neměnit. Do main neslučovat.
