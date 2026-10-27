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
