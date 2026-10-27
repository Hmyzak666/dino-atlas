> **Aktuálně 27. 10. 2026 — dávka 06 / 1000006:** Dva přesné ořezy (Pulmonoscorpius a Arthropleura) a nová rekonstrukce Edesta. 112 druhů zachováno. Zbývá sedm permských náhrad; lokální testy prošly, podepsané APK zatím nepotvrzené. [Předání](VISUAL-REFRESH-BATCH06.md). Neslučovat do main. Starší údaje níže jsou historie.

> **Aktuálně 27. 10. 2026 — dávka 05 / 1000005:** Vloženo pět karbonských rekonstrukcí, celkem 22 z 30 náhrad. Edestus odmítnut, zůstává původní; zbývá osm oprav (Edestus + perm 7). Lokální i GitHub testy prošly, podepsané APK 1000005 je hotové. Čeká hodnocení uživatele. [Předání](VISUAL-REFRESH-BATCH05.md). Neslučovat do main. Starší údaje níže jsou historie.

> **Aktuálně 26. 10. 2026 — dávka 04, kandidát 1000004:** Pět nových ordovických scén; předchozí kambrická dávka vizuálně schválená. Zachováno 112 druhů, nahrazeno 17 z 30 plánovaných obrazů, zbývá 13 (karbon 6, perm 7). Lokální i GitHub testy prošly; podepsané APK 1000004 je hotové a ověřené. Čeká uživatelská kontrola nové dávky. [Předání dávky 04](VISUAL-REFRESH-BATCH04.md). Neslučovat do main. Starší údaje níže jsou historie.

# Dino Atlas 1.0.0 — visual refresh po testování na telefonu

> **Aktuálně 26. 10. 2026 — dávka 03, kandidát 1000003:** Vložených šest nových kambrických scén; předchozí dvě trojice vizuálně schválené uživatelem. Celkem 112 druhů, 12 z 30 plánovaných obrazových náhrad; 18 zbývá. Lokální i GitHub testy prošly, podepsané APK 1000003 je hotové; čeká uživatelská kontrola dávky. [Aktuální předání](VISUAL-REFRESH-BATCH03.md). Neslučovat do main. Starší údaje níže jsou historie.

**Aktualizace 26. 10. 2026:** Build 1000001 a první tři náhrady uživatel schválil. Dávka 02 doplňuje Acutiramus, Birkenia a Dunkleosteus, kandidát 1000002; 24 oprav stále zbývá. Viz [aktuální předání](VISUAL-REFRESH-BATCH02.md). Níže zůstává původní audit a historie.

**Status 25. 10. 2026:** Uživatel nainstaloval podepsanou zkušební verzi **1.0.0 build 1000000** na telefon. Potvrdil, že funkce běží správně, ale **většina 40 nových prvohorních ilustrací má rozmazané okraje, nepřirozené bílé/šedé plochy či nesjednocený styl**. Neschválit zatím vydání, **neslučovat** pracovní větev do `main`. Schválený obsah 112 druhů, oblíbené, TTS a kvíz se **nemění**.

## Reálný obrazový audit

Kontrola byla provedena programově z **`Dino-Atlas-v1.0.0-build1000000.apk`** přes `assets/dinosaurs.json` a přímo ze 40 zabalených `assets/images/*.webp` (všech 40 má fyzicky 1152×768). Vizuální review zahrnoval všech šest období a pracovní kontaktní listy. Závady pocházejí z **obrázků samotných**, nejsou způsobeny Samsungem ani zobrazením v aplikaci.

