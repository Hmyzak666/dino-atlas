# Anatomická dávka 04 — Mecochirus

29. 10. 2026, základ de83301c6237c591c729293b4c0e969782772153, pouze feature/paleozoic-1.0.0. Uživatel schválil náhled 01. Zdroj získán z uloženého schváleného PNG a ověřen SHA-256 dle [náhledu](audit-112/MECOCHIRUS-PREVIEW-01.md). Žádné další generování.

Před výměnou přesně zálohován originální WebP, metadata a kredity do backups/anatomy-04/. Manifest uchovává otisky všech 112 obrazů i databáze. Schválený obraz exportován bez ořezu či změny velikosti do WebP 1536 × 1024, quality 94, method 6. Otisky zdroje/exportu v anatomy-04.json. Oba obrazy jsou pracovní AI rekonstrukce, databáze i kredity beze změny.

Obě dlouhé přední končetiny mají jednoduché zahnuté prsty místo pravých dvouprstých klepet. Náhled a export vizuálně prohlédnuty; nejde o certifikaci celé anatomie. Všech 112 druhů, texty, české předčítání, kvíz, oblíbené, offline a funkční kód zachované; dalších 111 obrazů nezměněno.

npm test: PASS v čisté kopii sledovaných/připravených souborů, včetně obsahových/regresních testů, 6 Python testů a Android --check. Nezahrnut nesouvisející nesledovaný pomocný soubor, který zůstává nedotčený. UI/CI této série nadále neověřené, nové APK nevzniklo. Poslední dodané 1000010 neobsahuje nové integrace Cladoselache, Bothriolepis, Qilinyu ani Mecochirus.

## Otevřená připomínka: orientace

Uživatel připomněl jednotnou orientaci masožravci/predátoři na jednu stranu, ostatní na druhou. Dosavadní pravidlo v testu content je carnivore vlevo, ostatní vpravo, ale test kontroluje pouze metadata a nemůže rozpoznat skutečné natočení. Nový Cladoselache je vizuálně vpravo při diet=carnivore a facing=left: chyba je potvrzená a DOSUD NEOPRAVENÁ. Před finálním vydáním je nutná vizuální kontrola orientace všech obrazů, nikoli pouze metadat.

Mecochirus má diet=unknown a historické facing=left; schválený obraz zachovává levou orientaci. Je to další výjimka vůči doslovnému pravidlu „ostatní vpravo“, nikoli doklad masožravosti. Neznámou potravu nepřeklasifikovat jen kvůli orientaci. Qilinyu a Bothriolepis jsou vpravo, oba diet=unknown. Čelní pohledy (např. uživatelem vybraný Edestus) vyžadují zvláštní posouzení. V tomto kroku nebyly obrazy zrcadleny, metadata natočení ani potrava se neměnily. Orientační připomínka není hotová.

Z původních sedmi anatomických podezření zbývá individuálně posoudit Tylosaurus, Ichthyostega a Edestus. Integrované čtyři opravy nepředstavují dokončení všech auditních nálezů. Do main neslučovat.
