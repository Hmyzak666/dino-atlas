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

## Potvrzené dokončení APK — 27. října 2026

- Zdroj sestavení: `d646e191791ea0ff2eb63852f8fecc13adb8387e`, větev `feature/paleozoic-1.0.0`.
- [GitHub Actions 40469603728](https://github.com/Hmyzak666/dino-atlas/actions/runs/40469603728): databáze, kompatibilita, finální mobilní rozhraní a podepsaný Android build úspěšné.
- CI ověřilo identitu `cz.hmyzak.dinoatlas`, build **1000006**, všech 112 druhů, přesné zdrojové assety a původní podpis včetně APK Signature Scheme v2. SHA-256 certifikátu: `4008bd7e1dbf92662a5d2de90fa090e1cbb63a6b0020fd687a2927e711da522c`.
- APK: `Dino-Atlas-v1.0.0-build1000006.apk`, 34 982 145 bajtů; SHA-256 `fe0444a882b88359a866671dabb686915f3ec11fb9eb510684b58db272552f63`. Stažená databáze, všechny obrázky, app.js a style.css byly navíc porovnány po bajtech s checkpointem.
- [Artefakt ZIP](https://github.com/Hmyzak666/dino-atlas/actions/runs/40469603728/artifacts/12717728212), platnost dle GitHubu do 26. 11. 2026.
- APK připravené ke stažení. Uživatelská instalace a hodnocení Edesta dosud nepotvrzené; nejde o schválení finálního vydání 1.0.0.
- Sedm permských oprav zůstává neprovedeno, další dávky maximálně 5 + 2 s jednotlivou kontrolou a zálohou před výměnou. Do main nic nesloučeno.
