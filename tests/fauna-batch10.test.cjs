const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../app.js');
const database = require('../dinosaurs.json');
const batch = require('../docs/fauna-batch10.json');

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const previous = database.dinosaurs.slice(0, batch.previousCount);
const added = database.dinosaurs.slice(batch.previousCount, batch.countAfter);
assert.equal(hash(JSON.stringify(previous)), '93151276ddfaccdb041f8ad7675bb6543306973022b9217fd082e8583bedc9e4');
assert.equal(added.length, 10);
assert.deepEqual(added.map(animal => animal.id), batch.images.map(image => image.id));
assert.equal(new Set(batch.images.map(image => image.sha256)).size, 10);
assert.equal(batch.images.find(image => image.id === 'campanile-giganteum').sourceSha256,
  '95452f0c8c2913b7dc510d406ed99be4df7d24a8b086c0589b5e26fa33e92dcc', 'Approved second Campanile illustration');

const newPhyla = {
  cambrian: 'Porifera', ordovician: 'Bryozoa', silurian: 'Brachiopoda', devonian: 'Cnidaria',
  carboniferous: 'Annelida', paleogene: 'Mollusca', neogene: 'Echinodermata'
};
const invertebrates = added.filter(animal => animal.category === 'other-invertebrate');
assert.deepEqual(Object.fromEntries(invertebrates.map(animal => [animal.period, animal.taxonomy[0]])), newPhyla);
for (const animal of invertebrates) {
  assert.ok(!previous.some(other => other.period === animal.period && other.taxonomy.includes(animal.taxonomy[0])), animal.id);
}
const dinosaurs = added.filter(animal => animal.category === 'dinosaur');
assert.deepEqual(dinosaurs.map(animal => animal.period), ['triassic', 'jurassic', 'cretaceous']);

for (const [i, animal] of added.entries()) {
  const bytes = fs.readFileSync(path.join(__dirname, '..', animal.image.src));
  assert.equal(hash(bytes), batch.images[i].sha256, animal.id);
  const entry = animal.translations.cs;
  assert.equal(entry.sections.length, 6);
  assert.equal(entry.recognition.length, 3);
  for (const query of [animal.scientificName, entry.displayName, ...animal.aliases]) {
    const filters = { query, category: animal.category, period: animal.period, diet: animal.diet };
    assert.ok(app.filteredDinosaurs(database.dinosaurs, filters).some(result => result.id === animal.id), query);
  }
}
const quiz = app.makeQuiz(added, added.length);
assert.deepEqual(new Set(quiz.map(question => question.answerId)), new Set(added.map(animal => animal.id)));
console.log('PASS: ten approved illustrations and searchable quiz entries, three dinosaurs and seven new phylum/period combinations.');
