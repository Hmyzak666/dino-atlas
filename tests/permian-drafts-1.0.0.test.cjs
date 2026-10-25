const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const app=require('../app.js');
const db=require('../dinosaurs.json');
const draft=require('../content-drafts/permian-eight.json');

const ids=['dimetrodon-grandis','edaphosaurus-pogonias','inostrancevia-alexandri',
  'scutosaurus-karpinskii','mesosaurus-tenuidens','diplocaulus-magnicornis',
  'helicoprion-bessonowi','estemmenosuchus-uralensis'];
assert.deepEqual(draft.animals.map(a=>a.id),ids);
assert.equal(draft.status,'draft-awaiting-eight-original-webp-images');
assert.ok([104,112].includes(db.dinosaurs.length),'Permian must activate atomically after verified 104 animals');
const active=db.dinosaurs.length===112;
const originalCounts={cambrian:6,ordovician:5,silurian:5,devonian:8,carboniferous:8};
for(const [era,n] of Object.entries(originalCounts))
  assert.equal(db.dinosaurs.filter(a=>a.period===era).length,n,'Preserve '+era+' complete batch');
assert.equal(db.dinosaurs.filter(a=>a.period==='permian').length,active?8:0);

const future=structuredClone(db);
future.periods.permian='Perm';
Object.assign(future.sources,draft.sources);
if(!active) future.dinosaurs.push(...draft.animals);
assert.equal(future.dinosaurs.length,112);
assert.equal(new Set(future.dinosaurs.map(a=>a.id)).size,112);
assert.equal(app.validateDatabase(future),true);
const get=id=>draft.animals.find(a=>a.id===id);
assert.equal(get('dimetrodon-grandis').category,'synapsid');
assert.equal(get('edaphosaurus-pogonias').category,'synapsid');
assert.equal(get('inostrancevia-alexandri').category,'synapsid');
assert.equal(get('estemmenosuchus-uralensis').category,'synapsid');
assert.equal(get('scutosaurus-karpinskii').category,'other-reptile');
assert.equal(get('mesosaurus-tenuidens').category,'other-reptile');
assert.equal(get('diplocaulus-magnicornis').category,'early-tetrapod');
assert.equal(get('helicoprion-bessonowi').category,'fish');
assert.equal(get('diplocaulus-magnicornis').scientificName,'Diplocaulus magnicornis');

for(const a of draft.animals) {
 assert.equal(a.period,'permian');
 assert.equal(a.image.status,'awaiting-original-image');
 assert.equal(a.translations.cs.sections.length,6,a.id);
 assert.equal(a.translations.cs.recognition.length,3,a.id);
 assert.ok(app.narrationText(a,'name'),a.id);
 assert.ok(app.narrationText(a,'facts').includes('Hmotnost:'),a.id);
 assert.ok(a.speechName && a.translations.cs.quizHint,a.id);
 for(const section of a.translations.cs.sections) {
    assert.ok(app.narrationText(a,section.id).includes(app.pronunciationText(section.title)));
 }
 assert.equal(fs.existsSync(path.resolve(__dirname,'..',a.image.src)),active,a.id+' must not ship without reviewed picture');
 if(active) {
    const published=db.dinosaurs.find(x=>x.id===a.id);
    assert.ok(published,a.id);
    assert.equal(published.image.src,a.image.src);
    assert.equal(published.image.status,'working-reconstruction');
    assert.equal(published.image.sourceIds.length,1,'image requires single attributable source');
    const art=db.sources[published.image.sourceIds[0]];
    assert.ok(art && art.kind.includes('licence CC'),'Missing licence citation for '+a.id);
    assert.ok(published.image.note.cs.includes('creativecommons.org/licenses/'),'License URL missing from detail');
    assert.ok(published.image.note.cs.includes('Úpravy:'),'Image modifications must be declared');
 }
}
const full={query:'',era:'paleozoic',period:'permian',category:'all',diet:'all',favoritesOnly:false,favorites:new Set()};
assert.equal(app.filteredDinosaurs(future.dinosaurs,full).length,8);
assert.equal(app.filteredDinosaurs(future.dinosaurs,{...full,category:'synapsid'}).length,4);
assert.equal(app.filteredDinosaurs(future.dinosaurs,{...full,category:'fish'}).length,1);
assert.equal(app.makeQuiz(draft.animals).length,5);
console.log('PASS: final 8 Permian animals, names, taxonomy, six sections, TTS, quiz, 104/112 image completeness and author credits.');
