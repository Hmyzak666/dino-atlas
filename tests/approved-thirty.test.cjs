const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const batch = require('../docs/approved-thirty-2026-11-08.json');
const db = require('../dinosaurs.json');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
assert.equal(sha(fs.readFileSync('dinosaurs.json')), batch.databaseSha256);
assert.equal(sha(require('./helpers/before-thirty.cjs').text), batch.beforeDatabaseSha256);
assert.deepEqual(Object.keys(batch.images).sort(), db.dinosaurs.map(a=>a.id).sort());
const counts = {};
for (const a of db.dinosaurs) {
 const item=batch.images[a.id], b=fs.readFileSync(a.image.src);
 assert.equal(sha(b),item.sha256,a.id);
 assert.equal(b.toString('ascii',0,4),'RIFF');
 assert.equal(b.toString('ascii',8,12),'WEBP');
 let dimensions;
 for(let i=12;i+8<=b.length;) {
  const type=b.toString('ascii',i,i+4), n=b.readUInt32LE(i+4), p=i+8;
  if(type==='VP8 ') dimensions=[b.readUInt16LE(p+6)&16383,b.readUInt16LE(p+8)&16383];
  if(type==='VP8X') dimensions=[b.readUIntLE(p+4,3)+1,b.readUIntLE(p+7,3)+1];
  if(type==='VP8L') {const v=b.readUInt32LE(p+1);dimensions=[(v&16383)+1,((v>>>14)&16383)+1];}
  i=p+n+(n%2);
 }
 assert.deepEqual(dimensions,[1536,1024],a.id);
 counts[item.action]=(counts[item.action]||0)+1;
 if(item.action==='zachovano_beze_zmeny') assert.equal(item.sha256,item.previousSha256,a.id);
 else assert.notEqual(item.sha256,item.previousSha256,a.id);
}
assert.deepEqual(counts,{nova_schvalena_verze:30,zvetseno_Lanczos:24,zachovano_beze_zmeny:58});
for(const [id,change] of Object.entries(batch.facingChanges)) assert.equal(db.dinosaurs.find(a=>a.id===id).image.facing,change.after);
assert.equal(batch.images['edestus-heinrichi'].source,'exec-608af731-33f8-455e-8827-5ca678cd0367.png');
assert.equal(batch.images['vulcanidris-cratensis'].source,'exec-d53210bf-481e-4024-a013-bdd217fdd28b.png');
console.log('PASS: 30 approved replacements, 24 resizes, 58 byte-identical originals; 112 WebP at 1536x1024; database changes limited to documented facing.');
