const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const baseline = require('./fixtures/verified-0.8.0.json');
const config = require('../project.json');
const db = require('../dinosaurs.json');
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');

// 0.9.0 is an authorized content/UI release, not a byte-identical cleanup.
// Preserve original data semantically and original artwork byte-for-byte.
const originals = require('./fixtures/original-0.8.1-records.json');
assert.equal(originals.length, 42);
for (const animal of originals) assert.deepEqual(db.dinosaurs.find(a => a.id === animal.id), animal, animal.id);
for (const [name, expected] of Object.entries(baseline.assets)) {
  if (name.startsWith('images/')) assert.equal(digest(fs.readFileSync(path.join(root,name))), expected, name);
}
assert.deepEqual(originals.map(a => a.id).sort(), baseline.animalIds);
assert.equal(digest(fs.readFileSync(path.join(root, 'android/src/cz/hmyzak/dinoatlas/MainActivity.java'))), baseline.nativeSourceSha256);
for (const [name, expected] of Object.entries(baseline.nativeResources)) {
  assert.equal(digest(fs.readFileSync(path.join(root, name))), expected, 'native resource changed: ' + name);
}
assert.equal(config.android.certificateSha256, baseline.certificateSha256);
assert.equal(config.version, '0.9.0');
assert.ok(config.versionCode > 80101);
assert.ok(config.versionCode > baseline.versionCode, 'cleanup APK must update the installed build');
const java = fs.readFileSync(path.join(root, 'android/src/cz/hmyzak/dinoatlas/MainActivity.java'), 'utf8');
assert.ok(java.includes('package ' + baseline.applicationId + ';'));
assert.ok(java.includes('"appassets.androidplatform.net"'));
assert.ok(java.includes('"/assets/index.html#atlas"'));
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
for (const key of baseline.storageKeys) assert.ok(app.includes("'" + key + "'"), 'storage key changed: ' + key);
const workflows = fs.readdirSync(path.join(root, '.github/workflows')).filter(f => /\.ya?ml$/.test(f));
assert.ok(workflows.includes('android-apk.yml'));
assert.ok(workflows.every(name=>['android-apk.yml','import-cambrian.yml','import-ordovician.yml','import-silurian.yml'].includes(name)), 'Unexpected active workflow');
assert.deepEqual(fs.readdirSync(path.join(root, 'images')).sort(), db.dinosaurs.map(a => path.basename(a.image.src)).sort());
console.log('PASS: approved UI changes and confirmed database/image bytes, all 42 animal IDs, unchanged native source, storage origin/keys, original signer, and only approved CI/import workflows.');
