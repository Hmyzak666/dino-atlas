const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const app=require('../app.js');
const current=require('../dinosaurs.json');
const db={...current,dinosaurs:current.dinosaurs.slice(0,152)};
const batch=require('../docs/cenozoic-batch04.json');
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
assert.equal(app.validateDatabase(current),true);
assert.equal(db.dinosaurs.length,152);
assert.equal(new Set(db.dinosaurs.map(a=>a.id)).size,152);
assert.deepEqual(db.dinosaurs.slice(142).map(a=>a.id),batch.animals.map(a=>a.id));
assert.deepEqual(db.dinosaurs.slice(0,142).map(a=>a.id),Object.keys(batch.previous.records));
for(const [id,hash] of Object.entries(batch.previous.records)) {
 const a=db.dinosaurs.find(a=>a.id===id);
 assert.equal(sha(JSON.stringify(a)),hash,'Preserve record '+id);
 assert.equal(sha(fs.readFileSync(a.image.src)),batch.previous.images[id],'Preserve image '+id);
}
for(const [id,hash] of Object.entries(batch.previous.sources)) assert.equal(sha(JSON.stringify(db.sources[id])),hash,'Preserve source '+id);
const added=db.dinosaurs.slice(142);
const state={query:'',category:'all',era:'all',period:'all',diet:'all',favoritesOnly:false,favorites:new Set()};
for(const item of batch.animals){
 const a=added.find(a=>a.id===item.id);
 assert.equal(sha(fs.readFileSync(a.image.src)),item.imageSha256,'Exact selected image '+item.id);
 assert.equal(a.translations.cs.sections.length,6);
 assert.equal(a.translations.cs.recognition.length,3);
 for(const query of [item.name,a.scientificName]) assert.ok(app.filteredDinosaurs(db.dinosaurs,{...state,query}).some(x=>x.id===item.id),query);
 assert.equal(a.image.facing,a.diet==='carnivore'?'left':'right');
 assert.equal(a.category,'mammal');
 assert.equal(a.period,'quaternary');
 assert.ok(app.narrationText(a,'facts').includes('Hmotnost'));
}
assert.equal(app.filteredDinosaurs(added,{...state,era:'quaternary'}).length,10);
assert.equal(app.filteredDinosaurs(added,{...state,era:'tertiary'}).length,0);
assert.equal(app.filteredDinosaurs(added,{...state,diet:'carnivore'}).length,3);
assert.equal(app.filteredDinosaurs(added,{...state,query:'savlozuby tygr'})[0].id,'smilodon');
assert.equal(app.filteredDinosaurs(added,{...state,query:'vakolev'})[0].id,'thylacoleo');
assert.equal(app.filteredDinosaurs(added,{...state,query:'symbos'})[0].id,'bootherium');
assert.equal(app.filteredDinosaurs(added,{...state,favoritesOnly:true,favorites:new Set(['mamut-srstnaty'])})[0].id,'mamut-srstnaty');
const bear=added.find(a=>a.id==='medved-jeskynni');assert.equal(bear.diet,'herbivore');
for(const id of ['diprotodon','thylacoleo']) assert.ok(added.find(a=>a.id===id).taxonomy.includes('Marsupialia'));
assert.equal(app.comparisonData(added.find(a=>a.id==='diprotodon')).valueM,3.8);
assert.equal(app.comparisonData(added.find(a=>a.id==='thylacoleo')).valueM,1.5);
for(const a of added.filter(a=>a.comparison)) assert.equal(a.comparison.kind,'length');
const quiz=app.makeQuiz(added,10);assert.equal(quiz.length,10);
for(const q of quiz){assert.ok(q.optionIds.includes(q.answerId));assert.ok(q.optionIds.every(id=>added.some(a=>a.id===id)));}
console.log('PASS: batch 04, 10 selected images, 142 previous records/images/sources preserved, Czech/Latin search, aliases, filters, favorites, narration, comparison and quiz.');
