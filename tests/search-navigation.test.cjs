const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(require.resolve('playwright', { paths: [path.resolve(__dirname, '..'), process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || process.cwd()] }));
const root = path.resolve(__dirname, '..');
const errors = [];
const server = http.createServer(async (req, res) => {
  const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
  try {
    const bytes = await fs.readFile(file);
    const type = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp'}[path.extname(file)] || 'application/octet-stream';
    res.writeHead(200, {'Content-Type': type}); res.end(bytes);
  } catch { res.writeHead(404); res.end(); }
});

async function openResult(page, id) {
  await page.locator('#card-' + id).click();
  await page.waitForURL('**/#dinosaurus/' + id);
  await detailReady(page, id);
}
async function detailReady(page, id) {
  await page.waitForFunction(id => {
    const title = document.querySelector('#detail-title');
    return document.querySelector('#detail-view')?.hidden === false
      && document.querySelector('.detail-image img')?.getAttribute('src') === 'images/' + id + '.webp'
      && title?.getBoundingClientRect().top >= 0 && title.getBoundingClientRect().top < 180;
  }, id);
}
async function step(page, direction, id) {
  assert.equal(await page.locator('[data-detail-step="' + direction + '"]').isEnabled(), true);
  await page.locator('[data-detail-step="' + direction + '"]').click();
  await page.waitForURL('**/#dinosaurus/' + id);
  await detailReady(page, id);
}
async function back(page) {
  await page.getByRole('link', {name:'← Zpět do atlasu', exact:true}).click();
  await page.waitForURL('**/#atlas');
  await page.locator('#atlas-view').waitFor({state:'visible'});
}

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({executablePath:process.env.DINO_BROWSER_PATH || undefined, headless:true, args:['--no-sandbox','--disable-dev-shm-usage']});
  try {
    const context = await browser.newContext({viewport:{width:360,height:850}, isMobile:true, hasTouch:true});
    await context.addInitScript(() => {
      localStorage.setItem('dinoatlas-favorites', JSON.stringify(['brachiosaurus-altithorax','tyrannosaurus-rex']));
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
    await page.goto(base + '/#atlas');
    await page.locator('#gallery .dino-card').first().waitFor();

    // A single search result must be a starting point, not a one-animal list.
    await page.locator('#search').fill('brachiosaurus');
    assert.equal(await page.locator('#gallery .dino-card').count(), 1);
    await openResult(page, 'brachiosaurus-altithorax');
    assert.equal(await page.locator('.detail-position').textContent(), '4 / 42');
    await step(page, 1, 'brontosaurus-excelsus');
    await step(page, -1, 'brachiosaurus-altithorax');

    // Use a real touch gesture as well as the buttons.
    const box = await page.locator('.detail-image').boundingBox();
    const y = box.y + box.height * 0.5;
    const touch = await context.newCDPSession(page);
    await touch.send('Input.dispatchTouchEvent', {type:'touchStart',touchPoints:[{x:300,y}]});
    await touch.send('Input.dispatchTouchEvent', {type:'touchMove',touchPoints:[{x:240,y:y+1}]});
    await touch.send('Input.dispatchTouchEvent', {type:'touchMove',touchPoints:[{x:60,y:y+2}]});
    await touch.send('Input.dispatchTouchEvent', {type:'touchEnd',touchPoints:[]});
    await page.waitForURL('**/#dinosaurus/brontosaurus-excelsus');
    await page.waitForTimeout(450); // Existing protection against a post-swipe ghost click.
    await back(page);
    assert.equal(await page.locator('#search').inputValue(), 'brachiosaurus');
    assert.equal(await page.locator('#gallery .dino-card').count(), 1);

    // Keep category, period, and diet constraints while ignoring only the query.
    await page.locator('[data-category="dinosaur"]').click();
    await page.locator('[data-period="jurassic"]').click();
    await page.locator('#diet-filter').selectOption('carnivore');
    await page.locator('#search').fill('ceratosaurus');
    assert.equal(await page.locator('#gallery .dino-card').count(), 1);
    await openResult(page, 'ceratosaurus-nasicornis');
    assert.equal(await page.locator('.detail-position').textContent(), '2 / 4');
    await step(page, 1, 'dilophosaurus-wetherilli');
    await step(page, -1, 'ceratosaurus-nasicornis');
    await step(page, -1, 'allosaurus-fragilis');
    assert.equal(await page.locator('[data-detail-step="-1"]').isDisabled(), true);
    await back(page);
    assert.equal(await page.locator('#search').inputValue(), 'ceratosaurus');
    assert.equal(await page.locator('[data-period="jurassic"]').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('#diet-filter').inputValue(), 'carnivore');

    // Favorites stay a browsing list; searching does not add unrelated animals.
    await page.locator('#search').fill('');
    await page.locator('[data-category="all"]').click();
    await page.locator('[data-period="all"]').click();
    await page.locator('#diet-filter').selectOption('all');
    await page.locator('#favorites-filter').click();
    await page.locator('#search').fill('brachiosaurus');
    await openResult(page, 'brachiosaurus-altithorax');
    assert.equal(await page.locator('.detail-position').textContent(), '1 / 2');
    await step(page, 1, 'tyrannosaurus-rex');
    assert.equal(await page.locator('[data-detail-step="1"]').isDisabled(), true);
    await page.goBack();
    await page.waitForURL('**/#atlas');
    assert.equal(await page.locator('#search').inputValue(), 'brachiosaurus');
    assert.equal(await page.locator('#favorites-filter').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('#favorites-count').textContent(), '2');

    // A category-only search continues inside that category.
    await page.locator('#favorites-filter').click();
    await page.locator('[data-category="pterosaur"]').click();
    await page.locator('#search').fill('pterodactylus');
    await openResult(page, 'pterodactylus-antiquus');
    assert.equal(await page.locator('.detail-position').textContent(), '4 / 6');
    await step(page, 1, 'quetzalcoatlus-northropi');
    await back(page);
    assert.equal(await page.locator('#search').inputValue(), 'pterodactylus');
    assert.equal(await page.locator('[data-category="pterosaur"]').getAttribute('aria-pressed'), 'true');
    assert.deepEqual(errors, []);
    console.log('PASS: one-result search, next/previous, real swipe, category/period/diet/favorites limits, boundaries, preserved query, and browser Back.');
    await context.close();
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
