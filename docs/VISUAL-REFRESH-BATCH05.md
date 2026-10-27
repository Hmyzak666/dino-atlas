# Vizuální dávka 05 — Karbon, kandidát 1.0.0 / 1000005

26. října 2026. Pouze `feature/paleozoic-1.0.0`, základ `49a40d71af29934e6610213b41e0e01c6105235c`. Uživatel vizuálně schválil předchozí ordovickou dávku a požádal o pokračování. Samostatné potvrzení instalace 1000004 není zaznamenané. Neslučovat do main.

## Přijato pět, Edestus odmítnut

| Druh | Kontrola a opravy |
| --- | --- |
| Meganeura monyi | Čtyři oddělená žilkovaná křídla, štíhlý článkovaný zadeček a velké oči; karbonský les. Nohy částečně překryté, nelze je všechny nezávisle spočítat. Jemné žilkování není přesnou reprodukcí fosilního otisku. |
| Hylonomus lyelli | Malé ještěrkovité tělo, krátký krk, čtyři končetiny, dlouhý ocas. Odstraněn vymyšlený vnější ušní otvor moderní ještěrky. |
| Greererpeton burkemorani | Dlouhý nízký trup, plochá hlava, krátké končetiny a plovací ocas. Původní zadání čtyř předních prstů bylo po dohledání literatury opravené: finální čitelná přední i zadní noha má pět prstů. Vzdálené končetiny částečně překryté. |
| Petrolacosaurus kansensis | Štíhlé končetiny, malá hlava, krk delší než u Hylonoma. Přehnaný krk zkrácen, ocas prodloužen, vnější ušní otvor odstraněn samostatnou korekcí. |
| Crassigyrinus scoticus | Široká nízká hlava podle CT reinterpretace 2023, mohutný vodní trup a velmi malé končetiny. Zadní noha upravena na pět prstů; přední počet není fosilně stanovený. Vzdálené končetiny zakryté trupem. |

Všechny přijaté obrázky byly jednotlivě prohlédnuté. WebP 1152 × 768, původní fotorealistické scény bez textu, ateliérového pozadí, koláží či doplněných rozmazaných pruhů. Zbarvení, detaily kůže a nedochované měkké tkáně jsou ilustrativní, nikoli přímý fosilní důkaz. Dávka čeká na uživatelské hodnocení.

**Edestus heinrichi NENÍ dokončený ani nahrazený.** Čtyři návrhy postupně trpěly běžným žraločím chrupem, zdvojenými bočními horními řadami nebo nepřesvědčivou horní čepelí. Poslední odmítnutý pokus je pouze v `staging/visual-refresh-05/edestus-rejected.webp`, mimo instalační obrázky. Původní aktivní Edestus zůstal beze změny včetně licence. Příště použít jinou kompozici pro čitelné dvě středové čepele podle Tapanila et al.; nepoužívat obří vysunuté nůžky ani spirálu Helicopriona.

## Zdroje a původ

Vestavěný Imagegen bez nahrání nebo napodobování cizí ilustrace. [Prompty a korekce](image-prompts/visual-refresh-05.md). Podklady pro slovní anatomické zadání:

- MNHN, Meganeura: https://www.mnhn.fr/fr/meganeura-monyi-libellule-geante; žilkování a jeho omezení: https://pmc.ncbi.nlm.nih.gov/articles/PMC10548097/.
- Hylonomus: Carroll 1966, https://doi.org/10.1111/j.1095-8312.1966.tb00952.x; prostředí Joggins: https://jogginsfossilcliffs.net/cliffs/.
- Greererpeton: Smithson 1982, https://doi.org/10.1111/j.1096-3642.1982.tb01955.x; postkraniální anatomie Godfrey 1989, Philosophical Transactions B 323:75–133, dostupná kopie https://electronicsandbooks.com/edt/manual/Magazine/P/Philosophical%20Transactions%20of%20the%20Royal%20Society%20B%20UK/1989%20Volume%20323/i1213_75-133.pdf; pentadaktylie potvrzená odborným přehledem https://knowledge.uchicago.edu/record/5706/files/Otoo_uchicago_0330D_16717.pdf.
- Petrolacosaurus: Reisz 1977, https://pubmed.ncbi.nlm.nih.gov/17778545/; proporce Benton 1985, https://bpb-eu-w2.wpmucdn.com/blogs.bristol.ac.uk/dist/5/537/files/2019/07/1985Classification.pdf.
- Crassigyrinus: Porro et al. 2023, https://doi.org/10.1080/02724634.2023.2183134; autorský výklad https://www.ucl.ac.uk/life-sciences/news/2023/may/digital-reconstruction-skull-early-tetrapod-crassigyrinus; počty prstů a nejistoty také přehled Otoo výše.
- Edestus: Tapanila et al. 2020, https://doi.org/10.1002/ar.24046 — čepele ve střední linii se zakřivením dovnitř, ne výrazně vyčnívající nůžky. Tělo a ploutve zůstávají nedoloženou rekonstrukcí.

## Zálohy, licence, testy

Před změnami zálohováno všech šest plánovaných originálů v `backups/visual-refresh-05/images/`. Manifest obsahuje jejich původní kredity/licence a obrazová metadata, také SHA-256 všech 112 aktivních obrázků před dávkou. Pět nových obrazů má vlastní manifest `visual-refresh-05.json`.

Původní licenční záznamy zůstávají v databázovém slovníku zdrojů a záložních metadatech. Pouze u pěti nezávisle vytvořených náhrad se odstranilo přiřazení cizích obrazových autorů a nahradila obrazová poznámka. Neobrazové texty, vědecké zdroje a všech 112 druhů se nemění. Licenční test stále vyžaduje původní kredity u tří nezměněných karbonských obrázků; u pěti nových ověřuje označení původní AI rekonstrukce. Regresní testy chrání 107 nezměněných obrazů, šest záloh a předchozí dávky.

Lokální `npm test` po finální výměně prošel. Testy rozhraní prošly na 320/360/412/900 px ve světlém i tmavém vzhledu; skutečný hlas telefonu nebyl poslouchán. Podepsané APK 1000005 zatím není potvrzené.

## Předání

Nezačínat znovu. Nejprve ověřit testy a dokončit podepsané APK 1000005. Celkem vloženo **22 z 30** plánovaných náhrad. Zbývá **8**: Edestus z karbonu a sedm z permu (Dimetrodon, Inostrancevia, Scutosaurus, Mesosaurus, Diplocaulus, Helicoprion, Estemmenosuchus). Pokračovat po nejvýše 5–6 živočiších, například Edestus + čtyři permští, potom poslední tři. Neoznačovat odmítnutého Edesta za hotového. Neslučovat do main.
