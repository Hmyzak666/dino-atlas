const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const vm=require('node:vm');
const app=require('../app.js');
const db=require('../dinosaurs.json');
const batch=require('../docs/cenozoic-batch02.json');
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
assert.equal(app.validateDatabase(db),true);
assert.equal(db.dinosaurs.length,132);
assert.equal(new Set(db.dinosaurs.map(a=>a.id)).size,132);
assert.deepEqual(db.dinosaurs.slice(122,132).map(a=>a.id),batch.animals.map(a=>a.id));
assert.deepEqual(db.dinosaurs.slice(0,122).map(a=>a.id),Object.keys(batch.previous.records));
for(const [id,hash] of Object.entries(batch.previous.records)) {
 const a=db.dinosaurs.find(a=>a.id===id);
 assert.equal(sha(JSON.stringify(a)),hash,'Preserve every field of '+id);
 assert.equal(sha(fs.readFileSync(a.image.src)),batch.previous.images[id],'Preserve artwork of '+id);
}
for(const [id,hash] of Object.entries(batch.previous.sources)) assert.equal(sha(JSON.stringify(db.sources[id])),hash,'Preserve source '+id);
const added=db.dinosaurs.slice(122,132);
const state={query:'',category:'all',era:'all',period:'all',diet:'all',favoritesOnly:false,favorites:new Set()};
for(const item of batch.animals){
 const a=added.find(a=>a.id===item.id);
 assert.equal(sha(fs.readFileSync(a.image.src)),item.imageSha256);
 assert.equal(a.translations.cs.sections.length,6);
 assert.equal(a.translations.cs.recognition.length,3);
 assert.equal(app.filteredDinosaurs(db.dinosaurs,{...state,query:item.name})[0].id,item.id);
 assert.equal(a.image.facing,a.diet==='carnivore'?'left':'right');
}
assert.equal(app.filteredDinosaurs(added,{...state,era:'quaternary'})[0].id,'megatherium');
assert.equal(app.filteredDinosaurs(added,{...state,era:'quaternary'}).length,1);
assert.equal(app.filteredDinosaurs(added,{...state,era:'tertiary'}).length,9);
assert.equal(app.filteredDinosaurs(added,{...state,category:'bird'})[0].id,'argentavis');
assert.equal(app.filteredDinosaurs(added,{...state,diet:'omnivore'})[0].id,'entelodon');
const bird=added.find(a=>a.id==='argentavis');
assert.equal(bird.comparison.kind,'wingspan');
assert.match(app.narrationText(bird,'facts'),/Rozpětí křídel/);
assert.equal(app.comparisonData(bird).valueM,7);
const quiz=app.makeQuiz(added,10);assert.equal(quiz.length,10);
for(const q of quiz){assert.ok(q.optionIds.includes(q.answerId));assert.ok(q.optionIds.every(id=>added.some(a=>a.id===id)));}
const context={window:{}};vm.runInNewContext(fs.readFileSync('knowledge.js','utf8'),context);
assert.ok(context.window.DINO_KNOWLEDGE.quaternary.sections.length>=2);
console.log('PASS: batch 02 adds 10 animals; 122 earlier records/images/sources preserved; Quaternary, wingspan, filters and quiz verified.');
