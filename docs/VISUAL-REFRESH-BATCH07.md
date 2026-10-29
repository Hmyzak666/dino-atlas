# Dávka 07 — vyplnění prostoru a nový návrh Edesta

27. října 2026. Pouze `feature/paleozoic-1.0.0`, základ `e543d88d7db0a8da48f57a943e6112bfc5d1e4af`, kandidát build **1000007**.

## Zpětná vazba a řešení

Uživatel upřesnil, že Pulmonoscorpius a Arthropleura se mu líbí; vadí jen vyplnění prostoru. Jejich ořezy z dávky 06 zůstaly po bajtech stejné, včetně podpisů, kreditů a licencí. Karty a kvíz měly pevný rám 3:2 s object-fit contain, takže užší ořezy vytvářely boční pruhy. Jen pro tyto dva druhy se nyní rám přizpůsobuje původnímu poměru 1036:752 a 996:752. Celý obraz je vidět, bez deformace, dalších ořezů či doplňování pozadí. Detail již používal přirozený poměr.

Edestus z build 1000006 nebyl přijat jako dostatečně přesvědčivá rekonstrukce chrupu. Nový původní AI návrh používá šikmý pohled: zubní čepele jsou viditelně ve středu čelistí, boky tlamy bez souvislé běžné žraločí řady. Kontrola: celé tělo, protilehlé zubní čepele, bez spirály a velkých vnějších nůžek, souvislé prostředí. Nejde o nezávisle vědecky ověřený 3D model; detaily zakřivení a vzájemného zapadání zubů a všechny měkké tkáně jsou nejisté. Čeká hodnocení uživatele. Podklad: Tapanila et al. 2020, https://doi.org/10.1002/ar.24046.

Před výměnou záloha Edesta i metadat v `docs/backups/visual-refresh-07/`; manifest chrání SHA-256 všech 112 obrazů a celé databáze. 111 ostatních obrazů a celá databáze včetně českých textů, předčítání a kreditů jsou beze změny. Nový manifest `docs/visual-refresh-07.json`.

## Ověření

Lokální `npm test` prošel. Testy UI doplněny o oba poměry v kartách na 320/360/412/900 px a oba obrazy v karbonském kvízu. Lokální stažení prohlížeče selhalo poškozeným archivem; výsledek UI a podepsané APK dosud nepotvrzený, ověřit v CI. Telefon neotestován.

Sedm permských oprav stále zbývá: Dimetrodon, Inostrancevia, Scutosaurus, Mesosaurus, Diplocaulus, Helicoprion, Estemmenosuchus. Dávky maximálně 5 + 2, jednotlivá vizuální kontrola, před výměnou záloha.

### Příprava CI prohlížeče

První běh 40500014540 prošel obsahovými testy, ale dlouho čekal ve stahování/instalaci prohlížeče. Workflow nyní přednostně používá již instalovaný Google Chrome přes podporované DINO_BROWSER_PATH; když není dostupný, instalace Playwright prohlížeče má limit 180 sekund. Rozsah testů se neomezuje.

## Potvrzený výstup 1000007

[CI 40500576605](https://github.com/Hmyzak666/dino-atlas/actions/runs/40500576605) na commitu `d16a546ea9c801ae7fa18ed1212de656117dfd49` úspěšně dokončilo všechny testy i podepsané sestavení. Prošly nové kontroly obou poměrů karet a karbonského kvízu, šířky 320/360/412/900, zoom, světlý/tmavý vzhled, čtení přes testovací bridge, filtry, gesta, návraty a oblíbené. Skutečný hlas telefonu nebyl poslouchán.

CI ověřilo přesný obsah APK, 112 druhů, identitu `cz.hmyzak.dinoatlas`, build 1000007 a původní podpisový certifikát `4008bd7e1dbf92662a5d2de90fa090e1cbb63a6b0020fd687a2927e711da522c` včetně podpisu v2.

APK `Dino-Atlas-v1.0.0-build1000007.apk`: 35 006 721 bajtů; SHA-256 `367a85a106b8349e3de85cdc40d7e466418e3b962a673bb10c0031743bba5d54`. [ZIP artefakt](https://github.com/Hmyzak666/dino-atlas/actions/runs/40500576605/artifacts/12733050677). Čeká instalace a vizuální hodnocení uživatele. Sedm permských náhrad stále neprovedeno. Do main nic nesloučeno.
