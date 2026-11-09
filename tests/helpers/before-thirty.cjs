// Reconstruct the preceding database for historical batch assertions.
// Active image bytes are checked against the latest explicitly approved manifest.
const fs = require('node:fs');
const batch = require('../../docs/approved-thirty-2026-11-08.json');
const database = structuredClone(require('../../dinosaurs.json'));
for (const a of database.dinosaurs) {
  if (batch.facingChanges[a.id]) a.image.facing = batch.facingChanges[a.id].before;
}
let text = fs.readFileSync(require.resolve('../../dinosaurs.json'), 'utf8');
const imageJSON = image => JSON.stringify(image, null, 2).replace(/\n/g, '\n      ');
for (const a of require('../../dinosaurs.json').dinosaurs) {
  if (batch.facingChanges[a.id]) text = text.replace(imageJSON(a.image), imageJSON({...a.image, facing:batch.facingChanges[a.id].before}));
}
module.exports = {database, text, images: {...batch.images, ...require('../../docs/approved-eight-2026-11-09.json')}};
