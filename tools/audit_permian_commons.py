#!/usr/bin/env python3
"""Read-only audit of eight species-identified Permian artworks from Wikimedia Commons.

Outputs previews and a manifest, never publishes animals nor modifies atlas images.
Review the actual pixels and licence/attribution data before enabling import.
"""
import hashlib
from io import BytesIO
import json
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen

from PIL import Image, ImageOps, ImageDraw

ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/"permian-audit"
SOURCES=[
    dict(id="dimetrodon-grandis",title="Dimetrodon grandis 3D Model Reconstruction.png",author="DiBgd",licence="CC BY-SA 4.0",dims=[2112,1188]),
    dict(id="edaphosaurus-pogonias",title="EdaphosaurusDB.jpg",author="Dmitry Bogdanov",licence="CC BY-SA 3.0",dims=[900,600]),
    dict(id="inostrancevia-alexandri",title="Inostrancevia reconstruction.jpg",author="Mario Lanzas",licence="CC BY-SA 4.0",dims=[1692,888]),
    dict(id="scutosaurus-karpinskii",title="Scutosaurus restoration (cropped).jpg",author="Marco Romano et al. 2021",licence="CC BY 4.0",dims=[1754,859]),
    dict(id="mesosaurus-tenuidens",title="MESOSAURUS.png",author="GabrieMacrothorax",licence="CC BY 4.0",dims=[1920,1080]),
    dict(id="diplocaulus-magnicornis",title="Diplocaulus recon.png",author="Entelognathus",licence="CC BY-SA 4.0",dims=[1600,685]),
    dict(id="helicoprion-bessonowi",title="Helicoprion as chimeroid.jpg",author="DiBgd",licence="CC BY-SA 3.0",dims=[3300,2550]),
    dict(id="estemmenosuchus-uralensis",title="Estemmenosuchus uralensis.jpg",author="Mojcaj",licence="CC BY-SA 3.0",dims=[800,465]),
]
def wikimedia_url(name):
    clean=name.replace(" ","_")
    md=hashlib.md5(clean.encode("utf-8")).hexdigest()
    return "https://upload.wikimedia.org/wikipedia/commons/"+md[0]+"/"+md[:2]+"/"+quote(clean,safe="._()-")

def main():
    d=json.loads((ROOT/"content-drafts/permian-eight.json").read_text("utf-8"))
    assert [x["id"] for x in d["animals"]]==[x["id"] for x in SOURCES], "Unexpected species ordering"
    OUT.mkdir(exist_ok=True)
    full=[]
    panels=[]
    for i,item in enumerate(SOURCES):
        url=wikimedia_url(item["title"])
        req=Request(url,headers={"User-Agent":"DinoAtlas scientific educational source audit/1.0 (https://github.com/Hmyzak666/dino-atlas)","Accept":"image/*"})
        with urlopen(req,timeout=45) as res:
            data=res.read(12_000_001)
        if len(data)>12_000_000: raise RuntimeError("Image too large: "+item["id"])
        with Image.open(BytesIO(data)) as inp:
            inp.load()
            if list(inp.size)!=item["dims"] or inp.format not in ("JPEG","PNG"):
                raise RuntimeError("Unexpected source image: "+item["id"]+" "+str(inp.size)+" "+str(inp.format))
            img=inp.convert("RGB")
        (OUT/("source-%02d."%i+("png" if item["title"].endswith(".png") else "jpg"))).write_bytes(data)
        sha=hashlib.sha1(data).hexdigest()
        panel=Image.new("RGB",(600,438),(237,240,237))
        itempic=ImageOps.contain(img,(590,372),Image.Resampling.LANCZOS)
        panel.paste(itempic,((600-itempic.width)//2,(382-itempic.height)//2))
        draw=ImageDraw.Draw(panel)
        draw.rectangle((0,382,599,437),fill=(31,42,38))
        draw.text((10,391),item["id"],fill=(247,247,246))
        draw.text((10,414),item["author"]+" / "+item["licence"],fill=(203,217,207))
        panel.save(OUT/(item["id"]+"-review.jpg"),quality=88)
        panels.append(panel)
        full.append({**item,"image_url":url,"sha1":sha,"bytes":len(data),"page":"https://commons.wikimedia.org/wiki/File:"+quote(item["title"].replace(" ","_"))})
        print(item["id"],img.size,sha,len(data),flush=True)
    combo=Image.new("RGB",(1200,1752),(243,244,242))
    for i,im in enumerate(panels):combo.paste(im,((i%2)*600,(i//2)*438))
    combo.save(OUT/"permian-all-eight-contact-sheet.jpg",quality=89)
    (OUT/"sources.json").write_text(json.dumps(full,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print("PASS: eight separate scientific image sources downloaded for REVIEW ONLY; no animal records modified.")
if __name__=="__main__": main()
