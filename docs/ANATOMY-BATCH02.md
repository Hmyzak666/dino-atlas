# Anatomická dávka 02 — Bothriolepis

29. 10. 2026. Základ `6b34499cc88bcfeb1f625120b1bfe684f2fe95cf`, pouze `feature/paleozoic-1.0.0`. Uživatel výslovně vybral náhled 02 pro atlas.

## Integrace

Schválený `exec-3eeba615-8cf7-4bf6-8692-fd05eb8ff6fe.png` převeden bez ořezu a změny rozměrů na WebP **1536 × 1024**, quality 94, method 6. V tomto kroku se nic negenerovalo. Oči nahoře na hlavovém štítu, nízký podélný hřeben pancíře místo vysoké plachty a hranatější jediná hřbetní ploutev. Přesné švy pancíře a úhly přívěsků zůstávají rekonstrukční nejistotou, nikoli odborně certifikovanými znaky. [Kontrola náhledu](audit-112/BOTHRIOLEPIS-PREVIEW-02.md).

Před zápisem přesně zálohován původní WebP a obrazová metadata/kredity do `backups/anatomy-02/`. Manifest uchovává SHA-256 všech aktivních obrazů a databáze. Zdroj a export eviduje `anatomy-02.json`. Oba obrazy jsou vlastní AI rekonstrukce; nebyla převzata cizí ilustrace. Databáze i kredity se zachovaly po bajtech. Hypotetické znaky zůstávají označené stávající obrazovou poznámkou.

Všech 112 druhů, 111 ostatních aktuálních obrázků (včetně schváleného Cladoselache), všechny texty, české TTS, kvíz, oblíbené, offline obsah a funkční kód zachované. Historické testy explicitně rozšířeny o novou schválenou výjimku; nový regresní test kontroluje nezměněnou databázi, přesnou zálohu a jedinou novou obrazovou výměnu.

## Ověření

- `npm test`: **PASS** v čisté validační kopii všech sledovaných/připravených souborů; obsahové a regresní kontroly, 6 Python testů a `build_android.py --check`.
- Export vizuálně prohlédnut: 3:2, celé tělo v rámci, žádný nově přidaný rám či ořez.
- Nesouvisející dřívější nesledovaný pomocný soubor v pracovní složce zůstal nedotčený, nebyl zahrnut do čisté validační kopie ani commitu.
- UI/CI stále **neověřeno**; předchozí překážka je chybějící prohlížeč a selhané stažení. Tento krok nepředstírá nové úspěšné testy rozhraní.
- Nové APK nevzniklo. Poslední dodané a schválené APK **1000010** neobsahuje ani nový Cladoselache, ani nový Bothriolepis. Projektová verze se zatím nemění; před dalším APK zvýšit versionCode a dokončit CI včetně původního podpisu.

Dvě vybrané anatomické opravy nyní integrované. Další navržený druh: Qilinyu, nejprve ověřit rekonstrukci a připravit jeden náhled, bez automatické výměny dalších obrazů. Do main nic neslučovat.
