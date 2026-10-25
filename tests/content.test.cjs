const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../app.js');
const db = require('../dinosaurs.json');
const byId = new Map(db.dinosaurs.map(a => [a.id, a]));

assert.equal(app.validateDatabase(db), true);
assert.ok([72,78,83,88,96,104].includes(db.dinosaurs.length), 'Only verified 72, 78, 83, 88, 96 or 104 species checkpoints are allowed');
const original = db.dinosaurs.slice(0,72);
assert.equal(original.length,72);
assert.deepEqual(Object.fromEntries(['dinosaur', 'pterosaur', 'marine-reptile', 'arthropod'].map(category => [category, app.categoryAnimals(original, category).length])),
  { dinosaur: 45, pterosaur: 10, 'marine-reptile': 8, arthropod: 9 });

const addedIds = ['eoraptor-lunensis','herrerasaurus-ischigualastensis','eodromaeus-murphi','saturnalia-tupiniquim','riojasaurus-incertus','eudimorphodon-ranzii','peteinosaurus-zambellii','nothosaurus-mirabilis','shonisaurus-popularis'];
assert.equal(db.dinosaurs.filter(a => a.period === 'triassic').length, 17);
for (const id of addedIds) {
  const animal = byId.get(id);
  assert.equal(animal.period, 'triassic', id);
  assert.equal(animal.translations.cs.sections.length, 6, id);
  assert.equal(animal.image.facing, animal.diet === 'carnivore' ? 'left' : 'right', id);
}
const invalidMarine = structuredClone(db);
invalidMarine.dinosaurs.find(a => a.id === 'nothosaurus-mirabilis').taxonomy = ['Diapsida','Sauropterygia'];
assert.throws(() => app.validateDatabase(invalidMarine), /Mořský plaz má nesprávné zařazení/);
const invalidDinosaur = structuredClone(db);
invalidDinosaur.dinosaurs.find(a => a.id === 'nothosaurus-mirabilis').taxonomy.push('Dinosauria');
assert.throws(() => app.validateDatabase(invalidDinosaur), /Mořský plaz má nesprávné zařazení/);

const brachio = byId.get('brachiosaurus-altithorax');
const introduction = app.narrationText(brachio);
assert.match(introduction, /severoamerycký druh/);
assert.doesNotMatch(introduction, /150|Západ dnešních|Základní údaje|Pozdní jura/);
assert.match(brachio.translations.cs.summary, /severoamerický/);
assert.doesNotMatch(JSON.stringify(db), /ameryck/);
assert.equal(app.pronunciationText('Americký a severoameričtí; Amerika.'), 'Amerycký a severoameryčtí; Amerika.');
assert.equal(app.pronunciationText('jedince, jedinci, jediný, rodina'), 'jeďince, jeďinci, jediný, rodina');
const facts = app.narrationText(brachio, 'facts');
assert.match(facts, /Období: Pozdní jura/);
assert.match(facts, /150 miliony let/);
assert.match(facts, /Oblast nálezů: Západ dnešních USA/);
assert.match(facts, /Délka: Orientačně kolem 22 metrů/);
assert.match(facts, /Hmotnost: Orientačně kolem 47 tun/);
assert.doesNotMatch(facts, /severoamerycký druh/);
assert.equal(app.speechMeasurements('6–7 m; 1,8 m; 47 t; 980 kg'), '6 až 7 metrů; 1,8 metru; 47 tun; 980 kilogramů');


const camarasaurus = byId.get('camarasaurus-lentus');
assert.match(camarasaurus.translations.cs.summary, /Diplodocovi/);
assert.match(app.narrationText(camarasaurus), /Diplodokovi/);
assert.match(app.narrationText(camarasaurus, 'recognition'), /Diplodoka/);
assert.equal(app.narrationText(camarasaurus, 'name'), 'Camarasaurus');
assert.equal(app.narrationText(byId.get('diplodocus-carnegii'), 'name'), 'Diplodokus');
assert.equal(app.pronunciationText('Diplodocovi, diplodoců, DIPLODOCUS'), 'Diplodokovi, diplodoků, DIPLODOKUS');

