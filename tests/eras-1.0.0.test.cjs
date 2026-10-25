const assert = require('node:assert/strict');
const app = require('../app.js');
const data = require('../dinosaurs.json');

// Synthetic fixtures only: these do not enter the published atlas.
const base = data.dinosaurs.find(a => a.period === 'triassic');
const paleoFixture = structuredClone(base);
paleoFixture.id = 'test-cambrian-fish';
paleoFixture.period = 'cambrian';
paleoFixture.category = 'fish';
paleoFixture.taxonomy = ['Chordata'];
const animals = [base, paleoFixture];
const state = { query: '', category: 'all', era: 'paleozoic', period: 'all', diet: 'all', favoritesOnly: false, favorites: new Set() };
assert.equal(app.periodInEra('cambrian', 'paleozoic'), true);
assert.equal(app.periodInEra('cretaceous', 'paleozoic'), false);
assert.equal(app.periodInEra('cretaceous', 'mesozoic'), true);
assert.equal(app.periodInEra('cambrian', 'all'), true);
assert.deepEqual(app.filteredDinosaurs(animals, state).map(a => a.id), ['test-cambrian-fish']);
assert.deepEqual(app.filteredDinosaurs(animals, { ...state, era: 'mesozoic' }).map(a => a.id), [base.id]);
assert.equal(app.filteredDinosaurs(animals, { ...state, era: 'paleozoic', period: 'triassic' }).length, 0);
const future = structuredClone(data);
future.periods.cambrian = 'Kambrium';
future.dinosaurs.push(paleoFixture);
assert.equal(app.validateDatabase(future), true);
console.log('PASS: Paleozoic/Mesozoic era filtering, cross-era restrictions, and expandable database schema.');
