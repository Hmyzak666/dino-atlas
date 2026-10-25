const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../app.js');
const stable = require('../dinosaurs.json');
const drafts = require('../content-drafts/cambrian-six.json');

const expected = [
  'anomalocaris-canadensis',
  'opabinia-regalis',
  'hallucigenia-sparsa',
  'marrella-splendens',
  'wiwaxia-corrugata',
  'pikaia-gracilens'
];
assert.equal(drafts.status, 'draft-awaiting-six-original-webp-images');
assert.ok([72,78,83,88,96].includes(stable.dinosaurs.length));
const active = stable.dinosaurs.length >= 78;
assert.equal(drafts.animals.length, 6);
assert.deepEqual(drafts.animals.map(a => a.id), expected);
assert.equal(new Set(drafts.animals.map(a => a.scientificName)).size, 6);
assert.equal(drafts.sources['pikaia-2024'].url, 'https://doi.org/10.1016/j.cub.2024.05.026');

const combined = structuredClone(stable);
combined.periods.cambrian = 'Kambrium';
Object.assign(combined.sources, drafts.sources);
if (!active) combined.dinosaurs.push(...drafts.animals);
assert.equal(combined.dinosaurs.length, active ? stable.dinosaurs.length : 78);
assert.equal(app.validateDatabase(combined), true);

for (const animal of drafts.animals) {
  assert.equal(animal.period, 'cambrian');
  assert.equal(animal.taxonomy.includes('Dinosauria'), false);
  assert.equal(animal.translations.cs.recognition.length, 3);
  assert.equal(animal.translations.cs.sections.length, 6);
  assert.ok(animal.translations.cs.quizHint);
  assert.ok(animal.speechName);
  assert.ok(app.narrationText(animal, 'name'));
  assert.ok(app.narrationText(animal, 'facts').includes('Hmotnost:'));
  assert.equal(animal.image.status, 'awaiting-original-image');
  assert.equal(fs.existsSync(path.resolve(__dirname, '..', animal.image.src)), active,
    'All six images must exist together with the activated entries, never as incomplete placeholders');
  if(active) {
    const published=stable.dinosaurs.find(item=>item.id===animal.id);
    assert.ok(published && published.image.status==='working-reconstruction');
    assert.equal(published.image.src,animal.image.src);
  }
  for (const section of animal.translations.cs.sections) {
    assert.ok(app.narrationText(animal, section.id).includes(section.title));
  }
}
const marrella = drafts.animals.find(a => a.id === 'marrella-splendens');
const pikaia = drafts.animals.find(a => a.id === 'pikaia-gracilens');
for (const animal of drafts.animals) {
  if (animal.id !== marrella.id) assert.notEqual(animal.category, 'arthropod');
}
assert.deepEqual(marrella.taxonomy.slice(0, 1), ['Arthropoda']);
assert.equal(pikaia.category, 'early-chordate');
assert.equal(pikaia.taxonomy[0], 'Chordata');
assert.equal(app.categoryAnimals(drafts.animals, 'fish').length, 0);
assert.equal(app.categoryAnimals(drafts.animals, 'arthropod').length, 1);
assert.equal(app.categoryAnimals(drafts.animals, 'early-chordate').length, 1);
assert.equal(app.filteredDinosaurs(combined.dinosaurs,
  {category:'all',era:'paleozoic',period:'cambrian',diet:'all',query:'',favoritesOnly:false,favorites:new Set()}).length,6);
assert.equal(app.filteredDinosaurs(combined.dinosaurs,
  {category:'all',era:'mesozoic',period:'all',diet:'all',query:'',favoritesOnly:false,favorites:new Set()}).length,72);
assert.equal(app.makeQuiz(drafts.animals, 5, () => 0.4).length,5);

console.log('PASS: six sourced Cambrian entries, accurate categories, Czech TTS, quiz and filters; activation and original-image completeness = '+active);
