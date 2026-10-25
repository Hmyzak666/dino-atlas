#!/usr/bin/env python3
"""Activate the final eight scientifically checked Permian entries with pinned Commons images.

Runs ONLY in the 1.0 feature branch's single-use Actions workflow. All eight source
images must match previous audit SHA-1 and geometry; verify them before any writing.
Preserve attribution and ShareAlike terms on every derivative WebP.
"""
import hashlib
from io import BytesIO
import json
import os
from pathlib import Path
from urllib.parse import quote
from urllib.request import urlopen,Request
from PIL import Image,ImageOps

ROOT=Path(__file__).resolve().parent.parent
DATA=ROOT/"dinosaurs.json"
DRAFT=ROOT/"content-drafts/permian-eight.json"
RECORDS=[
  ("dimetrodon-grandis","Dimetrodon grandis 3D Model Reconstruction.png","Max Bellomio","CC BY-SA 4.0","f2d97e9e4658ffb99e2d9c1e07485bde9ce2289f",(2112,1188)),
  ("edaphosaurus-pogonias","EdaphosaurusDB.jpg","Dmitry Bogdanov","CC BY-SA 3.0","f80074c071b6f147a714045ec0f2be3121a6d7f8",(900,600)),
  ("inostrancevia-alexandri","Inostrancevia reconstruction.jpg","Mario Lanzas","CC BY-SA 4.0","57f1ceb1a1e4fdf5d682f68a60567ecfb23b3382",(1692,888)),
  ("scutosaurus-karpinskii","Scutosaurus restoration (cropped).jpg","Marco Romano et al. 2021","CC BY 4.0","d23bfa6d619f94abf647a0a698a3b2053e01d441",(1754,859)),
  ("mesosaurus-tenuidens","MESOSAURUS.png","GabrieMacrothorax","CC BY 4.0","0738f535e47bdd7ed968697b7a3965c994e9cd5f",(1920,1080)),
  ("diplocaulus-magnicornis","Diplocaulus recon.png","Entelognathus","CC BY-SA 4.0","54d9378f565f7a063edd7885770888cf693fe606",(1600,685)),
  ("helicoprion-bessonowi","Helicoprion as chimeroid.jpg","DiBgd","CC BY-SA 4.0","b222e619412eb84fd65bf64fee77278243dc9e84",(3300,2550)),
  ("estemmenosuchus-uralensis","Estemmenosuchus uralensis.jpg","Mojcaj","CC BY-SA 3.0","743164ad7adc72788ede7d4d01f0702f5cb4e4dc",(800,465))
]
def commons_url(name):
    normalized=name.replace(" ","_")
    digest=hashlib.md5(normalized.encode("utf-8")).hexdigest()
    return "https://upload.wikimedia.org/wikipedia/commons/"+digest[0]+"/"+digest[:2]+"/"+quote(normalized,safe="._()-")

