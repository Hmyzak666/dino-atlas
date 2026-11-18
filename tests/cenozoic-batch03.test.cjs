const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const app=require('../app.js');
const current=require('../dinosaurs.json');
const db={...current,dinosaurs:current.dinosaurs.slice(0,142)};
const batch=require('../docs/cenozoic-batch03.json');
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
assert.equal(app.validateDatabase(db),true);
assert.equal(db.dinosaurs.length,142);
assert.equal(new Set(db.dinosaurs.map(a=>a.id)).size,142);
assert.deepEqual(db.dinosaurs.slice(132,142).map(a=>a.id),batch.animals.map(a=>a.id));
assert.deepEqual(db.dinosaurs.slice(0,132).map(a=>a.id),Object.keys(batch.previous.records));
for(const [id,hash] of Object.entries(batch.previous.records)) {
 const a=db.dinosaurs.find(a=>a.id===id);
 assert.equal(sha(JSON.stringify(a)),hash,'Preserve record '+id);
 assert.equal(sha(fs.readFileSync(a.image.src)),batch.previous.images[id],'Preserve image '+id);
}
for(const [id,hash] of Object.entries(batch.previous.sources)) assert.equal(sha(JSON.stringify(db.sources[id])),hash,'Preserve source '+id);
const added=db.dinosaurs.slice(132,142);
const state={query:'',category:'all',era:'all',period:'all',diet:'all',favoritesOnly:false,favorites:new Set()};
for(const item of batch.animals){
 const a=added.find(a=>a.id===item.id);
 assert.equal(sha(fs.readFileSync(a.image.src)),item.imageSha256);
 assert.equal(a.translations.cs.sections.length,6);
 assert.equal(a.translations.cs.recognition.length,3);
 assert.equal(app.filteredDinosaurs(db.dinosaurs,{...state,query:item.name})[0].id,item.id);
 assert.equal(a.image.facing,a.diet==='carnivore'?'left':'right');
}
assert.equal(app.filteredDinosaurs(added,{...state,era:'tertiary'}).length,10);
assert.equal(app.filteredDinosaurs(added,{...state,category:'mammal'}).length,9);
assert.equal(app.filteredDinosaurs(added,{...state,category:'bird'})[0].id,'pelagornis');
assert.equal(app.filteredDinosaurs(added,{...state,query:'dinohyus'})[0].id,'daeodon');
const pel=added.find(a=>a.id==='pelagornis');
assert.equal(pel.comparison.kind,'wingspan');
assert.equal(app.comparisonData(pel).valueM,6.4);
assert.match(app.narrationText(pel,'facts'),/Rozpětí křídel/);
assert.equal(added.find(a=>a.id==='dorudon').category,'mammal');
assert.ok(added.find(a=>a.id==='eohippus').translations.cs.sections.some(s=>s.claims.some(c=>c.text.cs.includes('2002'))));
const quiz=app.makeQuiz(added,10);assert.equal(quiz.length,10);
for(const q of quiz){assert.ok(q.optionIds.includes(q.answerId));assert.ok(q.optionIds.every(id=>added.some(a=>a.id===id)));}
console.log('PASS: batch 03 adds 10 animals; all 132 earlier records/images/sources preserved; taxonomy, aliases, wingspan, filters and quiz verified.');
