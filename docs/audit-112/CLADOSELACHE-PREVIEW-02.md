# Cladoselache — anatomický náhled 02

28. 10. 2026. Výchozí commit 85e2028ecdba25bb4db46ef22c36ee03ff371f1e, pouze feature/paleozoic-1.0.0.

Uživatel schválil vzhled a barevnost náhledu 01 pro finální cílenou opravu spodních ploutví. Proveden jeden další edit vestavěným imagegen; žádná integrace do aplikace, žádné APK, žádné sloučení do main.

## Náhled a kontrola

- Výstup: exec-005c139c-f2c7-48da-929c-387d27850211.png, PNG 1536 × 1024, 3:2, zobrazen přímo v chatu.
- SHA-256: cb2004acf49bc46dcbdd0ff9e4a933e84522b0210677a65f5c7ebe9e0b6dd773.
- Vstup: náhled 01 exec-ed30029b-3a7a-47aa-a6c0-734a443c9098.png; původní aktivní WebP zachován.
- Vizuálně dvě hřbetní ploutve, odstraněný třetí hřbetní výběžek z původního obrazu.
- Odstraněna izolovaná ventrální ploutev nejblíže ocasu; mezi viditelnou nízkou pánevní ploutví a ocasem je nyní souvislý hladký obrys.
- Vzdálená pánevní ploutev je zakrytá perspektivou; nelze tvrdit, že obě jsou zřetelně vidět. Pektorální ploutve zachované. Tělo, ocas i hlavní ploutve v rámu.
- Scéna a barvy jsou velmi podobné náhledu 01, nikoli pixelově neměnné; model drobně změnil i tlamu a texturu.
- Dvě hlavní přebytečné ploutvové siluety z původního auditu jsou vizuálně vyřešeny. Náhled není nezávislou vědeckou certifikací přesného počtu žaberních štěrbin, geometrie trnu, měkkých tkání, zbarvení ani biotopu. Podklady a omezení viz [náhled 01](CLADOSELACHE-PREVIEW-01.md).

## Stav předání

Čeká uživatelské posouzení této druhé verze. Neoznačovat za integrované ani za hotové APK. Poslední schválený build zůstává 1000010. SHA-256 všech 112 aktivních WebP ověřeny proti auditu: beze změny. Funkční testy se neopakovaly, mění se pouze dokumentace. Před případnou integrací záloha aktivního souboru, metadat a kreditů, pak kontrola exportu WebP a relevantní testy. Další varianty negenerovat automaticky.

## Přesné zadání

Use case: precise-object-edit. The input is the EDIT TARGET, a review candidate for Cladoselache fyleri. Make ONE narrow localized anatomical correction to the two small ventral fin shapes in the rear half of the shark. Keep the rest of the image as unchanged as possible, including head, eyes, gills, colors, texture, two dorsal fins, large pectoral fin and far pectoral fin, crescent tail, pose, lighting and background. On this 1536x1024 input, REMOVE COMPLETELY the isolated small triangular fin at approximately x=410..510,y=350..414, the fin nearest the tail on the underside. Replace its former area with smooth continuous belly contour and matching blue water, leaving absolutely NO anal fin and no finlet between pelvic region and tail. At the remaining pelvic position approximately x=530..660,y=400..473, refine the near pelvic fin into a low swept-back triangular flap with a long broad attachment to the side of the belly, about three times longer than high. The far pelvic fin belongs to the SAME paired station across the body and is mostly hidden by the body/near fin; at most a small overlapping edge may show at that same station, never a separate fin farther along the tail. Keep exactly two dorsal fins, one pectoral pair and one pelvic pair. No extra appendages, no new sharks. Preserve full uncropped body. Landscape 1536x1024, 3:2. Do not change composition or add text. This is a review-only plausible paleoart correction, not a claim of complete anatomical certification.
