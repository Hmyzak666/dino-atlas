const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const app=require('../app.js');
const current=require('../dinosaurs.json');
const db={...current,dinosaurs:current.dinosaurs.slice(0,162)};
const batch=require('../docs/cenozoic-batch05.json');
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
assert.equal(app.validateDatabase(current),true);
assert.equal(db.dinosaurs.length,162);
assert.equal(new Set(db.dinosaurs.map(a=>a.id)).size,162);
assert.deepEqual(db.dinosaurs.slice(152).map(a=>a.id),batch.animals.map(a=>a.id));
assert.deepEqual(db.dinosaurs.slice(0,152).map(a=>a.id),Object.keys(batch.previous.records));
for(const [id,hash] of Object.entries(batch.previous.records)) {
 const a=db.dinosaurs.find(a=>a.id===id);
 assert.equal(sha(JSON.stringify(a)),hash,'Preserve record '+id);
 assert.equal(sha(fs.readFileSync(a.image.src)),batch.previous.images[id],'Preserve image '+id);
}
for(const [id,hash] of Object.entries(batch.previous.sources)) assert.equal(sha(JSON.stringify(db.sources[id])),hash,'Preserve source '+id);
const added=db.dinosaurs.slice(152);
const state={query:'',category:'all',era:'all',period:'all',diet:'all',favoritesOnly:false,favorites:new Set()};
for(const item of batch.animals){
 const a=added.find(a=>a.id===item.id);
 assert.equal(sha(fs.readFileSync(a.image.src)),item.imageSha256,'Exact selected image '+item.id);
 assert.equal(a.translations.cs.sections.length,6);
 assert.equal(a.translations.cs.recognition.length,3);
 for(const query of [item.name,a.scientificName,...a.aliases]) assert.ok(app.filteredDinosaurs(db.dinosaurs,{...state,query}).some(x=>x.id===item.id),query);
 assert.equal(a.image.facing,a.diet==='carnivore'?'left':'right');
 assert.equal(a.period,'quaternary');
 for(const target of ['name','facts','recognition',...a.translations.cs.sections.map(s=>s.id)]) {
  const speech=app.narrationText(a,target);assert.ok(speech.length>0 && speech.length<4000,a.id+' '+target);
 }
}
assert.equal(app.filteredDinosaurs(added,{...state,era:'quaternary'}).length,10);
assert.equal(app.filteredDinosaurs(added,{...state,era:'tertiary'}).length,0);
assert.equal(app.filteredDinosaurs(added,{...state,category:'mammal'}).length,8);
assert.equal(app.filteredDinosaurs(added,{...state,category:'bird'})[0].id,'moa');
assert.equal(app.filteredDinosaurs(added,{...state,category:'other-reptile'})[0].id,'megalania');
assert.equal(app.filteredDinosaurs(added,{...state,diet:'carnivore'}).length,2);
assert.equal(app.filteredDinosaurs(added,{...state,query:'canis dirus'})[0].id,'pravlk');
assert.equal(app.filteredDinosaurs(added,{...state,query:'varanus priscus'})[0].id,'megalania');
assert.equal(app.filteredDinosaurs(added,{...state,favoritesOnly:true,favorites:new Set(['pratur'])})[0].id,'pratur');
const get=id=>added.find(a=>a.id===id);
assert.ok(get('procoptodon').taxonomy.includes('Marsupialia'));
assert.ok(get('moa').taxonomy.includes('Aves'));
assert.ok(get('megalania').taxonomy.includes('Varanidae'));
assert.ok(!get('megalania').taxonomy.includes('Dinosauria'));
assert.ok(!get('mastodont-americky').taxonomy.includes('Elephantidae'));
assert.ok(get('mastodont-americky').taxonomy.includes('Mammutidae'));
assert.match(get('pratur').translations.cs.ageLabel,/1627/);
assert.ok(!get('procoptodon').comparison,'Height must not be treated as body length');
assert.ok(!get('moa').comparison,'Moa height must not be treated as body length');
assert.equal(app.comparisonData(get('bobr-obrovsky')).valueM,2);
assert.equal(app.comparisonData(get('megalania')).valueM,5);
assert.equal(app.comparisonData(get('macrauchenia')).valueM,3);
assert.match(get('macrauchenia').image.note.cs,/hypotetickou/);
for(const a of added.filter(a=>a.comparison)) assert.equal(a.comparison.kind,'length');
const quiz=app.makeQuiz(added,10);assert.equal(quiz.length,10);
for(const q of quiz){assert.ok(q.optionIds.includes(q.answerId));assert.ok(q.optionIds.every(id=>added.some(a=>a.id===id)));}
console.log('PASS: batch 05, exact selected artwork, all 152 previous records/images/sources preserved, Czech/Latin/alias search, 3 categories, filters, favorites, narration, size units and quiz.');
