const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../app.js');
const database = require('../dinosaurs.json');
const batch = require('../docs/fauna-batch09.json');

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const original = database.dinosaurs.slice(0, batch.previousCount);
const added = database.dinosaurs.slice(batch.previousCount, batch.countAfter);
assert.equal(original.length, 196);
assert.equal(hash(JSON.stringify(original)), '99c51f504378d12311200d537a9131a4a4ef1bbfe732a7af8e68a032a94a6f58');
assert.equal(added.length, 40);
assert.deepEqual(added.map(a => a.id), batch.images.map(a => a.id));
assert.equal(new Set(added.map(a => a.scientificName)).size, 40);
assert.equal(new Set(batch.images.map(i => i.sha256)).size, 40);
assert.deepEqual([...new Set(added.map(a => a.period))].sort(), Object.keys(database.periods).sort());

for (const [i, animal] of added.entries()) {
  const image = fs.readFileSync(path.join(__dirname, '..', animal.image.src));
  assert.equal(hash(image), batch.images[i].sha256, animal.id);
  const entry = animal.translations.cs;
  assert.equal(entry.sections.length, 6, animal.id);
  assert.equal(entry.recognition.length, 3, animal.id);
  for (const query of [animal.scientificName, entry.displayName, ...animal.aliases]) {
    const filters = { category: animal.category, period: animal.period, diet: animal.diet, query };
    assert.ok(app.filteredDinosaurs(database.dinosaurs, filters).some(r => r.id === animal.id), query);
  }
  for (const target of ['facts', 'recognition', ...entry.sections.map(s => s.id)]) {
    assert.ok(app.narrationText(animal, target).length, animal.id + ' ' + target);
  }
}

const quiz = app.makeQuiz(added, 40);
assert.deepEqual(new Set(quiz.map(q => q.answerId)), new Set(added.map(a => a.id)));
const filterFeeders = app.filteredDinosaurs(added, {category:'all', period:'all', diet:'suspension-feeder', query:''});
assert.ok(filterFeeders.some(a => a.id === 'encrinus-liliiformis'));
assert.ok(filterFeeders.some(a => a.id === 'ditrupa-arietina'));
assert.ok(added.some(a => a.id === 'acropora-palmata' && a.image.facing === 'none'));
console.log('PASS: 40 approved illustrations and Czech species entries across 12 periods; all new search and quiz entries verified.');