| Období | Celkem | Priorita k výměně | Vizuální závada |
| --- | ---: | ---: | --- |
| Kambrium | 6 | 6 | Všech šest má měkké/rozmazané horní a dolní přechodové pruhy vzniklé v obrazovém zdroji |
| Ordovik | 5 | 5 | Všech pět má rozmazané svislé pruhy vlevo a vpravo |
| Silur | 5 | 5 | Všech pět má rozmazané svislé pruhy vlevo a vpravo |
| Devon | 8 | 1 | **Dunkleosteus terrelli** je vědecký diagram na světlém pozadí; sedm ostatních má plnohodnotné scenérie |
| Karbon | 8 | 6 | **Meganeura, Hylonomus, Greererpeton, Edestus, Petrolacosaurus, Crassigyrinus**: bílé, šedé nebo černé ateliérové pozadí / kresby místo scény; Arthropleura a Pulmonoscorpius mají přirozené pozadí |
| Perm | 8 | 7 | **Dimetrodon, Inostrancevia, Scutosaurus, Mesosaurus, Diplocaulus, Helicoprion, Estemmenosuchus**: studio / neutrální nebo bílé pozadí; Edaphosaurus má souvislou barevnou scénu |
| **Součet** | **40** | **30** | Číslo 30 je **vizuálně vybraných kandidátů na výměnu**, ne tvrzení o 30 fakticky chybných rekonstrukcích |

**Zachovat jako první:** Tiktaalik, Bothriolepis, Eusthenopteron, Ichthyostega, Acanthostega, Cladoselache, Jaekelopterus, Arthropleura, Pulmonoscorpius, Edaphosaurus. Jejich vědeckou anatomii lze přesto kontrolovat při celkovém posledním auditu.

## Pořadí malých šarží

**1. Silur + Devon: 6 obrázků**
- `eurypterus-remipes.webp`
- `acutiramus-bohemicus.webp`
- `birkenia-elegans.webp`
- `entelognathus-primordialis.webp`
- `qilinyu-rostrata.webp`
- `dunkleosteus-terrelli.webp`

U Eurypterus a Acutiramus nepřidávat jedový bodec skutečného štíra; jsou to vodní eurypteridi. Birkenia bez čelistí. Entelognathus a Qilinyu odlišovat přesně podle pancíře/rypce. Dunkleosteus se **zubními kostními řeznými hranami**, ne samostatnými žraločími tesáky; přímá práce Russell K. Engelman (2024) je vědecký referenční zdroj. Pokud by se jeho původní **CC BY 4.0** diagram výtvarně měnil, zachovat autora, odkaz, licenci a popis změn; nepovažovat upravený diagram za čistě vlastní AI dílo.

**2. Kambrium + ordovik: 11 obrázků**
- `anomalocaris-canadensis.webp`, `opabinia-regalis.webp`, `hallucigenia-sparsa.webp`, `marrella-splendens.webp`, `wiwaxia-corrugata.webp`, `pikaia-gracilens.webp`
- `isotelus-rex.webp`, `asaphus-kowalewskii.webp`, `aegirocassis-benmoulai.webp`, `arandaspis-prionotolepis.webp`, `endoceras-proteiforme.webp`

U Opabinie pět očí, u Hallucigenie správný směr trnů, Pikaia není pravá ryba, Aegirocassis je filtrující radiodont s laloky, Endoceras rovná komůrkovaná schránka.

**3. Karbon + perm: 13 obrázků**
- `meganeura-monyi.webp`, `hylonomus-lyelli.webp`, `greererpeton-burkemorani.webp`, `edestus-heinrichi.webp`, `petrolacosaurus-kansensis.webp`, `crassigyrinus-scoticus.webp`
- `dimetrodon-grandis.webp`, `inostrancevia-alexandri.webp`, `scutosaurus-karpinskii.webp`, `mesosaurus-tenuidens.webp`, `diplocaulus-magnicornis.webp`, `helicoprion-bessonowi.webp`, `estemmenosuchus-uralensis.webp`

U Edestus protilehlé čelistní čepele, ne spirála Helicopriona. U Helicopriona spirála uvnitř dolní čelisti, ne před tlamou. Diplocaulus má bumerangovou hlavu. Dimetrodon a Inostrancevia jsou synapsidi, **nikoli dinosauři**.

