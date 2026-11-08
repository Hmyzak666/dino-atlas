const fs = require('node:fs');
const batch = require('../../docs/approved-nine-2026-11-05.json');
const later = require('../../docs/approved-three-2026-11-06.json');
const latest = require('../../docs/approved-twelve-2026-11-06.json');
const previousImages = {...batch.images, ...later.images, ...latest.images};
const current = require('./before-thirty.cjs').database;
const historicalDatabase = structuredClone(current);
for (const a of historicalDatabase.dinosaurs) {
  if (previousImages[a.id]) a.image = previousImages[a.id].previousImageMetadata;
}
let historicalText = require('./before-thirty.cjs').text;
const imageJSON = image => JSON.stringify(image, null, 2).replace(/\n/g, '\n      ');
for (const a of current.dinosaurs) {
  if (previousImages[a.id]) historicalText = historicalText.replace(imageJSON(a.image), imageJSON(previousImages[a.id].previousImageMetadata));
}
const historicalBytes = Buffer.from(historicalText);
const readHistoricalFile = p => require('node:path').basename(p) === 'dinosaurs.json' ? historicalBytes : fs.readFileSync(p);
module.exports = { batch, historicalDatabase, readHistoricalFile };
