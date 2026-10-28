# Dávka 10 — poslední permská trojice, kandidát 1000010

Pracovní větev `feature/paleozoic-1.0.0`, základ `34c52c20d74ce8352dfe436e5077850f74462fa1`. Uživatel schválil pětici v APK 1000009 a výslovně doplnil kompletní náhradu Edaphosaura. Tato dávka proto obsahuje Helicopriona, Estemmenosucha a Edaphosaura. Do main nic neslučovat.

## Zálohy a rozsah

Všechny tři původní WebP a jejich úplné obrazové metadata včetně autorů, licencí a odkazů jsou zálohované v `backups/visual-refresh-10/`. Manifest obsahuje SHA-256 databáze, všech 112 obrazů a kanonický otisk obsahu bez tří měněných obrazových metadat. Původní zdrojové záznamy zůstávají v databázi. Nové ilustrace vznikly nezávisle, bez použití původních licencovaných děl jako vstupu.

Všech 112 druhů, ID, texty, české předčítání, kvíz, oblíbené i aplikační kód zachované. Dalších 109 obrázků a jejich metadata se nemění. Build zvýšen na 1000010 pro instalaci přes 1000009.

## Obrazy a jednotlivá kontrola

Použit vestavěný imagegen, jeden nový výstup pro každý druh, bez opakovaného generování. Přesné prompty: `image-prompts/visual-refresh-10.json`. Zdrojové názvy a hashe: `visual-refresh-10.json`. Převod z 1536 × 1024 na 1152 × 768 WebP pomocí Lanczos, quality 94, bez ořezu a bez změny proporcí.

- **Edaphosaurus pogonias:** celý ocas v obraze, čtyři končetiny, malá hlava, vysoká plachta s příčnými výrůstky. Souvislé přírodní pozadí bez rámečků. Přesný vzhled membrány a měkkých tkání hypotetický.
- **Estemmenosuchus uralensis:** celé tělo, čtyři končetiny, dva jednoduché krátké výrůstky na střeše lebky, tupý nosní hrbol a široké lícní rozšíření; nepřidány větvené parohy E. mirabilis. Přesná tloušťka kůže a tvar měkkých tkání nejsou ověřené.
- **Helicoprion bessonowi:** čelist obaluje spirálu, viditelná jen část korunek uvnitř tlamy; žádná celá spirála na tváři ani před čenichem. Tělo a ploutve celé v obraze. Přesná geometrie chrupu z výstupu není ověřitelná; tvar těla, ploutví a měkkých tkání zůstává hypotetický. CT podklady k rodu nejsou kompletní kostrou tohoto konkrétního druhu. Omezení uvedeno i v obrazové poznámce aplikace.

Vizuální kontrola neznamená odbornou vědeckou validaci. Nová trojice čeká na hodnocení uživatele.

## Paleontologické podklady

- Edaphosaurus: Scott Hartman, druhově určená kosterní rekonstrukce (pouze věcný podklad, ne obrazový vstup): https://www.skeletaldrawing.com/synapsids/edaphosaurus-pogonias/
- Bennett 1996, příčné výrůstky neuralních trnů: https://doi.org/10.1017/S0094837300016481
- Estemmenosuchus uralensis: primární monografický popis, holotyp PIN 1758/4, jednoduché nevětvené krátké lebeční výrůstky: https://ocher.biblioteka-perm.ru/upload/pages/42199/dat_1507888790536.pdf
- Institucionální druhový záznam: https://www.darwinmuseum.ru/pages/estemmenozuh-estemmenosuchus-uralensis
- Tapanila et al. 2013, CT dolní čelisti Helicopriona: https://pubmed.ncbi.nlm.nih.gov/23445952/ (doi:10.1098/rsbl.2013.0057).
- University of Tokyo, druhově určený H. bessonowi a shrnutí uložení spirály: https://www.um.u-tokyo.ac.jp/UMUTopenlab/en/library/b_16.html

## Ověření a zbývající práce

Lokální `npm test` prošel. Nové kontroly chrání tři zálohy, všechny neobrazové údaje a zdroje i 109 ostatních obrazů. Starší testy mají výslovné výjimky pro dávku 10; historické otisky se nepřepisují. Test dávky 09 pro historické porovnání obnovuje metadata poslední trojice z nové zálohy, takže nevypíná kontrolu ostatního obsahu.

Finální CI mobilního rozhraní a podepsané APK 1000010 zatím nepotvrzené. Poslední dodané a uživatelem schválené APK je 1000009. Po úspěšném sestavení zkontrolovat původní certifikát a předat APK. Na telefonu ověřit aktualizaci bez odinstalace, zachování oblíbených, český hlas, kvíz a novou trojici.

Všechny dosud požadované obrazové náhrady jsou vložené; žádný další druh není v seznamu čekajících náhrad. Celé vydání 1.0.0 však není finálně schválené. Sloučení do main zůstává výslovně zakázané i po úspěšných testech.
