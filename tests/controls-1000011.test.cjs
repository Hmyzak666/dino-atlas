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
 try{
 for(const width of [320,360,412])for(const theme of ['light','dark']){
  const context=await browser.newContext({viewport:{width,height:850},isMobile:true,hasTouch:true});
  await context.addInitScript(theme=>{localStorage.setItem('dinoatlas-theme',theme);localStorage.setItem('dinoatlas-category','all');localStorage.setItem('dinoatlas-favorites',JSON.stringify(['tyrannosaurus-rex']));},theme);
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/#atlas`);
  await page.locator('.dino-card').first().waitFor();
  await page.locator('[data-atlas-era="mesozoic"]').click();
  await page.locator('[data-period="cretaceous"]').click();
  await page.locator('[data-category="dinosaur"]').click();
  await page.locator('#diet-filter').selectOption('carnivore');
  await page.locator('#favorites-filter').click();
  await page.locator('#search').fill('nenalezeno');
  await page.locator('#clear-filters').click();
  assert.equal(await page.locator('.dino-card').count(),112);
  assert.equal(await page.locator('#search').inputValue(),'');
  assert.equal(await page.locator('#diet-filter').inputValue(),'all');
  for(const selector of ['[data-atlas-era="all"]','[data-period="all"]','[data-category="all"]'])assert.equal(await page.locator(selector).getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('#favorites-filter').getAttribute('aria-pressed'),'false');
  assert.equal(await page.evaluate(()=>localStorage.getItem('dinoatlas-category')),'all');
  assert.equal(await page.locator('#favorites-count').textContent(),'1');
  assert.ok(await page.locator('.era-filters button').evaluateAll(buttons=>buttons.every(button=>button.scrollWidth<=button.clientWidth)), 'Era labels fit inside their buttons');
  const time=await page.locator('#period-filters').boundingBox(),groups=await page.locator('#category-filters').boundingBox();assert.ok(time.y+time.height<=groups.y);
  await page.locator('#search').fill('tyran');
  const cross=await page.locator('#clear-search').boundingBox();assert.ok(cross.width>=48&&cross.height>=48);
  await page.locator('#clear-search').tap();
  assert.equal(await page.locator('.dino-card').count(),112);
  await page.locator('[data-atlas-era="mesozoic"]').click();
  await page.locator('[data-category="dinosaur"]').click();
  await page.locator('#diet-filter').selectOption('carnivore');
  await page.locator('#search').fill('saurus');
  const count=await page.locator('.dino-card').count();assert.ok(count>1);
  for(const returnSelector of ['#detail-atlas','.back-link']){
   const card=page.locator('.card-link').nth(2);await card.scrollIntoViewIfNeeded();
   await card.evaluate(el=>el.addEventListener('click',()=>{window.__atlasY=scrollY;},{once:true}));
   await card.click();await page.waitForURL('**/#dinosaurus/**');
   await page.locator('#detail-atlas').waitFor({state:'visible'});
   const grid=await page.locator('#detail-atlas').boundingBox(),up=await page.locator('#scroll-up').boundingBox();assert.ok(grid.width>=48&&grid.height>=48&&grid.x<up.x);
   await page.locator(returnSelector).scrollIntoViewIfNeeded();
   const target=await page.locator(returnSelector).boundingBox();assert.ok(target.width>=48&&target.height>=48);
   await page.locator(returnSelector).tap();await page.waitForURL('**/#atlas');
   await page.waitForFunction(()=>Math.abs(scrollY-window.__atlasY)<5);
   assert.equal(await page.locator('#search').inputValue(),'saurus');assert.equal(await page.locator('.dino-card').count(),count);
   assert.equal(await page.locator('#diet-filter').inputValue(),'carnivore');
  }
  await page.locator('#clear-filters').click();await page.evaluate(()=>scrollTo(0,0));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const dir=process.env.DINO_QA_DIR||path.join(root,'.qa');await fs.mkdir(dir,{recursive:true});
  await page.screenshot({path:path.join(dir,`controls-${width}-${theme}.png`)});
  assert.deepEqual(errors,[]);await context.close();
  console.log(`PASS controls ${width} ${theme}: six-filter reset, search clear, 48px targets, order, preserved filters and scroll on both return buttons`);
 }
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exit(1);});
