const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../app.js');
const current = require('../dinosaurs.json');
const selection = require('../docs/dinosaur-batch08.json');
const previous = require('../docs/final-batch07.json');
const catalog = { ...current, dinosaurs: current.dinosaurs.slice(0, selection.countAfter) };
const animals = new Map(catalog.dinosaurs.map(animal => [animal.id, animal]));
const selected = [...selection.added, ...selection.replacements, ...selection.retained];
const oldImages = new Map(previous.animals.map(animal => [animal.id, animal.imageSha256]));
const filters = {category:'dinosaur', era:'mesozoic', period:'all', diet:'all', query:'', favoritesOnly:false, favorites:new Set()};

assert.equal(app.validateDatabase(catalog), true);
assert.equal(animals.size, 196);
assert.equal(new Set(catalog.dinosaurs.map(animal => animal.image.src)).size, animals.size);
assert.equal(selection.countAfter, animals.size);
assert.equal(selection.previousCount, previous.countAfter);
assert.equal(new Set(selected.map(item => item.id)).size, 23);
assert.deepEqual(catalog.dinosaurs.slice(selection.previousCount).map(animal => animal.id), selection.added.map(item => item.id));
assert.deepEqual(selection.replacements.map(item => item.id).sort(), ['baryonyx', 'corythosaurus', 'euoplocephalus', 'lambeosaurus']);
for (const item of selection.replacements) {
  assert.equal(item.previousSha256, oldImages.get(item.id), item.id);
  assert.notEqual(item.sha256, item.previousSha256, item.id);
}
for (const item of selection.retained) assert.equal(item.sha256, oldImages.get(item.id), item.id);

for (const item of selected) {
  const animal = animals.get(item.id);
  const bytes = fs.readFileSync(path.join(__dirname, '..', animal.image.src));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), item.sha256, item.id);
  assert.equal(animal.image.facing, animal.diet === 'carnivore' ? 'left' : 'right', item.id);
}
const additions = selection.added.map(item => animals.get(item.id));
assert.equal(additions.length, 13);
for (const animal of additions) {
  const text = animal.translations.cs;
  assert.equal(text.sections.length, 6, animal.id);
  assert.equal(text.recognition.length, 3, animal.id);
  for (const query of [text.displayName, ...animal.aliases]) {
    assert.ok(app.filteredDinosaurs(catalog.dinosaurs, {...filters, period:animal.period, diet:animal.diet, query})
      .some(result => result.id === animal.id), query);
  }
  assert.deepEqual(app.filteredDinosaurs(catalog.dinosaurs, {...filters, favoritesOnly:true, favorites:new Set([animal.id])}).map(result => result.id), [animal.id]);
  for (const target of ['summary', 'facts', 'recognition', ...text.sections.map(s => s.id)]) {
    assert.ok(app.narrationText(animal, target).length, animal.id + ' ' + target);
  }
}
assert.equal(app.filteredDinosaurs(catalog.dinosaurs, {...filters, category:'all'}).length, 95);
assert.deepEqual(new Set(app.makeQuiz(additions, additions.length).map(question => question.answerId)), new Set(selection.added.map(item => item.id)));
console.log('PASS: 196 atlas records and all 23 selected illustrations, including 13 new searchable and quiz-enabled dinosaurs.');
