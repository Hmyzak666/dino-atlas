"""Read-only image inventory and reproducible illustrated editorial audit."""
import csv, hashlib, io, json, sys
from collections import Counter
from pathlib import Path
from xml.sax.saxutils import escape
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'docs/audit-112'
data = json.loads((ROOT/'dinosaurs.json').read_text())
animals = data['dinosaurs']
rows = list(csv.DictReader((OUT/'observations.tsv').open(), delimiter='\t'))
assert len(rows) == len(animals) == 112
assert [int(r['index']) for r in rows] == list(range(112))
categories = ['Bez problémů','Drobná vizuální odchylka','Výrazná vizuální odchylka','Anatomická chyba']
periods = ['cambrian','ordovician','silurian','devonian','carboniferous','permian','triassic','jurassic','cretaceous']
extra = {
 46: ('Mecochiridi: revize 2025','https://www.cambridge.org/core/journals/journal-of-paleontology/article/resurrection-of-eumorphia-von-meyer-1847-and-some-taxonomical-considerations-of-other-mecochirid-lobsters-crustacea-decapoda-mecochiridae/64789719CCC13A0863CA83DC0C0DC69C'),
 71: ('Zietlow 2020: ontogeneze Tylosaura','https://pmc.ncbi.nlm.nih.gov/articles/PMC7583613/'),
 77: ('Mussini a kol. 2024: nová orientace těla','https://www.cell.com/article/S0960982224006699/pdf'),
 87: ('Zhu a kol. 2016: popis lebky','https://www.sciencemagazinedigital.org/sciencemagazine/21_october_2016?pg=98'),
 90: ('Béchard a kol. 2014: 3D anatomie','https://palaeo-electronica.org/content/2014/647-3d-bothriolepis'),
 92: ('Přehled vývoje počtu prstů 2017','https://pmc.ncbi.nlm.nih.gov/articles/PMC5182414/'),
 93: ('J. A. Clack: Acanthostega','https://tolweb.org/Acanthostega/15016'),
 94: ('Frey a kol. 2023: srovnání kladoselachidů','https://link.springer.com/article/10.1186/s13358-023-00266-6'),
 101: ('Tapanila a Pruitt 2019: korunky a čepele','https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0220958'),
}
records=[]
for a,r in zip(animals,rows):
 p=ROOT/a['image']['src']; raw=p.read_bytes()
 with Image.open(p) as im: size=list(im.size); fmt=im.format
 severity=int(r['severity'])
 # Technical deviations are explicit, but do not turn otherwise good art into a replacement request.
 if size != [1152,768]: severity=max(severity,1)
 ids=[]
 for fact in a.get('facts',[]):
  for sid in fact.get('sourceIds',[]):
   if sid not in ids: ids.append(sid)
 sources=[{'title':data['sources'][s]['title'],'url':data['sources'][s]['url'],'scope':'Podklad převzatý z databáze projektu; ne všechny celé studie byly znovu otevřeny.'} for s in ids[:2]]
 i=int(r['index'])
 if i in extra:sources.insert(0,{'title':extra[i][0],'url':extra[i][1],'scope':'Doplněná rešerše tohoto auditu: relevantní text nebo abstrakt.'})
 records.append(dict(index=i,id=a['id'],name=a['scientificName'],period=a['period'],category=categories[severity],severity=severity,
   visual=r['visual'],anatomy=r['anatomy'],environment=r['environment'],image=a['image']['src'],size=size,format=fmt,
   sha256=hashlib.sha256(raw).hexdigest(),formatPass=size==[1152,768] and fmt=='WEBP',
   sources=sources,credits=a['image'].get('note',{}).get('cs',''),
   evidenceLimit='Barevnost, osvětlení, měkké tkáně a konkrétní krajina jsou převážně hypotetické. Zakrytý znak není prokázaně chybějící.'))
counts=Counter(r['category'] for r in records)
payload={'date':'2026-10-28','branch':'feature/paleozoic-1.0.0','baseCommit':'29158c34d2f7f77994b9909834dcbe87e31c9a89',
 'scope':'Redakční vizuální audit všech 112 obrazů a anatomický screening. Není nezávislou odbornou certifikací všech detailů. Cílená nová rešerše podezřelých znaků, u ostatních návaznost na citované podklady projektu.',
 'counts':dict(counts),'records':records}
