const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const db = require('../dinosaurs.json');
const before = require('../docs/backups/visual-refresh-03/manifest.json');
const accepted = require('../docs/visual-refresh-03.json');
const ids = ['anomalocaris-canadensis', 'opabinia-regalis', 'hallucigenia-sparsa', 'marrella-splendens', 'wiwaxia-corrugata', 'pikaia-gracilens'];
const sha = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
assert.deepEqual(Object.keys(accepted).sort(), ids.sort());
assert.deepEqual(Object.keys(before.images).sort(), ids.sort());
assert.equal(db.dinosaurs.length, 112);
assert.deepEqual(db.dinosaurs.map(a=>a.id).sort(), Object.keys(before.allActiveImageSha256).sort());
for (const a of db.dinosaurs) {
  const old = before.allActiveImageSha256[a.id];
  const actual = sha(path.join(root, a.image.src));
  assert.equal(actual, accepted[a.id]?.sha256 || old, a.id);
  if (accepted[a.id]) {
    assert.notEqual(actual, old);
    assert.equal(a.period, 'cambrian');
    assert.equal(a.image.facing, 'right');
    assert.equal(a.image.status, 'working-reconstruction');
    assert.ok(!a.image.sourceIds?.length);
    assert.equal(sha(path.join(root, 'docs/backups/visual-refresh-03/images', a.id+'.webp')), old);
  }
}
console.log('PASS: six Cambrian replacements, six originals backed up, all other 106 images preserved.');
