const fs = require('node:fs');
const batch = require('../../docs/approved-nine-2026-11-05.json');
const current = require('../../dinosaurs.json');
const historicalDatabase = structuredClone(current);
for (const a of historicalDatabase.dinosaurs) {
  if (batch.images[a.id]) a.image = batch.images[a.id].previousImageMetadata;
}
let historicalText = fs.readFileSync(require.resolve('../../dinosaurs.json'), 'utf8');
const imageJSON = image => JSON.stringify(image, null, 2).replace(/\n/g, '\n      ');
for (const a of current.dinosaurs) {
  if (batch.images[a.id]) historicalText = historicalText.replace(imageJSON(a.image), imageJSON(batch.images[a.id].previousImageMetadata));
}
const historicalBytes = Buffer.from(historicalText);
const readHistoricalFile = p => require('node:path').basename(p) === 'dinosaurs.json' ? historicalBytes : fs.readFileSync(p);
module.exports = { batch, historicalDatabase, readHistoricalFile };
