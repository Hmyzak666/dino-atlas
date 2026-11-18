const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const app=require('../app.js');
const current=require('../dinosaurs.json');
const db={...current,dinosaurs:current.dinosaurs.slice(0,172)};
const batch=require('../docs/cenozoic-batch06.json');
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
assert.equal(app.validateDatabase(current),true);
assert.equal(db.dinosaurs.length,172);
assert.equal(new Set(db.dinosaurs.map(a=>a.id)).size,172);
assert.deepEqual(db.dinosaurs.slice(162).map(a=>a.id),batch.animals.map(a=>a.id));
assert.deepEqual(db.dinosaurs.slice(0,162).map(a=>a.id),Object.keys(batch.previous.records));
for(const [id,hash] of Object.entries(batch.previous.records)) {
 const a=db.dinosaurs.find(a=>a.id===id);
 assert.equal(sha(JSON.stringify(a)),hash,'Preserve record '+id);
 assert.equal(sha(fs.readFileSync(a.image.src)),batch.previous.images[id],'Preserve image '+id);
}
for(const [id,hash] of Object.entries(batch.previous.sources)) assert.equal(sha(JSON.stringify(db.sources[id])),hash,'Preserve source '+id);
const added=db.dinosaurs.slice(162);
const state={query:'',category:'all',era:'all',period:'all',diet:'all',favoritesOnly:false,favorites:new Set()};
for(const item of batch.animals){
 const a=added.find(a=>a.id===item.id);
 assert.equal(sha(fs.readFileSync(a.image.src)),item.imageSha256,'Exact selected image '+item.id);
 assert.equal(a.translations.cs.sections.length,6);
 assert.equal(a.translations.cs.recognition.length,3);
 for(const query of [item.name,a.scientificName,...a.aliases]) assert.ok(app.filteredDinosaurs(db.dinosaurs,{...state,query}).some(x=>x.id===item.id),query);
 assert.equal(a.image.facing,item.facing,'Direction describes the source artwork');
 for(const target of ['name','facts','recognition',...a.translations.cs.sections.map(s=>s.id)]) {
  const speech=app.narrationText(a,target);assert.ok(speech.length>0 && speech.length<4000,a.id+' '+target);
 }
}
const get=id=>added.find(a=>a.id===id);
assert.equal(app.filteredDinosaurs(added,{...state,era:'quaternary'}).length,4);
assert.equal(app.filteredDinosaurs(added,{...state,era:'tertiary'}).length,6);
assert.equal(app.filteredDinosaurs(added,{...state,period:'paleogene'}).length,4);
assert.equal(app.filteredDinosaurs(added,{...state,period:'neogene'}).length,2);
assert.equal(app.filteredDinosaurs(added,{...state,category:'mammal'}).length,8);
assert.equal(app.filteredDinosaurs(added,{...state,category:'bird'})[0].id,'dromornis');
assert.equal(app.filteredDinosaurs(added,{...state,category:'other-reptile'})[0].id,'titanoboa');
assert.equal(app.filteredDinosaurs(added,{...state,diet:'carnivore'}).length,4);
assert.equal(app.filteredDinosaurs(added,{...state,diet:'omnivore'})[0].id,'medved-kratkocely');
assert.match(get('medved-kratkocely').facts.find(f=>f.label.cs==='Potrava').value.cs,/Beringii/);
assert.equal(app.filteredDinosaurs(added,{...state,query:'arctodus'})[0].id,'medved-kratkocely');
assert.equal(app.filteredDinosaurs(added,{...state,favoritesOnly:true,favorites:new Set(['titanoboa'])})[0].id,'titanoboa');
assert.ok(get('pakicetus').taxonomy.includes('Cetacea'));
assert.ok(get('pakicetus').taxonomy.includes('Mammalia'));
assert.ok(get('titanoboa').taxonomy.includes('Serpentes'));
assert.ok(!get('titanoboa').taxonomy.includes('Dinosauria'));
assert.ok(get('hyracodon').taxonomy.includes('Hyracodontidae'));
assert.ok(get('moeritherium').taxonomy.includes('Proboscidea'));
assert.ok(get('enhydriodon').taxonomy.includes('Lutrinae'));
assert.ok(get('sivatherium').taxonomy.includes('Giraffidae'));
assert.ok(get('dromornis').taxonomy.includes('Aves'));
assert.ok(!get('dromornis').comparison,'Height must not be treated as body length');
assert.equal(app.comparisonData(get('titanoboa')).valueM,12.8);
assert.equal(get('titanoboa').comparison.kind,'length');
assert.match(get('elasmotherium').image.note.cs,/roh.*nezachoval/);
const quiz=app.makeQuiz(added,10);assert.equal(quiz.length,10);
for(const q of quiz){assert.ok(q.optionIds.includes(q.answerId));assert.ok(q.optionIds.every(id=>added.some(a=>a.id===id)));}
console.log('PASS: batch 06, exact selected artwork, all 162 previous records/images/sources preserved, Czech/Latin/alias search, categories, 3 periods, regional diet notes, narration, comparison and quiz.');
