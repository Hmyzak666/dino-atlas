#!/usr/bin/env python3
"""Check the exact reviewed five-image Ordovician bundle, then activate all five entries.

Only the feature branch imports it; no partial or unchanged image is silently accepted.
"""
import hashlib
import json
from pathlib import Path
import sys
from zipfile import ZipFile

ROOT=Path(__file__).resolve().parent.parent
ARCHIVE_NAME="Dino-Atlas-1.0.0-Ordovik-5-obrazku.zip"
ARCHIVE_SHA256="3241f1d0b703215ec5da10916499f20372887e2728d423ab9cf386e1785b0b30"
DRAFT=ROOT/"content-drafts/ordovician-five.json"
DATABASE=ROOT/"dinosaurs.json"

def run():
    if len(sys.argv)!=2 or Path(sys.argv[1]).name!=ARCHIVE_NAME:
        raise SystemExit("Use: python3 tools/import_ordovician.py "+ARCHIVE_NAME)
    archive=ROOT/ARCHIVE_NAME
    if not archive.is_file() or hashlib.sha256(archive.read_bytes()).hexdigest()!=ARCHIVE_SHA256:
        raise SystemExit("Ordovician ZIP is missing or SHA-256 checksum does not match")
    draft=json.loads(DRAFT.read_text(encoding="utf8"))
    db=json.loads(DATABASE.read_text(encoding="utf8"))
    if draft.get("status")!="draft-awaiting-five-original-webp-images" or len(draft["animals"])!=5:
        raise SystemExit("Exactly five reviewed Ordovician drafts are required")
    if len(db["dinosaurs"])!=78 or len([a for a in db["dinosaurs"] if a["period"]=="cambrian"])!=6:
        raise SystemExit("The full verified 78-species foundation is required")
    ids=[animal["id"] for animal in draft["animals"]]
    if len(set(ids))!=5 or any(a["id"] in ids for a in db["dinosaurs"]):
        raise SystemExit("Duplicate or existing animal ID")
    expected={f"images/{id}.webp" for id in ids}
    verified={}
    with ZipFile(archive) as z:
        names=z.namelist()
        if len(names)!=5 or len(set(names))!=5 or set(names)!=expected:
            raise SystemExit("The archive must contain exactly five specific WebP files")
        for name in sorted(expected):
            raw=z.read(name)
            if not 10000 <= len(raw) <= 300000:
                raise SystemExit("Wrong image size: "+name)
            if raw[:4]!=b'RIFF' or raw[8:12]!=b'WEBP' or int.from_bytes(raw[4:8],'little')+8!=len(raw):
                raise SystemExit("Invalid WebP structure: "+name)
            if (ROOT/name).exists():
                raise SystemExit("An image must not overwrite an existing species: "+name)
            verified[name]=raw
    db["periods"]["ordovician"]="Ordovik"
    for sid,source in draft["sources"].items():
        if sid in db["sources"] and db["sources"][sid]!=source:
            raise SystemExit("Research source ID conflict "+sid)
        db["sources"][sid]=source
    for a in draft["animals"]:
        a["image"]["status"]="working-reconstruction"
        a["image"]["note"]={"cs":"Pracovní AI rekonstrukce. Obraz a zbarvení jsou ilustrativní; nejisté části těla nejsou přímým fosilním dokladem."}
        db["dinosaurs"].append(a)
    if len(db["dinosaurs"])!=83 or len({a["id"] for a in db["dinosaurs"]})!=83:
        raise SystemExit("Final species count or uniqueness failed")
    for path,data in verified.items():
        target=ROOT/path
        target.parent.mkdir(parents=True,exist_ok=True)
        target.write_bytes(data)
    DATABASE.write_text(json.dumps(db,ensure_ascii=False,indent=2)+"\n",encoding='utf8')
    archive.unlink()
    print("Success: 83 active species, five distinct verified Ordovician WebP images.")

if __name__=="__main__":
    run()