## Kritéria přijetí obrázků
- Každý živočich má **jednu vlastní vědecky rozpoznatelnou scénu**. **Žádné koláže, popisky, bílé/šedé studiové pozadí, rozmazané kopie okrajů, vodotisky či zdvojení zvířete**.
- Full-bleed poměr **3:2 (1152×768 WebP)**; kompozice umožní kompletní tělo včetně ocasů, ploutví a rohů při zachování důležitých anatomických znaků. Přirozené prostředí odpovídá moři, močálu, řece nebo suché krajině v příslušném období.
- Zbarvení, měkké tkáně, chování a podrobnosti anatomie, které fosilie nedokládají, označovat jako rekonstrukci.
- Dát přednost **nově vytvořeným původním realistickým scénám**. Když se vychází z cizí licencované ilustrace, zachovat všechny potřebné kredity, ShareAlike a poznámky o odvozeném díle.
- **Záloha původních 40 WebP**, kontrola názvů a SHA-256, kontrola vždy 112 existujících ID; nemačkat ostatní obrázky. Případné 3rd-party soubory nikdy neodmazávat bez ověření právní návaznosti.
- Dočasně samostatná **pracovní větev** `feature/paleozoic-1.0.0`, žádný merge do `main`. Ověřit `npm test`, `npm run test:ui`, mobilní TTS a kvíz.
- **Zvýšit Android versionCode nad 1000000** (např. na `1000001`) před dalším testovacím APK, protože build 1000000 je již nainstalován na zařízení uživatele.
- **Nespouštět automatickou výměnu všech 30 najednou** bez prvního vizuálně schváleného vzorku. Nejprve jedna testovací dvojice ze siluru, prohlédnout bez rozmazaných okrajů, pak dokončit první šarži šesti.

## Poznámka k předávání
Uživatel nemusí ručně sepisovat problematické druhy: tento audit vychází z přesných obrazů instalovaného APK. Veškerý původní obsah aplikace zůstává funkční a testovaný. Tento dokument je **plán a audit**, nikoli tvrzení, že už byly obrázky vyměněny.


## První kontrola náhrady obrázku (25. 10. 2026 večer)
Zkušební nové generování **Eurypterus remipes** úspěšně vyrobilo ostré plné podmořské prostředí, ale živočichovi **chybně přidalo velká uchopovací klepítka/chelicery podobné pterygotidovi**, takže tento pokus **nelze použít jako Eurypterus remipes**. Také automatická koláž typu „před a po“ byla vyřazena jako nevhodný instalační asset.

Původní WebP `images/eurypterus-remipes.webp` je 1152×768; ostrá centrální oblast zabírá přibližně **x=192–960**, zatímco levý a pravý pruh zůstávají uměle rozostřené. Experiment se zrcadlením ostrého středu sice odstranil blur, ale zdvojil ocasní hrot, plovací končetiny a nohy. Blend s druhým AI obrazem zase vytvořil cizí končetiny v pozadí. **Obě techniky vyřazeny**, nic nenahradily.

Při výběru náhrady upřednostnit plnohodnotnou 3:2 scénu, v níž `Eurypterus remipes` má špičatý ocasní trn, **plovací vesla v posledním páru nohou a nikoli nápadná velká klepítka**. `Acutiramus bohemicus` velká úchopová chelicerae naopak mít může; nelze tedy mezi nimi ilustrace zaměňovat.

Otevřeně licencované `Eurypterus Paleoart.jpg` od Obsidian Soul je konkrétně založeno převážně na **Eurypterus tetragonophthalmus**, a proto by nebylo věrnou nezaměnitelnou náhradou pro `E. remipes`. Nepoužít bez další druhové kontroly. Vizuální úpravy dosud **nemění** aplikaci, zdrojových 112 obrázků ani verzi 1000000.

**Bezpečné pravidlo:** nezaměňovat odstranění rozmazaných okrajů za vědeckou přesnost. Nahradit jen obrazem, který splní obě podmínky, a před vložením zachovat zdrojovou zálohu, kredity a výslovné posouzení anatomie.
