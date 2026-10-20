const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(require.resolve('playwright', { paths: [path.resolve(__dirname, '..'), process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || process.cwd()] }));
const db = require('../dinosaurs.json');
const root = path.resolve(__dirname,'..');
const artifacts = process.env.DINO_QA_DIR || path.resolve(root,'.qa');
const errors = [];

const server = http.createServer(async(req,res)=>{
  const name = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file = path.resolve(root,'.'+(name==='/'?'/index.html':name));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  try {
    const content = await fs.readFile(file);
    const type = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp'}[path.extname(file)]||'application/octet-stream';
    res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store'});res.end(content);
  } catch {res.writeHead(404);res.end();}
});

async function inject(context) {
  await context.addInitScript(()=>{
    localStorage.setItem('dinoatlas-category','all');
    localStorage.setItem('dinoatlas-favorites',JSON.stringify(['brachiosaurus-altithorax','tyrannosaurus-rex']));
    window.__spoken=[];
    window.__stops=0;
    window.DinoSpeech={
      read(text,requestId){
        window.__spoken.push({text,requestId});
        window.dispatchEvent(new CustomEvent('dinoatlas-speech',{detail:{requestId,state:'reading',message:'Čte se…'}}));
      },
      stop(){window.__stops++;}
    };
  });
}

async function noOverflow(page) {
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true,'Horizontal overflow');
}

async function openAnimal(page,id) {
  await page.evaluate(id=>{location.hash='dinosaurus/'+id;},id);
  await page.waitForURL('**/#dinosaurus/'+id);
  await page.waitForFunction(id=>document.querySelector('#detail-title')?.textContent===id,db.dinosaurs.find(a=>a.id===id).translations.cs.displayName);
  await page.waitForFunction(()=>{const img=document.querySelector('.detail-image img');return img?.complete&&img.naturalWidth>0;});
  await page.waitForFunction(()=>{const r=document.querySelector('#detail-title').getBoundingClientRect();return r.top>=0&&r.top<180;});
}

