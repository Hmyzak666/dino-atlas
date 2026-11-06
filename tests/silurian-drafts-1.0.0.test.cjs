const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const app=require('../app.js');
const db=require('../dinosaurs.json');
const draft=require('../content-drafts/silurian-five.json');
const ids=['eurypterus-remipes','acutiramus-bohemicus','birkenia-elegans','entelognathus-primordialis','qilinyu-rostrata'];
assert.equal(draft.status,'draft-awaiting-five-original-webp-images');
assert.deepEqual(draft.animals.map(a=>a.id),ids);
assert.ok([83,88,96,104,112].includes(db.dinosaurs.length),'Only the complete 83 or 88 checkpoint is valid');
const published=db.dinosaurs.length>=88;
assert.equal(db.dinosaurs.filter(a=>a.period==='cambrian').length,6);
assert.equal(db.dinosaurs.filter(a=>a.period==='ordovician').length,5);
assert.equal(db.dinosaurs.filter(a=>a.period==='silurian').length,published?5:0);
assert.equal(new Set(draft.animals.map(a=>a.id)).size,5);
const future=structuredClone(db);
future.periods.silurian='Silur';
Object.assign(future.sources,draft.sources);
if(!published) future.dinosaurs.push(...draft.animals);
assert.equal(future.dinosaurs.length,published?db.dinosaurs.length:88);
assert.equal(app.validateDatabase(future),true);
for(const animal of draft.animals) {
 assert.equal(animal.period,'silurian');
 assert.equal(animal.translations.cs.recognition.length,3);
 assert.equal(animal.translations.cs.sections.length,6);
 assert.ok(animal.speechName);
 assert.ok(app.narrationText(animal,'name').length);
 assert.ok(app.narrationText(animal,'facts').includes('Hmotnost:'));
 assert.ok(animal.translations.cs.quizHint);
 assert.equal(animal.image.status,'awaiting-original-image');
 assert.equal(fs.existsSync(path.resolve(__dirname,'..',animal.image.src)),published,'Images must be present for all published silurian species');
 if(published){
   const p=db.dinosaurs.find(x=>x.id===animal.id);
   assert.ok(p);
   assert.equal(p.image.status,'working-reconstruction');
 }
 for(const sec of animal.translations.cs.sections)
   assert.ok(app.narrationText(animal,sec.id).includes(app.pronunciationText(sec.title)));
}
assert.equal(draft.animals.filter(a=>a.category==='arthropod').length,2);
assert.equal(draft.animals.filter(a=>a.category==='fish').length,3);
assert.equal(draft.animals.find(a=>a.id==='acutiramus-bohemicus').comparison.valueM,2.1);
assert.equal(draft.animals.find(a=>a.id==='birkenia-elegans').diet,'unknown');
assert.equal(draft.animals.find(a=>a.id==='qilinyu-rostrata').category,'fish');
assert.equal(draft.animals.find(a=>a.id==='entelognathus-primordialis').category,'fish');
assert.equal(app.filteredDinosaurs(future.dinosaurs,{query:'',era:'paleozoic',period:'silurian',category:'all',diet:'all',favoritesOnly:false,favorites:new Set()}).length,5);
assert.equal(app.makeQuiz(draft.animals).length,5);
console.log('PASS: five Silurian drafts, sourced Czech TTS, anatomy, quiz, eras and atomic WebP presence.');
