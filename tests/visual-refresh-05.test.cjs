const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const db = require('../dinosaurs.json');
const before = require('../docs/backups/visual-refresh-05/manifest.json');
const accepted = require('../docs/visual-refresh-05.json');
const ids = ["meganeura-monyi", "hylonomus-lyelli", "greererpeton-burkemorani", "petrolacosaurus-kansensis", "crassigyrinus-scoticus"];
const crops = {...require('../docs/visual-refresh-06.json'), ...require('../docs/visual-refresh-07.json'), ...require('../docs/visual-refresh-08.json'), ...require('../docs/visual-refresh-09.json'), ...require('../docs/visual-refresh-10.json')};
const sha = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
assert.deepEqual(Object.keys(accepted).sort(), ids.sort());
assert.deepEqual(Object.keys(before.images).sort(), [...ids, "edestus-heinrichi"].sort());
assert.equal(db.dinosaurs.length, 112);
assert.deepEqual(db.dinosaurs.map(a=>a.id).sort(), Object.keys(before.allActiveImageSha256).sort());
for (const a of db.dinosaurs) {
  const old = before.allActiveImageSha256[a.id];
  const actual = sha(path.join(root, a.image.src));
  assert.equal(actual, accepted[a.id]?.sha256 || crops[a.id]?.sha256 || old, a.id);
  if (accepted[a.id]) {
    assert.notEqual(actual, old);
    assert.equal(a.period, 'carboniferous');
    assert.equal(a.image.facing, 'right');
    assert.equal(a.image.status, 'working-reconstruction');
    assert.ok(!a.image.sourceIds?.length);
    assert.equal(sha(path.join(root, 'docs/backups/visual-refresh-05/images', a.id+'.webp')), old);
  }
}
console.log('PASS: five Carboniferous replacements, previous images preserved except three explicit batch 06 edits.');

for (const [id, old] of Object.entries(before.images)) assert.equal(sha(path.join(root, 'docs/backups/visual-refresh-05/images', id+'.webp')), old.sha256);
