# Dino Atlas 1.0.0 — prvohory (pracovní plán)

> **Stav:** šest vědecky zdrojovaných kandidátních hesel kambria je nyní v `content-drafts/cambrian-six.json`; zatím se nezobrazují v aplikaci, protože chybí původní ilustrace. Pokyny ke všem šesti obrázkům jsou v `docs/image-prompts/1.0.0-cambrian.md`. Nevydávat tuto větev jako hotovou 1.0.0 bez 40 vědecky ověřených a zveřejněných hesel, 40 samostatných obrázků a zeleného CI.

## Aktuální ověřený postup — 25. října 2026
- **Kambrium:** 6 druhů a 6 obrázků aktivovaných, zelený import a mobilní testy.
- **Ordovik:** 5 druhů a 5 obrázků aktivovaných, zelený import a mobilní testy.
- **Silur:** 5 druhů a 5 obrázků aktivovaných, zelený import a mobilní testy.
- **Současný stav pracovní aplikace:** 88 živočichů / 88 obrázků, 16 ze 40 plánovaných prvohorních druhů.
- **Devon:** připraveno osm obsahových draftů v `content-drafts/devonian-eight.json` a jejich regresní testy. Odborné požadavky a obrazový audit v `docs/image-prompts/1.0.0-devonian.md`. Ještě **nepublikováno**, protože obrazové rekonstrukce nesplnily anatomickou kontrolu.
- **Stabilní `main`:** stále 0.9.0 build 90001, beze změn.
 
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

## Dokončený první obsahový krok — kambrium

- Vypracováno 6 samostatných draftů s českými texty, šesti podtématy, třemi rozpoznávacími znaky, mluveným jménem, filtrací, kvízem a sedmi zdroji.
- Vědecké rozlišení: Marrella jako členovec; Anomalocaris, Opabinia, Hallucigenia a Wiwaxia mezi dalšími bezobratlými; Pikaia jako samostatný raný strunatec, nikoli ryba.
- Test `tests/cambrian-drafts-1.0.0.test.cjs` kontroluje oddělené drafty, kategorii, hlášky, zdroje a podmínku chybějících obrázků. Aktivní atlas zatím zůstává na 72 živočiších.
- Následuje vytvoření 6 samostatných původních WebP rekonstrukcí; teprve poté přesun draftů do aktivní databáze a mobilní regresní testy.
