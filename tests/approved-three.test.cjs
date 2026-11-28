const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const batch = require('../docs/approved-three-2026-11-06.json');
const latest = require('../docs/approved-twelve-2026-11-06.json');
const db = structuredClone(require('./helpers/before-thirty.cjs').database);
for (const a of db.dinosaurs) if (latest.images[a.id]) a.image = latest.images[a.id].previousImageMetadata;
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
assert.deepEqual(Object.keys(batch.images).sort(), ['edestus-heinrichi','ichthyostega-stensioei','tylosaurus-proriger']);
assert.equal(db.dinosaurs.length,112);
assert.equal(latest.beforeDatabaseSha256,batch.databaseSha256);
let previous = require('./helpers/before-thirty.cjs').text;
const json = value => JSON.stringify(value,null,2).replace(/\n/g,'\n      ');
for (const a of require('./helpers/before-thirty.cjs').database.dinosaurs) {
  if (latest.images[a.id]) previous = previous.replace(json(a.image),json(latest.images[a.id].previousImageMetadata));
}
assert.equal(sha(previous),batch.databaseSha256);
for (const a of db.dinosaurs) {
  const item = batch.images[a.id];
  const bytes = fs.readFileSync(a.image.src);
  assert.equal(sha(bytes),require('./helpers/before-thirty.cjs').images[a.id]?.sha256 || latest.images[a.id]?.sha256 || item?.sha256 || batch.allActiveImageSha256[a.id],a.id);
  if (!item) continue;
  assert.equal(item.approved,true);
  assert.deepEqual(a.image,{...item.previousImageMetadata,facing:item.facing});
  assert.equal(bytes.toString('ascii',8,12),'WEBP');
  previous = previous.replace(json(a.image),json(item.previousImageMetadata));
}
assert.equal(sha(previous),batch.beforeDatabaseSha256,'Preserve every species text, licence and previous image metadata except corrected facing');
assert.ok(require('../project.json').versionCode>=1000011);
console.log('PASS: three approved WebP imports; 109 images unchanged including Stegosaurus and all nine previous approvals; full database and licences preserved.');
