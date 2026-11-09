const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const db = require('./helpers/before-thirty.cjs').database;
const before = require('../docs/backups/visual-refresh-04/manifest.json');
const accepted = require('../docs/visual-refresh-04.json');
const ids = ["isotelus-rex", "asaphus-kowalewskii", "aegirocassis-benmoulai", "arandaspis-prionotolepis", "endoceras-proteiforme"];
const carbonBatch = require('../docs/visual-refresh-05.json');
const crops = {...require('../docs/visual-refresh-06.json'), ...require('../docs/visual-refresh-07.json'), ...require('../docs/visual-refresh-08.json'), ...require('../docs/visual-refresh-09.json'), ...require('../docs/visual-refresh-10.json'), ...require('../docs/anatomy-01.json'), ...require('../docs/anatomy-02.json'), ...require('../docs/anatomy-03.json'), ...require('../docs/anatomy-04.json'), ...require('../docs/approved-nine-2026-11-05.json').images, ...require('../docs/approved-three-2026-11-06.json').images, ...require('../docs/approved-twelve-2026-11-06.json').images, ...require('../docs/approved-thirty-2026-11-08.json').images, ...require('../docs/approved-eight-2026-11-09.json')};
const sha = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
assert.deepEqual(Object.keys(accepted).sort(), ids.sort());
assert.deepEqual(Object.keys(before.images).sort(), ids.sort());
assert.equal(db.dinosaurs.length, 112);
assert.deepEqual(db.dinosaurs.map(a=>a.id).sort(), Object.keys(before.allActiveImageSha256).sort());
for (const a of db.dinosaurs) {
  const old = before.allActiveImageSha256[a.id];
  const actual = sha(path.join(root, a.image.src));
  assert.equal(actual, require('./helpers/before-thirty.cjs').images[a.id]?.sha256 || accepted[a.id]?.sha256 || carbonBatch[a.id]?.sha256 || crops[a.id]?.sha256 || old, a.id);
  if (accepted[a.id]) {
    assert.notEqual(actual, old);
    assert.equal(a.period, 'ordovician');
    assert.equal(a.image.facing, 'right');
    assert.equal(a.image.status, 'working-reconstruction');
    assert.ok(!a.image.sourceIds?.length);
    assert.equal(sha(path.join(root, 'docs/backups/visual-refresh-04/images', a.id+'.webp')), old);
  }
}
console.log('PASS: five Ordovician replacements, five originals backed up, all other imagery preserved except five explicit batch 05 replacements.');