(OUT/'audit.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
md=['# Audit 112 obrazů - 28. 10. 2026','',payload['scope'],'',
 'Výchozí commit `29158c3`, pouze `feature/paleozoic-1.0.0`. Build 1000010 uživatel schválil. Žádné aktivní obrázky, data ani funkční soubory se při auditu nemění. Do main nic neslučovat.','',
 '## Výsledky','',*['- '+k+': **'+str(counts[k])+'**' for k in categories],'',
 'Všech 112 souborů: WebP, poměr 3:2. Přesný rozměr 1152 × 768 má 40; dalších 72 má 1536 × 1024. Samotný rozměr je drobná technická odchylka, ne důvod pro nové generování.','',
 'Kategorie Anatomická chyba zahrnuje i pravděpodobné chyby se střední jistotou výslovně uvedenou v poznámce. Bez problémů znamená bez nalezené závady v rozsahu této kontroly. U drobných prstů, žilnatiny, pozadí a neúplně známých druhů zůstávají uvedená omezení.','',
 '## Společné nálezy','',
 '- Starší béžová lomová série: Triceratops, Tyrannosaurus, Stegosaurus, Diplodocus, Ankylosaurus, Coelophysis, Parasaurolophus, Brachiosaurus. Zvířata často zachovat; ke zvážení hlavně kulisa a světlo.',
 '- Opakované říční kulisy: Apatosaurus/Brontosaurus/Camarasaurus; triasoví malí dinosauři; permská skupina Dimetrodon/Edaphosaurus/Inostrancevia/Scutosaurus/Estemmenosuchus. Jde o podobnost motivů, nikoli doložené kopírování totožných pixelů.',
 '- Mořská šablona: Mosasaurus/Tylosaurus a další vodní obratlovci; podobná modrá voda, paprsky a skalnaté dno. Jednotný styl je výhoda, shodný biotop napříč obdobími ale není vědecké potvrzení.',
 '- Nebyl nalezen zjevný čistě bílý ateliér ani koláž. Přirozené rozostření vzdáleného pozadí není umělý rozmazaný rám. Nejsou potvrzeny nadbytečné celé končetiny; některé prsty a drobné přívěsky zůstávají neověřitelné.',
 '- Arthropleura a Pulmonoscorpius jsou záměrně zachované uživatelem schválené ilustrace Prehistorica CM. Odlišný styl je zaznamenán, nikoli automaticky určen k výměně. Kredity a podpisy zachovat.',
 '- Dobré obrazy zachovat. Před jakoukoli budoucí vybranou výměnou záloha původního WebP, metadata, licence a SHA-256. Maximálně 5-6 oprav v dávce; kontrolovat jednotlivě.','',
 '## Druhový seznam','']
for period in periods:
 md += ['### '+data['periods'][period],'']
 for r in [x for x in records if x['period']==period]:
  md += ['#### '+r['name']+' - '+r['category'],'',
    '- Vzhled: '+r['visual'],'- Anatomie: '+r['anatomy'],'- Prostředí: '+r['environment'],
    '- Formát: '+r['format']+' '+str(r['size'][0])+' × '+str(r['size'][1])+'.',
    '- Podklady: '+'; '.join('['+s['title']+']('+s['url']+')' for s in r['sources']), '']
(OUT/'README.md').write_text('\n'.join(md)+'\n')

if len(sys.argv)<2:
 print(json.dumps({'counts':dict(counts),'records':len(records)},ensure_ascii=False));sys.exit()
pdfpath=Path(sys.argv[1]);pdfpath.parent.mkdir(parents=True,exist_ok=True)
for name,f in [('D','DejaVuSans.ttf'),('DB','DejaVuSans-Bold.ttf')]:pdfmetrics.registerFont(TTFont(name,'/usr/share/fonts/truetype/dejavu/'+f))
W,H=842,595;c=canvas.Canvas(str(pdfpath),pagesize=(W,H)); c.setTitle('Dino Atlas 1.0.0 - audit všech 112 obrazů')
colors=['#22744B','#886300','#B65D20','#B13040']
style=ParagraphStyle('body',fontName='D',fontSize=9,leading=12,textColor='#263535')
def para(text,x,y,w=770,size=10,color='#263535'):
 st=ParagraphStyle('p',parent=style,fontSize=size,leading=size*1.35,textColor=color)
 p=Paragraph(text,st); _,h=p.wrap(w,1000);p.drawOn(c,x,y-h);return y-h-7
def header(title,sub):
 c.setFillColorRGB(.96,.97,.95);c.rect(0,0,W,H,fill=1,stroke=0)
 c.setFillColorRGB(.10,.22,.20);c.setFont('DB',20);c.drawString(34,H-39,title)
 c.setFont('D',9);c.drawString(34,H-58,sub)
 c.setFont('D',8);c.drawString(34,18,'Dino Atlas 1.0.0 • Audit 28. 10. 2026 • Bez výměny obrázků')
 c.drawRightString(W-34,18,str(c.getPageNumber()))
header('112 obrazů pod lupou','Vizuální a anatomický redakční audit • výchozí build 1000010')
y=H-92
for t in ['Všech 112 obrazů bylo vizuálně prohlédnuto. U podezřelých detailů následovalo zvětšení a cílená rešerše. Tento dokument slouží k výběru oprav, nikoli jako vědecká certifikace každé šupiny, prstu a rostliny.',
 'Dobré obrázky zachovat. Nyní nebyl změněn žádný obraz, text ani funkce aplikace. Práce patří výhradně do větve feature/paleozoic-1.0.0; žádné sloučení do main.',
 'Kategorie jsou souhrnné: pokud obraz nesplňuje přesný rozměr, má nejméně drobnou odchylku. To neznamená, že potřebuje nové generování. U pravděpodobných anatomických chyb je nejistota uvedená přímo u druhu.']:
 y=para(escape(t),34,y)
for n,k in enumerate(categories):y=para('<b>'+k+': '+str(counts[k])+'</b>',34,y,color=colors[n])
y=para('Technicky: <b>112/112 WebP a 3:2</b>; <b>40/112 přesně 1152 × 768</b>; <b>72/112 má 1536 × 1024</b>. Rozměry lze případně sjednotit bez nového generování, až po odsouhlasení.',34,y)
y=para('Čtení přehledu: každá dvojstránková plocha obsahuje dva velké obrazy s názvem, kategorií, důvodem, anatomickou poznámkou, prostředím a odkazy. Období jsou řazena od kambria po křídu. Obrázky nejsou ve vzájemném měřítku.',34,y)
c.showPage()
header('Co má smysl řešit nejdřív','Konkrétní kandidáti • opravy čekají na společný výběr')
y=H-88
for r in records:
 if r['severity']==3:y=para('<b>'+r['name']+'</b>: '+escape(r['anatomy']),34,y,size=10)
assert y>35,('summary overflow',y)
c.showPage()
header('Styl, prostředí a hranice jistoty','Podobnost pozadí není totožná s chybou anatomie')
y=H-90
for t in [
 'Největší výtvarná odchylka: světlé lomové stěny starší osmičky dinosaurů. Další opakovaný motiv: řeka + jehličnany + kapradiny + vzdálené skály. Příklady: Apatosaurus, Brontosaurus, Camarasaurus a velká část triasových dinosaurů. Nejde o tvrzení, že se opakují totožné obrazové soubory.',
 'Morrison měl nivy, řeky, jezera a nekvetoucí vegetaci. Dnešní Skalnaté hory tehdy neexistovaly; vzdálený skalní horizont proto nelze automaticky vydávat za konkrétní paleokrajinu. Samotná přítomnost skály ale není anachronismus. Podklad: NPS, The Morrison Formation.',
 'Mořské scény často sdílejí modré paprsky a skalnaté dno. Zobrazené houby, řasy a korálům podobné tvary nelze vždy určit; přesné ekologické společenstvo není potvrzené. Posuzována je především slučitelnost základního prostředí, nikoli botanická a sedimentologická certifikace každého pozadí.',
 'Bez problémů znamená, že kontrola nenašla zjevnou závadu. Zbarvení a většina měkkých tkání zůstávají hypotetické. Výjimkou je například dílčí fosilní opora iridescence Microraptora. Zakryté prsty či končetiny nejsou automaticky chybějící.',
 'Podklady pod každým druhem navazují na studie a muzeální zdroje v projektu. Ne všechny celé studie byly znovu čteny. Nová rešerše se soustředila na podezřelé znaky, například klepeta Mecochira, čenich Qilinyu, lebku Bothriolepida, prsty raných tetrapodů a zuby Edesta. Nejisté detaily jsou výslovně označené.',
 'Arthropleura a Pulmonoscorpius: Prehistorica CM, CC BY 4.0. Jde o uživatelem schválené původní ilustrace s dřívějším ořezem přidaných okrajů a změnou proporcí. Audit zachovává podpisy i kredity; odlišný styl není automatický pokyn k náhradě.'
]:y=para(escape(t),34,y,size=10)
assert y>30,('method overflow',y)
c.showPage()
for period in periods:
 group=[r for r in records if r['period']==period]
 for start in range(0,len(group),2):
  header(data['periods'][period],str(len(group))+' druhů • '+str(start+1)+'-'+str(min(start+2,len(group)))+' • obrazy v původním poměru 3:2')
  for col,r in enumerate(group[start:start+2]):
   x=34+col*397;w=377
   c.setFont('DB',13);c.setFillColorRGB(.10,.22,.20);c.drawString(x,510,r['name'])
   c.setFillColor(colors[r['severity']]);c.setFont('DB',9);c.drawString(x,493,r['category'])
   im=Image.open(ROOT/r['image']).convert('RGB');buf=io.BytesIO();im.save(buf,format='JPEG',quality=88)
   c.drawImage(ImageReader(io.BytesIO(buf.getvalue())),x,232,width=w,height=w*2/3)
   y=222
   for label,key in [('Vzhled','visual'),('Anatomie','anatomy'),('Prostředí','environment')]:
    y=para('<b>'+label+':</b> '+escape(r[key]),x,y,w,size=8.4)
   y=para('WebP '+str(r['size'][0])+' × '+str(r['size'][1])+(' • rozměr splněn' if r['formatPass'] else ' • rozměr nesplněn, poměr 3:2 správný'),x,y,w,size=8)
   for s in r['sources'][:2]:
    y=para('<link href="'+escape(s['url'],{'"':'&quot;'})+'" color="#28695E">'+escape(s['title'])+'</link>',x,y,w,size=7.4)
   if r['index'] in [96,98]:y=para('© Prehistorica CM • CC BY 4.0 • zdroj a změny v licenční příloze',x,y,w,size=7.5)
   assert y>28,(r['name'],'overflow',y)
  c.showPage()
header('Licence a další postup','Audit nevytváří nová práva k původním obrazům')
y=H-90
for i in [96,98]:
 r=records[i];y=para('<b>'+r['name']+'</b>',34,y)
 y=para(escape(r['credits']),34,y,size=10)
y=para('Licence: <link href="https://creativecommons.org/licenses/by/4.0/" color="#28695E">Creative Commons Attribution 4.0</link>. Původní autorské podpisy nebyly odstraňovány. V tomto PDF byly aktivní obrazy pouze zmenšeny do přehledu a převedeny pro vložení; nebyly obsahově překresleny.',34,y)
y=para('Ostatní aktivní scény jsou v projektu vedené jako pracovní digitální/AI rekonstrukce. Jejich úplné stávající poznámky, kontrolní součty a odkazy jsou zachované v audit.json. Historické licencované předlohy a zálohy zůstávají v repozitáři; tento dokument je nenahrazuje.',34,y)
y=para('Další krok: společně vybrat konkrétní obrazy. Před výměnou záloha souboru, jeho licence, kreditů a kontrolního součtu. Nejvýše 5-6 oprav v dávce, vždy individuální kontrola. Samotné sjednocení rozlišení nevyžaduje nové generování.',34,y)
assert y>30
c.save()
print(json.dumps({'pdf':str(pdfpath),'counts':dict(counts),'records':len(records)},ensure_ascii=False))
