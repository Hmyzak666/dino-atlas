const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../app.js');
const db = require('../dinosaurs.json');
const { dinosaurs } = db;
const batch = require('../docs/fauna-batch13.json');

const expected = [
  ['karaurus-sharovi', 'jurassic', 'early-tetrapod'],
  ['opisthiamimus-gregori', 'jurassic', 'other-reptile'],
  ['kayentatherium-wellesi', 'jurassic', 'synapsid'],
  ['fossiomanus-sinensis', 'cretaceous', 'synapsid'],
  ['thaumastosaurus-servatus', 'paleogene', 'early-tetrapod'],
  ['andrias-scheuchzeri', 'neogene', 'early-tetrapod'],
  ['leiopelma-waitomoensis', 'quaternary', 'early-tetrapod'],
  ['palaeophis-colossaeus', 'paleogene', 'marine-reptile'],
  ['pacifichelys-urbinai', 'neogene', 'marine-reptile'],
  ['promissum-pulchrum', 'ordovician', 'early-chordate']
];
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const previous = dinosaurs.slice(0, batch.previousCount);
const catalog = dinosaurs.slice(0, batch.countAfter);
const added = catalog.slice(batch.previousCount);
assert.equal(sha256(JSON.stringify(previous)), 'e17bb1160c6c2e7e09b4d00ed5ecc23d5d8b20d6cba54cb2f362dbe85ef6a8e8');
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

for (const [id, marineGroup] of [['palaeophis-colossaeus', 'Palaeophiidae'], ['pacifichelys-urbinai', 'Pan-Chelonioidea']]) {
  const animal = added.find(a => a.id === id);
  assert.ok(animal.taxonomy.includes(marineGroup));
  const unclassified = { ...animal, taxonomy: animal.taxonomy.filter(group => group !== marineGroup) };
  assert.throws(() => app.validateDatabase({ ...db, dinosaurs: [unclassified] }), /Mořský plaz/);
}

assert.deepEqual(new Set(app.makeQuiz(added, added.length).map(q => q.answerId)), new Set(added.map(a => a.id)));
console.log('PASS: ten new filter combinations, matching illustrations, search aliases, marine reptile classification and quiz entries.');
