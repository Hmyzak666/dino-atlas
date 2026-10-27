# Dávka 06 — dva schválené ořezy a Edestus, build 1000006

27. října 2026, pouze `feature/paleozoic-1.0.0`, základ `35a2b22e5f3b9218390b08cb3fdf5d7937d70d8a`. Uživatel schválil vzhled pěti obrázků dávky 05 a výslovně požádal zachovat Pulmonoscorpia a Arthropleuru, pouze odstranit rušivé okraje.

## Změny

- Pulmonoscorpius: pouze bezeztrátový ořez přidaného rámečku na souřadnice `[58,8,1094,760]`, výsledně **1036 × 752 WebP**.
- Arthropleura: pouze bezeztrátový ořez rámečku `[78,8,1074,760]`, výsledně **996 × 752 WebP**.
- U těchto dvou obrazů je zachován původní poměr stran podle posledního požadavku na přesný vzhled a pouze odstranění okrajů. Vynucený poměr 3:2 by u štíra ořezal klepeto nebo ocas. Žádné přegenerování, zvětšení, deformace nebo změna anatomie. Dekódované pixely výstupu porovnané s přesným výřezem zálohy — beze změny. Původní kredity Prehistorica CM, CC BY 4.0, odkazy a podpisy v obraze zachované; poznámka o úpravách aktualizovaná.
- Edestus heinrichi: nový původní boční pohled, 1152 × 768 WebP. Kontrola protilehlých téměř přímých zubních čepelí s plochými trojúhelníkovými korunkami, bez spirály a velkých vysunutých nůžek. Přesné prostorové uspořádání překrytých struktur nelze v boční projekci nezávisle ověřit; žralokovitý trup a ploutve jsou pracovní rekonstrukce, nikoli doložené kompletní tělo. Žádná cizí ilustrace nebyla vstupem generování. Zdroj anatomického zadání: Tapanila et al. 2020, https://doi.org/10.1002/ar.24046. Nový návrh nenavazuje na odmítnuté obrazové varianty dávky 05.

Před změnou zálohovány všechny tři originály i jejich obrazová metadata a licence v `backups/visual-refresh-06/`. Manifest obsahuje SHA-256 všech 112 obrazů před dávkou. `visual-refresh-06.json` eviduje výstupy, rozměry a přesné ořezy. Neobrazové texty, vědecké zdroje záznamů, všech 112 druhů i aplikační funkce zůstávají zachované. Původní licenční záznam Edesta zůstává ve slovníku zdrojů a záloze, ale nová nezávislá AI rekonstrukce mu není připisována.

## Ověření a předání

Lokální `npm test` prošel; testy rozhraní po ořezech prošly (320/360/412/900 px, zoom, světlý/tmavý vzhled, oblíbené, kvíz, ovládání TTS). Skutečný hlas telefonu nebyl poslouchán; podepsané APK 1000006 zatím nepotvrzené. Nová trojice čeká na hodnocení uživatele. Dosavadní audit měl 30 náhrad; uživatel nyní doplnil dva ořezy. Celkem tedy 32 úprav, 25 vložených, **zbývá sedm permských náhrad**: Dimetrodon, Inostrancevia, Scutosaurus, Mesosaurus, Diplocaulus, Helicoprion, Estemmenosuchus. Rozdělit na dávky 5 + 2. Neslučovat do main.
