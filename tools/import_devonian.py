#!/usr/bin/env python3
"""Import seven original Devonian WebPs and the licensed 2024 Dunkleosteus scientific illustration.

No incomplete batches, existing species replacements, or main-branch writes.
This script runs on GitHub Actions with its dedicated checkout.
"""
import hashlib
import json
from pathlib import Path
import sys
from zipfile import ZipFile

ROOT=Path(__file__).resolve().parent.parent
ARCHIVE_NAME="Dino-Atlas-1.0.0-Devon-7-pracovnich-obrazku.zip"
ARCHIVE_SHA256="7e827f22f651f4defb6881535291cfc6a7a5e44fc45fc307a91607874337ddf8"
ORIGINAL_JPEG_NAME="dunkleosteus-2024-science.jpg"
# File: Dunkleosteus terrelli 2024 reconstruction.jpg by Russell K. Engelman
# https://commons.wikimedia.org/wiki/File:Dunkleosteus_terrelli_2024_reconstruction.jpg
# Licensed Creative Commons Attribution 4.0
# https://creativecommons.org/licenses/by/4.0/
ORIGINAL_SHA1="9bac927d432ba62c5f6b7ffecff4aad161267522"
DRAFT=ROOT/"content-drafts/devonian-eight.json"
DB=ROOT/"dinosaurs.json"

def main():
    if len(sys.argv)!=3 or Path(sys.argv[1]).name!=ARCHIVE_NAME or Path(sys.argv[2]).name!=ORIGINAL_JPEG_NAME:
        raise SystemExit("Use: python3 tools/import_devonian.py "+ARCHIVE_NAME+" "+ORIGINAL_JPEG_NAME)
    archive=ROOT/ARCHIVE_NAME
    jpeg=ROOT/ORIGINAL_JPEG_NAME
    if not archive.is_file() or hashlib.sha256(archive.read_bytes()).hexdigest()!=ARCHIVE_SHA256:
        raise SystemExit("Seven-image ZIP is missing or SHA-256 changed")
    if not jpeg.is_file() or hashlib.sha1(jpeg.read_bytes()).hexdigest()!=ORIGINAL_SHA1:
        raise SystemExit("Scientific reference is missing or its source image SHA-1 changed")
    draft=json.loads(DRAFT.read_text(encoding="utf-8"))
    db=json.loads(DB.read_text(encoding="utf-8"))
    if len(db["dinosaurs"])!=88 or sum(a["period"]=="silurian" for a in db["dinosaurs"])!=5:
        raise SystemExit("Verified 88-species foundation required")
    if draft.get("status")!="draft-awaiting-eight-original-webp-images" or len(draft["animals"])!=8:
        raise SystemExit("Eight reviewed Devonian drafts required")
    ids=[a["id"] for a in draft["animals"]]
    if len(ids)!=len(set(ids)) or any(a["id"] in ids for a in db["dinosaurs"]):
        raise SystemExit("Duplicated species")
    expected={f"images/{id}.webp" for id in ids if id!="dunkleosteus-terrelli"}
    images={}
    with ZipFile(archive) as z:
        names=z.namelist()
        if len(names)!=7 or len(set(names))!=7 or set(names)!=expected:
            raise SystemExit("Expected exactly the seven selected non-Dunkleosteus reconstructions")
        for name in sorted(expected):
            raw=z.read(name)
            if not 10000 <= len(raw) <= 400000:
                raise SystemExit("Unexpected size: "+name)
            if raw[:4]!=b"RIFF" or raw[8:12]!=b"WEBP" or int.from_bytes(raw[4:8],"little")+8!=len(raw):
                raise SystemExit("Invalid RIFF / WebP: "+name)
            if (ROOT/name).exists():
                raise SystemExit("Refusing to replace existing animal image: "+name)
            images[name]=raw

    # Restore the scientifically supported 2024 interpretation rather than AI-rendered shark-like teeth.
    from PIL import Image, ImageOps
    from io import BytesIO
    im=Image.open(jpeg).convert("RGB")
    if im.size!=(700,385):
        raise SystemExit("Unexpected dimensions for the licensed 2024 figure")
    background=Image.new("RGB",(1152,768),(235,237,237))
    fitted=ImageOps.contain(im,(1110,688),Image.Resampling.LANCZOS)
    background.paste(fitted,((1152-fitted.width)//2,(768-fitted.height)//2))
    buffer=BytesIO()
    background.save(buffer,format="WEBP",quality=85,method=6)
    dunk=buffer.getvalue()
    if len(dunk)<10000 or len(dunk)>400000:
        raise SystemExit("Unexpected converted scientific illustration size")
    images["images/dunkleosteus-terrelli.webp"]=dunk

    db["periods"]["devonian"]="Devon"
    for sid,source in draft["sources"].items():
        if sid in db["sources"] and db["sources"][sid]!=source:
            raise SystemExit("Scientific source ID collision: "+sid)
        db["sources"][sid]=source
    db["sources"]["devon-dunk-picture2024"]={
      "title":"Russell K. Engelman (2024), Dunkleosteus terrelli life reconstruction, Figure 4",
      "shortTitle":"Engelman 2024 — obrazová rekonstrukce",
      "url":"https://commons.wikimedia.org/wiki/File:Dunkleosteus_terrelli_2024_reconstruction.jpg",
      "kind":"Obrazový zdroj CC BY 4.0; autor Russell K. Engelman, z původní vědecké studie",
      "accessedAt":"2026-10-25"
    }
    for a in draft["animals"]:
        a["image"]["status"]="working-reconstruction"
        if a["id"]=="dunkleosteus-terrelli":
            a["image"]["note"]={"cs":"Rekonstrukce: Russell K. Engelman (2024), CC BY 4.0. Zdroj Wikimedia Commons / Palaeontologia Electronica; převod JPEG na WebP a doplnění okrajů. Licence https://creativecommons.org/licenses/by/4.0/. Tělo za pancířem zůstává hypotetické."}
            a["image"]["sourceIds"]=["devon-dunk-picture2024"]
        else:
            a["image"]["note"]={"cs":"Pracovní AI rekonstrukce. Zbarvení a některé nezachované anatomické znaky jsou hypotetické a nemusí být fosilně doložené."}
        db["dinosaurs"].append(a)

    if len(db["dinosaurs"])!=96 or len({x["id"] for x in db["dinosaurs"]})!=96:
        raise SystemExit("Result was not 96 distinct animals")
    for name,raw in images.items():
        target=ROOT/name
        if target.exists():raise SystemExit("Cannot replace existing image: "+name)
    for name,raw in images.items():
        target=ROOT/name
        target.parent.mkdir(exist_ok=True,parents=True)
        target.write_bytes(raw)
    DB.write_text(json.dumps(db,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    archive.unlink()
    # Temporary scientific source JPEG is not published: only attributed converted WebP is committed.
    jpeg.unlink()
    print("Devon import complete: 96 animals, 96 WebP images. One CC BY 4.0 image credited.")

if __name__=="__main__":
    main()
