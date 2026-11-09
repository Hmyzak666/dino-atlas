#!/usr/bin/env python3
"""Carefully apply the first three visually reviewed Silurian paintings.

An exact-hash, all-or-nothing importer. It backs up all original image bytes and
changes no species IDs, classifications, other artwork or Android signer. Run
only on isolated feature/paleozoic-1.0.0; GitHub CI validates before committing.
"""
import hashlib
import json
import os
from pathlib import Path
from zipfile import ZipFile
from io import BytesIO
from PIL import Image

ROOT=Path(__file__).resolve().parent.parent
ARCHIVE=ROOT/"DinoAtlas_VisualRefresh_01_3_images.zip"
EXPECTED_ARCHIVE_SHA256="056c5ba8b5c90b280ae71b47371b577d2ba73973ad1f436d976a4d41f86f2024"
DB=ROOT/"dinosaurs.json"
PROJECT=ROOT/"project.json"
BACKUPS=ROOT/"docs/backups/visual-refresh-01"
CHECKS={
"eurypterus-remipes":{
  "old":"09f6ccb10f9ed8eaa97b638197c012fbf7d7cb83181e54773ea9ed1e9f96df98",
  "new":"61622939bcb325ba71b895fa00879a295f1216a0573d53e4406d12191634be71",
  "note":"Vlastní pracovní digitální rekonstrukce, bez rozmazaných okrajů. Doloženy jsou plovací veslovité končetiny, krátké klepítkovité části úst, článkovaný trup a ocasní hrot. Barva a prostředí jsou ilustrativní."
},
"entelognathus-primordialis":{
  "old":"08fbc8af481f203489d5f6b6dfa31675ba0a53edf9618630fe765024af21b390",
  "new":"1e88cefd5fd4d4ec5956d3b7089b01ca2cc6fcc56e31e783ab1d50ba18210f49",
  "note":"Vlastní pracovní digitální rekonstrukce. Fosilie dokládají pancíř a čelistní kosti, novější nálezy i šupiny; přesné proporce trupu, ocasní ploutve a zbarvení jsou částečně hypotetické."
},
"qilinyu-rostrata":{
  "old":"5aa96cbd0c39afebeac26e6c1ed0fc8b17917feb48c0d5f6154930cc30b6e261",
  "new":"26e8747af950ffa7bf673bc39ebd6d538936a8ccbf7ff3030a45e5c2c4d86f6a",
  "note":"Vlastní pracovní digitální rekonstrukce. Doložen je protáhlý rypec, kostěný přední pancíř a prsní ploutve, podoba zadního trupu, ocasu a zbarvení jsou rekonstruované."
}
}

def digest(data):return hashlib.sha256(data).hexdigest()

def run():
    if os.environ.get("GITHUB_REF")!="refs/heads/feature/paleozoic-1.0.0":
        raise SystemExit("Visual refresh must run only in isolated feature/paleozoic-1.0.0")
    if not ARCHIVE.is_file() or digest(ARCHIVE.read_bytes())!=EXPECTED_ARCHIVE_SHA256:
        raise SystemExit("Missing or unapproved three-species ZIP; do not replace any existing artwork")
    db=json.loads(DB.read_text(encoding="utf-8"))
    project=json.loads(PROJECT.read_text(encoding="utf-8"))
    if (project.get("version"),project.get("versionCode"))!=("1.0.0",1000000):
        raise SystemExit("Expected installed test baseline 1.0.0 / 1000000")
    animals=db["dinosaurs"]
    if len(animals)!=112 or len({a["id"] for a in animals})!=112:
        raise SystemExit("All 112 existing species IDs must be intact")
    byid={a["id"]:a for a in animals}
    if set(CHECKS)-set(byid):
        raise SystemExit("Missing target species")
    if not all(byid[k]["period"]=="silurian" for k in CHECKS):
        raise SystemExit("This small batch is strictly Silurian")
    filenames={"images/"+id+".webp" for id in CHECKS}
    prepared={}
    original={}
    with ZipFile(ARCHIVE) as z:
        listed=z.namelist()
        if len(listed)!=3 or set(listed)!=filenames or len(set(listed))!=3:
            raise SystemExit("ZIP must contain the three exact independent WebP files, no extra files")
        for id,claim in CHECKS.items():
            name="images/"+id+".webp"
            payload=z.read(name)
            if digest(payload)!=claim["new"]:
                raise SystemExit("New artwork checksum mismatch: "+id)
            if payload[:4]!=b"RIFF" or payload[8:12]!=b"WEBP" or int.from_bytes(payload[4:8],"little")+8!=len(payload):
                raise SystemExit("Malformed WebP: "+id)
            with Image.open(BytesIO(payload)) as image:
                image.load()
                if image.format!="WEBP" or image.size!=(1152,768):
                    raise SystemExit("Unexpected picture dimensions / format: "+id)
            old_path=ROOT/name
            if not old_path.is_file():
                raise SystemExit("Original image was missing: "+id)
            oldbytes=old_path.read_bytes()
            if digest(oldbytes)!=claim["old"]:
                raise SystemExit("Original image differs from exact phone-tested APK: "+id)
            prepared[name]=payload
            original[name]=oldbytes
    if BACKUPS.exists():
        raise SystemExit("Backup path already exists; do not run the batch twice")

    # All validations complete; failures before this point leave the tree unchanged.
    BACKUPS.mkdir(parents=True,exist_ok=False)
    olddir=BACKUPS/"images"
    olddir.mkdir()
    for name,old in original.items():
        (olddir/Path(name).name).write_bytes(old)
    for name,data in prepared.items():
        (ROOT/name).write_bytes(data)
        id=Path(name).stem
        im=byid[id]["image"]
        im["note"]={"cs":CHECKS[id]["note"]}
        im["status"]="working-reconstruction"
        im.pop("sourceIds",None)  # All three new pictures are original AI visual interpretations.
    manifest={"batch":"visual-refresh-01","versionCodeBefore":1000000,"versionCodeAfter":1000001,
      "originals":{Path(k).name:digest(v) for k,v in original.items()},
      "replacements":{Path(k).name:digest(v) for k,v in prepared.items()},
      "source":"Three distinct original working AI illustrations, no third-party picture components",
      "scientificLimitations":"See each animal image.note, original research claims remain unchanged."}
    (BACKUPS/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    project["versionCode"]=1000001
    PROJECT.write_text(json.dumps(project,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    DB.write_text(json.dumps(db,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    ARCHIVE.unlink()
    print("PASS: 3 replacements; 3 backed-up originals, 112 species unchanged, next test build 1.0.0 (1000001).")

if __name__=="__main__":run()
