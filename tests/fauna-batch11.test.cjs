const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../app.js');
const database = require('../dinosaurs.json');
const batch = require('../docs/fauna-batch11.json');

const expected = [
  ['ctenorhabdotus-capulus', 'cambrian', 'Ctenophora'],
  ['plumulites-bengtsoni', 'ordovician', 'Annelida'],
  ['furcaster-palaeozoicus', 'devonian', 'Echinodermata'],
  ['dendropupa-vetusta', 'carboniferous', 'Mollusca'],
  ['waagenophyllum-indicum', 'permian', 'Cnidaria'],
  ['colospongia-dubia', 'triassic', 'Porifera'],
  ['pygope-diphya', 'jurassic', 'Brachiopoda'],
  ['nipponites-mirabilis', 'cretaceous', 'Mollusca'],
  ['proplebeia-dominicana', 'neogene', 'Arthropoda'],
  ['cristatella-mucedo', 'quaternary', 'Bryozoa']
];

const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const previous = database.dinosaurs.slice(0, batch.previousCount);
const added = database.dinosaurs.slice(batch.previousCount, batch.countAfter);
assert.equal(sha256(JSON.stringify(previous)), '268ed8128f55e41bb0a00da57eb8808104f11c138889b795e96d3959c48cd53f');
assert.deepEqual(added.map(animal => [animal.id, animal.period, animal.taxonomy[0]]), expected);
assert.deepEqual(batch.images.map(image => image.id), added.map(animal => animal.id));
assert.equal(new Set(batch.images.map(image => image.sha256)).size, expected.length);

const selectedAmmonite = batch.images.find(image => image.id === 'nipponites-mirabilis');
assert.equal(selectedAmmonite.sourceSha256, 'c7666434e969a52209fd6998a5995b80c0f480c9419200471ef715507fc4323a', 'Approved second Nipponites illustration');
for (const [index, animal] of added.entries()) {
  assert.equal(animal.category, animal.taxonomy[0] === 'Arthropoda' ? 'arthropod' : 'other-invertebrate');
  assert.ok(!previous.some(other => other.period === animal.period && other.taxonomy.includes(animal.taxonomy[0])), animal.id);
  assert.equal(animal.image.src, 'images/' + animal.id + '.webp');
  assert.equal(sha256(fs.readFileSync(path.resolve(__dirname, '..', animal.image.src))), batch.images[index].sha256, animal.id);
  const copy = animal.translations.cs;
  assert.equal(copy.recognition.length, 3);
  assert.equal(copy.sections.length, 6);
  for (const query of [animal.scientificName, copy.displayName, ...animal.aliases]) {
    const filters = { query, category: animal.category, period: animal.period, diet: animal.diet };
    assert.ok(app.filteredDinosaurs(database.dinosaurs, filters).some(result => result.id === animal.id), query);
  }
}

assert.deepEqual(new Set(app.makeQuiz(added, added.length).map(question => question.answerId)), new Set(added.map(animal => animal.id)));
console.log('PASS: ten new invertebrate cards, ten previously missing phylum/period combinations and the approved images, including the revised ammonite.');