const reserved = new Set(['name','summary','facts','recognition','comparison','contemporaries']);
for (const animal of db.dinosaurs) {
  const file = path.join(__dirname, '..', animal.image.src);
  const image = fs.readFileSync(file);
  assert.ok(image.length > 1000, animal.id + ': missing image');
  assert.equal(image.subarray(0, 4).toString(), 'RIFF');
  assert.equal(image.subarray(8, 12).toString(), 'WEBP');
  for (const section of animal.translations.cs.sections) {
    assert.ok(!reserved.has(section.id));
    const spoken = app.narrationText(animal, section.id);
    assert.ok(spoken.includes(app.pronunciationText(section.title)), animal.id + ': section title missing');
    assert.ok(spoken.length < 4000, animal.id + ': speech engine input limit');
  }
  for (const target of reserved) {
    if (target === 'comparison' && !animal.comparison) continue;
    if (target === 'contemporaries' && !animal.translations.cs.contemporaries) continue;
    const spoken = app.narrationText(animal, target);
    assert.ok(spoken.length > 0 && spoken.length < 4000, animal.id + ': ' + target);
  }
  const spokenFacts = app.narrationText(animal, 'facts');
  assert.match(spokenFacts, /Hmotnost[^:]*:/, animal.id);
  assert.match(spokenFacts, animal.comparison?.kind === 'wingspan' || animal.facts.some(f => f.label.cs === 'Rozpětí křídel') ? /Rozpětí křídel[^:]*:/ : /Délka[^:]*:/, animal.id);
}

const state = {category:'all',query:'',period:'all',diet:'all',favoritesOnly:false,favorites:new Set()};
const expectedOrder = ['Allosaurus','Ankylosaurus','Apatosaurus','Brachiosaurus','Brontosaurus','Camarasaurus','Carnotaurus','Ceratosaurus','Coelophysis'];
assert.deepEqual(app.filteredDinosaurs(db.dinosaurs.slice(0,42),state).slice(0,9).map(a=>a.translations.cs.displayName),expectedOrder);
assert.equal(app.filteredDinosaurs(db.dinosaurs,{...state,query:'rhampho'})[0].id,'rhamphorhynchus-muensteri');
assert.equal(app.filteredDinosaurs(db.dinosaurs,{...state,query:'tyrannosaurus'})[0].id,'tyrannosaurus-rex');
assert.equal(app.filteredDinosaurs(db.dinosaurs,{...state,favoritesOnly:true,favorites:new Set(['tyrannosaurus-rex','brachiosaurus-altithorax'])}).length,2);

let seed = 705;
const random = () => { seed = (Math.imul(seed,1664525)+1013904223) >>> 0; return seed/4294967296; };
for (const category of ['all','dinosaur','pterosaur','marine-reptile','arthropod']) {
  const animals = app.categoryAnimals(db.dinosaurs,category);
  for (let i=0;i<100;i++) {
    const quiz = app.makeQuiz(animals,5,random);
    assert.equal(quiz.length,Math.min(animals.length,5));
    assert.equal(new Set(quiz.map(q=>q.answerId)).size,quiz.length);
    for (const question of quiz) {
      assert.equal(question.optionIds.length,3);
      assert.equal(new Set(question.optionIds).size,3);
      assert.ok(question.optionIds.includes(question.answerId));
      const answer = byId.get(question.answerId);
      for (const id of question.optionIds) {
        assert.ok(animals.some(a=>a.id===id));
        if (id!==answer.id && answer.quizLookalikeGroup) assert.notEqual(byId.get(id).quizLookalikeGroup,answer.quizLookalikeGroup);
      }
    }
  }
}
const pterosaur = byId.get('rhamphorhynchus-muensteri');
assert.match(app.narrationText(pterosaur,'comparison'),/Rozpětí křídel/);
assert.match(app.narrationText(pterosaur,'comparison',1.1),/1,1 metru/);
assert.equal(app.narrationText(brachio,'missing-section'),'');
console.log('PASS: 72 preserved animals, '+db.dinosaurs.length+' installed entries, all images and narration targets, Czech sorting, filters, and quizzes.');
