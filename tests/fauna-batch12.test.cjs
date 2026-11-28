const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../app.js');
const { dinosaurs } = require('../dinosaurs.json');
const batch = require('../docs/fauna-batch12.json');

const expected = [
  ['haikouichthys-ercaicunensis', 'cambrian', 'fish'],
  ['archaeothyris-florensis', 'carboniferous', 'synapsid'],
  ['lystrosaurus-murrayi', 'triassic', 'synapsid'],
  ['proganochelys-quenstedtii', 'triassic', 'other-reptile'],
  ['rugosodon-eurasiaticus', 'jurassic', 'mammal'],
  ['beelzebufo-ampinga', 'cretaceous', 'early-tetrapod'],
  ['simosuchus-clarki', 'cretaceous', 'other-reptile'],
  ['knightia-eocaena', 'paleogene', 'fish'],
  ['purussaurus-brasiliensis', 'neogene', 'other-reptile'],
  ['esox-nogaicus', 'quaternary', 'fish']
];
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const previous = dinosaurs.slice(0, batch.previousCount);
const catalog = dinosaurs.slice(0, batch.countAfter);
const added = catalog.slice(batch.previousCount);
assert.equal(sha256(JSON.stringify(previous)), 'a3a37bebf99e8372cea63897f4b9ecd1886f758ab2a3138e73b319407f8970f7');
assert.deepEqual(added.map(a => [a.id, a.period, a.category]), expected);
assert.deepEqual(batch.images.map(image => image.id), added.map(a => a.id));
assert.equal(new Set(batch.images.map(image => image.sha256)).size, expected.length);

for (const [index, animal] of added.entries()) {
  const filter = { category: animal.category, period: animal.period, diet: 'all' };
  assert.deepEqual(app.filteredDinosaurs(previous, filter), [], animal.id);
  assert.deepEqual(app.filteredDinosaurs(catalog, filter).map(a => a.id), [animal.id]);
  const copy = animal.translations.cs;
  assert.equal(copy.recognition.length, 3);
  assert.equal(copy.sections.length, 6);
  for (const query of [animal.scientificName, copy.displayName, ...animal.aliases]) {
    assert.deepEqual(app.filteredDinosaurs(catalog, { ...filter, diet: animal.diet, query }).map(a => a.id), [animal.id]);
  }
  assert.equal(animal.image.src, 'images/' + animal.id + '.webp');
  const bytes = fs.readFileSync(path.join(__dirname, '..', animal.image.src));
  assert.equal(sha256(bytes), batch.images[index].sha256, animal.id);
}

const archaeopteryx = 'archaeopteryx-lithographica';
const favorites = new Set([archaeopteryx]);
const jurassic = { era: 'mesozoic', period: 'jurassic', diet: 'all' };
assert.deepEqual(app.filteredDinosaurs(catalog, { ...jurassic, category: 'bird' }).map(a => a.id), [archaeopteryx]);
for (const category of ['bird', 'dinosaur', 'all']) {
  const selected = app.filteredDinosaurs(catalog, { ...jurassic, category, favoritesOnly: true, favorites });
  assert.deepEqual(selected.map(a => a.id), [archaeopteryx]);
}
const mesozoicBirds = app.categoryAnimals(catalog, 'bird').filter(a => app.periodInEra(a.period, 'mesozoic'));
assert.ok(app.makeQuiz(mesozoicBirds, mesozoicBirds.length).some(q => q.answerId === archaeopteryx));
assert.deepEqual(new Set(app.makeQuiz(added, added.length).map(q => q.answerId)), new Set(added.map(a => a.id)));
console.log('PASS: ten new period and category combinations, ten matching images, and one shared Archaeopteryx card in Jurassic birds and dinosaurs.');
