const assert=require('node:assert/strict');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
const {chromium}=require('playwright');
const db=require('../dinosaurs.json');
const app=require('../app.js');
const root=path.resolve(__dirname,'..');
const server=http.createServer(async(req,res)=>{try {const file=path.join(root,new URL(req.url,'http://localhost').pathname.replace(/^\//,'')||'index.html');const data=await fs.readFile(file);res.setHeader('Content-Type',({'.js':'application/javascript','.html':'text/html','.css':'text/css','.json':'application/json','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(data);}catch{res.writeHead(404);res.end();}});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.DINO_BROWSER_PATH||undefined,args:['--no-sandbox']});
 try {
 for(const width of [320,412,900]) {
  const context=await browser.newContext({viewport:{width,height:900},isMobile:width<600,hasTouch:width<600});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/#atlas`);
  await page.locator('.dino-card').first().waitFor();
  await page.locator('[data-category="arthropod"]').click();
  assert.equal(await page.locator('.dino-card').count(),9);
  await page.locator('[data-period="triassic"]').click();
  await page.locator('#search').fill('proto');
  await page.locator('#card-protobuthus-ziliolii').click();
  await page.locator('[data-detail-period="jurassic"]').click();
  await page.waitForURL('**/#dinosaurus/cymatophlebia-longialata');
  assert.equal(await page.locator('.detail-position').textContent(),'1 / 3');
  await page.locator('[data-detail-step="1"]').click();
  await page.waitForURL('**/#dinosaurus/mecochirus-longimanatus');
  await page.goBack();await page.waitForURL('**/#atlas');
  assert.equal(await page.locator('#search').inputValue(),'proto');
  assert.equal(await page.locator('[data-period="triassic"]').getAttribute('aria-pressed'),'true');
  await page.locator('[data-nav="kviz"]').click();
  assert.equal(await page.locator('[data-quiz-category="all"]').getAttribute('aria-pressed'),'true');
  for(const category of ['arthropod','pterosaur','marine-reptile','dinosaur','all']) for(const period of ['triassic','jurassic','cretaceous','all']) {
   await page.locator(`[data-quiz-category="${category}"]`).click();
   await page.locator(`[data-quiz-period="${period}"]`).click();
   const pool=db.dinosaurs.filter(a=>(category==='all'||a.category===category)&&(period==='all'||a.period===period));
   if(!app.makeQuiz(pool).length){assert.match(await page.locator('#quiz-content').textContent(),/alespoň tři/);continue;}
   const options=await page.locator('[data-answer]').evaluateAll(els=>els.map(el=>el.dataset.answer));
   assert.equal(options.length,3);assert.ok(options.every(id=>pool.some(a=>a.id===id)));
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  }
  await page.locator('[data-quiz-category="arthropod"]').click();
  await page.locator('[data-quiz-period="cretaceous"]').click();
  const src=await page.locator('.quiz-picture img').getAttribute('src');const id=db.dinosaurs.find(a=>a.image.src===src).id;
  await page.locator(`[data-answer="${id}"]`).click();await page.locator('.quiz-detail-link').click();
  await page.goBack();await page.waitForURL('**/#kviz');
  assert.equal(await page.locator('.quiz-picture img').getAttribute('src'),src);
  assert.match(await page.locator('#quiz-feedback').textContent(),/Ano!/);
  await page.locator('[data-nav="atlas"]').click();
  assert.equal(await page.locator('[data-category="arthropod"]').getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('#search').inputValue(),'proto');
  await page.goto(`http://127.0.0.1:${server.address().port}/#dinosaurus/chimerarachne-yingi`);
  await page.locator('.size-section summary').click();
  assert.match(await page.locator('.size-section').textContent(),/2,5 mm/);
  assert.match(await page.locator('.size-section').textContent(),/Úsek pravítka/);
  assert.deepEqual(errors,[]);await context.close();
 }
 console.log('PASS: detail periods, atlas restoration, independent quiz intersections, sparse pools, quiz return and millimetre comparison at 320/412/900px.');
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
