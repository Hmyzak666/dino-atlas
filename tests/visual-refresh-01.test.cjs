const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const config=require('../project.json');
const db=require('../dinosaurs.json');
const sha=x=>crypto.createHash('sha256').update(fs.readFileSync(x)).digest('hex');
const expected={
 'eurypterus-remipes':['09f6ccb10f9ed8eaa97b638197c012fbf7d7cb83181e54773ea9ed1e9f96df98','61622939bcb325ba71b895fa00879a295f1216a0573d53e4406d12191634be71'],
 'entelognathus-primordialis':['08fbc8af481f203489d5f6b6dfa31675ba0a53edf9618630fe765024af21b390','1e88cefd5fd4d4ec5956d3b7089b01ca2cc6fcc56e31e783ab1d50ba18210f49'],
 'qilinyu-rostrata':['5aa96cbd0c39afebeac26e6c1ed0fc8b17917feb48c0d5f6154930cc30b6e261','26e8747af950ffa7bf673bc39ebd6d538936a8ccbf7ff3030a45e5c2c4d86f6a']
};
assert.equal(db.dinosaurs.length,112);
assert.equal(new Set(db.dinosaurs.map(a=>a.id)).size,112);
assert.equal(config.version,'1.0.0');
assert.ok(Number.isInteger(config.versionCode) && config.versionCode >= 1000000);
const activated=config.versionCode>=1000001;
for(const [id,[oldhash,newhash]] of Object.entries(expected)){
 const name=id+'.webp';
 const actual=sha(path.join(root,'images',name));
 assert.equal(actual,activated?(require('../docs/anatomy-03.json')[id]?.sha256 || newhash):oldhash,'Unexpected image for '+id);
 const animal=db.dinosaurs.find(a=>a.id===id);
 assert.ok(animal);
 assert.equal(animal.period,'silurian');
 assert.equal(animal.image.src,'images/'+name);
 assert.equal(animal.image.status,'working-reconstruction');
 const backed=path.join(root,'docs','backups','visual-refresh-01','images',name);
 if(activated){
  assert.equal(sha(backed),oldhash,'Original image backup missing '+id);
  assert.ok(animal.image.note.cs.includes('rekonstrukce'));
  assert.ok(!animal.image.sourceIds?.length,'AI image must not falsely retain an external image credit');
 } else assert.equal(fs.existsSync(backed),false,'Do not back up until atomic import');
}
console.log('PASS: first visual-refresh image batch and rollback backups; 112 animals, no ID changes.');
