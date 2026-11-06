# Dino Atlas 1.0.0 – Perm: 8 druhů a obrazová atribuce

Závěrečná obsahová dávka prvohor je připravena v `content-drafts/permian-eight.json`. **Stabilní `main` (0.9.0, build 90001) se tímto postupem nemění.**

## Druhy (v tomto pořadí)
1. *Dimetrodon grandis* — dravý synapsid s hřbetní plachtou, **nikoli dinosaurus**.
2. *Edaphosaurus pogonias* — býložravý synapsid; podpěry plachty nesly boční příčné výběžky.
3. *Inostrancevia alexandri* — dravý gorgonops s horními špičáky, není doložena srst.
4. *Scutosaurus karpinskii* — mohutný býložravý pareiasaur, ne dinosaurus.
5. *Mesosaurus tenuidens* — časný vodní amniot; zkameněliny v Africe a Jižní Americe, potravu tvořila nejspíše drobná pohyblivá kořist.
6. *Diplocaulus magnicornis* — raný nektridní čtyřnožec s bumerangovou hlavou; **m**a**g**ni**c**ornis je správný konec názvu, ne magnicornus.
7. *Helicoprion bessonowi* — rybí příbuzný chimér se zubní spirálou **uvnitř dolní čelisti**; ne v nose.
8. *Estemmenosuchus uralensis* — robustní dinocefalní terapsid s kostěnými lebečními výrůstky; dieta nejistá.

Ve vědeckých heslech jsou uvedeny velikostní odhady s upozorněním na nejistotu, šest českých sekcí, tři určovací znaky, výslovnost a kvíz.

## Osm obrazů: zdroje, autoři a licence

Zdrojové předlohy byly samostatně staženy a vizuálně prohlédnuty v [GitHub Actions – read-only audit](https://github.com/Hmyzak666/dino-atlas/actions/runs/40222818901). Audit ani jeho artefakt **nepublikují žádné obrázky do aplikace**.

| Druh | Autor/zdroj | Licence | Stránka souboru |
| --- | --- | --- | --- |
| Dimetrodon grandis | Max Bellomio, digitální rekonstrukce | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Dimetrodon_grandis_3D_Model_Reconstruction.png |
| Edaphosaurus pogonias | Dmitry Bogdanov, ilustrace | CC BY-SA 3.0 | https://commons.wikimedia.org/wiki/File:EdaphosaurusDB.jpg |
| Inostrancevia alexandri | Mario Lanzas, digitální rekonstrukce | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Inostrancevia_reconstruction.jpg |
| Scutosaurus karpinskii | Marco Romano a spoluautoři (2021), studie | CC BY 4.0 | https://commons.wikimedia.org/wiki/File:Scutosaurus_restoration_(cropped).jpg |
| Mesosaurus tenuidens | GabrieMacrothorax, ilustrace | CC BY 4.0 | https://commons.wikimedia.org/wiki/File:MESOSAURUS.png |
| Diplocaulus magnicornis | Entelognathus, ilustrace | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Diplocaulus_recon.png |
| Helicoprion bessonowi | DiBgd, ilustrace založená na rekonstrukci chimérovitého tvaru | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Helicoprion_as_chimeroid.jpg |
| Estemmenosuchus uralensis | Mojcaj, ilustrace | CC BY-SA 3.0 | https://commons.wikimedia.org/wiki/File:Estemmenosuchus_uralensis.jpg |

**Licenční odkazy:** https://creativecommons.org/licenses/by-sa/4.0/ , https://creativecommons.org/licenses/by-sa/3.0/ , https://creativecommons.org/licenses/by/4.0/

Všech osm obrázků je vědeckou nebo uměleckou interpretací, ne živou fotografií. Historicky nejisté odstíny a měkké tkáně musejí být označené jako nejisté. Předlohy mají odlišný styl (digitální malba, kresba, muzejně/vědecky podložená ilustrace); pozdější sjednocení stylu je možné, pokud se zachovají autoři a podmínky ShareAlike.

**Opravné poznámky k atribuci:** Dílo `Dimetrodon grandis 3D Model Reconstruction.png` má autora **Max Bellomio** (nikoli DiBgd). U `Helicoprion as chimeroid.jpg` platí **CC BY-SA 4.0** (nikoli 3.0). Původní soubor Helicopriona používá druh `bessonovi` v angličtině, ověřený atlas pracuje s nomenklaturou `bessonowi`.

## Technická transformace a provoz
Soubory se převádějí na 1152 × 768 WebP, při zachování proporcí anatomie a doplnění neutrálního pozadí. Součástí každého aktivního hesla musí být `image.sourceIds` a `image.note` s autorem, konkrétní stránkou souboru, licencí a popisem převodu. CC BY-SA odvozené obrázky zůstávají pod příslušnou licencí ShareAlike; aplikace jako software nemusí mít automaticky stejnou licenci.

Import `tools/import_permian_commons.py` používá předem ověřené přesné SHA-1 všech osmi zdrojových souborů, kontrolu formátu a rozměrů, kontrolu 104 původních druhů a všech osmi nových ID. Provádí se **jen ve větvi `feature/paleozoic-1.0.0`**, po dokončení má být přesně **112 lokálních obrázků a 112 aktivních hesel**.

Bez zelených `npm test` a `npm run test:ui`, podpisového Android builda a potvrzení uživatele na telefonu **neprovádět merge do `main`**. Finální balíček 1.0.0 musí mít vyšší Android versionCode než 90001.
