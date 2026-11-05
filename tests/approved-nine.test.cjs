const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const db = require('../dinosaurs.json');
const { batch, readHistoricalFile } = require('./helpers/approved-nine.cjs');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const ids = ['parasaurolophus-walkeri', 'ankylosaurus-magniventris', 'triceratops-horridus', 'coelophysis-bauri', 'brachiosaurus-altithorax', 'diplodocus-carnegii', 'tyrannosaurus-rex', 'mamenchisaurus-hochuanensis', 'torvosaurus-tanneri'];
assert.deepEqual(Object.keys(batch.images).sort(), ids.sort());
assert.equal(db.dinosaurs.length, 112);
assert.equal(sha(fs.readFileSync('dinosaurs.json')), batch.databaseSha256);
assert.equal(sha(readHistoricalFile('dinosaurs.json')), batch.beforeDatabaseSha256,
  'All species data, credits and non-selected metadata must remain unchanged');
for (const a of db.dinosaurs) {
  const accepted = batch.images[a.id];
  const bytes = fs.readFileSync(a.image.src);
  assert.equal(sha(bytes), accepted?.sha256 || batch.allActiveImageSha256[a.id], a.id);
  if (!accepted) continue;
  assert.equal(accepted.approved, true);
  assert.deepEqual(a.image, {...accepted.previousImageMetadata, facing: accepted.facing});
  assert.equal(a.image.facing, a.diet === 'carnivore' ? 'left' : 'right');
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
}
console.log('PASS: nine approved imports, correct facing metadata, 103 unchanged images, all 112 species and credits preserved.');
