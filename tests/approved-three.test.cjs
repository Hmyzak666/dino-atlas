const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const batch = require('../docs/approved-three-2026-11-06.json');
const db = require('../dinosaurs.json');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
assert.deepEqual(Object.keys(batch.images).sort(), ['edestus-heinrichi','ichthyostega-stensioei','tylosaurus-proriger']);
assert.equal(db.dinosaurs.length,112);
assert.equal(sha(fs.readFileSync('dinosaurs.json')),batch.databaseSha256);
let previous = fs.readFileSync('dinosaurs.json','utf8');
const json = value => JSON.stringify(value,null,2).replace(/\n/g,'\n      ');
for (const a of db.dinosaurs) {
  const item = batch.images[a.id];
  const bytes = fs.readFileSync(a.image.src);
  assert.equal(sha(bytes),item?.sha256 || batch.allActiveImageSha256[a.id],a.id);
  if (!item) continue;
  assert.equal(item.approved,true);
  assert.deepEqual(a.image,{...item.previousImageMetadata,facing:item.facing});
  assert.equal(bytes.toString('ascii',8,12),'WEBP');
  previous = previous.replace(json(a.image),json(item.previousImageMetadata));
}
assert.equal(sha(previous),batch.beforeDatabaseSha256,'Preserve every species text, licence and previous image metadata except corrected facing');
assert.equal(require('../project.json').versionCode,1000011);
console.log('PASS: three approved WebP imports; 109 images unchanged including Stegosaurus and all nine previous approvals; full database and licences preserved.');
