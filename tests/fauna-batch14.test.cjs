const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../app.js');
const db = require('../dinosaurs.json');
const { dinosaurs } = db;
const batch = require('../docs/fauna-batch14.json');

const expected = [
  ['panderodus-unicostatus', 'silurian', 'early-chordate'],
  ['palmatolepis-linguiformis', 'devonian', 'early-chordate'],
  ['lochriea-commutata', 'carboniferous', 'early-chordate'],
  ['khmeria-problematica', 'permian', 'early-chordate'],
  ['toscanisoma-multipartitum', 'triassic', 'early-chordate'],
  ['didemnum-cassianum', 'jurassic', 'early-chordate'],
  ['didemnoides-moreti', 'cretaceous', 'early-chordate'],
  ['cystodytes', 'paleogene', 'early-chordate'],
  ['bonetia-acuta', 'neogene', 'early-chordate'],
  ['dermochelys-coriacea', 'quaternary', 'marine-reptile']
];
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const previous = dinosaurs.slice(0, batch.previousCount);
const catalog = dinosaurs.slice(0, batch.countAfter);
const added = catalog.slice(batch.previousCount);
assert.equal(sha256(JSON.stringify(previous)), 'fb201f5827ffd1fe3218753febfbecb78558b27a30a9abc47ecb9feb8e95c64d');
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

assert.equal(added.find(a => a.id === 'cystodytes').taxonRank, 'genus');
assert.ok(added.find(a => a.id === 'dermochelys-coriacea').taxonomy.includes('Pan-Chelonioidea'));

const forQuiz = [previous.find(a => a.id === 'promissum-pulchrum'), ...added];
const lookup = new Map(forQuiz.map(a => [a.id, a]));
let seed = 14;
const random = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};
for (let run = 0; run < 12; run++) {
  const questions = app.makeQuiz(forQuiz, forQuiz.length, random);
  assert.deepEqual(new Set(questions.map(q => q.answerId)), new Set(lookup.keys()));
  for (const {answerId, optionIds} of questions) {
    const answer = lookup.get(answerId);
    const others = optionIds.filter(id => id !== answerId).map(id => lookup.get(id));
    if (answer.taxonomy.includes('Conodonta')) {
      assert.ok(others.every(a => !a.taxonomy.includes('Conodonta')));
    }
    if (answer.quizLookalikeGroup) {
      assert.ok(others.every(a => a.quizLookalikeGroup !== answer.quizLookalikeGroup));
    }
  }
}
console.log('PASS: ten empty filters filled, previous 276 records retained, image hashes, aliases, taxonomic rank and quiz options verified.');
