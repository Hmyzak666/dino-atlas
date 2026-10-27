# Dávka 08 — jednotné rámečky a vybraný čelní Edestus

27. října 2026, pouze `feature/paleozoic-1.0.0`. Základ `33a10d548c58520db0eff29fa11dbf25cfb7122d`, kandidát build **1000008**.

## Přijatý směr

Uživatel odmítl vyšší rámečky z 1000007 i Edesta s čepelemi působícími posunutě do strany. Po náhledech požádal u dvou původních ilustrací jen změnit poměr/velikost. Výslovně byl upozorněn na mírné vodorovné roztažení. Následně vybral čelní pohled Edesta, který zdůrazňuje neobvyklý chrup.

- Pulmonoscorpius: aktivní původní ořez 1036 × 752 přepočten na 1152 × 768.
- Arthropleura: aktivní původní ořez 996 × 752 přepočten na 1152 × 768.
- Oba: Lanczos a WebP quality 94; bez AI generování, doplnění pozadí či dalšího ořezu. Jde o změnu proporcí, nikoli bezeztrátovou změnu. Celá původní kompozice a autorské podpisy zůstávají v obraze. Kredity Prehistorica CM, CC BY 4.0 a odkazy zachované, popis úprav aktualizován.
- Edestus: uživatelem vybraný čelní AI návrh `exec-d6ec8ef1-be4d-4515-b5de-5f98ac95a8c2.png`, převeden z 1536 × 1024 na 1152 × 768. Středové čepele jsou zvýrazněné, ale přesné ztvárnění jednotlivých korunek a geometrie není vědecky potvrzené. Vizuální výběr uživatele se nerovná vědeckému ověření. Nejistota výslovně uvedena v obrazové poznámce. Nový návrh se v tomto kroku negeneroval.
- Odstraněny výjimky poměru v aplikaci; karty a kvíz opět jednotně 3:2.

## Zachování obsahu

Všechny tři předchozí aktivní obrazy zálohovány v `docs/backups/visual-refresh-08/images/`, vedle jsou původní metadata, hashe 112 obrazů a kontrolní otisk všech neobrazových údajů. Zůstává 112 druhů, všechna ID, texty, předčítání a ostatní funkce. 109 dalších obrazů beze změny. V databázi upraveny pouze tři obrazové poznámky. Výstupní otisky: `docs/visual-refresh-08.json`.

## Ověření

Lokální `npm test` prošel. Kontroly nově ověřují zálohy, 109 nezměněných obrazů a všechny neobrazové údaje. UI kontroly obou karet a obou zvířat v kvízu nyní očekávají společný poměr 3:2. Finální CI, podepsané APK a zkouška na telefonu zatím čekají.

Další práce: sedm permských oprav (Dimetrodon, Inostrancevia, Scutosaurus, Mesosaurus, Diplocaulus, Helicoprion, Estemmenosuchus), dávky nejvýše 5 + 2, jednotlivé kontroly a zálohy. Neslučovat do main.
