#!/usr/bin/env python3
"""Verify and import all eight reviewed Carboniferous animals together.

This importer stays dormant until all eight independently checked WebP pictures
exist and an expected SHA-256 is added to the one-time GitHub Actions workflow.
Never run it against main; no partial image-less entries are permitted.
"""
import hashlib
import json
import os
from pathlib import Path
import sys
from zipfile import ZipFile

ROOT=Path(__file__).resolve().parent.parent
ARCHIVE_NAME="DinoAtlas_Karbon_8_images_GitHub.zip"
DRAFT=ROOT/"content-drafts/carboniferous-eight.json"
DATABASE=ROOT/"dinosaurs.json"
EXPECTED_IDS=[
    "arthropleura-armata","meganeura-monyi","pulmonoscorpius-kirktonensis",
    "hylonomus-lyelli","greererpeton-burkemorani","edestus-heinrichi",
    "petrolacosaurus-kansensis","crassigyrinus-scoticus"
]

ARTWORK=[
    ("arthropleura-armata","Arthropleura Reconstruction.jpg","Prehistorica CM","CC BY 4.0"),
    ("meganeura-monyi","Meganeura.png","Qohelet12","CC BY-SA 4.0"),
    ("pulmonoscorpius-kirktonensis","Pulmonoscorpius kirktonensis.jpg","Prehistorica CM","CC BY 4.0"),
    ("hylonomus-lyelli","Hylonomus lyelli - MUSE.jpg","Matteo De Stefano / MUSE","CC BY-SA 3.0"),
    ("greererpeton-burkemorani","Greererpeton BW.jpg","Nobu Tamura","CC BY 2.5"),
    ("edestus-heinrichi","Edestus recon.png","Entelognathus","CC BY-SA 4.0"),
    ("petrolacosaurus-kansensis","Petrolacosaurus BW.jpg","Nobu Tamura","CC BY 2.5"),
    ("crassigyrinus-scoticus","Crassygyrinus224.jpg","ДиБгд","CC BY 4.0")
]
LICENSE_URLS={
    "CC BY 4.0":"https://creativecommons.org/licenses/by/4.0/",
    "CC BY-SA 4.0":"https://creativecommons.org/licenses/by-sa/4.0/",
    "CC BY-SA 3.0":"https://creativecommons.org/licenses/by-sa/3.0/",
    "CC BY 2.5":"https://creativecommons.org/licenses/by/2.5/"
}

def main():
    if len(sys.argv)!=2 or Path(sys.argv[1]).name!=ARCHIVE_NAME:
        raise SystemExit("Usage: python3 tools/import_carboniferous.py "+ARCHIVE_NAME)
    if os.environ.get("GITHUB_REF") and os.environ["GITHUB_REF"] != "refs/heads/feature/paleozoic-1.0.0":
        raise SystemExit("Only the Paleozoic feature branch may run this importer")
    expected_hash=os.environ.get("CARBONIFEROUS_SHA256","").lower()
    if len(expected_hash)!=64 or any(c not in "0123456789abcdef" for c in expected_hash):
        raise SystemExit("Missing preapproved SHA-256; never import an unverified picture archive")
    archive=ROOT/ARCHIVE_NAME
    if not archive.exists() or hashlib.sha256(archive.read_bytes()).hexdigest()!=expected_hash:
        raise SystemExit("Unapproved or missing image archive")
    draft=json.loads(DRAFT.read_text(encoding="utf-8"))
    db=json.loads(DATABASE.read_text(encoding="utf-8"))
    if draft.get("status")!="draft-awaiting-eight-original-webp-images":
        raise SystemExit("Unexpected draft status")
    if [a["id"] for a in draft["animals"]]!=EXPECTED_IDS:
        raise SystemExit("Unexpected Carboniferous species list or ordering")
    if len(db["dinosaurs"])!=96 or len({a["id"] for a in db["dinosaurs"]})!=96:
        raise SystemExit("The verified 96-animal Devonian foundation is required")
    if sum(a["period"]=="devonian" for a in db["dinosaurs"])!=8:
        raise SystemExit("Missing Devonian batch")
    ids={a["id"] for a in db["dinosaurs"]}
    if any(i in ids for i in EXPECTED_IDS):
        raise SystemExit("One or more Carboniferous species already activated")

    from PIL import Image
    from io import BytesIO
    expected={f"images/{animal}.webp" for animal in EXPECTED_IDS}
    verified={}
    with ZipFile(archive) as z:
        names=z.namelist()
        if len(names)!=8 or len(set(names))!=8 or set(names)!=expected:
            raise SystemExit("Archive must contain exactly eight approved WebP image paths")
        for name in sorted(expected):
            data=z.read(name)
            if not 15_000<=len(data)<=600_000 or data[:4]!=b"RIFF" or data[8:12]!=b"WEBP":
                raise SystemExit("Invalid image format/size "+name)
            if int.from_bytes(data[4:8],"little")+8!=len(data):
                raise SystemExit("Truncated RIFF/WebP "+name)
            with Image.open(BytesIO(data)) as im:
                im.load()
                if im.format!="WEBP" or im.width<600 or im.height<400:
                    raise SystemExit("Wrong image dimensions or codec "+name)
            if (ROOT/name).exists():
                raise SystemExit("Existing picture cannot be overwritten: "+name)
            verified[name]=data

    db["periods"]["carboniferous"]="Karbon"
    for sid,source in draft["sources"].items():
        if sid in db["sources"] and source!=db["sources"][sid]:
            raise SystemExit("Scientific citation collision: "+sid)
        db["sources"][sid]=source
    artwork_by_id={a[0]:a for a in ARTWORK}
    if set(artwork_by_id)!=set(EXPECTED_IDS):
        raise SystemExit("All eight species must have distinct image attribution")
    from urllib.parse import quote
    for animal in draft["animals"]:
        aid=animal["id"]
        _,title,author,license_name=artwork_by_id[aid]
        source_url="https://commons.wikimedia.org/wiki/File:"+quote(title.replace(" ","_"))
        source_id="carbon-art-"+aid
        if source_id in db["sources"]:
            raise SystemExit("Duplicate artistic source ID")
        db["sources"][source_id]={
            "title":author+" — "+title,
            "shortTitle":author+" / "+license_name,
            "url":source_url,
            "kind":"Obrazový pramen; licence "+license_name+"; obrázek převedený do WebP a přizpůsobený velikosti 1152 × 768 s doplněním jednobarevných okrajů",
            "accessedAt":"2026-10-25"
        }
        animal["image"]["sourceIds"]=[source_id]
        animal["image"]["status"]="working-reconstruction"
        animal["image"]["note"]={"cs":"Obraz: "+author+"; licence "+license_name+" ("+LICENSE_URLS[license_name]+"); originál: "+source_url+". Úpravy: změna rozlišení, převod do WebP a doplnění jednobarevných okrajů. Jde o ilustraci nebo muzejní model, nikoli živého živočicha; zbarvení a některé anatomické znaky nejsou fosilně doložené."}
        db["dinosaurs"].append(animal)
    if len(db["dinosaurs"])!=104 or len({a["id"] for a in db["dinosaurs"]})!=104:
        raise SystemExit("The exact 104-animal checkpoint was not reached")

    # Only commit to the isolated Actions checkout when all validations passed.
    for name,data in verified.items():
        p=ROOT/name
        p.parent.mkdir(parents=True,exist_ok=True)
        p.write_bytes(data)
    DATABASE.write_text(json.dumps(db,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    archive.unlink()
    print("Activated precisely eight Carboniferous species and eight verified WebP assets (104 total).")

if __name__=="__main__":
    main()
