# Dino Atlas 1.0.0 — prvohory (pracovní plán)

> **Stav:** rozpracované zadání; samotná hesla ani obrázky dosud nejsou přidané. Nikdy nevydávat tuto větev jako hotovou 1.0.0 bez 40 vědecky ověřených hesel, 40 samostatných obrázků a zeleného CI.

## Výchozí stav
Navazuje na ověřené Dino Atlas 0.9.0 (72 živočichů) včetně posunu kvízu na výšku. První krok je model éra → období, samostatné filtry atlasu a kvízu a rozšiřitelné kategorie. Stabilní main a původních 72 hesel/obrázků zůstanou nedotčené až do schválené aktualizace.

**Cílově: 112 živočichů celkem.** Nová období: kambrium, ordovik, silur, devon, karbon, perm. Výběr éry Prvohory / Druhohory / Vše, následně období odpovídající éře. Nezavádět prázdné kategorie do viditelného UI před přidáním obsahu.

## Přesně 40 kandidátů, před vydáním ověřit vědecké zařazení
- **Kambrium (6):** Anomalocaris canadensis; Opabinia regalis; Hallucigenia sparsa; Marrella splendens; Wiwaxia corrugata; Pikaia gracilens.
- **Ordovik (5):** Isotelus rex; Asaphus kowalewskii; Aegirocassis benmoulai; Arandaspis prionotolepis; Endoceras proteiforme.
- **Silur (5):** Eurypterus remipes; Acutiramus bohemicus; Birkenia elegans; Entelognathus primordialis; Qilinyu rostrata.
- **Devon (8):** Dunkleosteus terrelli; Tiktaalik roseae; Bothriolepis canadensis; Eusthenopteron foordi; Ichthyostega stensioei; Acanthostega gunnari; Cladoselache fyleri; Jaekelopterus rhenaniae.
- **Karbon (8):** Arthropleura armata; Meganeura monyi; Pulmonoscorpius kirktonensis; Hylonomus lyelli; Greererpeton burkemorani; Edestus heinrichi; Petrolacosaurus kansensis; Crassigyrinus scoticus.
- **Perm (8):** Dimetrodon grandis; Edaphosaurus pogonias; Inostrancevia alexandri; Scutosaurus karpinskii; Mesosaurus tenuidens; Diplocaulus magnicornis; Helicoprion bessonowi; Estemmenosuchus uralensis.

Vědecky kontrolovat mimo jiné: rané členovce vs kmenové příbuzné členovců; Pikaia není ryba; raní čtyřnožci nemuseli patřit do dnešních obojživelníků; synapsidi nejsou dinosauři ani automaticky savci. Případné neplatné či problematické druhové jméno zdokumentovat a konzultovat náhradu před změnou seznamu.

## Nové filtrační skupiny
- Ryby (včetně bezčelistnatých a raných čelistnatých obratlovců)
- Obojživelníci a raní čtyřnožci
- Synapsidi
- Další plazi
- Ostatní bezobratlí

Ponechat: Dinosauři, Ptakoještěři, Mořští plazi, Členovci, Vše. Připravit systém pro pozdější pravěké savce a druhohorní ryby bez prázdné veřejné kategorie.

## Akceptační kritéria
- 40 nových vědecky podložených hesel s českými texty, třemi znaky, kvízem, zdroji a výslovností.
- 40 **různých** optimalizovaných WebP rekonstrukcí; nikdy nenahrazovat špatně známá zvířata obrázky jiných druhů.
- Dvouúrovňové časové filtry nezávisle v atlasu a kvízu, přecházení detailů zachová návrat do atlasu.
- Původní oblíbení, tema, TTS, offline, ID a původní certifikát aktualizace zachovány.
- Regresní testy všeho; úplné sestavení původně podepsaného APK přes GitHub Actions a fyzická zkouška před merge.
- Zatím **nepřidávat kenozoikum** ani povinně druhohorní ryby/savce; architektura je musí umožnit.