def main():
    ref=os.environ.get("GITHUB_REF")
    if ref!="refs/heads/feature/paleozoic-1.0.0":
        raise SystemExit("Permian one-time importer may run only on the isolated feature branch")
    if len(RECORDS)!=8 or len({r[0] for r in RECORDS})!=8:
        raise SystemExit("Exactly eight Permian image source identities required")
    draft=json.loads(DRAFT.read_text(encoding="utf-8"))
    db=json.loads(DATA.read_text(encoding="utf-8"))
    expected=[r[0] for r in RECORDS]
    if draft.get("status")!="draft-awaiting-eight-original-webp-images" or [a["id"] for a in draft["animals"]]!=expected:
        raise SystemExit("Unexpected Permian draft names or order")
    if len(db["dinosaurs"])!=104 or len({a["id"] for a in db["dinosaurs"]})!=104:
        raise SystemExit("Verified 104-species Carboniferous foundation required")
    if sum(a["period"]=="carboniferous" for a in db["dinosaurs"])!=8:
        raise SystemExit("Carboniferous previous batch is incomplete")
    old_ids={a["id"] for a in db["dinosaurs"]}
    if any(id in old_ids for id in expected):
        raise SystemExit("Some Permian entries already installed")

    newimages={}
    for id,title,author,licence,sha1,expected_dims in RECORDS:
        link=commons_url(title)
        request=Request(link,headers={
            "User-Agent":"DinoAtlas educational paleontology/1.0 (https://github.com/Hmyzak666/dino-atlas)",
            "Accept":"image/*"})
        with urlopen(request,timeout=50) as response:
            source=response.read(12_000_001)
        if len(source)>12_000_000 or hashlib.sha1(source).hexdigest()!=sha1:
            raise SystemExit("Wikimedia source image changed or is unavailable: "+id)
        with Image.open(BytesIO(source)) as im:
            im.load()
            if im.size!=expected_dims or im.format not in ("JPEG","PNG"):
                raise SystemExit("Unexpected image dimensions/format: "+id)
            original=im.convert("RGB")
        # Letterbox rather than crop anatomical landmarks such as sails, horns and tooth whorls.
        canvas=Image.new("RGB",(1152,768),(236,239,236))
        fitted=ImageOps.contain(original,(1112,728),Image.Resampling.LANCZOS)
        canvas.paste(fitted,((1152-fitted.width)//2,(768-fitted.height)//2))
        buffer=BytesIO()
        canvas.save(buffer,format="WEBP",quality=84,method=6)
        blob=buffer.getvalue()
        if not (15_000<len(blob)<600_000) or blob[:4]!=b"RIFF" or blob[8:12]!=b"WEBP":
            raise SystemExit("Invalid converted WebP size: "+id+" "+str(len(blob)))
        destination="images/"+id+".webp"
        if (ROOT/destination).exists():raise SystemExit("Cannot overwrite previously published image: "+id)
        newimages[destination]=blob
        print("Approved "+id+"; source SHA1 "+sha1+"; WebP bytes "+str(len(blob)),flush=True)

    db["periods"]["permian"]="Perm"
    for sid,source in draft["sources"].items():
        if sid in db["sources"] and db["sources"][sid]!=source:
            raise SystemExit("Scientific research source ID conflict: "+sid)
        db["sources"][sid]=source
    for animal,(_,title,author,licence,sha1,dims) in zip(draft["animals"],RECORDS):
        id=animal["id"]
        recordid="perm-artwork-"+id
        sourcepage="https://commons.wikimedia.org/wiki/File:"+quote(title.replace(" ","_"))
        licenseurl="https://creativecommons.org/licenses/"+licence.replace("CC ","").replace("-","-").replace(" ","").lower()+"/"
        # CC BY-SA 4.0 -> by-sa/4.0 ; CC BY 4.0 -> by/4.0
        parts=licence.split(" ")
        licenseurl="https://creativecommons.org/licenses/"+parts[1].lower()+"/"+parts[2]+"/"
        db["sources"][recordid]={
          "title":author+" — "+title,
          "shortTitle":author+" / "+licence,
          "url":sourcepage,
          "kind":"Obrazový zdroj Commons, licence CC "+parts[1]+" "+parts[2],
          "accessedAt":"2026-10-25"
        }
        animal["image"]["status"]="working-reconstruction"
        animal["image"]["sourceIds"]=[recordid]
        animal["image"]["note"]={"cs":"Obraz: "+author+"; Wikimedia Commons ("+sourcepage+"). Licence "+licence+": "+licenseurl+" Úpravy: převod do WebP, změna rozlišení a doplnění neutrálních okrajů. Odvozený obraz pod stejnou licencí, pokud vyžaduje ShareAlike. Jde o uměleckou rekonstrukci; barvy a měkké znaky mohou být hypotetické."}
        db["dinosaurs"].append(animal)
    if len(db["dinosaurs"])!=112 or len({a["id"] for a in db["dinosaurs"]})!=112:
        raise SystemExit("Output did not contain 112 unique animals")

    for path,blob in newimages.items():
        dest=ROOT/path
        dest.parent.mkdir(parents=True,exist_ok=True)
        dest.write_bytes(blob)
    DATA.write_text(json.dumps(db,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print("Activated all eight Permian species: exactly 112 entries and 112 local WebP assets.",flush=True)

if __name__=="__main__":main()
