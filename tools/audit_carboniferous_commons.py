#!/usr/bin/env python3
"""Download and inspect eight species-specific Wikimedia Commons illustrations.

AUDIT ONLY: never changes dinosaurs.json or active atlas images.
Source/title/author/license are editorially reviewed in GitHub docs.
"""
import hashlib
import json
from pathlib import Path
import urllib.request
import urllib.parse
from PIL import Image, ImageOps, ImageDraw, ImageFont
from io import BytesIO

ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/"carboniferous-audit"
SOURCES=[
    {"id":"arthropleura-armata","title":"Arthropleura Reconstruction.jpg","author":"Prehistorica CM","license":"CC BY 4.0","sha1":"95cee885d03dda1da96435d480e89cd65572eef3","dimensions":[4200,3170]},
    {"id":"meganeura-monyi","title":"Meganeura.png","author":"Qohelet12","license":"CC BY-SA 4.0","sha1":"51c9a831ac6983bec12bd0f333672fb1961bf8b8","dimensions":[2500,1400]},
    {"id":"pulmonoscorpius-kirktonensis","title":"Pulmonoscorpius kirktonensis.jpg","author":"Prehistorica CM","license":"CC BY 4.0","sha1":None,"dimensions":[5140,3730]},
    {"id":"hylonomus-lyelli","title":"Hylonomus lyelli - MUSE.jpg","author":"Matteo De Stefano / MUSE","license":"CC BY-SA 3.0","sha1":None,"dimensions":[1688,1459]},
    {"id":"greererpeton-burkemorani","title":"Greererpeton BW.jpg","author":"Nobu Tamura","license":"CC BY 2.5","sha1":None,"dimensions":[800,322]},
    {"id":"edestus-heinrichi","title":"Edestus recon.png","author":"Entelognathus","license":"CC BY-SA 4.0","sha1":None,"dimensions":[3226,1304]},
    {"id":"petrolacosaurus-kansensis","title":"Petrolacosaurus BW.jpg","author":"Nobu Tamura","license":"CC BY 2.5","sha1":"a4b851735897aa8a11fb76f309aeae123ae89e3b","dimensions":[788,313]},
    {"id":"crassigyrinus-scoticus","title":"Crassygyrinus224.jpg","author":"ДиБгд","license":"CC BY 4.0","sha1":None,"dimensions":[2953,2362]}
]

def wikimedia_url(title):
    normalized=title.replace(" ","_")
    first=hashlib.md5(normalized.encode("utf-8")).hexdigest()
    return "https://upload.wikimedia.org/wikipedia/commons/"+first[0]+"/"+first[:2]+"/"+urllib.parse.quote(normalized,safe="._()-")

def main():
    draft=json.loads((ROOT/"content-drafts/carboniferous-eight.json").read_text("utf-8"))
    assert len(draft["animals"])==len(SOURCES)==8
    assert [a["id"] for a in draft["animals"]]==[a["id"] for a in SOURCES]
    OUT.mkdir(exist_ok=True)
    manifest=[]
    panels=[]
    for idx,item in enumerate(SOURCES):
        url=wikimedia_url(item["title"])
        req=urllib.request.Request(url,headers={"User-Agent":"DinoAtlas/1.0 (educational paleontology; https://github.com/Hmyzak666/dino-atlas)","Accept":"image/*"})
        with urllib.request.urlopen(req,timeout=55) as response:
            content=response.read(16_000_001)
            if len(content)>16_000_000:
                raise SystemExit("Oversized source image: "+item["id"])
        sha1=hashlib.sha1(content).hexdigest()
        if item["sha1"] and sha1!=item["sha1"]:
            raise SystemExit("Wikimedia source changed / wrong SHA-1: "+item["id"]+" actual "+sha1)
        original=Image.open(BytesIO(content))
        original.load()
        if list(original.size)!=item["dimensions"] or original.format not in ("JPEG","PNG"):
            raise SystemExit("Wrong image dimensions or format: "+item["id"]+" "+str(original.size))
        if original.width < 600:
            raise SystemExit("Insufficient image width: "+item["id"])
        src_path=OUT/("source-%02d."%idx+("jpg" if original.format=="JPEG" else "png"))
        src_path.write_bytes(content)
        # Review-sized previews are NOT active atlas files.
        preview=Image.new("RGB",(600,438),(238,241,235))
        picture=ImageOps.contain(original.convert("RGB"),(584,374),Image.Resampling.LANCZOS)
        preview.paste(picture,((600-picture.width)//2,(382-picture.height)//2))
        painter=ImageDraw.Draw(preview)
        painter.rectangle((0,382,600,438),fill=(31,43,39))
        painter.text((10,392),item["id"],fill=(248,248,246))
        painter.text((10,413),item["author"]+" / "+item["license"],fill=(203,220,209))
        preview.save(OUT/(item["id"]+"-review.jpg"),quality=85)
        panels.append(preview)
        record={**item,"url":url,"sha1":sha1,"bytes":len(content),"wikimedia_page":"https://commons.wikimedia.org/wiki/File:"+urllib.parse.quote(item["title"].replace(" ","_"))}
        manifest.append(record)
        print(item["id"],"SHA1="+sha1,"bytes="+str(len(content)),"dimension="+str(original.size),flush=True)
    montage=Image.new("RGB",(1200,1752),(245,246,243))
    for i,panel in enumerate(panels):
        montage.paste(panel,((i%2)*600,(i//2)*438))
    montage.save(OUT/"review-all-eight.jpg",quality=87)
    (OUT/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print("AUDIT COMPLETE: 8 distinct cited source images. Atlas remains unchanged.",flush=True)

if __name__=="__main__":
    main()
