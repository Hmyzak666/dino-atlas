const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const app=require('../app.js');
const current=require('../dinosaurs.json');
const batch=require('../docs/final-batch07.json');
const db={...current,dinosaurs:current.dinosaurs.slice(0,batch.countAfter)};
const revisions=require('../docs/dinosaur-batch08.json').replacements;
function selectedHash(item) {
 const replacement=revisions.find(entry=>entry.id===item.id);
 if (!replacement) return item.imageSha256;
 assert.equal(replacement.previousSha256,item.imageSha256,'Original selection '+item.id);
 return replacement.sha256;
}
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
assert.equal(app.validateDatabase(current),true);
assert.equal(db.dinosaurs.length,183);
assert.equal(new Set(db.dinosaurs.map(a=>a.id)).size,183);
const added=db.dinosaurs.slice(172);
assert.deepEqual(added.map(a=>a.id),['peltephilus','carcharodontosaurus','giganotosaurus','albertosaurus','baryonyx','suchomimus','amargasaurus','shunosaurus','euoplocephalus','corythosaurus','lambeosaurus']);
for(const [id,hash] of Object.entries(batch.previous.records)){
 const a=db.dinosaurs.find(a=>a.id===id);
 assert.equal(sha(JSON.stringify(a)),hash,'Preserve record '+id);
 assert.equal(sha(fs.readFileSync(a.image.src)),batch.previous.images[id],'Preserve image '+id);
}
for(const [id,hash] of Object.entries(batch.previous.sources))assert.equal(sha(JSON.stringify(db.sources[id])),hash,'Preserve source '+id);
const state={query:'',category:'all',era:'all',period:'all',diet:'all',favoritesOnly:false,favorites:new Set()};
for(const item of batch.animals){
 const a=added.find(a=>a.id===item.id);
 assert.equal(sha(fs.readFileSync(a.image.src)),selectedHash(item),'Selected image '+a.id);
 assert.equal(a.image.facing,a.diet==='carnivore'?'left':'right');
 assert.equal(a.translations.cs.sections.length,6);
 assert.equal(a.translations.cs.recognition.length,3);
 for(const q of [item.name,a.scientificName,...a.aliases])assert.ok(app.filteredDinosaurs(db.dinosaurs,{...state,query:q}).some(x=>x.id===a.id),'Search '+q);
 for(const target of ['name','facts','recognition',...a.translations.cs.sections.map(s=>s.id)]){
  const spoken=app.narrationText(a,target);assert.ok(spoken.length>0 && spoken.length<4000,a.id+' '+target);
 }
 for(const f of a.facts)for(const sid of f.sourceIds)assert.ok(db.sources[sid]);
 assert.equal(app.filteredDinosaurs(added,{...state,favoritesOnly:true,favorites:new Set([a.id])})[0].id,a.id);
}
assert.equal(app.filteredDinosaurs(added,{...state,category:'dinosaur'}).length,10);
assert.equal(app.filteredDinosaurs(added,{...state,category:'mammal'})[0].id,'peltephilus');
assert.equal(app.filteredDinosaurs(added,{...state,period:'cretaceous'}).length,9);
assert.equal(app.filteredDinosaurs(added,{...state,period:'jurassic'})[0].id,'shunosaurus');
assert.equal(app.filteredDinosaurs(db.dinosaurs,{...state,era:'mesozoic'}).length,82);
assert.equal(app.filteredDinosaurs(added,{...state,era:'tertiary'})[0].id,'peltephilus');
assert.equal(app.filteredDinosaurs(added,{...state,diet:'carnivore'}).length,5);
assert.equal(app.filteredDinosaurs(added,{...state,diet:'herbivore'}).length,6);
const get=id=>added.find(a=>a.id===id);
assert.ok(get('peltephilus').taxonomy.includes('Mammalia'));
assert.ok(!get('peltephilus').taxonomy.includes('Dinosauria'));
assert.match(get('peltephilus').facts.find(f=>f.label.cs==='Potrava').value.cs,/Pravděpodobně/);
assert.match(get('amargasaurus').image.note.cs,/přesný tvar není znám/);
assert.match(app.narrationText(get('albertosaurus'),'recognition'),/dvěma/);
assert.equal(app.comparisonData(get('giganotosaurus')).valueM,13);
assert.ok(!get('peltephilus').comparison,'No unsupported size estimate');
const manifests=[1,2,3,4,5,6].map(n=>require('../docs/cenozoic-batch0'+n+'.json'));
const allNew=[...manifests.flatMap(m=>m.animals),...batch.animals];
assert.equal(allNew.length,71);
assert.deepEqual(db.dinosaurs.slice(112).map(a=>a.id),allNew.map(a=>a.id));
for(const item of allNew)assert.equal(sha(fs.readFileSync(db.dinosaurs.find(a=>a.id===item.id).image.src)),selectedHash(item));
const quiz=app.makeQuiz(added,11);assert.equal(quiz.length,11);
for(const q of quiz){assert.ok(q.optionIds.includes(q.answerId));assert.ok(q.optionIds.every(id=>added.some(a=>a.id===id)));}
console.log('PASS: all 71 approved additions complete; 183 unique records/images, previous 172 preserved, art checked against the latest approved selection, search, filters, favorites, narration, comparison and quiz.');
