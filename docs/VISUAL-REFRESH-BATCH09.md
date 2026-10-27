# Dávka 09 — příprava pěti permských oprav

27. října 2026. Pouze `feature/paleozoic-1.0.0`, základ `4102b65e6c3eee3fe994e3ea46037efd095d0b84`.

## Přesný stav

Uživatel schválil nainstalované APK 1000008 jako perfektní a výslovně povolil nové generování pro perm. Vloženo pět jednotlivě prohlédnutých scén, kandidát **1000009**. Zálohy původních obrazů a úplných obrazových metadat zůstávají v `backups/visual-refresh-09/`. Zachováno 112 druhů, veškeré neobrazové údaje, zdroje a 107 dalších obrazů.

Použit vestavěný imagegen: pět nových scén a tři cílené opravy (Dimetrodon dvakrát kvůli oříznutému ocasu, Scutosaurus jednou kvůli páté noze). Žádná cizí ilustrace nebyla obrazovým vstupem. Prompty a editace: `image-prompts/visual-refresh-09.json`. Vybrané výstupy a SHA-256: `visual-refresh-09.json`. Export z 1536 × 1024 na 1152 × 768 WebP, Lanczos, quality 94; bez ořezu či změny proporcí.

## Individuální vizuální kontrola

- Dimetrodon: ve finálním výstupu celý ocas v záběru, čtyři končetiny, plachta bez příčných výrůstků. Obě předchozí varianty s uříznutým ocasem nepoužity.
- Inostrancevia: čtyři končetiny, horní špičáky, celý ocas, bez srsti a vnějších kočičích uší. Kůže a přesné proporce měkkých tkání zůstávají rekonstrukcí.
- Scutosaurus: po editaci čtyři končetiny; původní výstup s pátou nohou nepoužit. Robustní trup a tupé lícní výrůstky; postoj v šikmé projekci není přesné biomechanické ověření.
- Mesosaurus: štíhlý čenich, dlouhý krk a ocas, čtyři končetiny, větší zadní plovací nohy. Překryvy prstů neumožňují jejich nezávislé úplné přepočítání.
- Diplocaulus: oba postranní výběžky hlavy a celý ocas v záběru; vzdálená zadní končetina je zakrytá tělem. Povrch těla a prostředí hypotetické.

Všechny scény mají souvislé prostředí bez rámečků a studiového pozadí. Jde o vizuálně zkontrolované pracovní rekonstrukce, nikoli odbornou vědeckou validaci. Uživatelské hodnocení této pětice dosud čeká.

## Ověření

`npm test` prošel. Nová kontrola dávky 09 ověřuje zálohy, všech 112 ID a neobrazové údaje včetně zdrojů, zachování 107 ostatních obrazů a jejich metadat. Starší testy mají výslovné výjimky pouze pro novou pětici, historické otisky nebyly přepsány. CI rozhraní a podepsané APK 1000009 zatím čekají; neoznačovat je za hotové.

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

Po této dávce zbývají dvě náhrady: Helicoprion a Estemmenosuchus. První pětice čeká na hodnocení uživatele. Neslučovat do main.
