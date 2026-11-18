const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const db=require('./helpers/before-thirty.cjs').database;
const batch=require('../docs/approved-twelve-2026-11-06.json');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const ids=['pulmonoscorpius-kirktonensis','edaphosaurus-pogonias','ceratosaurus-nasicornis','pterodactylus-antiquus','eudimorphodon-ranzii','jaekelopterus-rhenaniae','kentrosaurus-aethiopicus','allosaurus-fragilis','iguanodon-bernissartensis','pachycephalosaurus-wyomingensis','carnotaurus-sastrei','styracosaurus-albertensis'];
assert.deepEqual(Object.keys(batch.images).sort(),ids.sort());
assert.equal(db.dinosaurs.length,112);
assert.equal(sha(require('./helpers/before-thirty.cjs').text),batch.databaseSha256);
let previous=require('./helpers/before-thirty.cjs').text;
const json=v=>JSON.stringify(v,null,2).replace(/\n/g,'\n      ');
for(const a of db.dinosaurs){
 const item=batch.images[a.id],bytes=fs.readFileSync(a.image.src);
 assert.equal(sha(bytes),require('./helpers/before-thirty.cjs').images[a.id]?.sha256||item?.sha256||batch.allActiveImageSha256[a.id],a.id);
 if(!item)continue;
 assert.equal(item.approved,true);
 assert.deepEqual(a.image,item.imageMetadata);
 assert.equal(bytes.toString('ascii',8,12),'WEBP');
 assert.equal(item.width,1536);assert.equal(item.height,1024);assert.equal(item.quality,94);
 previous=previous.replace(json(a.image),json(item.previousImageMetadata));
}
assert.equal(sha(previous),batch.beforeDatabaseSha256,'All species data and licences preserved apart from documented image metadata');
assert.equal(batch.images['styracosaurus-albertensis'].sourceFile,'exec-d377a25f-795d-4565-aeb5-eae1b59278b2.png');
assert.ok(!batch.images['stegosaurus-stenops']);
assert.ok(require('../project.json').versionCode>=1000012);
console.log('PASS: exactly 12 approved imports, original Styracosaurus, 100 unchanged images, all 112 records and source credits preserved.');