(async()=>{
  await fs.mkdir(artifacts,{recursive:true});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port;
  const browser=await chromium.launch({executablePath:process.env.DINO_BROWSER_PATH||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
  try {
    const widths=process.env.DINO_TEST_WIDTHS ? process.env.DINO_TEST_WIDTHS.split(',').map(Number) : [320,360,412,900];
    for(const width of widths) {
      const context=await browser.newContext({viewport:{width,height:width===320?640:900},isMobile:width<600,hasTouch:width<600,deviceScaleFactor:1});
      await inject(context);
      const page=await context.newPage();
      page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400) errors.push(r.status()+' '+r.url());});
      page.on('request',r=>{if(!r.url().startsWith(base))errors.push('External request: '+r.url());});
      await page.goto(base+'/#atlas');
      await page.locator('#gallery .dino-card').last().waitFor();
      assert.equal(await page.locator('#gallery .dino-card').count(),42);
      assert.deepEqual(await page.locator('#period-filters button').allTextContents(),['Trias','Jura','Křída','Vše']);
      assert.equal(await page.locator('#favorites-count').textContent(),'2');
      if(width===360) {
        const decoded=await page.evaluate(async sources=>Promise.all(sources.map(src=>new Promise((resolve,reject)=>{
          const img=new Image();
          img.onload=()=>resolve({src,width:img.naturalWidth,height:img.naturalHeight});
          img.onerror=()=>reject(new Error('Image decoding failed: '+src));
          img.src=src;
        }))),db.dinosaurs.map(a=>a.image.src));
        assert.equal(decoded.length,42);
        assert.ok(decoded.every(img=>img.width>0&&img.height>0),'All animal images must decode in the browser');
      }
      const names=await page.locator('.card-title-row h3').allTextContents();
      assert.deepEqual(names,[...names].sort(new Intl.Collator('cs',{sensitivity:'base'}).compare));
      await noOverflow(page);
      if(width===412)await page.screenshot({path:path.join(artifacts,'atlas-412.png')});

      const link=page.locator('#card-brachiosaurus-altithorax');
      await link.scrollIntoViewIfNeeded();
      const galleryY=await page.evaluate(()=>scrollY);
      await link.click();
      await page.waitForURL('**/#dinosaurus/brachiosaurus-altithorax');
      await page.waitForFunction(()=>document.querySelector('#detail-title')?.getBoundingClientRect().top<180);
      assert.equal(await page.locator('#detail-title').textContent(),'Brachiosaurus');
      assert.match(await page.locator('.detail-age').textContent(),/Jura.*150/);
      assert.equal(await page.locator('.detail-favorite').getAttribute('aria-pressed'),'true');
      assert.equal(await page.locator('#detail-title').evaluate(el=>el.getBoundingClientRect().bottom < document.querySelector('.detail-figure').getBoundingClientRect().top),true);
      await noOverflow(page);
      await page.screenshot({path:path.join(artifacts,'detail-'+width+'.png')});

      // Opening a picture must preserve the detail, orientation and scroll.
      const magnifier = page.locator('.detail-image .image-zoom-open');
      await magnifier.scrollIntoViewIfNeeded();
      const pictureY = await page.evaluate(() => scrollY);
      const originalSrc = await page.locator('.detail-image img').getAttribute('src');
      await magnifier.click();
      await page.locator('#image-viewer').waitFor({state:'visible'});
      await page.waitForFunction(() => document.querySelector('#image-viewer-image').naturalWidth > 0);
      await page.waitForFunction(() => parseFloat(document.querySelector('#image-viewer-image').style.width) > 0);
      assert.equal(await page.locator('#image-viewer-title').textContent(), 'Brachiosaurus');
      assert.equal(await page.locator('#image-viewer-image').getAttribute('src'), originalSrc);
      assert.equal(await page.locator('#image-viewer-stage').getAttribute('data-zoom'), '1');
      assert.equal(await page.evaluate(() => getComputedStyle(document.body).overflow), 'hidden');
      const fitted = await page.locator('#image-viewer-image').boundingBox();
      const stageBox = await page.locator('#image-viewer-stage').boundingBox();
      assert.ok(fitted.width <= stageBox.width + 2 && fitted.height <= stageBox.height + 2, 'Whole image fits');
      for (let i=0;i<6;i++) await page.locator('#image-zoom-in').click();
      assert.equal(await page.locator('#image-viewer-stage').getAttribute('data-zoom'), '4');
      assert.equal(await page.locator('#image-zoom-in').isDisabled(), true);
      assert.ok((await page.locator('#image-viewer-image').boundingBox()).width > fitted.width * 3.9);
      await page.locator('#image-zoom-reset').click();
      assert.equal(await page.locator('#image-viewer-stage').getAttribute('data-zoom'), '1');
      assert.equal(await page.locator('#image-zoom-out').isDisabled(), true);

      if (width===360) {
        const touchViewer = await context.newCDPSession(page);
        const cx=stageBox.x+stageBox.width/2, cy=stageBox.y+stageBox.height/2;
        const points=distance=>[{id:1,x:cx-distance,y:cy},{id:2,x:cx+distance,y:cy}];
        await touchViewer.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points(30)});
        for(const distance of [45,60,75,90]) await touchViewer.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:points(distance)});
        await touchViewer.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
        assert.ok(Number(await page.locator('#image-viewer-stage').getAttribute('data-zoom')) > 2.5, 'Real two-finger pinch');
        await touchViewer.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:3,x:cx,y:cy}]});
        await touchViewer.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:3,x:cx+60,y:cy}]});
        await touchViewer.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
        assert.ok(Number(await page.locator('#image-viewer-stage').getAttribute('data-pan-x')) > 40, 'Pan the enlarged image');
        assert.ok(page.url().endsWith('/#dinosaurus/brachiosaurus-altithorax'), 'Pinch does not change animal');
        await page.locator('#image-zoom-reset').click();
        await page.touchscreen.tap(cx,cy);
        await page.touchscreen.tap(cx,cy);
        assert.equal(await page.locator('#image-viewer-stage').getAttribute('data-zoom'),'2','Double tap zoom');
        await page.keyboard.press('0');
        assert.equal(await page.locator('#image-viewer-stage').getAttribute('data-pan-x'),'0');
        for(let i=0;i<8;i++) {
          await page.keyboard.press('Tab');
          assert.equal(await page.evaluate(()=>Boolean(document.activeElement.closest('#image-viewer'))),true,'Focus stays in modal');
        }
        await page.goBack();
        await page.locator('#image-viewer').waitFor({state:'hidden'});
        assert.ok(page.url().endsWith('/#dinosaurus/brachiosaurus-altithorax'),'Back closes only the image');
        await page.goForward();
        await page.locator('#image-viewer').waitFor({state:'visible'});
        assert.equal(await page.locator('#image-viewer-stage').getAttribute('data-zoom'),'1');
      }
      if (width===900) {
        await page.locator('#image-viewer-stage').hover();
        await page.mouse.wheel(0,-200);
        await page.waitForFunction(()=>Number(document.querySelector('#image-viewer-stage').dataset.zoom)>1);
        await page.keyboard.press('Escape');
      } else await page.locator('#image-viewer-close').click();
      await page.locator('#image-viewer').waitFor({state:'hidden'});
      await page.waitForFunction(y=>Math.abs(scrollY-y)<5,pictureY).catch(async error => {
        console.error('Viewer scroll restoration', {width, expected:pictureY, actual:await page.evaluate(()=>scrollY)});
        throw error;
      });
      assert.equal(await page.evaluate(()=>document.activeElement.classList.contains('image-zoom-open')),true,'Restore focus');
      await noOverflow(page);


      await page.locator('[data-detail-step="1"]').click();
      await page.waitForURL('**/#dinosaurus/brontosaurus-excelsus');
      await page.locator('[data-detail-step="-1"]').click();
      await page.waitForURL('**/#dinosaurus/brachiosaurus-altithorax');

      if(width===360) {
        await page.locator('[data-read="name"]').click();
        assert.equal(await page.evaluate(()=>__spoken.at(-1).text),'Brachiosaurus');
        await page.locator('[data-read="summary"]').click();
        let record=await page.evaluate(()=>__spoken.at(-1));
        assert.match(record.text,/severoamerycký/);
        assert.doesNotMatch(record.text,/150|Období:|Základní údaje/);
        const firstRequest=record.requestId;
        assert.equal(await page.locator('[data-stop-read]:visible').count(),1);
        assert.equal(await page.locator('[data-read="summary"]').isDisabled(),true);

        await page.locator('[data-read="facts"]').click();
        record=await page.evaluate(()=>__spoken.at(-1));
        assert.match(record.text,/Hmotnost: Orientačně kolem 47 tun/);
        assert.match(record.text,/Délka: Orientačně kolem 22 metrů/);
        assert.match(record.text,/Oblast nálezů:/);
        assert.match(record.text,/150/);
        assert.equal(await page.locator('[data-read="summary"]').isDisabled(),false);
        await page.evaluate(requestId=>window.dispatchEvent(new CustomEvent('dinoatlas-speech',{detail:{requestId,state:'done',message:'Dočteno.'}})),firstRequest);
        assert.equal(await page.locator('[data-read="facts"]').getAttribute('aria-pressed'),'true');
        await page.locator('[data-read-controls="facts"] [data-stop-read]').click();
        assert.equal(await page.locator('[data-stop-read]:visible').count(),0);

        const section=db.dinosaurs.find(a=>a.id==='brachiosaurus-altithorax').translations.cs.sections[0];
        const fold=page.locator('details').filter({has:page.locator('[data-read="'+section.id+'"]')});
        await fold.locator('summary').click();
        await page.locator('[data-read="'+section.id+'"]').click();
        record=await page.evaluate(()=>__spoken.at(-1));
        assert.ok(record.text.includes(section.title));
        assert.equal(await page.locator('[data-stop-read]:visible').count(),1);
        await page.screenshot({path:path.join(artifacts,'reading-section-360.png')});
        await page.locator('[data-read-controls="'+section.id+'"] [data-stop-read]').click();

        const size=page.locator('.size-section');
        await size.locator('summary').click();
        await page.locator('[data-human="1.1"]').click();
        await page.locator('[data-read="comparison"]').click();
        assert.match(await page.evaluate(()=>__spoken.at(-1).text),/1,1 metru/);
        await page.locator('[data-human="1.8"]').click();
        assert.equal(await page.locator('[data-stop-read]:visible').count(),0);

        await page.locator('#detail-heading').evaluate(el=>el.scrollIntoView({block:'start'}));
        const image=await page.locator('.detail-image').boundingBox();
        const y=Math.min(650,image.y+image.height*0.5);
        const session=await context.newCDPSession(page);
        await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:300,y}]});
        await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:240,y:y+1}]});
        await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:60,y:y+2}]});
        await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
        await page.waitForURL('**/#dinosaurus/brontosaurus-excelsus');
        await page.waitForFunction(()=>document.querySelector('#detail-title')?.textContent==='Brontosaurus');
        const beforeY=await page.evaluate(()=>scrollY);
        const img2=await page.locator('.detail-image').boundingBox();
        const y2=Math.min(650,img2.y+img2.height*0.5);
        await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:170,y:y2}]});
        await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:171,y:y2-100}]});
        await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:172,y:y2-180}]});
        await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
        await page.waitForFunction(y=>scrollY>y,beforeY);
        assert.ok(page.url().endsWith('/#dinosaurus/brontosaurus-excelsus'));
        // Let the existing 400 ms post-swipe ghost-click guard finish.
        await page.waitForTimeout(450);
      }

      await page.getByRole('link',{name:'← Zpět do atlasu',exact:true}).click();
      await page.waitForURL('**/#atlas');
      await page.waitForFunction(y=>Math.abs(scrollY-y)<5,galleryY);
      assert.equal(await page.locator('#favorites-count').textContent(),'2');
      await page.locator('[data-category="marine-reptile"]').click();
      assert.equal(await page.locator('#gallery .dino-card').count(),6);
      assert.deepEqual(await page.locator('.card-title-row h3').allTextContents(),['Ichthyosaurus','Liopleurodon','Mosasaurus','Nothosaurus','Plesiosaurus','Shonisaurus']);
      await noOverflow(page);

      if(width===412) {
        await page.getByRole('link',{name:'Obrázkový kvíz',exact:true}).click();
        await page.waitForURL('**/#kviz');

        const questionSrc=await page.locator('.quiz-picture img').getAttribute('src');
        await page.locator('.quiz-picture .image-zoom-open').click();
        await page.locator('#image-viewer').waitFor({state:'visible'});
        assert.equal(await page.locator('#image-viewer-title').textContent(),'Obrázek v kvízu');
        const answerName=db.dinosaurs.find(a=>a.image.src===questionSrc).translations.cs.displayName;
        assert.equal((await page.locator('#image-viewer').textContent()).includes(answerName),false,'Viewer does not reveal the answer');
        assert.equal((await page.locator('#image-viewer-image').getAttribute('alt')).includes(answerName),false);
        await page.locator('#image-viewer-close').click();
        await page.locator('#image-viewer').waitFor({state:'hidden'});
        assert.equal(await page.locator('.quiz-picture img').getAttribute('src'),questionSrc);
        assert.equal(await page.locator('.quiz-answer:not(:disabled)').count(),3);
        await page.goForward();
        await page.locator('#image-viewer').waitFor({state:'visible'});
        await page.locator('#image-viewer-close').click();
        await page.locator('#image-viewer').waitFor({state:'hidden'});
        await page.waitForFunction(()=>Boolean(document.activeElement.closest('.quiz-picture')));


        for(let i=0;i<5;i++) {
          const id=(await page.locator('#quiz-content img').getAttribute('src')).match(/images\/(.+)\.webp/)[1];
          await page.locator('[data-answer="'+id+'"]').click();
          assert.match(await page.locator('#quiz-feedback').textContent(),/Ano!/);
          await page.locator('#quiz-next').click();
        }
        assert.match(await page.locator('.score').textContent(),/5 z 5/);
      }

      for(const id of ['rhamphorhynchus-muensteri','liopleurodon-ferox','ceratosaurus-nasicornis','eoraptor-lunensis','herrerasaurus-ischigualastensis','eodromaeus-murphi','saturnalia-tupiniquim','riojasaurus-incertus','eudimorphodon-ranzii','peteinosaurus-zambellii','nothosaurus-mirabilis','shonisaurus-popularis']) {
        await openAnimal(page,id);
        await noOverflow(page);
        if(width===320&&id==='rhamphorhynchus-muensteri') await page.screenshot({path:path.join(artifacts,'rhamphorhynchus-320.png')});
      }
      if(width===360) {
        await page.getByRole('link',{name:'← Zpět do atlasu',exact:true}).click();
        await page.waitForURL('**/#atlas');
        await page.locator('[data-category="all"]').click();
        await page.locator('[data-period="triassic"]').click();
        assert.equal(await page.locator('#gallery .dino-card').count(),11);
        await page.locator('#search').fill('nothosaurus');
        await page.locator('#card-nothosaurus-mirabilis').click();
        await page.waitForURL('**/#dinosaurus/nothosaurus-mirabilis');
        await page.waitForFunction(()=>document.querySelector('#detail-title')?.textContent==='Nothosaurus');
        await page.locator('[data-read="facts"]').click();
        const facts=await page.evaluate(()=>__spoken.at(-1).text);
        assert.match(facts,/Střední trias/);
        assert.match(facts,/Hmotnost:/);
        assert.match(facts,/3,2 metru/);
        assert.match(await page.locator('.detail-position').textContent(),/\/ 11/);
        await page.screenshot({path:path.join(artifacts,'nothosaurus-360.png')});
        await openAnimal(page,'eudimorphodon-ranzii');
        await page.locator('[data-read="facts"]').click();
        assert.match(await page.evaluate(()=>__spoken.at(-1).text),/Rozpětí křídel:/);
        await page.screenshot({path:path.join(artifacts,'eudimorphodon-360.png')});
        await openAnimal(page,'eodromaeus-murphi');
        await page.locator('[data-read="facts"]').click();
        assert.match(await page.evaluate(()=>__spoken.at(-1).text),/5 až 7 kilogramů/);
        // Import an existing user's stored state into a fresh app context.
        await openAnimal(page,'nothosaurus-mirabilis');
        await page.locator('.detail-favorite').click();
        await page.locator('#theme-toggle').click();
        assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
        await page.getByRole('link',{name:'← Zpět do atlasu',exact:true}).click();
        await page.waitForURL('**/#atlas');
        await page.locator('[data-category="marine-reptile"]').click();
        const stored=await context.storageState();
        const restored=await browser.newContext({storageState:stored,viewport:{width:360,height:850},isMobile:true,hasTouch:true});
        const restoredPage=await restored.newPage();
        restoredPage.on('pageerror',e=>errors.push(e.message));
        await restoredPage.goto(base+'/#atlas');
        await restoredPage.locator('#gallery .dino-card').first().waitFor();
        assert.equal(await restoredPage.locator('html').getAttribute('data-theme'),'dark');
        assert.equal(await restoredPage.locator('[data-category="marine-reptile"]').getAttribute('aria-pressed'),'true');
        assert.equal(await restoredPage.locator('#favorites-count').textContent(),'3');
        await restoredPage.locator('#favorites-filter').click();
        assert.equal(await restoredPage.locator('#gallery .dino-card').count(),1);
        assert.ok(await restoredPage.locator('#card-nothosaurus-mirabilis').isVisible());
        await restoredPage.locator('[data-category="all"]').click();
        assert.equal(await restoredPage.locator('#gallery .dino-card').count(),3);
        await restored.close();
      }
      console.log('PASS viewport '+width+': alphabetic cards, header, images, navigation, favorites and scroll restoration');
      await context.close();
    }
    // Regression: the viewer uses the full viewport, even on short landscape screens.
    // Controls overlay the image; they must not reserve rows or create cream borders.
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({viewport:{width:412,height:915},isMobile:true,hasTouch:true});
      await inject(context);
      await context.addInitScript(value => localStorage.setItem('dinoatlas-theme',value), theme);
      const page = await context.newPage();
      page.on('pageerror',e=>errors.push(e.message));
      await page.goto(base+'/#dinosaurus/allosaurus-fragilis');
      await page.waitForFunction(() => document.querySelector('.detail-image img')?.naturalWidth > 0);

      async function checkDetailImage() {
        const size = await page.locator('.detail-image img').evaluate(img => ({
          width:img.clientWidth, height:img.clientHeight, ratio:img.naturalWidth/img.naturalHeight
        }));
        assert.ok(Math.abs(size.width/size.height-size.ratio)<.01, 'Detail keeps the intrinsic image ratio without letterboxing');
        if(theme==='dark') assert.equal(await page.locator('.detail-image').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(16, 34, 28)');
      }
      async function checkFullViewport(width,height) {
        await page.waitForFunction(() => {
          const img = document.querySelector('#image-viewer-image');
          const stage = document.querySelector('#image-viewer-stage');
          const ratio = Math.min(stage.clientWidth/img.naturalWidth,stage.clientHeight/img.naturalHeight);
          return img.naturalWidth > 0 && Math.abs(parseFloat(img.style.width)-img.naturalWidth*ratio)<1;
        });
        const geometry = await page.evaluate(() => {
          const stage=document.querySelector('#image-viewer-stage'), img=document.querySelector('#image-viewer-image');
          const rect=stage.getBoundingClientRect(), image=img.getBoundingClientRect();
          return {stage:{x:rect.x,y:rect.y,width:rect.width,height:rect.height},
            image:{x:image.x,y:image.y,width:image.width,height:image.height},
            ratio:img.naturalWidth/img.naturalHeight, background:getComputedStyle(stage).backgroundColor};
        });
        assert.equal(geometry.background,'rgb(16, 34, 28)','Dark image background in either app theme');
        assert.ok(Math.abs(geometry.stage.x)<1 && Math.abs(geometry.stage.y)<1,'Stage starts at viewport edge');
        assert.ok(geometry.stage.width>=width-1 && geometry.stage.height>=height-1,'Controls do not shrink the image stage');
        const expectedWidth=Math.min(width,height*geometry.ratio);
        assert.ok(Math.abs(geometry.image.width-expectedWidth)<2,'Image is as large as possible while showing the whole source');
        assert.ok(Math.abs(geometry.image.width/geometry.image.height-geometry.ratio)<.01,'No image stretching');
        assert.ok(geometry.image.x>=-1 && geometry.image.y>=-1,'Whole image remains visible at 100 percent');
        const close=await page.locator('#image-viewer-close').boundingBox();
        const zoom=await page.locator('#image-zoom-in').boundingBox();
        assert.ok(close.x>=0 && close.y>=0 && close.x+close.width<=width+1 && close.y+close.height<=height+1,'Close stays on screen');
        assert.ok(zoom.x>=0 && zoom.y>=0 && zoom.x+zoom.width<=width+1 && zoom.y+zoom.height<=height+1,'Zoom stays on screen');
      }
      await checkDetailImage();
      await page.locator('.detail-image .image-zoom-open').click();
      await page.locator('#image-viewer').waitFor({state:'visible'});
      await checkFullViewport(412,915);
      for (const viewport of [{width:915,height:412},{width:740,height:320},{width:1024,height:600},{width:412,height:915}]) {
        await page.setViewportSize(viewport);
        await checkFullViewport(viewport.width,viewport.height);
        await page.screenshot({path:path.join(artifacts,'viewer-'+theme+'-'+viewport.width+'x'+viewport.height+'.png')});
      }
      await page.locator('#image-zoom-in').click();
      assert.equal(await page.locator('#image-viewer-stage').getAttribute('data-zoom'),'1.5');
      await page.setViewportSize({width:915,height:412});
      await page.waitForFunction(()=>document.querySelector('#image-viewer-stage').clientWidth===915);
      assert.equal(await page.locator('#image-viewer-stage').getAttribute('data-zoom'),'1.5','Rotation preserves zoom');
      await page.locator('#image-zoom-reset').click();
      await checkFullViewport(915,412);
      await page.locator('#image-viewer-close').click();
      await page.locator('#image-viewer').waitFor({state:'hidden'});
      await checkDetailImage();
      await page.reload();
      await page.waitForFunction(() => document.querySelector('.detail-image img')?.naturalWidth > 0);
      await checkDetailImage();
      await context.close();
      console.log('PASS '+theme+': full-size viewer, no pale borders, portrait/landscape/rotation and intrinsic detail ratio');
    }
    assert.deepEqual(errors,[]);
    console.log('PASS browser: section speech, facts, stop/switch behavior, real touch swipes, vertical scrolling, marine quiz, no external requests or page errors.');
  } finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
