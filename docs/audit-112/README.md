# Audit 112 obrazů - 28. 10. 2026

Redakční vizuální audit všech 112 obrazů a anatomický screening. Není nezávislou odbornou certifikací všech detailů. Cílená nová rešerše podezřelých znaků, u ostatních návaznost na citované podklady projektu.

Výchozí commit `29158c3`, pouze `feature/paleozoic-1.0.0`. Build 1000010 uživatel schválil. Žádné aktivní obrázky, data ani funkční soubory se při auditu nemění. Do main nic neslučovat.

[Obrázkový přehled všech 112 druhů - PDF, 62 stran](https://chatgpt.com/library?file_id=libfile_e07b5b41d5e0819197314e12a48b30fa&account_id=personal) (přístup vlastníka).

Reprodukce: `python scripts/audit/build_image_audit.py /tmp/Dino-Atlas-audit-112.pdf` (Pillow a ReportLab). Bez argumentu skript obnoví jen auditní JSON a Markdown; aktivní soubory pouze čte.

> **Doplnění po auditu:** Vyšší rozlišení samo o sobě není vizuální vada. 72 obrazů 1536 × 1024 zachovat; původní počty níže zahrnují odchylku od tehdy požadovaného přesného rozměru. [Kontrola větších předloh zbývajících 40 obrazů](HIGHER-RESOLUTION-SOURCES.md) doložila 31 shodných větších PNG, 2 větší originály metadaty Commons a 7 menších polí koláží. Žádný obraz nebyl změněn.

## Výsledky

- Bez problémů: **24**
- Drobná vizuální odchylka: **63**
- Výrazná vizuální odchylka: **18**
- Anatomická chyba: **7**

Všech 112 souborů: WebP, poměr 3:2. Přesný rozměr 1152 × 768 má 40; dalších 72 má 1536 × 1024. Samotný rozměr je drobná technická odchylka, ne důvod pro nové generování.

Kategorie Anatomická chyba zahrnuje i pravděpodobné chyby se střední jistotou výslovně uvedenou v poznámce. Bez problémů znamená bez nalezené závady v rozsahu této kontroly. U drobných prstů, žilnatiny, pozadí a neúplně známých druhů zůstávají uvedená omezení.

## Společné nálezy

- Starší béžová lomová série: Triceratops, Tyrannosaurus, Stegosaurus, Diplodocus, Ankylosaurus, Coelophysis, Parasaurolophus, Brachiosaurus. Zvířata často zachovat; ke zvážení hlavně kulisa a světlo.
- Opakované říční kulisy: Apatosaurus/Brontosaurus/Camarasaurus; triasoví malí dinosauři; permská skupina Dimetrodon/Edaphosaurus/Inostrancevia/Scutosaurus/Estemmenosuchus. Jde o podobnost motivů, nikoli doložené kopírování totožných pixelů.
- Mořská šablona: Mosasaurus/Tylosaurus a další vodní obratlovci; podobná modrá voda, paprsky a skalnaté dno. Jednotný styl je výhoda, shodný biotop napříč obdobími ale není vědecké potvrzení.
- Nebyl nalezen zjevný čistě bílý ateliér ani koláž. Přirozené rozostření vzdáleného pozadí není umělý rozmazaný rám. Nejsou potvrzeny nadbytečné celé končetiny; některé prsty a drobné přívěsky zůstávají neověřitelné.
- Arthropleura a Pulmonoscorpius jsou záměrně zachované uživatelem schválené ilustrace Prehistorica CM. Odlišný styl je zaznamenán, nikoli automaticky určen k výměně. Kredity a podpisy zachovat.
- Dobré obrazy zachovat. Před jakoukoli budoucí vybranou výměnou záloha původního WebP, metadata, licence a SHA-256. Maximálně 5-6 oprav v dávce; kontrolovat jednotlivě.

## Druhový seznam

### Kambrium

#### Anomalocaris canadensis - Bez problémů

- Vzhled: Celá ostrá postava, bez rámů a opakovaných rozmazaných pruhů.
- Anatomie: Dva přední přívěsky, boční laloky a ocasní vějíř přítomné; ústní disk není dobře vidět.
- Prostředí: Kambrické moře s houbami přijatelné; konkrétní druhy pozadí neurčené.
- Formát: WEBP 1152 × 768.
- Podklady: [Royal Ontario Museum: Anomalocaris canadensis](https://burgess-shale.rom.on.ca/fossils/anomalocaris-canadensis/)

#### Opabinia regalis - Bez problémů

- Vzhled: Celá postava i chobot; rozostřené pozadí působí přirozeně.
- Anatomie: Při zvětšení je vidět všech pět očí. Nejde o chybějící oko; chobot a plovací laloky odpovídají.
- Prostředí: Kambrické mořské dno přijatelné; odstín vody a barva těla jsou hypotetické.
- Formát: WEBP 1152 × 768.
- Podklady: [Royal Ontario Museum: Opabinia regalis](https://burgess-shale.rom.on.ca/fossils/opabinia-regalis/)

#### Hallucigenia sparsa - Bez problémů

- Vzhled: Ostrá silueta s jemným makropozadím, bez ořezu.
- Anatomie: Sedm párů hřbetních ostnů je rozpoznatelných. Nejjemnější přední lobopody se překrývají; nelze potvrdit jejich přesný počet.
- Prostředí: Kambrické mořské dno s houbami je přijatelné.
- Formát: WEBP 1152 × 768.
- Podklady: [Royal Ontario Museum: Hallucigenia sparsa](https://burgess-shale.rom.on.ca/fossils/hallucigenia-sparsa/)

#### Marrella splendens - Drobná vizuální odchylka

- Vzhled: Spodní pravé tykadlo dosahuje k hraně; jinak zdařilé makro.
- Anatomie: Dva hlavní páry hlavových ostnů a mnoho noh přítomné; přesný počet 26 článků nelze z perspektivy bezpečně spočítat.
- Prostředí: Kambrické moře vhodné; hustota organismů na dně ilustrativní.
- Formát: WEBP 1152 × 768.
- Podklady: [Royal Ontario Museum: Marrella splendens](https://burgess-shale.rom.on.ca/fossils/marrella-splendens/)

#### Wiwaxia corrugata - Bez problémů

- Vzhled: Jasně čitelné destičky i ostny, celá silueta.
- Anatomie: Oválný scleritom a dlouhé ostny přijatelné; spodní měkká část není přístupná kontrole.
- Prostředí: Kambrické mořské dno vhodné.
- Formát: WEBP 1152 × 768.
- Podklady: [Royal Ontario Museum: Wiwaxia corrugata](https://burgess-shale.rom.on.ca/fossils/wiwaxia-corrugata/)

#### Pikaia gracilens - Bez problémů

- Vzhled: Jemný průsvitný povrch se hodí k malému měkkému živočichovi.
- Anatomie: Hřbetně orientované přední výběžky odpovídají reinterpretaci Mussini a kol. 2024; nejde automaticky o obrácenou rekonstrukci. Průsvitnost je hypotéza.
- Prostředí: Kambrické moře vhodné; světlo a sediment obecně ilustrativní.
- Formát: WEBP 1152 × 768.
- Podklady: [Mussini a kol. 2024: nová orientace těla](https://www.cell.com/article/S0960982224006699/pdf); [Royal Ontario Museum: Pikaia gracilens](https://burgess-shale.rom.on.ca/fossils/pikaia-gracilens/); [Mussini et al. 2024: New interpretation of Pikaia](https://doi.org/10.1016/j.cub.2024.05.026)

### Ordovik

#### Isotelus rex - Drobná vizuální odchylka

- Vzhled: Osa těla je málo kontrastní, takže trilobit působí téměř nerozděleně.
- Anatomie: Tři podélné laloky jsou hůře čitelné; neoznačuji jejich úplnou absenci bez dalšího morfometrického porovnání.
- Prostředí: Ordovické mořské dno přijatelné.
- Formát: WEBP 1152 × 768.
- Podklady: [Rudkin et al. 2003: World's biggest trilobite, Isotelus rex](https://doi.org/10.1666/0022-3360(2003)077%3C0099:TWBTIR%3E2.0.CO;2); [Manitoba Museum: Isotelus rex specimen](https://manitobamuseum.ca/collections-research/manitoba-nature/palaeontology-geology/)

#### Asaphus kowalewskii - Bez problémů

- Vzhled: Oční stopky i články dobře čitelné, celistvá scéna.
- Anatomie: Vysoké oční stopky a trilobití štíty odpovídají; měkké spodní končetiny skryté.
- Prostředí: Mořské dno je vhodné; hloubku a konkrétní sediment nelze potvrdit.
- Formát: WEBP 1152 × 768.
- Podklady: [GSA 2022: Structure of asaphid trilobite eyes](https://gsa.confex.com/gsa/2022AM/webprogram/Paper381674.html); [Ivantsov 2003: Asaphinae of Ladoga Glint](https://kirjandus.geoloogia.info/en/reference/6359)

#### Aegirocassis benmoulai - Bez problémů

- Vzhled: Filtrační přívěsky i boční laloky jsou názorné.
- Anatomie: Dvě řady laloků a hřebenovité filtrační přívěsky přítomné; přesná barva je hypotetická.
- Prostředí: Ordovické moře vhodné pro filtrujícího radiodonta.
- Formát: WEBP 1152 × 768.
- Podklady: [Van Roy, Daley & Briggs 2015: Aegirocassis](https://doi.org/10.1038/nature14256); [2023 study: Radiodont frontal appendages, Fezouata](https://doi.org/10.3389/fevo.2023.1214109)

#### Arandaspis prionotolepis - Bez problémů

- Vzhled: Přehledná pancéřovaná přední část a celá postava.
- Anatomie: Bez zjevné čelisti či párových prsních ploutví; zadní část těla je zčásti hypotetická.
- Prostředí: Mořské prostředí přijatelné.
- Formát: WEBP 1152 × 768.
- Podklady: [Geoscience Australia: Arandaspis prionotolepis holotype](https://www.ga.gov.au/bigobj/GA14368.pdf); [Ritchie & Gilbert-Tomlinson 1977: Ordovician vertebrates](https://doi.org/10.1080/03115517708527770)

#### Endoceras proteiforme - Bez problémů

- Vzhled: Rovná schránka i měkká část jsou v souvislé scéně.
- Anatomie: Schránka má fosilní oporu; přesné uspořádání ramen, očí a ploutví měkkého těla je nejisté.
- Prostředí: Ordovické moře vhodné; poloha při plavání je odhad.
- Formát: WEBP 1152 × 768.
- Podklady: [Atlas of Ordovician Life: Endoceras proteiforme](https://www.ordovicianatlas.org/atlas/mollusca/cephalopoda/endocerida/endoceratidae/endoceras/endoceras-proteiforme/); [McFarlan 1931: Ordovician Fauna — Endoceras proteiforme](https://www.uky.edu/OtherOrgs/KPS/poky/files/pokych02-01-118.pdf)

### Silur

#### Eurypterus remipes - Bez problémů

- Vzhled: Čitelná vesla i telson; žádná zjevná koláž.
- Anatomie: Nejsou velké pterygotidní chelicery; drobné příústní končetiny se překrývají a nelze všechny spočítat.
- Prostředí: Mělká vodní scéna přijatelná; salinitu ani faunu pozadí nelze spolehlivě určit.
- Formát: WEBP 1152 × 768.
- Podklady: [New York State Museum: Eurypterus remipes state fossil](https://nysm.nysed.gov/exhibitions/windows/eurypterid); [NY State Museum: State Fossils and Eurypterus remipes](https://nysm.nysed.gov/bibcite/reference/37041)

#### Acutiramus bohemicus - Bez problémů

- Vzhled: Celé tělo, klepítka a vesla jsou dobře oddělené.
- Anatomie: Velké chelicery a plovací končetiny odpovídají základním znakům; detaily zubů klepítek nejsou ověřeny.
- Prostředí: Silurské moře vhodné; přesná sestava organismů pozadí je hypotetická.
- Formát: WEBP 1152 × 768.
- Podklady: [Chlupáč (1994): Pterygotid eurypterids of Bohemia](https://www.arachnology.cz/literatura/pterygotid-eurypterids-arthropoda-chelicerata-in-the-silurian-and-devonian-of-bohemia.-2316.html); [Braddy et al. (2008): Giant claw reveals the largest ever arthropod](https://doi.org/10.1098/rsbl.2007.0491)

#### Birkenia elegans - Bez problémů

- Vzhled: Celá úzká silueta, jednotné podvodní světlo.
- Anatomie: Bez zjevné čelisti a párových ploutví; spodní lalok ocasu a šupinový vzor vyžadují opatrné čtení perspektivy.
- Prostředí: Vodní prostředí přijatelné; mořský vzhled kulisy není důkaz konkrétní salinity.
- Formát: WEBP 1152 × 768.
- Podklady: [Scottish Geology Trust: Silurian fossil fishes of Scotland](https://geoguide.scottishgeologytrust.org/p/gcr16/gcr16_chapter2silurianfishscotland); [Blom (2012): Birkeniid anaspids and phylogenetic implications](https://doi.org/10.1111/j.1475-4983.2012.01142.x)

#### Entelognathus primordialis - Bez problémů

- Vzhled: Dobře vykreslený pancíř a souvislé prostředí.
- Anatomie: Pancéřovaná hlava s čelistmi; zadní tělo a některé ploutve jsou hypotetické, nikoli kompletně doložené.
- Prostředí: Silurská vodní scéna přijatelná; konkrétní útes není doložen.
- Formát: WEBP 1152 × 768.
- Podklady: [Zhu et al. (2013): A Silurian placoderm with osteichthyan-like marginal jaw bones](https://doi.org/10.1038/nature12617); [IVPP: Exceptionally preserved Entelognathus](https://english.ivpp.cas.cn/rh/rp/202509/t20250902_1052190.html)

#### Qilinyu rostrata - Anatomická chyba

- Vzhled: Ostrá scéna, ale nápadný mečovitý rypec mění charakter druhu.
- Anatomie: Rypec je extrémně dlouhý a špičatý; studie popisuje mírně protažený delfínovitý profil a ventrální ústa. Zde navíc vystupují velké trojúhelníkové zuby. Silný kandidát opravy.
- Prostředí: Silurské moře přijatelné, přesná fauna pozadí není určena.
- Formát: WEBP 1152 × 768.
- Podklady: [Zhu a kol. 2016: popis lebky](https://www.sciencemagazinedigital.org/sciencemagazine/21_october_2016?pg=98); [Zhu et al. (2016): A Silurian maxillate placoderm illuminates jaw evolution](https://doi.org/10.1126/science.aah3764); [Chinese Academy of Sciences: Qilinyu and jaw evolution](https://www.eurekalert.org/news-releases/659466)

### Devon

#### Dunkleosteus terrelli - Bez problémů

- Vzhled: Ostrá robustní hlava a hluboký trup, bez neutrálního diagramového pozadí.
- Anatomie: Kostní řezné hrany bez běžných oddělených zubů. Zadní proporce a ocas jsou hypotéza, novější odhady nejsou definitivní.
- Prostředí: Mořské prostředí vhodné.
- Formát: WEBP 1152 × 768.
- Podklady: [Engelman 2023: new body length estimates of Dunkleosteus](https://doi.org/10.3390/d15030318); [Engelman 2024: Reconstructing Dunkleosteus terrelli](https://doi.org/10.26879/1343)

#### Tiktaalik roseae - Bez problémů

- Vzhled: Přirozeně mělká voda a široká hlava, celistvé prostředí.
- Anatomie: Silné přední ploutve bez skutečných prstů přijatelné; měkký hřbetní obrys není kompletně fosilně doložen.
- Prostředí: Mělké vodní prostředí vhodné; rostlinné pozadí je obecné.
- Formát: WEBP 1152 × 768.
- Podklady: [Shubin et al. 2006: Tiktaalik forelimb and tetrapod limb origin](https://doi.org/10.1038/nature04637); [NASA Earth Observatory: Fishapod fossil from the Arctic](https://science.nasa.gov/earth/earth-observatory/fishapod-fossil-found-in-the-arctic-6443/)

#### Bothriolepis canadensis - Anatomická chyba

- Vzhled: Dobrá ostrost, ale působí jako moderní obrněná ryba.
- Anatomie: Oči jsou oddělené po stranách hlavy místo sdružené horní orbitální oblasti. Nutná revize lebky podle 3D rekonstrukce Béchard a kol. 2014.
- Prostředí: Vodní dno je vhodné; generický mořský útes nedokládá estuární prostředí Miguashy.
- Formát: WEBP 1152 × 768.
- Podklady: [Béchard a kol. 2014: 3D anatomie](https://palaeo-electronica.org/content/2014/647-3d-bothriolepis); [IUGS: Late Devonian fossil fish of Miguasha](https://iugs-geoheritage.org/geoheritage_sites/the-late-devonian-fossil-fish-lagerstatte-of-miguasha/); [UNESCO: Miguasha National Park World Heritage](https://whc.unesco.org/en/list/686)

#### Eusthenopteron foordi - Bez problémů

- Vzhled: Celé tělo i ploutve čitelné, přirozené podvodní světlo.
- Anatomie: Lobovité párové ploutve a oddělené hřbetní ploutve přítomné; překryv u ocasu může opticky přidávat ploutev, chyba nepotvrzena.
- Prostředí: Vodní prostředí vhodné, konkrétní salinita a rostliny nejisté.
- Formát: WEBP 1152 × 768.
- Podklady: [IUGS: Late Devonian fossil fish of Miguasha](https://iugs-geoheritage.org/geoheritage_sites/the-late-devonian-fossil-fish-lagerstatte-of-miguasha/); [UNESCO: Miguasha National Park World Heritage](https://whc.unesco.org/en/list/686)

#### Ichthyostega stensioei - Anatomická chyba

- Vzhled: Příliš podobná barva, hlava a podvodní scéna Acanthosteze.
- Anatomie: Viditelná zadní noha má podobu pětiprsté končetiny místo doložených sedmi prstů; rozlišení prstů částečně omezuje perspektiva, jistota střední.
- Prostředí: Vodní prostředí možné; obraz nevystihuje odlišnou robustní stavbu a lokomoci tak dobře jako referenční kostra.
- Formát: WEBP 1152 × 768.
- Podklady: [Přehled vývoje počtu prstů 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5182414/); [Pierce et al. 2012: Ichthyostega limb mobility](https://doi.org/10.1038/nature11124); [Coates & Clack 1990: Polydactyly in earliest tetrapod limbs](https://doi.org/10.1038/347066a0)

#### Acanthostega gunnari - Drobná vizuální odchylka

- Vzhled: Dlouhé pavoukovitě roztažené prsty a velmi podobná scéna Ichthyosteze.
- Anatomie: Osm předních prstů není jednoznačně čitelných; některé se mohou překrývat. Kontrola proti osmi prstům nutná před případnou opravou, chyba počtu zatím nepotvrzená.
- Prostředí: Vodní prostředí odpovídá anatomii; přesná vegetace není ověřená.
- Formát: WEBP 1152 × 768.
- Podklady: [J. A. Clack: Acanthostega](https://tolweb.org/Acanthostega/15016); [Clack 2006: Acanthostega gunnari, Tree of Life](https://tolweb.org/Acanthostega/15016); [Coates & Clack 1990: Polydactyly in earliest tetrapod limbs](https://doi.org/10.1038/347066a0)

#### Cladoselache fyleri - Anatomická chyba

- Vzhled: Ostrá plná postava; problém není technická kvalita.
- Anatomie: Na hřbetě jsou tři oddělené ploutvovité výběžky místo dvou; navíc podezřelá samostatná řitní ploutev. Priorita je odstranit anatomicky nepodložené ploutve, nikoli změnit barvu.
- Prostředí: Devonské moře vhodné; přesné útesové společenstvo je ilustrativní.
- Formát: WEBP 1152 × 768.
- Podklady: [Frey a kol. 2023: srovnání kladoselachidů](https://link.springer.com/article/10.1186/s13358-023-00266-6); [University of Michigan: Cladoselache fyleri specimen](https://umorf.ummp.lsa.umich.edu/wp/specimen-data/?Model_ID=1442); [Cleveland Museum: Cladoselache overview](https://artsandculture.google.com/asset/cladoselache/TgEhKPdAa1i13A)

#### Jaekelopterus rhenaniae - Výrazná vizuální odchylka

- Vzhled: Zadní konec těla zasahuje za okraj, úplný telson nelze posoudit.
- Anatomie: Velké chelicery a veslovité končetiny přítomné; velikost celého zvířete je odhad z neúplných nálezů.
- Prostředí: Vodní prostředí přijatelné; nelze potvrdit salinitu ani konkrétní mikrohabitat.
- Formát: WEBP 1152 × 768.
- Podklady: [Braddy et al. 2008: Giant claw Jaekelopterus rhenaniae](https://doi.org/10.1098/rsbl.2007.0491)

### Karbon

#### Arthropleura armata - Výrazná vizuální odchylka

- Vzhled: Malířský styl, měkčí textura a oříznutý konec těla výrazně vybočují; dříve schválené vodorovné roztažení.
- Anatomie: Mnoho článků a noh odpovídá základnímu plánu; druhové detaily hlavy nelze bezpečně ověřit. Schválenou ilustraci zatím zachovat.
- Prostředí: Suchozemský vegetovaný podklad přijatelný; přesná flóra je neurčená.
- Formát: WEBP 1152 × 768.
- Podklady: [Lhéritier et al. 2024: Arthropleura head anatomy](https://pmc.ncbi.nlm.nih.gov/articles/PMC11463278/); [Natural History Museum 2024: Arthropleura new head fossils](https://www.nhm.ac.uk/discover/news/2024/october/largest-ever-millipede-head-revealed.html)

#### Meganeura monyi - Bez problémů

- Vzhled: Čtyři křídla dobře oddělená, ostrý makrozáběr.
- Anatomie: Základní stavba griffinfly odpovídá; žilnatina a velikost bez měřítka nejsou ověřené.
- Prostředí: Vlhký vegetovaný karbon je přijatelný; ne každý karbonský biotop byl prales.
- Formát: WEBP 1152 × 768.
- Podklady: [MNHN Paris: Meganeura monyi fossil wing and 70 cm span](https://www.mnhn.fr/fr/meganeura-monyi-libellule-geante)

#### Pulmonoscorpius kirktonensis - Výrazná vizuální odchylka

- Vzhled: Malířská textura a tmavší světlo výrazně vybočují; dříve schválené mírné vodorovné roztažení.
- Anatomie: Klepeta a článkovaný ocas přítomné, nohy se překrývají. Schválenou ilustraci zatím zachovat.
- Prostředí: Suchozemské prostředí přijatelné; konkrétní světelné podmínky jsou výtvarné.
- Formát: WEBP 1152 × 768.
- Podklady: [National Museums Scotland: Pulmonoscorpius kirktonensis](https://www.nms.ac.uk/collections/search/object?common-name=Scorpion&entry=605091&page=3&view=cards); [JNCC Geological Conservation Review: East Kirkton Carboniferous scorpions](https://data.jncc.gov.uk/data/6b9e4254-1fb9-41ef-acc4-caf6180a731c/gcr-v35-fossil-arthropods-c3.pdf)

#### Hylonomus lyelli - Bez problémů

- Vzhled: Souvislé lesní prostředí, ostrá štíhlá postava.
- Anatomie: Čtyři končetiny a dlouhý ocas; přesné měkké tkáně a barevný vzor jsou rekonstrukce.
- Prostředí: Vegetovaný karbonský podklad přijatelný pro živočicha známého z Joggins.
- Formát: WEBP 1152 × 768.
- Podklady: [Smithsonian NMNH: Hylonomus lyelli specimen](https://www.si.edu/object/hylonomus-lyelli-dawson-1860%3Anmnhpaleobiology_3441092); [Carroll 1966: Joggins fossil Hylonomus actually a reptile](https://doi.org/10.1111/j.1095-8312.1966.tb00952.x)

#### Greererpeton burkemorani - Bez problémů

- Vzhled: Dlouhé tělo a krátké nohy dobře čitelné pod vodou.
- Anatomie: Plochá hlava a protažený trup odpovídají; počet drobných prstů není bezpečně čitelný.
- Prostředí: Vodní prostředí vhodné, mikrohabitat a rostliny obecně rekonstruované.
- Formát: WEBP 1152 × 768.
- Podklady: [Smithsonian NMNH: Greererpeton burkemorani](https://www.si.edu/es/object/nmnhpaleobiology_3441105); [Smithson 1982: Cranial morphology Greererpeton burkemorani](https://doi.org/10.1111/j.1096-3642.1982.tb01955.x)

#### Edestus heinrichi - Anatomická chyba

- Vzhled: Čelní pohled je působivý a uživatelem vybraný; kompozici lze zachovat.
- Anatomie: Dvě středové čepele jsou správně umístěné, ale působí jako hustý zip drobných hrotů. E. heinrichi má velké trojúhelníkové korunky; pravděpodobná odchylka s ohledem na čelní perspektivu.
- Prostředí: Moře až estuárium je vhodné; tělo a rozmístění ploutví jsou zčásti hypotetické.
- Formát: WEBP 1152 × 768.
- Podklady: [Tapanila a Pruitt 2019: korunky a čepele](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0220958); [Tapanila et al. 2020: Saws Scissors and Sharks, Edestus](https://doi.org/10.1002/ar.24046)

#### Petrolacosaurus kansensis - Bez problémů

- Vzhled: Dobře čitelný dlouhý krk a ocas, ostrá scéna.
- Anatomie: Čtyři končetiny přítomné; spánkové otvory nejsou přes měkké tkáně přímo kontrolovatelné.
- Prostředí: Suchozemský karbonský les je přijatelný; konkrétní rostlinná společenstva neurčena.
- Formát: WEBP 1152 × 768.
- Podklady: [Reisz 1977: Petrolacosaurus oldest known diapsid](https://pubmed.ncbi.nlm.nih.gov/17778545/); [Benton 1985: Classification and phylogeny of diapsid reptiles](https://cpb-eu-w2.wpmucdn.com/blogs.bristol.ac.uk/dist/5/537/files/2019/07/1985Classification.pdf)

#### Crassigyrinus scoticus - Bez problémů

- Vzhled: Velká hlava a malé končetiny se dobře odlišují od okolí.
- Anatomie: Vodní robustní tělo a zakrnělé končetiny přijatelné; některé partie jsou doplněné podle rekonstrukce.
- Prostředí: Vodní prostředí vhodné, konkrétní rostliny a průhlednost vody jsou hypotéza.
- Formát: WEBP 1152 × 768.
- Podklady: [Porro et al. 2023: CT reconstructed skull of Crassigyrinus](https://doi.org/10.1080/02724634.2023.2183134); [Natural History Museum 2023: Crassigyrinus skull](https://www.nhm.ac.uk/discover/news/2023/may/crushed-scottish-fossils-reconstructed-reveal-ancient-predators-skull.html)

### Perm

#### Dimetrodon grandis - Drobná vizuální odchylka

- Vzhled: Velmi podobný říční břeh a světlo jako Edaphosaurus; jinak zdařilý obraz.
- Anatomie: Dlouhá hlava, plachta a rozkročené čtyři nohy přítomné; barva plachty a kožní kresba neznámé.
- Prostředí: Permská niva s vhodnou nekvetoucí vegetací obecně přijatelná; přesné rostliny neurčeny.
- Formát: WEBP 1152 × 768.
- Podklady: [Smithsonian NMNH: Dimetrodon grandis fossil](https://www.si.edu/object/nmnhpaleobiology_3451032); [Wikimedia Commons: Dimetrodon grandis reconstruction, DiBgd](https://commons.wikimedia.org/wiki/File:Dimetrodon_grandis.jpg)

#### Edaphosaurus pogonias - Drobná vizuální odchylka

- Vzhled: Velmi podobná kompozice a krajina Dimetrodonovi; celé tělo nyní viditelné.
- Anatomie: Malá hlava, objemný trup a příčné výběžky plachty druh dobře odlišují.
- Prostředí: Permská vegetovaná niva přijatelná; konkrétní ekologie scény je rekonstrukce.
- Formát: WEBP 1152 × 768.
- Podklady: [Scott Hartman: Edaphosaurus pogonias skeletal review](https://www.skeletaldrawing.com/synapsids/edaphosaurus-pogonias/); [Wikimedia Commons: EdaphosaurusDB by Dmitry Bogdanov](https://commons.wikimedia.org/wiki/File:EdaphosaurusDB.jpg)

#### Inostrancevia alexandri - Drobná vizuální odchylka

- Vzhled: Generická říční krajina s jehličnany a skalami, jinak kvalitní scéna.
- Anatomie: Horní špičáky, dlouhá hlava a čtyři nohy přítomné; rozsah holé kůže či ochlupení není prokázaný.
- Prostředí: Kontinentální permské prostředí přijatelné; konkrétní porost a reliéf Ruska nejsou ověřené.
- Formát: WEBP 1152 × 768.
- Podklady: [Kammerer et al. 2018: Russian gorgonopsians and Inostrancevia](https://pmc.ncbi.nlm.nih.gov/articles/PMC5995105/); [Russian Academy of Sciences: Inostrancevia alexandri skeleton](https://www.ras.ru/paleontological_museum/4fb59d87-7326-4117-89ce-b243795231f6.aspx)

#### Scutosaurus karpinskii - Drobná vizuální odchylka

- Vzhled: Dobrá ostrost, opakovaný říční břeh.
- Anatomie: Čtyři nohy a hluboký trup jsou v pořádku. Postoj působí poněkud vzpřímeně; studie podporuje rozkročenější končetiny, perspektiva brání jistému verdiktu.
- Prostředí: Permská niva přijatelná; neinterpretovat přesný les jako doloženou lokalitu.
- Formát: WEBP 1152 × 768.
- Podklady: [Romano et al. 2021: Scutosaurus 3D mass and restoration](https://doi.org/10.3389/fevo.2021.692035); [Russian Academy of Sciences: Scutosaurus karpinskii fossils](https://www.ras.ru/paleontological_museum/c50733f5-ef8b-4314-a8bc-b2c259cf27cb.aspx)

#### Mesosaurus tenuidens - Bez problémů

- Vzhled: Přehledná celá postava a jemné podvodní světlo.
- Anatomie: Dlouhý čenich, čtyři končetiny a dlouhý ocas přítomné; jemné zuby a prsty se částečně překrývají.
- Prostředí: Vodní prostředí vhodné; konkrétní salinita je předmětem rekonstrukce, ne barvy vody.
- Formát: WEBP 1152 × 768.
- Podklady: [Modesto 2006: Cranial skeleton of Mesosaurus tenuidens](https://doi.org/10.1111/j.1096-3642.2006.00205.x); [Wikimedia Commons: Mesosaurus tenuidens illustration](https://commons.wikimedia.org/wiki/File:MESOSAURUS.png)

#### Diplocaulus magnicornis - Bez problémů

- Vzhled: Široká hlava má dost prostoru, celá scéna působí jednotně.
- Anatomie: Bumerangová lebka odpovídá; vzdálená zadní noha je zakrytá, nikoli prokazatelně chybějící.
- Prostředí: Mělká kontinentální voda je přijatelná.
- Formát: WEBP 1152 × 768.
- Podklady: [Smithsonian: Diplocaulus magnicornis specimen](https://collections.si.edu/search/results.htm?fq=geo_age-system%3A%22Permian%22%26q=%22Diplocaulus+magnicornis%22); [Cope 1882 Diplocaulus magnicornis and taxon literature](https://www.mindat.org/taxon-P81712.html)

#### Helicoprion bessonowi - Bez problémů

- Vzhled: Souvislá mořská scéna, bez vnější kruhové pily.
- Anatomie: Spirála je uvnitř dolní čelisti; jednotlivé zuby nejsou všechny vidět. Celková silueta a ploutve jsou hypotetické.
- Prostředí: Mořské prostředí vhodné; přesná fauna dna není určena.
- Formát: WEBP 1152 × 768.
- Podklady: [Tapanila et al. 2013: Jaw CT and tooth whorl](https://doi.org/10.1098/rsbl.2013.0057); [Tapanila et al. 2013: Helicoprion species tooth geometry](https://doi.org/10.1666/12-156)

#### Estemmenosuchus uralensis - Drobná vizuální odchylka

- Vzhled: Kvalitní postava, ale generické říční pozadí opakuje permské i druhohorní scény.
- Anatomie: Jednodušší rohy a robustní lebka jsou přijatelné pro E. uralensis; nezaměňovat automaticky s výrazněji zdobeným E. mirabilis.
- Prostředí: Permská kontinentální niva přijatelná; barva a přesný porost jsou rekonstrukce.
- Formát: WEBP 1152 × 768.
- Podklady: [Paleofile: Estemmenosuchus uralensis taxon holotype](https://www.paleofile.com/Theriodontia/Estemmenosuchus.asp); [Wikimedia Commons: Estemmenosuchus uralensis restoration](https://commons.wikimedia.org/wiki/File:Estemmenosuchus_uralensis.jpg)

### Trias

#### Coelophysis bauri - Výrazná vizuální odchylka

- Vzhled: Plochá béžová skalní stěna místo prostorově bohatší krajiny.
- Anatomie: Štíhlá dvounohá silueta a dlouhý ocas bez zjevné zásadní chyby.
- Prostředí: Sezónní říční krajina Ghost Ranch; zde není konkrétní biotop dobře vyjádřen.
- Formát: WEBP 1536 × 1024.
- Podklady: [American Museum of Natural History: Coelophysis](https://www.amnh.org/explore/ology/ology-cards/263-coelophysis); [Bugos a McDavid: Immature skulls of Coelophysis bauri from Ghost Ranch, New Mexico](https://www.app.pan.pl/archive/published/app69/app010852023.html)

#### Plateosaurus trossingensis - Drobná vizuální odchylka

- Vzhled: Opakovaný říční břeh, přirozené světlo a ostrá silueta.
- Anatomie: Dvounohý postoj, drobná hlava a krátké ruce přijatelné; palec ne všude čitelný.
- Prostředí: Sezónní kontinentální prostředí přijatelné, nikoli důkaz trvale vlhkého biotopu.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Plateosaurus](https://www.nhm.ac.uk/discover/dino-directory/plateosaurus.html); [Staatliches Museum für Naturkunde Stuttgart: Plateosaurus trossingensis and the dino mania in Württemberg](https://www.naturkundemuseum-bw.de/en/research/science-blog/plateosaurus-trossingensis-and-the-dino-mania-in-wuerttemberg)

#### Eoraptor lunensis - Drobná vizuální odchylka

- Vzhled: Stejný vzorec říčního břehu jako u ostatních triasových dinosaurů.
- Anatomie: Lehká dvounohá silueta; tři viditelné prsty samy nevylučují drobné redukované prsty.
- Prostředí: Sezónní niva Ischigualasto přijatelná, hustota zeleně není konkrétně doložená.
- Formát: WEBP 1536 × 1024.
- Podklady: [Sereno a kol.: Osteology of Eoraptor lunensis](https://doi.org/10.1080/02724634.2013.820113); [Bronzati a kol.: Skull remains of Saturnalia tupiniquim and feeding behaviour](https://doi.org/10.1371/journal.pone.0221387)

#### Herrerasaurus ischigualastensis - Drobná vizuální odchylka

- Vzhled: Opakovaná hnědá paleta a říční krajina.
- Anatomie: Silné ruce, dlouhá hlava a dvounohý postoj přijatelné.
- Prostředí: Niva Ischigualasto obecně vhodná; podrobnosti jehličnanů jsou spekulativní.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Herrerasaurus](https://www.nhm.ac.uk/discover/dino-directory/herrerasaurus.html); [Sereno a Novas: The complete skull and skeleton of an early dinosaur](https://pubmed.ncbi.nlm.nih.gov/17789086/)

#### Eodromaeus murphi - Drobná vizuální odchylka

- Vzhled: Říční břeh podobný Eoraptorovi a Herrerasaurovi.
- Anatomie: Štíhlý krk, úzká hlava a dlouhé zadní nohy odpovídají základním proporcím.
- Prostředí: Sezónní říční prostředí Ischigualasto přijatelné.
- Formát: WEBP 1536 × 1024.
- Podklady: [Martínez a kol.: A Basal Dinosaur from the Dawn of the Dinosaur Era in Southwestern Pangaea](https://doi.org/10.1126/science.1198467); [University of Chicago: New predator dawn runner discovered in early dinosaur graveyard](https://news.uchicago.edu/story/new-predator-dawn-runner-discovered-early-dinosaur-graveyard)

#### Saturnalia tupiniquim - Drobná vizuální odchylka

- Vzhled: Generický říční les, barevně téměř shodný s dalšími malými dinosaury.
- Anatomie: Drobná hlava a prodloužený krk přijatelné; úplná podoba rukou není ověřitelná.
- Prostředí: Kontinentální prostředí Brazílie; přesná vegetační skladba zde není doložená.
- Formát: WEBP 1536 × 1024.
- Podklady: [Langer a kol.: A sauropodomorph dinosaur from the Upper Triassic of southern Brazil](https://www.sciencedirect.com/science/article/pii/S1251805000800257); [Bronzati a kol.: Skull remains of Saturnalia tupiniquim and feeding behaviour](https://doi.org/10.1371/journal.pone.0221387)

#### Riojasaurus incertus - Drobná vizuální odchylka

- Vzhled: Generická říční scéna, dobrá ostrost a úplnost hlavní siluety.
- Anatomie: Zobrazený dvounohý postoj vyžaduje opatrnost; bez biomechanického rozboru jej neoznačuji za prokázanou chybu.
- Prostředí: Sezónní kontinentální prostředí Los Colorados obecně přijatelné.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Riojasaurus](https://www.nhm.ac.uk/discover/dino-directory/riojasaurus.html); [Bonaparte a Pumares: Notes on the first skull and jaws of Riojasaurus incertus](https://www.naturalhistory.si.edu/sites/default/files/media/translated_publications/Bonaparte%26amp%3BPumares%25201995.pdf)

#### Eudimorphodon ranzii - Výrazná vizuální odchylka

- Vzhled: Dlouhý ocas je uříznutý pravou hranou obrazu.
- Anatomie: Křídla a zuby přítomné; vícehroté korunky nelze z tohoto měřítka ověřit, konec ocasu je navíc hypotetický.
- Prostředí: Pobřeží a ostrovy jsou přijatelná rekonstrukce triasové oblasti nálezů.
- Formát: WEBP 1536 × 1024.
- Podklady: [Dalla Vecchia: A review of the Triassic pterosaurs diversity](https://dipbsf.uninsubria.it/paleo/dvecchia.htm); [Unwin: Eudimorphodon and the early history of pterosaurs](https://dipbsf.uninsubria.it/paleo/Unwin.htm)

#### Peteinosaurus zambellii - Drobná vizuální odchylka

- Vzhled: Celé křídlo a ocas mají dostatek prostoru, přirozená pobřežní scéna.
- Anatomie: Malá hlava je zčásti rekonstrukce; dlouhý ocas a křídla jsou přijatelné.
- Prostředí: Pobřežní prostředí obecně vhodné; přesné chování neznámé.
- Formát: WEBP 1536 × 1024.
- Podklady: [National Dinosaur Museum: Peteinosaurus, one of the first flyers](https://nationaldinosaurmuseum.com.au/blog/peteinosaurus-one-of-the-first-flyers-of-the-dinosaur-age/); [Dalla Vecchia: A review of the Triassic pterosaurs diversity](https://dipbsf.uninsubria.it/paleo/dvecchia.htm)

#### Nothosaurus mirabilis - Drobná vizuální odchylka

- Vzhled: Přehledná podvodní silueta, dlouhý ocas i krk čitelné.
- Anatomie: Čtyři končetiny s prsty; plovací blány a měkký obrys jsou rekonstrukce.
- Prostředí: Mělké pobřežní moře vhodné; konkrétní rostliny nejsou určeny.
- Formát: WEBP 1536 × 1024.
- Podklady: [Klein, Eggmaier a Hagdorn: The redescription of the holotype of Nothosaurus mirabilis](https://doi.org/10.7717/peerj.13818); [Laboury a kol.: High phenotypic plasticity at the dawn of the eosauropterygian radiation](https://pmc.ncbi.nlm.nih.gov/articles/PMC10476616/)

#### Shonisaurus popularis - Drobná vizuální odchylka

- Vzhled: Celá postava v moři, bez zjevného zdvojení ploutví.
- Anatomie: Dlouhý čenich a čtyři ploutve přijatelné; tvar hřbetu a ocasní blány je nejistý.
- Prostředí: Mořské prostředí vhodné; nelze odvozovat chování z jediné scény.
- Formát: WEBP 1536 × 1024.
- Podklady: [Kelley a kol.: Grouping behavior in a Triassic marine apex predator](https://doi.org/10.1016/j.cub.2022.11.005); [Natural History Museum of Utah: Whale-Sized Marine Reptiles Gathered to Give Birth](https://nhmu.utah.edu/articles/whale-sized-marine-reptiles-gathered-give-birth)

#### Gigatitan vulgaris - Drobná vizuální odchylka

- Vzhled: Makrofotografický dojem, ostrý hmyz, přirozeně rozostřené pozadí.
- Anatomie: Čtyři křídla a uchopovací přední nohy přítomné; přesná žilnatina není ověřena.
- Prostředí: Suchozemská vegetace vhodná; konkrétní rostlinný druh neurčitelný.
- Formát: WEBP 1536 × 1024.
- Podklady: [Sound vs. light: wing-based communication in Carboniferous insects](https://doi.org/10.1038/s42003-021-02281-0); [A new titanopteran Magnatitan jongheoni](https://www.cambridge.org/core/journals/journal-of-paleontology/article/new-titanopteran-magnatitan-jongheoni-n-gen-n-sp-from-southwestern-korean-peninsula/1DCAB5685FAFFED4BD702B3936B0957E)

#### Protobuthus ziliolii - Drobná vizuální odchylka

- Vzhled: Ostré klepeta a článkovaný ocas, bez zjevného umělého rámu.
- Anatomie: Základní štíří plán přijatelný; překryté nohy vyžadují opatrnost při počítání.
- Prostředí: Suchozemské prostředí přijatelné; mikrolokalita není známá.
- Formát: WEBP 1536 × 1024.
- Podklady: [Viaretti et al. 2023: A new Mesozoic scorpion from the Besano Formation](https://doi.org/10.1007/s12542-023-00659-5); [Museo di Storia Naturale Milano: first Italian Triassic scorpion](https://www.comune.milano.it/en/w/museo-di-storia-naturale.-scoperto-da-un-team-di-ricercatori-il-primo-scorpione-triassico-italiano)

#### Austrolimulus fletcheri - Drobná vizuální odchylka

- Vzhled: Čitelný štít i dlouhý telson, celistvá scéna.
- Anatomie: Boční trny a menší zadní štít odpovídají základním znakům; spodní končetiny jsou skryté.
- Prostředí: Pobřežní až kontinentální vodní prostředí nelze určit jen podle barvy vody.
- Formát: WEBP 1536 × 1024.
- Podklady: [Lamsdell 2020: The phylogeny and systematics of Xiphosura](https://pmc.ncbi.nlm.nih.gov/articles/PMC7720731/); [Riek 1968: Re-examination of two arthropod species from the Triassic of Brookvale](https://doi.org/10.3853/j.0067-1975.27.1968.451)

#### Liliensternus liliensterni - Drobná vizuální odchylka

- Vzhled: Opakovaná říční kulisa a hnědý malý teropod.
- Anatomie: Hlava a případné náznaky hřebínku jsou nejisté; neprezentovat je jako diagnostický fosilní znak.
- Prostředí: Kontinentální vegetované prostředí přijatelné; přesná krajina není doložená.
- Formát: WEBP 1536 × 1024.
- Podklady: [NHM: Liliensternus](https://www.nhm.ac.uk/discover/dino-directory/liliensternus.html)

#### Chindesaurus bryansmalli - Drobná vizuální odchylka

- Vzhled: Říční scenérie nerozlišuje druh od podobných triasových zvířat.
- Anatomie: Lebka není známá; konkrétní tvar hlavy je hypotéza, nikoli důvod automaticky jej označit za chybu.
- Prostředí: Sezónní niva jihozápadu Severní Ameriky obecně vhodná.
- Formát: WEBP 1536 × 1024.
- Podklady: [Marsh et al. 2019: Redescription of Chindesaurus bryansmalli](https://doi.org/10.1080/02724634.2019.1645682); [NHM: Chindesaurus; older phylogenetic placement not adopted](https://www.nhm.ac.uk/discover/dino-directory/chindesaurus.html)

#### Preondactylus buffarinii - Drobná vizuální odchylka

- Vzhled: Celá letová silueta a dlouhý ocas, jednotné světlo.
- Anatomie: Konec ocasu a měkká tkáň křídel jsou zčásti doplněné; nelze je vydávat za přesně zachované.
- Prostředí: Pobřežní prostředí triasové oblasti nálezů přijatelné.
- Formát: WEBP 1536 × 1024.
- Podklady: [Dalla Vecchia 2013: Triassic pterosaurs](https://pubs.geoscienceworld.org/gsl/books/edited-volume/1745/chapter/107605296/Triassic-pterosaurs); [Holgado et al. 2015: Reappraisal of purported gastric pellet](https://pmc.ncbi.nlm.nih.gov/articles/PMC4641592/)

### Jura

#### Stegosaurus stenops - Výrazná vizuální odchylka

- Vzhled: Béžové lomové pozadí opakuje starší sérii.
- Anatomie: Pláty a ocasní obrana přítomné; překryv neumožňuje spolehlivě kontrolovat každý trn.
- Prostředí: Morrison: nivy, sezónní řeky a vegetace; skalní kulisa sama lokalitu nedokládá.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Stegosaurus](https://www.nhm.ac.uk/discover/dino-directory/Stegosaurus.html); [Natural History Museum: Weight of the world’s most complete Stegosaurus revealed](https://www.nhm.ac.uk/discover/news/2015/march/weight-of-the-worlds-most-complete-stegosaurus-revealed.html)

#### Diplodocus carnegii - Výrazná vizuální odchylka

- Vzhled: Světlý skalní kaňon a téměř jednobarevná paleta vybočují ze zelenější série.
- Anatomie: Dlouhý krk i bičovitý ocas odpovídají základní stavbě; detaily prstů jsou málo čitelné.
- Prostředí: Morrison; říční vegetace by byla informativnější než dominantní stěna.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Dippy — Diplodocus carnegii](https://www.nhm.ac.uk/discover/dippy.html); [Carnegie Museum of Natural History: 125 years since the discovery of Dippy](https://carnegiemnh.org/press/celebrate-125-years-since-the-discovery-of-dippy-with-carnegie-museum-of-natural-history/)

#### Brachiosaurus altithorax - Výrazná vizuální odchylka

- Vzhled: Dominantní béžové skály a vybledlá paleta vybočují ze zbytku atlasu.
- Anatomie: Vysoká ramena a dlouhé přední nohy jsou přítomné; lebku neposuzovat jako jistou kopii Giraffatitana.
- Prostředí: Morrison; rekonstrukce prostředí nemá vycházet jen z dnešního vzhledu naleziště.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Brachiosaurus](https://www.nhm.ac.uk/discover/dino-directory/brachiosaurus.html); [Taylor: A re-evaluation of Brachiosaurus altithorax Riggs 1903 and its generic separation from Giraffatitan brancai](https://www.miketaylor.org.uk/dino/pubs/taylor2009/Taylor2009-brachiosaurus-and-giraffatitan.pdf)

#### Allosaurus fragilis - Drobná vizuální odchylka

- Vzhled: Řeka, kapradiny a jehličnany opakují základní šablonu; ocas téměř na hraně.
- Anatomie: Nadočnicové výběžky a tříprsté ruce čitelné; neviditelné detaily neposuzovány jako chybějící.
- Prostředí: Vegetovaná niva odpovídá obecnému prostředí Morrisonu; přesný horský horizont je ilustrativní.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum of Utah: Allosaurus fragilis](https://nhmu.utah.edu/allosaurus-fragilis); [Natural History Museum: Allosaurus](https://www.nhm.ac.uk/discover/dino-directory/allosaurus.html)

#### Pterodactylus antiquus - Výrazná vizuální odchylka

- Vzhled: Křídlo končí mimo pravý okraj; chybí bezpečný prostor kolem celé siluety.
- Anatomie: Krátký ocas a nízký hřeben jsou přijatelné; ořez znemožňuje úplnou kontrolu křídla.
- Prostředí: Pobřeží a ostrovy odpovídají obecnému prostředí solnhofenského souostroví.
- Formát: WEBP 1536 × 1024.
- Podklady: [Bennett: New information on body size and cranial display structures of Pterodactylus antiquus, with a revision of the genus](https://doi.org/10.1007/s12542-012-0159-8); [American Museum of Natural History: What Is a Pterosaur?](https://www.amnh.org/explore/news-blogs/what-is-a-pterosaur)

#### Dilophosaurus wetherilli - Drobná vizuální odchylka

- Vzhled: Standardní lesní říční kulisa; dobrá ostrost.
- Anatomie: Dvojice hřebenů bez filmového krčního límce; drobnosti rukou nejsou celé rozlišitelné.
- Prostředí: Říční krajina je přijatelná pro souvrství Kayenta; konkrétní horizont je volná rekonstrukce.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Dilophosaurus](https://www.nhm.ac.uk/discover/dino-directory/dilophosaurus.html); [University of Texas: Famous Jurassic Park Dinosaur is Less Lizard, More Bird](https://news.utexas.edu/2020/07/07/famous-jurassic-park-dinosaur-is-less-lizard-more-bird/)

#### Plesiosaurus dolichodeirus - Drobná vizuální odchylka

- Vzhled: Souvislá podvodní scéna, čtyři ploutve čitelné, bez zjevného ořezu.
- Anatomie: Malá hlava a dlouhý krk přijatelné; extrémní labutí prohnutí není vynucené.
- Prostředí: Mořské prostředí vhodné; detaily bentosu jsou ilustrativní.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: What is a plesiosaur?](https://www.nhm.ac.uk/discover/what-is-a-plesiosaur.html); [Geological Society: Plesiosaurus dolichodeirus and Mary Anning](https://www.geolsoc.org.uk/the-library/online-exhibitions/mary-anning-and-the-geological-society/reconstruction-of-life/plesiosaurus-dolichodeirus/)

#### Ichthyosaurus communis - Drobná vizuální odchylka

- Vzhled: Ostrá celá silueta v jednotném podvodním světle.
- Anatomie: Čtyři pádlovité končetiny, hřbetní a ocasní ploutev přijatelné; konkrétní barva neznámá.
- Prostředí: Mořská scéna vhodná, bez zjevného časového anachronismu.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: What is an ichthyosaur?](https://www.nhm.ac.uk/discover/what-is-an-ichthyosaur.html); [Massare a Lomax: A taxonomic reassessment of Ichthyosaurus communis and I. intermedius](https://doi.org/10.1080/14772019.2017.1291116)

#### Apatosaurus louisae - Drobná vizuální odchylka

- Vzhled: Velmi podobný břeh, postoj a barva jako Brontosaurus; snižuje rozlišitelnost.
- Anatomie: Mohutný krk a dlouhý ocas přijatelné; drobná anatomie chodidel nerozlišitelná.
- Prostředí: Morrison: niva s jehličnany a kapradinami je vhodná, horské pozadí není doložené.
- Formát: WEBP 1536 × 1024.
- Podklady: [NPS: Apatosaurus louisae](https://www.nps.gov/dino/learn/nature/apatosaurus-louisae.htm); [Natural History Museum: Apatosaurus](https://www.nhm.ac.uk/discover/dino-directory/apatosaurus.html)

#### Brontosaurus excelsus - Drobná vizuální odchylka

- Vzhled: Velmi podobná kompozice Apatosaurovi a Camarasaurovi.
- Anatomie: Robustní trup a dlouhý ocas přijatelné; přesné měkké tkáně a barva jsou hypotéza.
- Prostředí: Říční niva přijatelná; nerozlišovat druhy jen jinou barvou stejných kulis.
- Formát: WEBP 1536 × 1024.
- Podklady: [Yale: From fossils to fame — Brontosaurus excelsus](https://your.yale.edu/youryale/2025-02-24-from-fossils-to-fame); [Yale: Strike a pose — dinosaur skeletons get a new look](https://news.yale.edu/2022/11/11/strike-pose-yales-iconic-dinosaur-skeletons-get-new-look)

#### Camarasaurus lentus - Drobná vizuální odchylka

- Vzhled: Opakovaná sauropodní scéna na říčním břehu.
- Anatomie: Kratší vysoká hlava pomáhá odlišení od diplodokidů; detaily prstů nejsou spolehlivě čitelné.
- Prostředí: Vegetovaná niva Morrisonu přijatelná; moderně působící hory nejsou důkazem tehdejšího reliéfu.
- Formát: WEBP 1536 × 1024.
- Podklady: [NPS: Camarasaurus lentus](https://home.nps.gov/dino/learn/nature/camarasaurus-lentus.htm); [Natural History Museum: Camarasaurus](https://www.nhm.ac.uk/discover/dino-directory/camarasaurus.html)

#### Ceratosaurus nasicornis - Výrazná vizuální odchylka

- Vzhled: Ocas zasahuje do pravého okraje a jeho konec není celý vidět.
- Anatomie: Nosní roh a hřbetní osteodermy přítomné; počet prstů kvůli překryvu nehodnotit jako potvrzenou chybu.
- Prostředí: Říční prostředí Morrisonu přijatelné, generické skalní pozadí.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Ceratosaurus](https://www.nhm.ac.uk/discover/dino-directory/ceratosaurus.html); [NPS: Ceratosaurus](https://home.nps.gov/dino/learn/nature/ceratosaurus.htm)

#### Megalosaurus bucklandii - Drobná vizuální odchylka

- Vzhled: Generický břeh s jehličnany, velmi těsný konec ocasu.
- Anatomie: Celá hlava a značná část siluety jsou rekonstrukcí neúplně známého druhu.
- Prostředí: Kontinentální pobřežní krajina obecně možná; konkrétní les a hory nejsou doložené.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Megalosaurus](https://www.nhm.ac.uk/discover/dino-directory/megalosaurus.html); [Oxford University Museum of Natural History: 200 years of Megalosaurus](https://oumnh.web.ox.ac.uk/sitefiles/oumnh-megalosaurus-200-press.pdf)

#### Liopleurodon ferox - Drobná vizuální odchylka

- Vzhled: Dobře oddělená silueta a čitelné čtyři ploutve.
- Anatomie: Velká hlava, krátký krk a mohutný trup přijatelné; bez měřítka nelze ověřit velikost.
- Prostředí: Mořské prostředí odpovídá nálezům; dno je výtvarná rekonstrukce.
- Formát: WEBP 1536 × 1024.
- Podklady: [Bartlett a kol.: Re-evaluating body size in the Middle Jurassic pliosaur Liopleurodon ferox](https://doi.org/10.1080/02724634.2026.2691149); [University of Portsmouth: Jurassic sea monster was smaller than once thought, but no less formidable](https://www.port.ac.uk/news-events-and-blogs/news/jurassic-sea-monster-was-smaller-than-once-thought-but-no-less-formidable)

#### Rhamphorhynchus muensteri - Drobná vizuální odchylka

- Vzhled: Čitelný dlouhý ocas s koncovým listem a celá křídla.
- Anatomie: Zuby, dlouhý ocas a koncová blána odpovídají zachovaným znakům; barva je hypotéza.
- Prostředí: Pobřežní scéna vhodná pro solnhofenskou oblast.
- Formát: WEBP 1536 × 1024.
- Podklady: [Hone a McDavid: A giant specimen of Rhamphorhynchus muensteri](https://doi.org/10.7717/peerj.18587); [Jagielska a kol.: New soft tissue data of pterosaur tail vane](https://elifesciences.org/articles/100673)

#### Cymatophlebia longialata - Drobná vizuální odchylka

- Vzhled: Dobře vyřešené makro, čtyři křídla bez ořezu.
- Anatomie: Velké oči, dlouhý zadeček a křídla čitelné; jemná žilnatina není druhově ověřena.
- Prostředí: Hmyz na vegetaci u vody je možný; nález v mořském sedimentu nedokládá život pod vodou.
- Formát: WEBP 1536 × 1024.
- Podklady: [Field Museum: Cymatophlebia longialata, specimen P2002](https://collections-geology.fieldmuseum.org/catalogue/2277183); [Jurassic-Cretaceous Odonata: type species and stratigraphy](https://pmc.ncbi.nlm.nih.gov/articles/PMC8868627/)

#### Mecochirus longimanatus - Anatomická chyba

- Vzhled: Ostrá a úplná silueta; výtvarně použitelná.
- Anatomie: První pár končetin končí pravými dvouprstými klepety. Mecochiridi mají subchelátní zakončení s jedním zahnutým pohyblivým prstem; silný kandidát opravy.
- Prostředí: Mořské dno vhodné; rostliny a mikrohabitat ilustrativní.
- Formát: WEBP 1536 × 1024.
- Podklady: [Mecochiridi: revize 2025](https://www.cambridge.org/core/journals/journal-of-paleontology/article/resurrection-of-eumorphia-von-meyer-1847-and-some-taxonomical-considerations-of-other-mecochirid-lobsters-crustacea-decapoda-mecochiridae/64789719CCC13A0863CA83DC0C0DC69C); [Smithsonian: Mecochirus longimanatus](https://www.si.edu/object/nmnhpaleobiology_3218448); [Val Sanagra Museum: morphology of Mecochirus; displayed specimen is M. germari](https://valsanagra.it/en/inventory/mecochiro-2/)

#### Pseudopulex jurassicus - Drobná vizuální odchylka

- Vzhled: Čitelný drobný členovec, přirozená hloubka ostrosti.
- Anatomie: Bezkřídlost, šest nohou a dlouhé bodavé ústní ústrojí přijatelné; hostitel ani barva nejsou známy.
- Prostředí: Suchozemský podklad je možný, konkrétní hostitelské prostředí není doložené.
- Formát: WEBP 1536 × 1024.
- Podklady: [Gao et al. 2012: Mid-Mesozoic flea-like ectoparasites](https://doi.org/10.1016/j.cub.2012.03.012); [Poinar 2012: Palaeontology: The 165-Million-Year Itch](https://www.sciencedirect.com/science/article/pii/S0960982212002710)

#### Kentrosaurus aethiopicus - Výrazná vizuální odchylka

- Vzhled: Ocas a část jeho ostnů končí mimo levý okraj.
- Anatomie: Přechod plátů v trny a ramenní trn čitelné; úplnou ocasní výzbroj ořez neumožňuje posoudit.
- Prostředí: Vegetovaná kontinentální krajina přijatelná, přesný říční horský horizont spekulativní.
- Formát: WEBP 1536 × 1024.
- Podklady: [NHM: Kentrosaurus](https://www.nhm.ac.uk/discover/dino-directory/kentrosaurus.html); [Universität Tübingen: Kentrosaurus aethiopicus skeleton](https://www.emuseum.uni-tuebingen.de/objects/38745/kentrosaurus-aethiopicus-reptilia-dinosauria-stegosaurida)

#### Torvosaurus tanneri - Výrazná vizuální odchylka

- Vzhled: Konec ocasu mizí za pravým okrajem; příliš velká postava v rámečku.
- Anatomie: Mohutná hlava a ruce přijatelné; ořez není anatomická chyba, ale kompoziční.
- Prostředí: Morrison: niva přijatelná, opakovaný horský horizont je pouze ilustrativní.
- Formát: WEBP 1536 × 1024.
- Podklady: [NPS: Torvosaurus tanneri](https://www.nps.gov/dino/learn/nature/torvosaurus-tanneri.htm); [Smithsonian: Torvosaurus tanneri](https://www.si.edu/object/torvosaurus-tanneri-galton-jensen-1979%3Anmnhpaleobiology_3451259)

#### Camptosaurus dispar - Drobná vizuální odchylka

- Vzhled: Generický lesní břeh; podobná perspektiva dalším býložravcům.
- Anatomie: Zobák, delší zadní končetiny a nižší předek přijatelné; ruce jsou drobné a překryté.
- Prostředí: Vegetovaná niva Morrisonu vhodná.
- Formát: WEBP 1536 × 1024.
- Podklady: [Smithsonian: Camptosaurus dispar](https://www.si.edu/object/nmnhpaleobiology_3440955); [NHM: Camptosaurus](https://www.nhm.ac.uk/discover/dino-directory/camptosaurus.html)

#### Mamenchisaurus hochuanensis - Výrazná vizuální odchylka

- Vzhled: Ocas vychází z levého okraje, nelze vidět celou siluetu.
- Anatomie: Mimořádně dlouhý krk je správný základní znak; úplnou délku ocasu obraz neukazuje.
- Prostředí: Říční krajina přijatelná, vzdálené hory a přesné druhy stromů spekulativní.
- Formát: WEBP 1536 × 1024.
- Podklady: [AMNH: Mamenchisaurus hochuanensis](https://www.amnh.org/explore/ology/ology-cards/340-mamenchisaurus-hochuanensis); [Cervical vertebrae of Xinjiangtitan; comparison with M. hochuanensis](https://ivpp.cas.cn/sourcedb/zw/klt/kycg/gswxyj/202312/P020231012348195021163.pdf)

#### Archaeopteryx lithographica - Drobná vizuální odchylka

- Vzhled: Ocas má velmi malou rezervu u pravého okraje, prostředí opakuje pterosaury.
- Anatomie: Opeřená křídla, zuby a dlouhý opeřený ocas přítomné; barva celé postavy není známá.
- Prostředí: Ostrovní vegetace u laguny je přijatelná.
- Formát: WEBP 1536 × 1024.
- Podklady: [NHM: London specimen Archaeopteryx lithographica](https://data.nhm.ac.uk/dataset/collection-specimens/resource/05ff2255-c38a-40c9-b657-4ccb55ab2feb/record/734808/1791363741884); [Smithsonian: Archaeopteryx lithographica](https://www.si.edu/object/archaeopteryx-lithographica-meyer%3Anmnhpaleobiology_3370799)

#### Dimorphodon macronyx - Výrazná vizuální odchylka

- Vzhled: Dlouhý ocas je uříznutý pravou hranou.
- Anatomie: Velká vysoká hlava a rozdílně velké zuby odpovídají základnímu plánu; měkký pokryv rekonstruován.
- Prostředí: Pobřežní skalisko je možné, nikoli jediný doložený způsob života.
- Formát: WEBP 1536 × 1024.
- Podklady: [AMNH: Dimorphodon macronyx](https://www.amnh.org/explore/ology/ology-cards/356-dimorphodon-macronyx); [NHM: Mary Anning fossil discoveries](https://www.nhm.ac.uk/discover/mary-anning-fossils.html)

#### Anurognathus ammoni - Drobná vizuální odchylka

- Vzhled: Teplé večerní světlo a velmi těsné konce křídel proti převážně denní sérii.
- Anatomie: Krátká široká hlava a krátký ocas odpovídají; rozsah chlupovitého pokryvu je rekonstruovaný.
- Prostředí: Vegetované okolí lagun je možné, přesný lesní vzhled není doložený.
- Formát: WEBP 1536 × 1024.
- Podklady: [Bennett 2007: A second specimen of Anurognathus ammoni](https://doi.org/10.1007/BF02990250)

#### Ophthalmosaurus icenicus - Drobná vizuální odchylka

- Vzhled: Ostré oko a čtyři ploutve; souvislá mořská scéna.
- Anatomie: Velké oči a úzký čenich jsou vhodné; měkké ploutve a barva rekonstruovány.
- Prostředí: Mořské prostředí vhodné; bentos není taxonomicky ověřený.
- Formát: WEBP 1536 × 1024.
- Podklady: [Smithsonian: Ophthalmosaurus icenicus](https://www.si.edu/object/nmnhpaleobiology_3426628)

### Křída

#### Triceratops horridus - Výrazná vizuální odchylka

- Vzhled: Světlá lomová stěna, ploché béžové světlo; výrazně odlišná starší série.
- Anatomie: Tři rohy, límec i čtyři nohy jsou čitelné; délka rohů závisí na věku.
- Prostředí: Suchý lom nevystihuje typickou vegetovanou nivu Hell Creek; samotná skála není důkaz chyby.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Triceratops](https://www.nhm.ac.uk/discover/dino-directory/triceratops.html); [Scannella a kol.: Evolutionary trends in Triceratops from the Hell Creek Formation, Montana](https://doi.org/10.1073/pnas.1313334111)

#### Tyrannosaurus rex - Výrazná vizuální odchylka

- Vzhled: Stejný typ světlé skalní stěny jako Triceratops; málo hloubky prostředí.
- Anatomie: Hluboká hlava, krátké dvouprsté ruce a vyvažující ocas; barva a rozsah šupin nejsou kompletně doloženy.
- Prostředí: Pro Hell Creek vhodnější pestřejší niva; současná scéna je příliš obecná.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Tyrannosaurus](https://www.nhm.ac.uk/discover/dino-directory/tyrannosaurus.html)

#### Ankylosaurus magniventris - Výrazná vizuální odchylka

- Vzhled: Opakovaná světlá lomová stěna; zvíře ostré, ale scéna působí jako výstavní model.
- Anatomie: Kyj, široký trup a pancíř přítomné; přesné rozložení osteodermů je zčásti rekonstrukce.
- Prostředí: Hell Creek; suché skalní pozadí není reprezentativní ukázka celé ekologie.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Ankylosaurus](https://www.nhm.ac.uk/discover/dino-directory/ankylosaurus.html); [Arbour a Mallon: Unusual cranial and postcranial anatomy in Ankylosaurus magniventris](https://doi.org/10.1139/facets-2017-0063)

#### Velociraptor mongoliensis - Drobná vizuální odchylka

- Vzhled: Skalní kulisa opakuje starší sérii, ocas je těsně u levého okraje.
- Anatomie: Opeření a zdvižené srpovité drápy jsou vhodné; konkrétní barevný vzor je hypotetický.
- Prostředí: Suché prostředí Djadokhta je přijatelné; kaňon a jednotlivé rostliny nejsou lokalitně doložené.
- Formát: WEBP 1536 × 1024.
- Podklady: [American Museum of Natural History: Velociraptor mongoliensis — OLogy card](https://www.amnh.org/explore/ology/ology-cards/018-velociraptor-mongoliensis); [Dashzeveg a kol.: New Stratigraphic Subdivision, Depositional Environment, and Age Estimate for the Upper Cretaceous Djadokhta Formation, Southern Ulan Nur Basin, Mongolia](https://digitalcommons.unl.edu/geosciencefacpub/209/)

#### Parasaurolophus walkeri - Výrazná vizuální odchylka

- Vzhled: Výrazně světlá, generická skalní stěna a málo vegetace.
- Anatomie: Dlouhý dozadu směřující hřeben a čtyřnohý postoj jsou přijatelné.
- Prostředí: Dinosaur Park: vhodnější vegetovaná záplavová krajina; tento skalní portrét je málo specifický.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Parasaurolophus](https://www.nhm.ac.uk/discover/dino-directory/parasaurolophus.html); [Gates, Evans a Sertich: Description and rediagnosis of the crested hadrosaurid (Ornithopoda) dinosaur Parasaurolophus cyrtocristatus on the basis of new cranial remains](https://pmc.ncbi.nlm.nih.gov/articles/PMC7842145/)

#### Spinosaurus aegyptiacus - Drobná vizuální odchylka

- Vzhled: Béžové skály a velmi těsné levé zakončení ocasu; kompozice působí stísněně.
- Anatomie: Vysoký ocas, plachta a protáhlé čelisti jsou přítomné. Způsob plavání zůstává diskutovaný.
- Prostředí: Voda u břehu je vhodná; dominantní suchý kaňon opakuje jiné scény.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Spinosaurus](https://www.nhm.ac.uk/discover/dino-directory/spinosaurus.html); [Ibrahim a kol.: Semiaquatic adaptations in a giant predatory dinosaur](https://doi.org/10.1126/science.1258750)

#### Iguanodon bernissartensis - Drobná vizuální odchylka

- Vzhled: Velmi podobné říční pozadí jako další býložravci.
- Anatomie: Palcový bodec je vidět; ruka působí volně rozevřená, přesné postavení prstů zaslouží detailní kontrolu.
- Prostředí: Nízká vegetovaná mokřadní krajina je přijatelná, konkrétní vegetace neurčená.
- Formát: WEBP 1536 × 1024.
- Podklady: [Institute of Natural Sciences: Iguanodon bernissartensis](https://collections.naturalsciences.be/ssh-paleontology/masterpieces/bernissart); [Natural History Museum: The discovery of Iguanodon](https://www.nhm.ac.uk/discover/the-discovery-of-iguanodon.html)

#### Carnotaurus sastrei - Drobná vizuální odchylka

- Vzhled: Opakovaná říční scenérie a hnědě skvrnitá paleta.
- Anatomie: Rohy a velmi malé ruce přítomné; přesnou orientaci redukovaných prstů nelze z obrazu ověřit.
- Prostředí: Suchozemské prostředí je obecně možné; nejde o doloženou fotografickou podobu La Colonia.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Carnotaurus](https://www.nhm.ac.uk/discover/dino-directory/carnotaurus.html); [Hendrickx a Bell: The scaly skin of Carnotaurus sastrei](https://doi.org/10.1016/j.cretres.2021.104994)

#### Pachycephalosaurus wyomingensis - Drobná vizuální odchylka

- Vzhled: Říční břeh, jehličnany a kapradiny jsou generické.
- Anatomie: Kopule a uzly přítomné; postkraniální silueta je zčásti srovnávací rekonstrukce.
- Prostředí: Vegetovaná niva je obecně vhodná pro pozdně křídovou Severní Ameriku.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Pachycephalosaurus](https://www.nhm.ac.uk/discover/dino-directory/pachycephalosaurus.html); [North Dakota Geological Survey: Dinosaurs, Sharks, and Woolly Mammoths](https://www.dmr.nd.gov/dmr/sites/www/files/documents/paleontology/pdfs/articles-and-publications/Hoganson_Dino_Shark_Woolly_sm.pdf)

#### Therizinosaurus cheloniformis - Drobná vizuální odchylka

- Vzhled: Teplé večerní světlo se odlišuje od převážně polední série, ale není závadou samo o sobě.
- Anatomie: Tři velké drápy na ruce čitelné; hlava, trup i opeření jsou zčásti odvozené z příbuzných.
- Prostředí: Říční vegetace je přijatelná; přesné rostlinné druhy nejsou ověřitelné.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Therizinosaurus](https://www.nhm.ac.uk/discover/dino-directory/therizinosaurus.html)

#### Pteranodon longiceps - Drobná vizuální odchylka

- Vzhled: Dobře čitelná letová silueta, celé rozpětí, čisté souvislé pozadí.
- Anatomie: Bezzubý zobák a zadní hřeben odpovídají rodu; velikost hřebene závisí na jedinci.
- Prostředí: Otevřené moře je vhodné; konkrétní pobřeží je ilustrativní.
- Formát: WEBP 1536 × 1024.
- Podklady: [American Museum of Natural History: Pteranodon longiceps](https://www.amnh.org/explore/news-blogs/pteranodon-longiceps); [American Museum of Natural History: Pteranodon longiceps — OLogy](https://www.amnh.org/explore/ology/ology-cards/358-pteranodon-longiceps?view=modal)

#### Quetzalcoatlus northropi - Drobná vizuální odchylka

- Vzhled: Říční kulisa podobná velkým dinosaurům.
- Anatomie: Čtyřnohý postoj odpovídá rekonstrukci; hlava a krk Q. northropi se doplňují z příbuzných, nejsou kompletně známé.
- Prostředí: Vnitrozemská říční krajina je přijatelná, nikoli nutně mořské pobřeží.
- Formát: WEBP 1536 × 1024.
- Podklady: [University of Texas at Austin: World’s Largest Pterosaur Leaped Aloft to Fly](https://news.utexas.edu/2021/12/08/worlds-largest-pterosaur-leaped-aloft-to-fly/); [Padian a kol.: Functional morphology of Quetzalcoatlus](https://doi.org/10.1080/02724634.2020.1780247)

#### Deinonychus antirrhopus - Drobná vizuální odchylka

- Vzhled: Opakovaný břeh s kapradinami, jehličnany a kmeny.
- Anatomie: Opeření je fylogenetický odhad; velký dráp a zpevněný ocas jsou rozpoznatelné.
- Prostředí: Vegetované suchozemské prostředí přijatelné; přesné rostliny nejsou určitelné.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: Deinonychus](https://www.nhm.ac.uk/discover/dino-directory/deinonychus.html); [Ostrom: Osteology of Deinonychus antirrhopus](https://elischolar.library.yale.edu/peabody_museum_natural_history_bulletin/30/)

#### Edmontosaurus annectens - Drobná vizuální odchylka

- Vzhled: Velmi podobné pozadí i barva těla jako u dalších býložravců.
- Anatomie: Zobák, čtyři končetiny a měkký hřbetní lem přítomné; prsty částečně splývají.
- Prostředí: Niva s vodou je vhodná; horský horizont je pouze výtvarná kulisa.
- Formát: WEBP 1536 × 1024.
- Podklady: [Campione a Evans: Cranial Growth and Variation in Edmontosaurs](https://doi.org/10.1371/journal.pone.0025186); [University of Chicago: Paleontologists unveil duck-billed dinosaur mummies](https://news.uchicago.edu/story/uchicago-paleontologists-unveil-duck-billed-dinosaur-mummies)

#### Protoceratops andrewsi - Drobná vizuální odchylka

- Vzhled: Suchá červenohnědá krajina příjemně odlišuje druh, tělo není uříznuté.
- Anatomie: Límec, zobák a absence velkých nadočnicových rohů odpovídají základním znakům.
- Prostředí: Suchá krajina Djadokhta je vhodná; terén není konkrétní doložená lokalita.
- Formát: WEBP 1536 × 1024.
- Podklady: [Maiorino a kol.: Males Resemble Females — Re-Evaluating Sexual Dimorphism in Protoceratops andrewsi](https://doi.org/10.1371/journal.pone.0126464)

#### Mosasaurus hoffmanni - Drobná vizuální odchylka

- Vzhled: Podobné modré moře a světelné paprsky jako Tylosaurus.
- Anatomie: Čtyři ploutve a robustní hlava; ocasní laloky jsou odvozené i z příbuzných, nikoli úplně zachované u tohoto druhu.
- Prostředí: Mořská scéna vhodná; přesné složení útesu není ověřené.
- Formát: WEBP 1536 × 1024.
- Podklady: [Natural History Museum: What is a mosasaur?](https://www.nhm.ac.uk/discover/what-is-a-mosasaur.html); [Muséum national d’Histoire naturelle: Mosasaurus hoffmanni, holotype MNHN.F.CTE222](https://science.mnhn.fr/institution/mnhn/collection/f/item/cte222)

#### Santanmantis axelrodi - Drobná vizuální odchylka

- Vzhled: Přesvědčivá makrofotografie, souvislé pozadí.
- Anatomie: Krátká předohruď a lapací nohy přítomné; přesné ostny na středních nohách nelze potvrdit.
- Prostředí: Suchozemská vegetace oblasti Crato je přijatelná; pozadí není lokalitní rekonstrukce.
- Formát: WEBP 1536 × 1024.
- Podklady: [Hörnig et al. 2017: Early mantodean predatory behaviour](https://doi.org/10.7717/peerj.3605); [Brannoch and Svenson 2017: Response; disputed middle-leg hunting interpretation](https://doi.org/10.7717/peerj.4046)

#### Chimerarachne yingi - Drobná vizuální odchylka

- Vzhled: Dlouhý bičovitý ocásek celý, dobré oddělení od kmene.
- Anatomie: Pavoukovité tělo a ocásek bez bodce odpovídají; snovací orgány nejsou v tomto pohledu vidět.
- Prostředí: Kmen v lesním prostředí je přijatelný pro jantarovou faunu; přesný strom neznámý.
- Formát: WEBP 1536 × 1024.
- Podklady: [Wang et al. 2018: Cretaceous arachnid Chimerarachne yingi illuminates spider origins](https://pubmed.ncbi.nlm.nih.gov/29403075/); [Huang et al. 2018: Origin of spiders and their spinning organs](https://pubmed.ncbi.nlm.nih.gov/29403076/)

#### Vulcanidris cratensis - Drobná vizuální odchylka

- Vzhled: Opakovaná říční kulisa i u makra; kusadla jsou názorná, ale sporně čitelná.
- Anatomie: Ověřit svislou artikulaci kusadel a čelní výběžek. Z bočního pohledu nelze jejich mechaniku spolehlivě rozhodnout; zatím nejde o potvrzenou chybu.
- Prostředí: Suchozemské Crato přijatelné; hustá jehličnatá kulisa není konkrétně doložená.
- Formát: WEBP 1536 × 1024.
- Podklady: [Lepeco et al. 2025: Vulcanidris cratensis original description](https://doi.org/10.1016/j.cub.2025.03.023); [California Academy of Sciences AntWeb: Vulcanidris cratensis](https://www.antweb.org/description.do?genus=vulcanidris&rank=species&species=cratensis&subfamily=haidomyrmecinae&subregionName=South+America)

#### Styracosaurus albertensis - Drobná vizuální odchylka

- Vzhled: Generický říční břeh a téměř shodná hnědá paleta ceratopsidů.
- Anatomie: Nosní roh a dlouhé límcové ostny přítomné; přesná variabilita límce závisí na jedinci.
- Prostředí: Vegetovaná niva Dinosaur Park obecně vhodná.
- Formát: WEBP 1536 × 1024.
- Podklady: [NHM: Styracosaurus](https://www.nhm.ac.uk/discover/dino-directory/styracosaurus.html)

#### Pyroraptor olympius - Drobná vizuální odchylka

- Vzhled: Les je odlišnější a zdařilý, ale ocas končí velmi těsně na pravé hraně.
- Anatomie: Opeření a většina tělesné siluety jsou doplněné podle příbuzných; srpovitý dráp je viditelný.
- Prostředí: Evropská ostrovní krajina s vegetací je možná; lesní mikrohabitat neznámý.
- Formát: WEBP 1536 × 1024.
- Podklady: [NHM: Pyroraptor; fragmentary material and uncertain reconstruction](https://www.nhm.ac.uk/discover/dino-directory/pyroraptor.html)

#### Deinocheirus mirificus - Drobná vizuální odchylka

- Vzhled: Říční krajina s trávovitým porostem opakuje další zvířata; vegetaci nelze určit na rod.
- Anatomie: Široký zobák, vysoký hřbet a velké ruce přítomné; konkrétní opeření je srovnávací rekonstrukce.
- Prostředí: Mokrá niva Nemegtu je přijatelná; porost nemá být označen za konkrétní moderní trávník.
- Formát: WEBP 1536 × 1024.
- Podklady: [Lee et al. 2014: Resolving the enigmas of Deinocheirus mirificus](https://doi.org/10.1038/nature13874); [NHM: Deinocheirus](https://www.nhm.ac.uk/discover/dino-directory/Deinocheirus.html)

#### Microraptor gui - Drobná vizuální odchylka

- Vzhled: Dobře odlišené čtyři opeřené končetiny a lesklá tmavá barva.
- Anatomie: Iridescence má fosilní oporu, přesný modrý odstín a celé rozmístění barev nikoli.
- Prostředí: Lesní vegetace je vhodná; konkrétní jehličnan a poloha větve jsou ilustrativní.
- Formát: WEBP 1536 × 1024.
- Podklady: [Li et al. 2012: Reconstruction of Microraptor and iridescent plumage](https://doi.org/10.1126/science.1213780); [University of Texas: Microraptor reconstruction study](https://www.jsg.utexas.edu/news/2012/03/dinosaur-feathers-evolved-to-attract-mates/)

#### Oviraptor philoceratops - Drobná vizuální odchylka

- Vzhled: Suchá krajina odlišuje druh, čitelná hlava i ruce.
- Anatomie: Krátký zobák a opeření přijatelné; přesný hlavový hřeben Oviraptora je nejistý.
- Prostředí: Suché kontinentální prostředí Djadokhta přijatelné.
- Formát: WEBP 1536 × 1024.
- Podklady: [NHM: Oviraptor](https://www.nhm.ac.uk/discover/dino-directory/oviraptor.html); [AMNH: Oviraptor philoceratops](https://www.amnh.org/explore/ology/ology-cards/019-oviraptor-philoceratops)

#### Pachyrhinosaurus canadensis - Drobná vizuální odchylka

- Vzhled: Podobná hnědá silueta a říční les jako Styracosaurus.
- Anatomie: Nosní hrbol a límec jsou dobře rozpoznatelné; keratinový povrch a zbarvení jsou hypotetické.
- Prostředí: Vegetovaná niva přijatelné pozdně křídové prostředí.
- Formát: WEBP 1536 × 1024.
- Podklady: [NHM: Pachyrhinosaurus; genus overview](https://www.nhm.ac.uk/discover/dino-directory/pachyrhinosaurus.html)

#### Argentinosaurus huinculensis - Drobná vizuální odchylka

- Vzhled: Generický říční břeh a šedohnědá sauropodní šablona.
- Anatomie: Hlava, krk a velká část proporcí jsou odvozené z příbuzných; chybějící fosilie nelze nahrazovat tvrzením o přesnosti.
- Prostředí: Kontinentální niva vhodná; přesný les a terén Huinculu nejsou ověřené.
- Formát: WEBP 1536 × 1024.
- Podklady: [NHM: Argentinosaurus; older stratigraphic summary](https://www.nhm.ac.uk/discover/dino-directory/argentinosaurus.html); [Maniel et al. 2026: Albian zircon U-Pb ages in Candeleros and Huincul formations](https://doi.org/10.1016/j.gr.2026.06.020)

#### Psittacosaurus mongoliensis - Drobná vizuální odchylka

- Vzhled: Říční břeh podobný dalším dinosaurům; kresba ostrá.
- Anatomie: Zobák a krátké ruce přijatelné. Absence ocasních štětin není sama prokázaná chyba P. mongoliensis.
- Prostředí: Kontinentální vegetovaná krajina je možná; konkrétní mikrohabitat nejistý.
- Formát: WEBP 1536 × 1024.
- Podklady: [AMNH: Psittacosaurus mongoliensis](https://www.amnh.org/explore/ology/ology-cards/032-psittacosaurus-mongoliensis?view=modal); [NHM: Psittacosaurus](https://www.nhm.ac.uk/discover/dino-directory/psittacosaurus.html)

#### Tapejara wellnhoferi - Drobná vizuální odchylka

- Vzhled: Celé zvíře se složenými křídly, přirozené světlo.
- Anatomie: Krátký dolů zahnutý zobák a přední hřeben vhodné; úplný měkký obrys hřebene je odhad.
- Prostředí: Pobřežní až lagunové prostředí oblasti Romualdo přijatelné.
- Formát: WEBP 1536 × 1024.
- Podklady: [Eck et al. 2011: Osteology of Tapejara wellnhoferi](https://doi.org/10.1007/s13358-011-0024-5)

#### Tylosaurus proriger - Anatomická chyba

- Vzhled: Výborná čitelnost celé postavy; mořská kulisa téměř stejná jako Mosasaurus.
- Anatomie: Zuby sahají téměř ke špičce čenichu; chybí dostatečně výrazný bezzubý přední výběžek. Pravděpodobná anatomická odchylka, jistota střední kvůli perspektivě.
- Prostředí: Mořské prostředí vhodné; tato scéna sama nedokládá život těsně nad útesem.
- Formát: WEBP 1536 × 1024.
- Podklady: [Zietlow 2020: ontogeneze Tylosaura](https://pmc.ncbi.nlm.nih.gov/articles/PMC7583613/); [Zietlow et al. 2026: A gigantic new species of Tylosaurus; revision of T. proriger material](https://doi.org/10.1206/0003-0090.482.1.1)

