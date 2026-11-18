#!/usr/bin/env python3
"""Atomically import the five sourced Silurian entries and five unique approved WebP images."""
import hashlib
import json
from pathlib import Path
import sys
from zipfile import ZipFile

ROOT=Path(__file__).resolve().parent.parent
ARCHIVE_NAME="Dino-Atlas-1.0.0-Silur-5-obrazku.zip"
ARCHIVE_SHA256="c80efdc6af8430579f9d1ff72489feb7e75d17d27f431d8f7bbff66cbaf76f00"
DRAFT=ROOT/"content-drafts/silurian-five.json"
DATABASE=ROOT/"dinosaurs.json"

def main():
    if len(sys.argv)!=2 or Path(sys.argv[1]).name!=ARCHIVE_NAME:
        raise SystemExit("Use: python3 tools/import_silurian.py "+ARCHIVE_NAME)
    archive=ROOT/ARCHIVE_NAME
    if not archive.is_file() or hashlib.sha256(archive.read_bytes()).hexdigest()!=ARCHIVE_SHA256:
        raise SystemExit("Silurian ZIP missing or unexpected checksum")
    draft=json.loads(DRAFT.read_text(encoding="utf-8"))
    db=json.loads(DATABASE.read_text(encoding="utf-8"))
    if draft.get("status")!="draft-awaiting-five-original-webp-images" or len(draft["animals"])!=5:
        raise SystemExit("Expected five reviewed draft records")
    if len(db["dinosaurs"])!=83 or sum(a["period"]=="cambrian" for a in db["dinosaurs"])!=6 or sum(a["period"]=="ordovician" for a in db["dinosaurs"])!=5:
        raise SystemExit("Verified complete 83-species foundation required")
    ids=[a["id"] for a in draft["animals"]]
    if len(set(ids))!=5 or any(a["id"] in ids for a in db["dinosaurs"]):
        raise SystemExit("Repeated or existing Silurian ID")
    expected={f"images/{id}.webp" for id in ids}
    verified={}
    with ZipFile(archive) as z:
        names=z.namelist()
        if len(names)!=5 or len(set(names))!=5 or set(names)!=expected:
            raise SystemExit("Only the five reviewed image paths are allowed")
        for name in sorted(expected):
            raw=z.read(name)
            if not 10000 <= len(raw) <= 300000:
                raise SystemExit("Invalid size: "+name)
            if raw[:4]!=b"RIFF" or raw[8:12]!=b"WEBP" or int.from_bytes(raw[4:8],"little")+8!=len(raw):
                raise SystemExit("Broken RIFF/WebP file: "+name)
            if (ROOT/name).exists():
                raise SystemExit("Refusing to overwrite image: "+name)
            verified[name]=raw
    db["periods"]["silurian"]="Silur"
    for sid,source in draft["sources"].items():
        if sid in db["sources"] and db["sources"][sid]!=source:
            raise SystemExit("Scientific source ID collision: "+sid)
        db["sources"][sid]=source
    for a in draft["animals"]:
        a["image"]["status"]="working-reconstruction"
        a["image"]["note"]={"cs":"Pracovní AI ilustrace. Rekonstruované zbarvení a některé měkké anatomické detaily nejsou fosilně doložené; vědecky nejisté prvky jsou vysvětlené v textu."}
        db["dinosaurs"].append(a)
    if len(db["dinosaurs"])!=88 or len({a["id"] for a in db["dinosaurs"]})!=88:
        raise SystemExit("Wrong total species count")
    # All validations run before writing. On Actions failure the working tree is discarded.
    for name,data in verified.items():
        f=ROOT/name
        f.parent.mkdir(parents=True,exist_ok=True)
        f.write_bytes(data)
    DATABASE.write_text(json.dumps(db,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    archive.unlink()
    print("Silurian import successful: 88 distinct animals, 88 offline WebP images.")

if __name__=="__main__":
    main()
