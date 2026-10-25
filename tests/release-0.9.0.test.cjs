const assert = require('node:assert/strict');
const app = require('../app.js');
const db = require('../dinosaurs.json');
const ids = require('./fixtures/additions-0.9.0.json');
assert.equal(new Set(ids).size,30);
assert.equal(db.dinosaurs.length,72);
const additions=ids.map(id=>db.dinosaurs.find(a=>a.id===id));
assert.ok(additions.every(Boolean));
assert.equal(new Set(db.dinosaurs.map(a=>a.scientificName.toLowerCase())).size,72);
for(const period of Object.keys(db.periods)) assert.equal(additions.filter(a=>a.category==='arthropod'&&a.period===period).length,3);
for(const a of additions) {
 assert.equal(a.translations.cs.sections.length,6);
 assert.equal(a.translations.cs.recognition.length,3);
 assert.ok(a.speechName);
 assert.equal(app.narrationText(a,'name'),a.speechName);
 assert.ok(a.image.note.cs.includes('rekonstrukce'));
 assert.ok(a.facts.some(f=>f.label.cs==='Hmotnost'));
 if(a.category==='arthropod') assert.ok(a.taxonomy.includes('Arthropoda')&&!a.taxonomy.includes('Dinosauria'));
}
let seed=9;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
for(const category of ['all','dinosaur','pterosaur','marine-reptile','arthropod']) for(const period of ['all',...Object.keys(db.periods)]) {
 const pool=db.dinosaurs.filter(a=>(category==='all'||a.category===category)&&(period==='all'||a.period===period));
 for(let i=0;i<30;i++) for(const q of app.makeQuiz(pool,5,random)) {
  assert.equal(new Set(q.optionIds).size,3);
  assert.ok(q.optionIds.includes(q.answerId));
  assert.ok(q.optionIds.every(id=>pool.some(a=>a.id===id)),`${category}/${period}`);
 }
}
assert.deepEqual(app.makeQuiz(additions.slice(0,2)),[]);
const small=additions.find(a=>a.id==='chimerarachne-yingi');
const comparison=app.comparisonData(small);
assert.equal(comparison.referenceM,.01);
assert.equal(comparison.animalPercent,25);
assert.match(app.narrationText(small,'comparison'),/2,5 milimetru/);
assert.equal(app.speechMeasurements('7 mm; 4,4 cm'),'7 milimetrů; 4,4 centimetru');
const future=structuredClone(db);future.periods.cambrian='Kambrium';future.dinosaurs[42].period='cambrian';
assert.equal(app.validateDatabase(future),true,'Period vocabulary can be extended without a three-period restriction');
const broken=structuredClone(db);broken.dinosaurs[42].taxonomy=['Dinosauria'];
assert.throws(()=>app.validateDatabase(broken),/Členovec/);
console.log('PASS: exact 30 additions, 9 arthropods, all category/period quiz pools, small scales, speech hints and extensible periods.');
