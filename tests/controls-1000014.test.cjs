const assert=require('node:assert/strict');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer(async(req,res)=>{try{const f=path.join(root,new URL(req.url,'http://localhost').pathname.replace(/^\//,'')||'index.html');res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp'})[path.extname(f)]||'application/octet-stream');res.end(await fs.readFile(f));}catch{res.writeHead(404);res.end();}});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.DINO_BROWSER_PATH||undefined,args:['--no-sandbox']});
 try {
 for(const width of [320,360,412,768]) {
 const context=await browser.newContext({viewport:{width,height:850},isMobile:true,hasTouch:true});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:${server.address().port}/#atlas`);await page.locator('.dino-card').first().waitFor();
 assert.equal(await page.locator('.dino-card').count(),112);
 const box=await page.locator('#search').boundingBox(),reset=await page.locator('#clear-filters').boundingBox(),groups=await page.locator('#category-filters').boundingBox();
 assert.ok(box.y>groups.y+groups.height);assert.ok(box.x+box.width<=reset.x);assert.ok(Math.abs(box.y-reset.y)<20);
 await page.locator('#era-filters [data-info="paleozoic"]').click();
 assert.equal(await page.locator('#knowledge-dialog').isVisible(),true);assert.match(await page.locator('#knowledge-body').textContent(),/538,8/);
 assert.equal(await page.locator('[data-atlas-era="all"]').getAttribute('aria-pressed'),'true');await page.keyboard.press('Escape');
 await page.locator('[data-category="synapsid"]').click();assert.equal(await page.locator('#atlas-title').textContent(),'Poznej synapsidy.');
 await page.locator('#category-filters [data-info="synapsid"]').click();assert.match(await page.locator('#knowledge-body').textContent(),/Dimetrodon nebyl dinosaurus/);await page.locator('#knowledge-dialog [data-close-dialog]').click();
 await page.locator('#clear-filters').click();await page.locator('#diet-open').click();await page.locator('[data-diet="carnivore"]').click();assert.equal(await page.locator('#diet-filter').inputValue(),'carnivore');
 await page.locator('#search').fill('tyran');await page.locator('#gallery-title').click();await page.evaluate(()=>window.scrollTo(0,400));
 await page.locator('#quick-search-open').click();assert.equal(await page.locator('#quick-search').inputValue(),'tyran');assert.equal(await page.locator('#quick-results a').count(),await page.locator('.dino-card').count());
 await page.locator('#quick-clear').click();assert.equal(await page.locator('#quick-search-panel').isVisible(),true);assert.equal(await page.locator('#search').inputValue(),'');
 await page.locator('#quick-search').fill('dimetrodon');await page.locator('#quick-search-panel [data-close-dialog]').click();assert.equal(await page.locator('#search').inputValue(),'dimetrodon');assert.equal(await page.locator('#diet-filter').inputValue(),'carnivore');
 await page.locator('#quick-search-open').click();await page.locator('#quick-results a').first().click();await page.locator('#detail-title').waitFor();assert.equal(await page.locator('#quick-search-panel').isVisible(),false);
 await page.locator('#detail-atlas').click();await page.locator('#gallery').waitFor();assert.equal(await page.locator('#search').inputValue(),'dimetrodon');assert.equal(await page.locator('.dino-card').count(),1);
 await page.evaluate(()=>window.scrollTo(0,400));await page.locator('#quick-search-open').click();await page.locator('#quick-reset').click();assert.equal(await page.locator('#quick-results a').count(),112);assert.equal(await page.locator('#search').inputValue(),'');
 await page.setViewportSize({width,height:350});const panel=await page.locator('#quick-search-panel').boundingBox();assert.ok(panel.y>=0&&panel.y+panel.height<=351);
 await page.locator('#quick-search-panel [data-close-dialog]').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.deepEqual(errors,[]);await context.close();
 }
 console.log('PASS: shared search, reset/close/selection/back, diet dialog, educational buttons, Czech headings and narrow/keyboard-sized viewports.');
 } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
