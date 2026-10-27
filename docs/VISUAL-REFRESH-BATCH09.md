# Dávka 09 — příprava pěti permských oprav

27. října 2026. Pouze `feature/paleozoic-1.0.0`, základ `4102b65e6c3eee3fe994e3ea46037efd095d0b84`.

## Přesný stav

Připraveny zálohy pěti aktivních originálů a jejich úplných obrazových metadat v `backups/visual-refresh-09/`. Manifest zaznamenává SHA-256 celé databáze a všech 112 aktivních obrazů. Žádný aktivní obraz, text ani funkce se v této přípravě nemění. Nové obrazy nebyly generovány. Poslední ověřené APK zůstává 1000008; nové APK se nesestavovalo.

Uživatel dříve podmínil pokračování úprav nulovou dodatečnou spotřebou kreditů. Pokyn „Pokračuj“ neobsahuje výslovnou změnu tohoto omezení. Příprava pokračovala bez obrazového generování; před jeho spuštěním vyjasnit, zda se omezení vztahuje i na nové permské ilustrace. Nelze zaručit nulovou spotřebu generování.

## Rozsah a kontroly před generováním

| Druh | Kontrola zadání a výsledku |
| --- | --- |
| Dimetrodon grandis | Celé tělo, čtyři končetiny, ocas a hřbetní plachta; odlišit od Edaphosaura. Ověřit druhové proporce podle kostry. |
| Inostrancevia alexandri | Ověřit podle ruského druhu a jeho kostry; nepřebírat bez kontroly rekonstrukci I. africana. Kontrolovat lebku, špičáky a končetiny. |
| Scutosaurus karpinskii | Ověřit tělesné proporce a lebku podle Romano et al. 2021; nepřidávat fantastické rohy. |
| Mesosaurus tenuidens | Protáhlá lebka s jemnými zuby, dlouhý krk a ocas, větší zadní končetiny. Nepodobat se mosasaurovi. |
| Diplocaulus magnicornis | Ověřit bumerangovitou lebku a její napojení na tělo, počet končetin a ocas podle fosilního materiálu. |

Každý samostatně, plná scéna 3:2, výstup 1152 × 768 WebP, žádné rozmazané pásy či studio. Zbarvení a nedoložené měkké tkáně označit jako hypotézu. Toto je seznam budoucích kontrol, nikoli potvrzení vědecké správnosti dosud neexistujících obrázků.

Záznamy zdrojů v dinosaurs.json zachovat. Pokud bude stará ilustrace použita při editaci, zachovat autora, licenci včetně ShareAlike a popsat úpravu; nezaměnit odvozenou práci za nezávislou AI rekonstrukci.

## Podklady

- Dimetrodon: https://www.amnh.org/exhibitions/permanent/primitive-mammals/dimetrodon — institucionální popis plachty a zařazení.
- Inostrancevia alexandri: https://www.ras.ru/paleontological_museum/4fb59d87-7326-4117-89ce-b243795231f6.aspx — druhově určená kostra, ne I. africana.
- Scutosaurus: https://doi.org/10.3389/fevo.2021.692035 — zdroj již evidovaný v databázi; detailní opětovná kontrola před zadáním obrázku zbývá.
- Mesosaurus: https://pmc.ncbi.nlm.nih.gov/articles/PMC9484468/ — Verrière a Fröbisch 2022, anatomie a změny proporcí během růstu.
- Diplocaulus: stávající institucionální a taxonomické zdroje v databázi; detailní kontrola fosilní předlohy zbývá.

Po této dávce zbývají Helicoprion a Estemmenosuchus. Všech sedm náhrad je zatím nedokončených. Neslučovat do main.
