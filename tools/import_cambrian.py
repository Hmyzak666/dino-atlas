#!/usr/bin/env python3
"""Atomically activate the six scientifically sourced Cambrian drafts after image verification.

Use only with the exact reviewed image archive. Never merge a partially imported batch.
"""
import hashlib
import json
from pathlib import Path
import sys
from zipfile import ZipFile

ROOT=Path(__file__).resolve().parent.parent
ARCHIVE_NAME="Dino-Atlas-1.0.0-Kambrium-6-obrazku.zip"
ARCHIVE_SHA256="357ffe2fbaa7fc84d56dad827a8715a5f072504c9b80e468504a00960cefb376"
DRAFT_FILE=ROOT/"content-drafts/cambrian-six.json"
DATABASE=ROOT/"dinosaurs.json"

def run() -> None:
    if len(sys.argv)!=2 or Path(sys.argv[1]).name != ARCHIVE_NAME:
        raise SystemExit("Usage: python3 tools/import_cambrian.py Dino-Atlas-1.0.0-Kambrium-6-obrazku.zip")
    archive=ROOT/ARCHIVE_NAME
    if not archive.is_file() or hashlib.sha256(archive.read_bytes()).hexdigest()!=ARCHIVE_SHA256:
        raise SystemExit("Unexpected or tampered image archive")
    draft=json.loads(DRAFT_FILE.read_text(encoding="utf8"))
    db=json.loads(DATABASE.read_text(encoding="utf8"))
    if draft.get("status")!="draft-awaiting-six-original-webp-images" or len(draft["animals"])!=6:
        raise SystemExit("Not six reviewed Cambrian drafts")
    ids=[d["id"] for d in draft["animals"]]
    expected={f"images/{key}.webp" for key in ids}
    if len(set(ids))!=6 or len(db["dinosaurs"])!=72:
        raise SystemExit("Expected 72 original animals before first six-image import")
    if any(d["id"] in set(ids) for d in db["dinosaurs"]):
        raise SystemExit("One or more species already exist in the active database")
    checked={}
    with ZipFile(archive) as z:
        if set(z.namelist())!=expected or len(z.namelist())!=6:
            raise SystemExit("Image archive contains unexpected/missing files")
        for name in sorted(expected):
            data=z.read(name)
            if not 10000 <= len(data) <= 300000:
                raise SystemExit(f"Unexpected image size: {name}")
            if data[:4]!=b"RIFF" or data[8:12]!=b"WEBP":
                raise SystemExit(f"Not a WebP image: {name}")
            # RIFF declared file size must equal actual length.
            if int.from_bytes(data[4:8],"little")+8!=len(data):
                raise SystemExit(f"Broken WebP RIFF length: {name}")
            checked[name]=data
    db["periods"]["cambrian"]="Kambrium"
    for sid,source in draft["sources"].items():
        if sid in db["sources"] and db["sources"][sid]!=source:
            raise SystemExit("Source key conflict: "+sid)
        db["sources"][sid]=source
    for animal in draft["animals"]:
        animal["image"]["status"]="working-reconstruction"
        animal["image"]["note"]={"cs":"Pracovní AI rekonstrukce; vzhled, barva a některé měkké anatomické znaky jsou ilustrativní a nemusí přesně odpovídat fosiliím."}
        db["dinosaurs"].append(animal)
    if len(db["dinosaurs"])!=78 or len(set(a["id"] for a in db["dinosaurs"]))!=78:
        raise SystemExit("Invalid result size")
    # Only after every check write files; in GitHub Actions the working copy is discarded on failure.
    for name,data in checked.items():
        path=ROOT/name
        if path.exists():
            raise SystemExit(f"Refusing to replace an existing image: {name}")
        path.parent.mkdir(exist_ok=True,parents=True)
        path.write_bytes(data)
    DATABASE.write_text(json.dumps(db,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    archive.unlink()
    print("Activated exactly 6 Cambrian entries with 6 verified WebP images; total 78; no stable branch modified.")

if __name__=="__main__":
    run()
