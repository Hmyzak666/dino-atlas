const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const app=require('../app.js');
const db=require('../dinosaurs.json');
const draft=require('../content-drafts/devonian-eight.json');

const ids=['dunkleosteus-terrelli','tiktaalik-roseae','bothriolepis-canadensis',
'eusthenopteron-foordi','ichthyostega-stensioei','acanthostega-gunnari',
'cladoselache-fyleri','jaekelopterus-rhenaniae'];
assert.equal(draft.status,'draft-awaiting-eight-original-webp-images');
assert.deepEqual(draft.animals.map(a=>a.id),ids);
assert.ok([88,96,104,112].includes(db.dinosaurs.length),'Only verified 88 or future 96 species checkpoint');
const activated=db.dinosaurs.length>=96;
for(const [period,count] of [['cambrian',6],['ordovician',5],['silurian',5]]){
 assert.equal(db.dinosaurs.filter(a=>a.period===period).length,count,'Preserve previous Paleozoic batches');
}
const merged=structuredClone(db);
merged.periods.devonian='Devon';
Object.assign(merged.sources,draft.sources);
if(!activated) merged.dinosaurs.push(...draft.animals);
assert.equal(merged.dinosaurs.length,activated?db.dinosaurs.length:96);
assert.equal(app.validateDatabase(merged),true);
assert.equal(new Set(merged.dinosaurs.map(a=>a.id)).size,merged.dinosaurs.length);
for(const animal of draft.animals){
 assert.equal(animal.period,'devonian');
 assert.equal(animal.translations.cs.sections.length,6,animal.id);
 assert.equal(animal.translations.cs.recognition.length,3,animal.id);
 assert.ok(animal.translations.cs.quizHint,animal.id);
 assert.ok(animal.speechName,animal.id);
 assert.ok(app.narrationText(animal,'name').length>0,animal.id);
 assert.ok(app.narrationText(animal,'facts').includes('Hmotnost:'),animal.id);
 assert.equal(fs.existsSync(path.join(__dirname,'..',animal.image.src)),activated,animal.id+' must never ship with missing image');
 if(activated){
   const installed=db.dinosaurs.find(a=>a.id===animal.id);
   assert.ok(installed,animal.id);
   assert.equal(installed.image.status,'working-reconstruction');
 }
 for(const sec of animal.translations.cs.sections){
   const speech=app.narrationText(animal,sec.id);
   assert.ok(speech.includes(app.pronunciationText(sec.title)),animal.id+' TTS section');
 }
}
const categories=Object.fromEntries(['fish','early-tetrapod','arthropod'].map(k=>[k,draft.animals.filter(a=>a.category===k).length]));
assert.deepEqual(categories,{fish:5,'early-tetrapod':2,arthropod:1});
assert.equal(draft.animals.find(a=>a.id==='dunkleosteus-terrelli').comparison.valueM,3.4);
assert.equal(draft.animals.find(a=>a.id==='jaekelopterus-rhenaniae').comparison.valueM,2.5);
assert.equal(draft.animals.find(a=>a.id==='acanthostega-gunnari').translations.cs.recognition.some(r=>r.text.cs.includes('osmi prsty')),true);
const common={era:'paleozoic',period:'devonian',category:'all',diet:'all',query:'',favoritesOnly:false,favorites:new Set()};
assert.equal(app.filteredDinosaurs(merged.dinosaurs,common).length,8);
assert.equal(app.filteredDinosaurs(merged.dinosaurs,{...common,category:'fish'}).length,5);
assert.equal(app.filteredDinosaurs(merged.dinosaurs,{...common,category:'early-tetrapod'}).length,2);
assert.equal(app.makeQuiz(draft.animals,5).length,5);
console.log('PASS: Eight staged Devonian animals, eight distinct IDs, cautious body sizes, taxonomy, Czech narration and quiz; images not yet published.');
