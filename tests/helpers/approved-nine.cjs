const fs = require('node:fs');
const batch = require('../../docs/approved-nine-2026-11-05.json');
const later = require('../../docs/approved-three-2026-11-06.json');
const previousImages = {...batch.images, ...later.images};
const current = require('../../dinosaurs.json');
const historicalDatabase = structuredClone(current);
for (const a of historicalDatabase.dinosaurs) {
  if (previousImages[a.id]) a.image = previousImages[a.id].previousImageMetadata;
}
let historicalText = fs.readFileSync(require.resolve('../../dinosaurs.json'), 'utf8');
const imageJSON = image => JSON.stringify(image, null, 2).replace(/\n/g, '\n      ');
for (const a of current.dinosaurs) {
  if (previousImages[a.id]) historicalText = historicalText.replace(imageJSON(a.image), imageJSON(previousImages[a.id].previousImageMetadata));
}
const historicalBytes = Buffer.from(historicalText);
const readHistoricalFile = p => require('node:path').basename(p) === 'dinosaurs.json' ? historicalBytes : fs.readFileSync(p);
module.exports = { batch, historicalDatabase, readHistoricalFile };
