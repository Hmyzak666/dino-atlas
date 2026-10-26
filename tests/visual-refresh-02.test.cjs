const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const db = require('../dinosaurs.json');
const before = require('../docs/backups/visual-refresh-02/manifest.json');
const accepted = require('../docs/visual-refresh-02.json');
const sha = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
assert.equal(db.dinosaurs.length, 112);
assert.deepEqual(db.dinosaurs.map(a => a.id).sort(), Object.keys(before.allActiveImageSha256).sort());
assert.deepEqual(Object.keys(accepted).sort(), ['acutiramus-bohemicus','birkenia-elegans','dunkleosteus-terrelli']);
assert.equal(Object.keys(before.images).length, 40);
for (const [id, old] of Object.entries(before.images)) {
  assert.equal(sha(path.join(root, 'docs/backups/visual-refresh-02/images', id + '.webp')), old.sha256);
}
for (const animal of db.dinosaurs) {
  assert.equal(sha(path.join(root, animal.image.src)), accepted[animal.id]?.sha256 || before.allActiveImageSha256[animal.id], animal.id);
  if (accepted[animal.id]) {
    assert.equal(animal.image.status, 'working-reconstruction');
    assert.ok(!animal.image.sourceIds?.length);
  }
}
// Compare all non-image animal data to a canonical snapshot hash (including Czech text and TTS).
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(k => [k, canonical(value[k])]));
  return value;
}
const content = db.dinosaurs.map(({image, ...animal}) => animal);
assert.equal(crypto.createHash('sha256').update(JSON.stringify(canonical(content))).digest('hex'), before.contentCanonicalSha256);
console.log('PASS: exactly three reviewed replacements, 40 rollback images, all 112 IDs/texts/TTS and other artwork preserved.');
