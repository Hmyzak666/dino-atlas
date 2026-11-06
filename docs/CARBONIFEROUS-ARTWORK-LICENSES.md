# Karbon: atribuce obrazů pro Dino Atlas 1.0.0

**Stav 25. 10. 2026:** Připravený (zatím neimportovaný) archiv osmi originálních zobrazení přizpůsobených pro mobilní aplikaci. Obsahové druhové drafty jsou v `content-drafts/carboniferous-eight.json`. Stabilní `main` stále 0.9.0.

## Autorská práva a zdroje
Použité snímky nejsou společným dílem Dino Atlasu; jejich autoři a svobodné licence zůstávají zachováni. Při převodu byla provedena změna rozlišení, převedení barevného prostoru do RGB, WebP komprese a doplnění neutrálních okrajů. U obrázků pod CC BY-SA musí být odvozená obrázková díla dále zpřístupňována za kompatibilních CC BY-SA podmínek. Licence se nevztahují automaticky na celý nezávislý aplikační kód.

| Druh | Dílo (přímý zdroj / atribuce) | Licence |
|---|---|---|
| Arthropleura armata | [Arthropleura Reconstruction.jpg](https://commons.wikimedia.org/wiki/File:Arthropleura_Reconstruction.jpg), Prehistorica CM | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Meganeura monyi | [Meganeura.png](https://commons.wikimedia.org/wiki/File:Meganeura.png), Qohelet12 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| Pulmonoscorpius kirktonensis | [Pulmonoscorpius kirktonensis.jpg](https://commons.wikimedia.org/wiki/File:Pulmonoscorpius_kirktonensis.jpg), Prehistorica CM | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Hylonomus lyelli | [Hylonomus lyelli - MUSE.jpg](https://commons.wikimedia.org/wiki/File:Hylonomus_lyelli_-_MUSE.jpg), Matteo De Stefano / MUSE | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| Greererpeton burkemorani | [Greererpeton BW.jpg](https://commons.wikimedia.org/wiki/File:Greererpeton_BW.jpg), Nobu Tamura | [CC BY 2.5](https://creativecommons.org/licenses/by/2.5/) |
| Edestus heinrichi | [Edestus recon.png](https://commons.wikimedia.org/wiki/File:Edestus_recon.png), Entelognathus | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| Petrolacosaurus kansensis | [Petrolacosaurus BW.jpg](https://commons.wikimedia.org/wiki/File:Petrolacosaurus_BW.jpg), Nobu Tamura | [CC BY 2.5](https://creativecommons.org/licenses/by/2.5/) |
| Crassigyrinus scoticus | [Crassygyrinus224.jpg](https://commons.wikimedia.org/wiki/File:Crassygyrinus224.jpg), ДиБгд | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

**Přehled osmice:** `carboniferous-image-audit.zip` vznikl v GitHub Actions `Carboniferous licensed image audit`. Obsahuje originální stažené předlohy, kontrolní JPEG a manifest SHA-1.

**Schválený přenos:** `DinoAtlas_Karbon_8_images_GitHub.zip`, přesně **563 476 B**, SHA-256 `b81d8d88e52b88784b673fcd3964b6a5c94e71afa0ac43229eb1eeccc4196c4a`. Obsahuje osm WebP 1152 × 768, bez textových popisků.

**Důležitá výtvarná výhrada:** Tato pracovní obrazová sada je **stylisticky nejednotná** — digitální rekonstrukce, muzejní modely a odborné kresby. Zejména Edestus má hypoteticky rekonstruovanou kompletní postavu, která není přímo fosilně doložená; v jeho popisu musí zůstat uvedeno, že klíčovým dokladem je stavba čelistních zubních čepelí. Není-li při vizuálním testu vhodná pro dětskou encyklopedii, nahradit problematické obrázky před stabilním vydáním 1.0.0 druhově správnými, kvalitnějšími a řádně licencovanými originály.

V aktivní aplikaci bude autor, licence, url původního díla a výčet změn dostupný přímo v popisku obrázku každého druhu (`image.note.cs`). Úplné URL k dílům se zapisují i do databáze `sources`, na kterou odkazuje `image.sourceIds`.

Do stabilního `main` nic neslučovat bez dokončení permu, kompletního testování 112 živočichů a instalace na telefonu.
