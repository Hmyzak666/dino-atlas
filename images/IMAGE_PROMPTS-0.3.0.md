# Pracovní rekonstrukce pro Dino Atlas 0.3.0

Vytvořeno vestavěným nástrojem ImageGen, nikoli API nebo místním CLI.
Oba obrázky jsou pracovní AI ilustrace, ne vědecké důkazy. Po vygenerování
byly vizuálně zkontrolovány a pouze převedeny z PNG do WebP, bez změny obsahu
nebo ořezu. Poměr stran je 3 : 2, rozlišení 1536 × 1024 px.

Níže je zkrácená redakční podoba použitých zadání: zachycuje jejich vizuální
a anatomická kritéria, nikoli doslovný export nástrojové konverzace.

## Velociraptor mongoliensis

Soubor v projektu: `images/velociraptor-mongoliensis.webp`.
[Otevřít obrázek](sandbox:/workspace/scratch/14691ec4eaa2/dino-atlas-repo/images/velociraptor-mongoliensis.webp).

```text
Use case: scientific-educational.
Asset: realistic full-body dinosaur reconstruction for a mobile encyclopedia.
Subject: a small, lightly built Velociraptor mongoliensis with a long low skull,
feathered body, substantial folded feathered forearms, and a long stiff tail.
Keep the hands in a plausible inward-facing posture rather than pronating
the palms toward the ground. Show the enlarged second-toe claws held clear
of the ground. No giant movie-raptor proportions, bare scaly body, or flight.
Composition: entire animal visible, landscape 3:2, generous enough margins
for its tail and feet. No humans, text, labels, logo, or watermark.
Style: naturalistic museum paleoart, warm daylight, detailed organic texture,
subdued brown and cream palette. Neutral pale sandstone and sand backdrop,
with sparse low vegetation, consistent with the existing atlas illustrations.
Colors and fine feather details are illustrative rather than established facts.
```

Vědecký základ: Turner, Makovicky a Norell 2007, DOI
<https://doi.org/10.1126/science.1145076>; komentář autorů na webu AMNH
<https://www.amnh.org/explore/news-blogs/velociraptor-feather-evidence>.
Úpony letek jsou přímý kosterní doklad. Rozsah opeření zbytku těla, přesný
obrys per a zbarvení jsou rekonstrukční volby. Pozadí není rekonstrukcí
konkrétní fosilní lokality.

## Parasaurolophus walkeri

Soubor v projektu: `images/parasaurolophus-walkeri.webp`.
[Otevřít obrázek](sandbox:/workspace/scratch/14691ec4eaa2/dino-atlas-repo/images/parasaurolophus-walkeri.webp).

```text
Use case: scientific-educational.
Asset: realistic full-body dinosaur reconstruction for a mobile encyclopedia.
Subject: an adult Parasaurolophus walkeri with a long, gently curved tubular
crest extending backward from the skull, a broad beak, robust torso and neck,
and a muscular tail held above the ground. Show a plausible four-limbed stance,
with compact mitten-like forefeet and broad three-toed hind feet.
Do not use the short sharply down-curved crest of P. cyrtocristatus.
No unsupported skin sail between crest and back, snorkel, aquatic scene,
dragging tail, or exaggerated monster anatomy.
Composition: entire animal visible in side or shallow three-quarter view,
landscape 3:2, no cropped crest, tail or feet, no people or text.
Style: naturalistic museum paleoart, soft warm daylight, subdued olive-grey
and brown scaly skin, pale sandstone backdrop and sparse low vegetation,
consistent with the atlas. Colors and soft tissues remain illustrative.
```

Vědecký základ: Gates, Evans a Sertich 2021,
<https://pmc.ncbi.nlm.nih.gov/articles/PMC7842145/>; Bertozzo a kol. 2021,
<https://pmc.ncbi.nlm.nih.gov/articles/PMC8053592/>.
Kostěný hřeben je doložený, zatímco barvy a podrobnosti měkkých tkání nejsou.
Obrázek neukazuje přesné naleziště ani konkrétního nalezeného jedince.

## Co ještě zkontrolovat při budoucí odborné revizi

- Tvar lebky a proporce celého těla podle konkrétní kosterní rekonstrukce.
- Postavení prstů, drápů a předních končetin.
- Rozsah a tvar opeření Velociraptora.
- Soulad jednotlivých detailů s novější literaturou.

Datum redakční kontroly podkladů: 17. října 2026. AI ilustrace může obsahovat
anatomické nepřesnosti i při podrobném zadání; při odborné revizi ji lze nahradit
bez změny aplikační logiky.
