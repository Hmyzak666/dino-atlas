const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const root = path.resolve(__dirname,'..');
const db = require('../dinosaurs.json');
const before = require('../docs/backups/visual-refresh-08/manifest.json');
const after = require('../docs/visual-refresh-08.json');
const next = {...require('../docs/visual-refresh-09.json'), ...require('../docs/visual-refresh-10.json')};
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const fileSha = p => sha(fs.readFileSync(path.join(root,p)));
const canon = v => Array.isArray(v) ? v.map(canon) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map(k=>[k,canon(v[k])])) : v;
assert.equal(db.dinosaurs.length,112);
assert.equal(sha(JSON.stringify(canon(db.dinosaurs.map(({image,...rest})=>rest)))),before.nonImageDataSha256,'All species text and narration must stay unchanged');
assert.equal(fileSha('dinosaurs.json'),next.databaseSha256);
for (const a of db.dinosaurs) {
  assert.equal(fileSha(a.image.src),next[a.id]?.sha256 || after[a.id]?.sha256 || before.allActiveImageSha256[a.id],a.id);
  if (!after[a.id]) continue;
  assert.equal(fileSha('docs/backups/visual-refresh-08/images/'+a.id+'.webp'),before.allActiveImageSha256[a.id]);
  const {note,...metadata}=a.image;
  const {note:oldNote,...oldMetadata}=before.imageMetadata[a.id];
  assert.deepEqual(metadata,oldMetadata,'Preserve source IDs, paths and other image metadata');
  if (a.id !== 'edestus-heinrichi') {
    assert.match(note.cs,/Prehistorica CM/);
    assert.match(note.cs,/CC BY 4.0/);
    assert.match(note.cs,/vodorovné roztažení/);
  }
}
console.log('PASS: batch 08 three backed-up images; 109 other images and all species text/narration preserved.');
