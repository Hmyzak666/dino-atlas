/* Dino Atlas — společné rozhraní aplikace. Obsah patří do dinosaurs.json. */
(() => {
  'use strict';

  const LANG = 'cs';
  const CATEGORIES = { dinosaur: 'Dinosauři', pterosaur: 'Ptakoještěři', 'marine-reptile': 'Mořští plazi', all: 'Vše' };
  const CATEGORY_LABELS = { dinosaur: 'Dinosaurus', pterosaur: 'Ptakoještěr', 'marine-reptile': 'Mořský plaz' };
  const PERIODS = { triassic: 'Trias', jurassic: 'Jura', cretaceous: 'Křída' };
  const DIETS = { herbivore: 'Býložravec', carnivore: 'Masožravec', omnivore: 'Všežravec' };
  const CONFIDENCE = {
    evidence: ['🟢', 'Dobře doloženo'],
    estimate: ['🟡', 'Vědecký odhad / hypotéza'],
    unknown: ['🔴', 'Neznámé / velmi nejisté'],
    pending: ['○', 'Údaj doplňujeme']
  };

  const localized = value => typeof value === 'string' ? value : (value?.[LANG] || value?.en || '');
  const copy = dino => dino.translations[LANG] || dino.translations.en;
  const nameOrder = new Intl.Collator('cs', { sensitivity: 'base', numeric: true });
  const sortAnimals = animals => [...animals].sort((a, b) => nameOrder.compare(copy(a).displayName, copy(b).displayName) || a.id.localeCompare(b.id));
  const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  const compactName = value => normalize(value).replace(/ /g, '');
  const categoryOf = animal => animal.category || 'dinosaur';
  const atlasImageClass = animal => (animal.image.facing || 'right') === (animal.diet === 'carnivore' ? 'left' : 'right') ? '' : 'image-flipped';
  const categoryAnimals = (animals, category = 'all') => animals.filter(animal => category === 'all' || categoryOf(animal) === category);
  const numberLabel = value => new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 2 }).format(value);

  function comparisonData(animal, humanHeight = 1.8) {
    const measure = animal.comparison;
    if (!measure || !Number.isFinite(measure.valueM) || measure.valueM <= 0 || !Number.isFinite(humanHeight) || humanHeight <= 0) return null;
    const maximum = Math.max(measure.valueM, humanHeight);
    return { animalPercent: measure.valueM / maximum * 100, humanPercent: humanHeight / maximum * 100,
      ratio: measure.valueM / humanHeight, humanHeight, valueM: measure.valueM, kind: measure.kind };
  }

  function filteredDinosaurs(dinosaurs, state) {
    const query = normalize(state.query);
    return sortAnimals(dinosaurs.filter(dino => {
      const words = [dino.scientificName, copy(dino).displayName, ...(dino.aliases || [])].map(normalize);
      const matchesName = !query || words.some(word => word.includes(query) || compactName(word).includes(compactName(query)));
      return matchesName && (!state.category || state.category === 'all' || categoryOf(dino) === state.category)
        && (state.period === 'all' || dino.period === state.period)
        && (state.diet === 'all' || dino.diet === state.diet)
        && (!state.favoritesOnly || state.favorites.has(dino.id));
    }));
  }

  function shuffle(items, random = Math.random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.min(i, Math.floor(random() * (i + 1)));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function makeQuiz(dinosaurs, count = 5, random = Math.random) {
    const usable = dinosaurs.filter(dino => dino.quizEnabled !== false && dino.image?.src);
    if (usable.length < 3) return [];
    const alternatives = answer => usable.filter(dino => dino.id !== answer.id && (!answer.quizLookalikeGroup || dino.quizLookalikeGroup !== answer.quizLookalikeGroup));
    return shuffle(usable.filter(answer => alternatives(answer).length >= 2), random).slice(0, count).map(answer => ({
      answerId: answer.id,
      optionIds: shuffle([answer, ...shuffle(alternatives(answer), random).slice(0, 2)], random).map(dino => dino.id)
    }));
  }

  function validateDatabase(db) {
    if (!db || db.schemaVersion !== 1 || !db.sources || !Array.isArray(db.dinosaurs) || !db.dinosaurs.length) throw new Error('Neplatná struktura databáze.');
    const ids = new Set();
    const validateClaim = claim => {
      if (!CONFIDENCE[claim.confidence] || !Array.isArray(claim.sourceIds) || !localized(claim.text || claim.value)) throw new Error('Neplatný údaj v hesle.');
      if (!['unknown', 'pending'].includes(claim.confidence) && claim.sourceIds.length === 0) throw new Error('Doloženému údaji chybí zdroj.');
      claim.sourceIds.forEach(id => { if (!db.sources[id]) throw new Error('Neznámý zdroj: ' + id); });
    };
    for (const dino of db.dinosaurs) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(dino.id) || ids.has(dino.id)) throw new Error('Neplatné nebo opakované ID dinosaura.');
      ids.add(dino.id);
      if (!PERIODS[dino.period] || !DIETS[dino.diet] || !dino.scientificName || !dino.translations?.[LANG]) throw new Error('Heslu chybí základní údaje.');
      if (!Object.prototype.hasOwnProperty.call(CATEGORY_LABELS, categoryOf(dino))) throw new Error('Neznámá kategorie zvířete.');
      if (!Array.isArray(dino.taxonomy) || !dino.taxonomy.length) throw new Error('Chybí příbuzenské zařazení.');
      if (categoryOf(dino) === 'pterosaur' && (!dino.taxonomy.includes('Pterosauria') || dino.taxonomy.includes('Dinosauria'))) throw new Error('Ptakoještěr má nesprávné zařazení.');
      if (categoryOf(dino) === 'dinosaur' && (!dino.taxonomy.includes('Dinosauria') || dino.taxonomy.includes('Pterosauria'))) throw new Error('Dinosaurus má nesprávné zařazení.');
      if (categoryOf(dino) === 'marine-reptile' && (dino.taxonomy.some(group => ['Dinosauria', 'Pterosauria'].includes(group)) || !dino.taxonomy.some(group => ['Mosasauridae', 'Plesiosauria', 'Ichthyosauria', 'Nothosauria'].includes(group)))) throw new Error('Mořský plaz má nesprávné zařazení.');
      const text = copy(dino);
      if (!text.displayName || !text.summary || !text.ageLabel || !text.location || !text.quizHint) throw new Error('Heslu chybí text.');
      if (!/^images\/[a-z0-9-]+\.(png|webp|jpe?g)$/.test(dino.image?.src || '')) throw new Error('Neplatná cesta k obrázku.');
      if (dino.image.facing !== undefined && !['left', 'right'].includes(dino.image.facing)) throw new Error('Neplatný směr obrázku.');
      if (dino.quizLookalikeGroup !== undefined && !/^[a-z0-9-]+$/.test(dino.quizLookalikeGroup)) throw new Error('Neplatná skupina podobných zvířat.');
      if (!Array.isArray(dino.facts) || !Array.isArray(text.sections)) throw new Error('Heslu chybí fakta nebo sekce.');
      dino.facts.forEach(validateClaim);
      if (text.recognition) {
        if (!Array.isArray(text.recognition) || text.recognition.length !== 3) throw new Error('Poznávací znaky musí být tři.');
        text.recognition.forEach(validateClaim);
      }
      if (text.quizExplanation) validateClaim(text.quizExplanation);
      if (dino.comparison) {
        const measure = dino.comparison;
        if (!['length', 'wingspan'].includes(measure.kind) || !Number.isFinite(measure.valueM) || measure.valueM <= 0 || measure.valueM > 100) throw new Error('Neplatný rozměr pro srovnání.');
        validateClaim({ ...measure, text: measure.note });
      }
      if (text.contemporaries) {
        validateClaim(text.contemporaries);
        if (!Array.isArray(text.contemporaries.ids) || new Set(text.contemporaries.ids).size !== text.contemporaries.ids.length) throw new Error('Neplatní současníci.');
      }
      const sectionIds = new Set();
      text.sections.forEach(section => {
        if (!/^[a-z0-9-]+$/.test(section.id) || sectionIds.has(section.id) || !section.title || !Array.isArray(section.claims)) throw new Error('Neplatná sekce.');
        sectionIds.add(section.id);
        section.claims.forEach(validateClaim);
      });
    }
    for (const animal of db.dinosaurs) {
      for (const id of copy(animal).contemporaries?.ids || []) if (id === animal.id || !ids.has(id)) throw new Error('Neznámý současník: ' + id);
    }
    for (const [id, source] of Object.entries(db.sources)) {
      if (!/^[a-z0-9-]+$/.test(id)) throw new Error('Neplatné ID zdroje.');
      if (!/^https:\/\//.test(source.url) || !source.title) throw new Error('Neplatný odkaz na zdroj.');
    }
    return true;
  }

  function pronunciationText(value) {
    // A narrow pronunciation hint for voices that read "jedince" with a hard d.
    // Apply only to spoken text; keep the displayed Czech spelling untouched.
    // Avoid a global di/ti/ni replacement: scientific names have different rules.
    return String(value ?? '').normalize('NFC').replace(
      /(?<![\p{L}\p{M}])jedin(?:cích|cům|cem|ec|ce|ci|ců)(?![\p{L}\p{M}])/giu,
      word => word.replace(/[dD]/, letter => letter === 'D' ? 'Ď' : 'ď')
    // Some Czech voices incorrectly soften r before i in this foreign stem.
    // This narrow hint is used only for speech, including adjective endings.
    ).replace(/ameri(?=ck|čt)/giu, word => word.slice(0, -1) + (word.endsWith('I') ? 'Y' : 'y'))
    // Latin spelling stays on screen; Czech narration needs a hard k.
    .replace(/(?<![\p{L}\p{M}])diplodoc/giu, word => word.slice(0, -1) + (word.endsWith('C') ? 'K' : 'k'));
  }

  function speechMeasurements(value) {
    const forms = { m: ['metr', 'metry', 'metrů', 'metru'], kg: ['kilogram', 'kilogramy', 'kilogramů', 'kilogramu'], t: ['tuna', 'tuny', 'tun', 'tuny'] };
    return String(value).replace(/(\d+(?:[.,]\d+)?)(?:\s*[–−-]\s*(\d+(?:[.,]\d+)?))?\s*(kg|m|t)(?![\p{L}])/gu, (_, first, last, unit) => {
      const amount = last || first;
      const number = Number(amount.replace(',', '.'));
      const form = /[.,]/.test(amount) ? 3 : number === 1 ? 0 : number >= 2 && number <= 4 ? 1 : 2;
      const label = forms[unit][form];
      return `${first.replace('.', ',')}${last ? ' až ' + last.replace('.', ',') : ''} ${label}`;
    }).replace(/(\d)\s*[–−]\s*(?=\d)/g, '$1 až ').replace(/mil\.\s*let/g, 'miliony let').replace(/\s*·\s*/g, '. ').replace(/([.!?])\s*\./g, '$1');
  }

  function narrationText(dino, sectionId = 'summary', humanHeight = 1.8) {
    const text = copy(dino);
    if (sectionId === 'name') return pronunciationText(text.displayName);
    if (sectionId === 'summary') {
      return pronunciationText(text.summary.startsWith(text.displayName) ? text.summary : `${text.displayName}. ${text.summary}`);
    }
    if (sectionId === 'facts') {
      const period = dino.facts.find(fact => /období/i.test(localized(fact.label)));
      const location = dino.facts.find(fact => /oblast|původ|naleziště|výskyt|rozšíření/i.test(localized(fact.label)));
      const others = dino.facts.filter(fact => !/období|stáří|oblast|původ|naleziště|výskyt|rozšíření|význam|výslovnost/i.test(localized(fact.label)));
      const parts = [text.displayName, 'Základní údaje', `Období: ${period ? localized(period.value) : PERIODS[dino.period]}`, text.ageLabel,
        `Oblast nálezů: ${location ? localized(location.value) : text.location}`,
        ...others.map(fact => `${localized(fact.label)}: ${localized(fact.value)}${fact.note ? '. ' + localized(fact.note) : ''}`)];
      if (period?.note) parts.push(localized(period.note));
      return pronunciationText(speechMeasurements(parts.join('. ') + '.'));
    }
    if (sectionId === 'recognition') {
      return pronunciationText(`${text.displayName}. Podle čeho mě poznáš? ${(text.recognition || []).map(trait => localized(trait.text)).join(' ')}`);
    }
    if (sectionId === 'comparison') {
      const data = comparisonData(dino, humanHeight);
      if (!data) return '';
      return pronunciationText(speechMeasurements(`${text.displayName}. Jak velký byl? ${data.kind === 'wingspan' ? 'Rozpětí křídel' : 'Délka těla'} přibližně ${numberLabel(data.valueM)} m. Výška člověka pro porovnání ${numberLabel(humanHeight)} m. ${localized(dino.comparison.note)}`));
    }
    if (sectionId === 'contemporaries') {
      return text.contemporaries ? pronunciationText(`${text.displayName}. Ze stejného pravěkého prostředí. ${localized(text.contemporaries.text)}`) : '';
    }
    const section = text.sections.find(item => item.id === sectionId);
    if (!section) return '';
    const qualifiers = { evidence: '', estimate: 'Vědecký odhad. ', unknown: 'Co zatím nevíme. ', pending: 'Údaj připravujeme. ' };
    return pronunciationText(speechMeasurements(`${text.displayName}. ${section.title}. ${section.claims.map(claim => qualifiers[claim.confidence] + localized(claim.text)).join(' ')}`));
  }

  // Stejné čisté funkce používá web i kontrola v Node; v prohlížeči se nic neexportuje.
  if (typeof module !== 'undefined' && module.exports) module.exports = { normalize, sortAnimals, filteredDinosaurs, shuffle, makeQuiz, validateDatabase, escapeHtml, narrationText, pronunciationText, speechMeasurements, categoryOf, categoryAnimals, comparisonData };
  if (typeof document === 'undefined') return;

  const $ = id => document.getElementById(id);
  let database;
  let dinosaurs = [];
  let byId = new Map();
  let currentRoute = '';
  let galleryScroll = 0;
  let lastOpenedId = '';
  let detailIds = [];
  let detailSwipe = null;
  let suppressDetailClickUntil = 0;
  let scrollFrame = 0;
  let quiz = null;
  let toastTimer;
  let storageNoticeShown = false;
  let readSequence = 0;
  let readRequest = '';
  let readTarget = '';
  let reading = false;
  let voiceListener;
  let voiceTimer;
  let readTimer;
  const state = { category: 'all', query: '', period: 'all', diet: 'all', favoritesOnly: false, favorites: new Set() };
  let comparisonHeight = 1.8;


  const pictureDialog = $('image-viewer');
  const pictureStage = $('image-viewer-stage');
  const picture = $('image-viewer-image');
  const picturePointers = new Map();
  let pictureGesture = null;
  let pictureView = { scale: 1, x: 0, y: 0, width: 0, height: 0, flipped: false };
  let pictureFocus = null;
  let pictureScroll = 0;
  let pictureClosing = false;
  let pictureTap = null;

  function paintPicture(scale = pictureView.scale, x = pictureView.x, y = pictureView.y) {
    const view = pictureView;
    view.scale = Math.max(1, Math.min(4, scale));
    const limitX = Math.max(0, (view.width * view.scale - pictureStage.clientWidth) / 2);
    const limitY = Math.max(0, (view.height * view.scale - pictureStage.clientHeight) / 2);
    view.x = Math.max(-limitX, Math.min(limitX, x));
    view.y = Math.max(-limitY, Math.min(limitY, y));
    picture.style.transform = 'translate(-50%, -50%) translate(' + view.x + 'px, ' + view.y + 'px) scale(' + (view.flipped ? -view.scale : view.scale) + ', ' + view.scale + ')';
    $('image-zoom-level').value = Math.round(view.scale * 100) + ' %';
    $('image-zoom-out').disabled = view.scale <= 1;
    $('image-zoom-in').disabled = view.scale >= 4;
    Object.assign(pictureStage.dataset, { zoom: String(view.scale), panX: String(view.x), panY: String(view.y) });
  }
  function fitPicture() {
    if (!pictureDialog.open || !picture.naturalWidth || !picture.naturalHeight) return;
    const ratio = Math.min(pictureStage.clientWidth / picture.naturalWidth, pictureStage.clientHeight / picture.naturalHeight);
    pictureView.width = picture.naturalWidth * ratio;
    pictureView.height = picture.naturalHeight * ratio;
    picture.style.width = pictureView.width + 'px';
    picture.style.height = pictureView.height + 'px';
    paintPicture();
  }
  function zoomPicture(next, x = 0, y = 0) {
    const scale = Math.max(1, Math.min(4, next));
    const ratio = scale / pictureView.scale;
    paintPicture(scale, x - (x - pictureView.x) * ratio, y - (y - pictureView.y) * ratio);
  }
  function picturePoint(event) {
    const box = pictureStage.getBoundingClientRect();
    return { x: event.clientX - box.left - box.width / 2, y: event.clientY - box.top - box.height / 2 };
  }
  function hidePicture(restore = true) {
    if (!pictureDialog.open) return;
    pictureDialog.close();
    document.body.classList.remove('image-viewing');
    picturePointers.clear();
    pictureGesture = pictureTap = null;
    pictureClosing = false;
    if (restore) {
      const target = pictureFocus, top = pictureScroll;
      requestAnimationFrame(() => {
        if (!pictureDialog.open) { if (target?.isConnected) target.focus({ preventScroll: true }); window.scrollTo(0, top); }
      });
    }
  }
  function closePicture() {
    if (!pictureDialog.open || pictureClosing) return;
    if (history.state?.dinoAtlasImage?.route === location.hash) { pictureClosing = true; history.back(); }
    else hidePicture();
  }
  function showPicture(data, trigger, push = true) {
    if (pictureDialog.open || !dinosaurs.some(animal => animal.image.src === data.src)) return;
    pictureFocus = trigger || document.querySelector(location.hash === '#kviz' ? '.quiz-picture .image-zoom-open' : '.detail-image .image-zoom-open');
    pictureScroll = window.scrollY;
    pictureView = { scale: 1, x: 0, y: 0, width: 0, height: 0, flipped: Boolean(data.flipped) };
    picturePointers.clear();
    pictureGesture = pictureTap = null;
    pictureClosing = false;
    $('image-viewer-title').textContent = data.title;
    picture.alt = data.alt;
    picture.src = data.src;
    $('image-viewer-hint').textContent = 'Dvěma prsty přibliž, jedním posouvej. Dvojím klepnutím přiblížíš nebo oddálíš.';
    document.body.classList.add('image-viewing');
    pictureDialog.showModal();
    paintPicture(1, 0, 0);
    fitPicture();
    if (push) history.pushState({ ...history.state, dinoAtlasImage: { ...data, route: location.hash } }, '', location.href);
    $('image-viewer-close').focus({ preventScroll: true });
  }
  function openPicture(trigger) {
    const box = trigger.closest('.detail-image, .quiz-picture'), img = box?.querySelector('img');
    if (!img) return;
    showPicture({ src: img.getAttribute('src'), alt: img.alt, flipped: img.classList.contains('image-flipped'),
      title: box.closest('#detail-view') ? $('detail-title').textContent : 'Obrázek v kvízu' }, box.querySelector('.image-zoom-open'));
  }
  function rebasePictureGesture() {
    const points = [...picturePointers.values()];
    if (points.length >= 2) {
      points.forEach(point => { point.multi = true; });
      const [a, b] = points;
      pictureGesture = { pinch: true, distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)), cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2, ...pictureView };
    } else pictureGesture = points.length ? { startX: points[0].x, startY: points[0].y, ...pictureView } : null;
  }
  pictureStage.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    const point = picturePoint(event);
    picturePointers.set(event.pointerId, { ...point, startX: point.x, startY: point.y, moved: false, multi: false });
    pictureStage.setPointerCapture(event.pointerId);
    rebasePictureGesture();
  });
  pictureStage.addEventListener('pointermove', event => {
    const point = picturePointers.get(event.pointerId), gesture = pictureGesture;
    if (!point || !gesture) return;
    Object.assign(point, picturePoint(event));
    if (Math.hypot(point.x - point.startX, point.y - point.startY) > 6) point.moved = true;
    if (gesture.pinch && picturePointers.size >= 2) {
      const [a, b] = [...picturePointers.values()];
      const scale = Math.max(1, Math.min(4, gesture.scale * Math.hypot(a.x - b.x, a.y - b.y) / gesture.distance)), ratio = scale / gesture.scale;
      paintPicture(scale, (a.x + b.x) / 2 - (gesture.cx - gesture.x) * ratio, (a.y + b.y) / 2 - (gesture.cy - gesture.y) * ratio);
    } else paintPicture(pictureView.scale, gesture.x + point.x - gesture.startX, gesture.y + point.y - gesture.startY);
  });
  function endPicturePointer(event) {
    const point = picturePointers.get(event.pointerId);
    if (!point) return;
    picturePointers.delete(event.pointerId);
    if (event.type === 'pointerup' && event.pointerType !== 'mouse' && !point.moved && !point.multi) {
      const now = performance.now();
      if (pictureTap && now - pictureTap.time < 320 && Math.hypot(point.x - pictureTap.x, point.y - pictureTap.y) < 30) {
        zoomPicture(pictureView.scale > 1 ? 1 : 2, point.x, point.y); pictureTap = null;
      } else pictureTap = { x: point.x, y: point.y, time: now };
    } else pictureTap = null;
    rebasePictureGesture();
  }
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => pictureStage.addEventListener(type, endPicturePointer));
  pictureStage.addEventListener('dblclick', event => {
    if (event.sourceCapabilities?.firesTouchEvents) return;
    event.preventDefault(); const point = picturePoint(event); zoomPicture(pictureView.scale > 1 ? 1 : 2, point.x, point.y);
  });
  pictureStage.addEventListener('wheel', event => {
    event.preventDefault(); const point = picturePoint(event); zoomPicture(pictureView.scale * Math.exp(-event.deltaY * .002), point.x, point.y);
  }, { passive: false });
  $('image-zoom-in').addEventListener('click', () => zoomPicture(pictureView.scale + .5));
  $('image-zoom-out').addEventListener('click', () => zoomPicture(pictureView.scale - .5));
  $('image-zoom-reset').addEventListener('click', () => paintPicture(1, 0, 0));
  $('image-viewer-close').addEventListener('click', closePicture);
  pictureDialog.addEventListener('cancel', event => { event.preventDefault(); closePicture(); });
  pictureDialog.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      const targets = [...pictureDialog.querySelectorAll('button:not(:disabled), [tabindex="0"]')].filter(node => node.getClientRects().length);
      const index = targets.indexOf(document.activeElement);
      event.preventDefault();
      targets[(index + (event.shiftKey ? -1 : 1) + targets.length) % targets.length]?.focus({ preventScroll: true });
    } else if (['+', '=', '-', '0'].includes(event.key)) {
      event.preventDefault(); if (event.key === '0') paintPicture(1, 0, 0); else zoomPicture(pictureView.scale + (event.key === '-' ? -.5 : .5));
    } else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key) && pictureView.scale > 1) {
      event.preventDefault(); paintPicture(pictureView.scale, pictureView.x + (event.key === 'ArrowLeft' ? 40 : event.key === 'ArrowRight' ? -40 : 0), pictureView.y + (event.key === 'ArrowUp' ? 40 : event.key === 'ArrowDown' ? -40 : 0));
    }
  });
  picture.addEventListener('load', fitPicture);
  picture.addEventListener('error', () => { $('image-viewer-hint').textContent = 'Obrázek se nepodařilo načíst. Zavři ho a zkus to znovu.'; });
  window.addEventListener('popstate', () => {
    const saved = history.state?.dinoAtlasImage;
    if (saved?.route === location.hash && location.hash === currentRoute) { if (!pictureDialog.open) showPicture(saved, null, false); }
    else hidePicture(location.hash === currentRoute);
  });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(() => { picturePointers.clear(); pictureGesture = null; fitPicture(); }).observe(pictureStage);
  function imageZoomButton() {
    return '<button class="image-zoom-open" data-image-viewer type="button" aria-label="Zvětšit obrázek" title="Zvětšit obrázek"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m14.5 14.5 6 6M10 7v6M7 10h6"/></svg></button>';
  }

  function readStorage(key, fallback) {
    try { return localStorage.getItem(key) ?? fallback; } catch (_) { return fallback; }
  }
  function saveStorage(key, value) {
    try { localStorage.setItem(key, value); }
    catch (_) {
      if (!storageNoticeShown) {
        toast('Prohlížeč nepovoluje uložení. Volba zůstane platná pro toto otevření.');
        storageNoticeShown = true;
      }
    }
  }
  function toast(message) {
    clearTimeout(toastTimer);
    $('toast').textContent = message;
    $('toast').hidden = false;
    toastTimer = setTimeout(() => { $('toast').hidden = true; }, 3200);
  }
  function applyTheme(theme) {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    $('theme-toggle').setAttribute('aria-pressed', String(dark));
    $('theme-toggle').setAttribute('aria-label', dark ? 'Zapnout světlý vzhled' : 'Zapnout tmavý vzhled');
    $('theme-toggle').innerHTML = `<span aria-hidden="true">${dark ? '☀' : '☾'}</span>`;
    $('theme-color').content = dark ? '#10221c' : '#f7f4ec';
  }
  applyTheme(document.documentElement.dataset.theme);
  $('theme-toggle').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    saveStorage('dinoatlas-theme', theme);
  });

  function favoriteButton(dino, extraClass = '') {
    const saved = state.favorites.has(dino.id);
    return `<button type="button" class="favorite-button ${extraClass}" data-favorite="${dino.id}" aria-pressed="${saved}" aria-label="${saved ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}: ${escapeHtml(copy(dino).displayName)}"><svg class="favorite-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/></svg></button>`;
  }
  function syncCategory() {
    document.querySelectorAll('[data-category]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === state.category)));
    $('quiz-category').textContent = state.category === 'all' ? 'Kvíz · Všechna pravěká zvířata' : `Kvíz · ${CATEGORIES[state.category]}`;
    const headings = { all: 'Objevuj pravěk.', dinosaur: 'Poznej dinosaury.', pterosaur: 'Poznej ptakoještěry.', 'marine-reptile': 'Poznej mořské plazy.' };
    $('atlas-title').textContent = headings[state.category];
    $('atlas-intro').textContent = state.category === 'pterosaur'
      ? 'Létající příbuzní dinosaurů s blanitými křídly.'
      : state.category === 'dinosaur' ? 'Objevuj podobu, způsob života a stopy ve fosiliích.'
      : state.category === 'marine-reptile' ? 'Obyvatelé pravěkých moří. Patří do různých skupin plazů a nejsou to dinosauři.'
      : 'Dinosauři, ptakoještěři i mořští plazi. Objevuj, porovnávej a hraj.';
    $('gallery-title').textContent = state.category === 'all' ? 'Prozkoumej atlas' : CATEGORIES[state.category];
  }
  function confidenceBadge(level) {
    const [symbol, label] = CONFIDENCE[level];
    return `<span class="confidence confidence-${level}"><span aria-hidden="true">${symbol}</span>${label}</span>`;
  }
  function readControls(target, label) {
    return `<div class="read-controls" data-read-controls="${target}"><button class="button read-button" type="button" data-read="${target}" aria-pressed="false"><span aria-hidden="true">🔊</span>${label}</button><button class="button read-stop" type="button" data-stop-read hidden aria-label="Zastavit čtení této části"><span aria-hidden="true">■</span>Zastavit</button><p class="read-status" data-read-status="${target}" role="status" aria-live="polite"></p></div>`;
  }
  function setReadingStatus(status, message, target = readTarget) {
    reading = status === 'loading' || status === 'reading';
    if (status !== 'loading') clearTimeout(readTimer);
    document.querySelectorAll('[data-read-controls]').forEach(group => { group.querySelector('[data-stop-read]').hidden = !reading || group.dataset.readControls !== target; });
    document.querySelectorAll('[data-read]').forEach(button => {
      button.disabled = reading && button.dataset.read === readTarget;
      button.setAttribute('aria-pressed', String(reading && button.dataset.read === readTarget));
    });
    document.querySelectorAll('[data-read-status]').forEach(output => { output.textContent = output.dataset.readStatus === target ? message : ''; });
  }
  function stopNarration(announce = true) {
    const target = readTarget;
    readRequest = '';
    readTarget = '';
    clearTimeout(voiceTimer);
    clearTimeout(readTimer);
    if (voiceListener) window.speechSynthesis?.removeEventListener('voiceschanged', voiceListener);
    voiceListener = undefined;
    try { window.DinoSpeech?.stop(); } catch (_) {}
    try { window.speechSynthesis?.cancel(); } catch (_) {}
    setReadingStatus('idle', announce ? 'Čtení zastaveno.' : '', target);
  }
  function readDetail(target) {
    const dino = byId.get(lastOpenedId);
    if (!dino || !currentRoute.startsWith('#dinosaurus/')) return;
    const text = narrationText(dino, target, comparisonHeight);
    if (!text) return;
    stopNarration(false);
    readTarget = target;
    readRequest = `read-${++readSequence}`;
    const request = readRequest;
    setReadingStatus('loading', 'Připravuji české čtení…');
    readTimer = setTimeout(() => {
      if (request !== readRequest) return;
      stopNarration(false);
      setReadingStatus('error', 'Čtení se nepodařilo spustit. Zkontroluj český hlas v nastavení telefonu.');
    }, 15000);
    if (typeof window.DinoSpeech?.read === 'function') {
      try { window.DinoSpeech.read(text, request); }
      catch (_) { setReadingStatus('error', 'Čtení se nepodařilo spustit. Zkus to prosím znovu.'); }
      return;
    }
    const synthesis = window.speechSynthesis;
    if (!synthesis || typeof window.SpeechSynthesisUtterance !== 'function') {
      setReadingStatus('error', 'V tomto prostředí není čtení dostupné. Použij Android aplikaci s českým hlasem.');
      return;
    }
    const speak = () => {
      if (request !== readRequest) return;
      const voice = synthesis.getVoices().find(item => /^cs(?:-|$)/i.test(item.lang) && item.localService);
      if (!voice) {
        setReadingStatus('error', 'Pro čtení bez internetu chybí místní český hlas. Použij aplikaci nebo zkontroluj nastavení hlasu.');
        return;
      }
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = 'cs-CZ';
      utterance.voice = voice;
      utterance.rate = 0.92;
      utterance.onstart = () => { if (request === readRequest) setReadingStatus('reading', 'Čte se…'); };
      utterance.onend = () => { if (request === readRequest) setReadingStatus('done', 'Dočteno.'); };
      utterance.onerror = () => { if (request === readRequest) setReadingStatus('error', 'Čtení se nepodařilo. Zkus to prosím znovu.'); };
      try { synthesis.speak(utterance); }
      catch (_) { setReadingStatus('error', 'Čtení se nepodařilo spustit.'); }
    };
    if (synthesis.getVoices().length) speak();
    else {
      voiceListener = () => {
        clearTimeout(voiceTimer);
        synthesis.removeEventListener('voiceschanged', voiceListener);
        voiceListener = undefined;
        speak();
      };
      synthesis.addEventListener('voiceschanged', voiceListener);
      voiceTimer = setTimeout(() => {
        if (voiceListener) synthesis.removeEventListener('voiceschanged', voiceListener);
        voiceListener = undefined;
        speak();
      }, 2500);
    }
  }
  function updateFavoriteButtons() {
    document.querySelectorAll('[data-favorite]').forEach(button => {
      const dino = byId.get(button.dataset.favorite);
      if (!dino) return;
      const saved = state.favorites.has(dino.id);
      button.setAttribute('aria-pressed', String(saved));
      button.setAttribute('aria-label', `${saved ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}: ${copy(dino).displayName}`);
    });
    $('favorites-count').textContent = state.favorites.size;
  }
  function renderGallery() {
    const visible = filteredDinosaurs(dinosaurs, state);
    $('gallery').innerHTML = visible.map((dino, index) => {
      const text = copy(dino);
      return `<article class="dino-card">
          <div class="card-picture"><img class="${atlasImageClass(dino)}" src="${escapeHtml(dino.image.src)}" alt="${escapeHtml(localized(dino.image.alt))}" width="1536" height="1024" ${index > 1 ? 'loading="lazy"' : ''} decoding="async"></div>
          <div class="card-body"><div class="card-title-row"><h3><a class="card-link" id="card-${dino.id}" href="#dinosaurus/${dino.id}">${escapeHtml(text.displayName)}</a></h3>${favoriteButton(dino, 'card-favorite')}</div><p class="scientific-name">${escapeHtml(dino.scientificName)}</p>
          <div class="card-meta"><span class="period-tag">${PERIODS[dino.period]}</span><span class="animal-kind">${CATEGORY_LABELS[categoryOf(dino)]}</span><span>${escapeHtml(text.ageLabel)}</span></div>
          <p class="card-location">${escapeHtml(text.location)}</p><p class="card-summary">${escapeHtml(text.cardSummary)}</p><span class="card-open">Prozkoumat →</span></div>
      </article>`;
    }).join('');
    $('result-count').textContent = `Zobrazeno ${visible.length} z ${categoryAnimals(dinosaurs, state.category).length}`;
    $('empty-state').hidden = visible.length !== 0;
    $('random-button').disabled = visible.length === 0;
    $('favorites-filter').setAttribute('aria-pressed', String(state.favoritesOnly));
    updateFavoriteButtons();
    scheduleScrollControls();
  }

  function scheduleScrollControls() {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const editing = document.activeElement?.matches('input, textarea, select, [contenteditable="true"]');
      const supported = currentRoute === '#atlas' || currentRoute.startsWith('#dinosaurus/');
      $('scroll-controls').hidden = !supported || maximum < 100 || window.scrollY < 120 || editing;
      $('scroll-up').disabled = window.scrollY <= 8;
      $('scroll-down').disabled = window.scrollY >= maximum - 8;
    });
  }

  function chooseDetailSequence(dino) {
    // Keep the opened list stable while browsing, including a favorites-only list.
    if (currentRoute.startsWith('#dinosaurus/') && detailIds.includes(dino.id)) return;
    // Searching locates the starting animal; browsing continues through the
    // category and other active filters without clearing the atlas query.
    const selected = currentRoute === '#atlas' ? filteredDinosaurs(dinosaurs, { ...state, query: '' }) : categoryAnimals(dinosaurs, state.category);
    const fallbackCategory = state.category === 'all' ? 'all' : categoryOf(dino);
    detailIds = (selected.some(item => item.id === dino.id) ? selected : categoryAnimals(dinosaurs, fallbackCategory)).map(item => item.id);
  }

  function detailNavigation(dino) {
    const index = detailIds.indexOf(dino.id);
    const previous = byId.get(detailIds[index - 1]);
    const next = byId.get(detailIds[index + 1]);
    return `<nav class="detail-browser" aria-label="Procházení vybraných zvířat">
      <button type="button" class="button" data-detail-step="-1" ${previous ? `aria-label="Předchozí: ${escapeHtml(copy(previous).displayName)}"` : 'disabled'}><span aria-hidden="true">←</span>Předchozí</button>
      <span class="detail-position" aria-label="Zvíře ${index + 1} z ${detailIds.length}">${index + 1} / ${detailIds.length}</span>
      <button type="button" class="button" data-detail-step="1" ${next ? `aria-label="Další: ${escapeHtml(copy(next).displayName)}"` : 'disabled'}>Další<span aria-hidden="true">→</span></button>
    </nav>${detailIds.length > 1 ? '<p class="swipe-hint">Na telefonu můžeš přejít i tahem doleva nebo doprava.</p>' : ''}`;
  }

  function stepDetail(direction) {
    if (!currentRoute.startsWith('#dinosaurus/') || ![-1, 1].includes(direction)) return false;
    const index = detailIds.indexOf(lastOpenedId);
    const nextId = index >= 0 ? detailIds[index + direction] : undefined;
    if (!nextId) return false;
    // Swiping does not add a separate Back step for every animal.
    history.replaceState(null, '', `#dinosaurus/${nextId}`);
    route();
    return true;
  }

  function renderComparison(dino) {
    const data = comparisonData(dino, comparisonHeight);
    if (!data) return '';
    const metric = data.kind === 'wingspan' ? 'Rozpětí křídel' : 'Délka od hlavy po ocas';
    return `<details class="detail-section size-section"><summary>Jak velký byl?</summary><div class="section-text">
      ${readControls('comparison', 'Přečíst porovnání')}
      <p>Porovnej ${data.kind === 'wingspan' ? 'rozpětí křídel' : 'délku těla'} s výškou člověka. Oba proužky mají stejné měřítko.</p>
      <div class="human-choices" role="group" aria-label="Výška člověka pro porovnání"><button type="button" data-human="1.8" aria-pressed="${comparisonHeight === 1.8}">Dospělý · 1,8 m</button><button type="button" data-human="1.1" aria-pressed="${comparisonHeight === 1.1}">Dítě · 1,1 m</button></div>
      <figure class="size-chart" aria-label="${escapeHtml(metric)} asi ${numberLabel(data.valueM)} metru; výška člověka ${numberLabel(data.humanHeight)} metru.">
        <div class="size-row"><div class="size-label"><strong>${escapeHtml(copy(dino).displayName)}</strong><span>${metric} · asi ${numberLabel(data.valueM)} m</span></div><div class="size-track"><div class="size-bar animal-bar" style="width:${data.animalPercent}%"></div></div></div>
        <div class="size-row"><div class="size-label"><strong><svg class="human-icon" viewBox="0 0 24 40" width="16" height="27" aria-hidden="true"><circle cx="12" cy="5" r="4"/><path d="M7 12h10l3 12h-4l-1-8v22h-4V25h-1v13H6V16l-2 8H0l4-12z"/></svg>Člověk</strong><span>Výška · ${numberLabel(data.humanHeight)} m</span></div><div class="size-track"><div class="size-bar human-bar" style="width:${data.humanPercent}%"></div></div></div>
        <figcaption>Vybraný rozměr odpovídá přibližně ${numberLabel(data.ratio)}násobku této výšky člověka. Nesrovnáváme hmotnost ani výšku zvířete.</figcaption>
      </figure>
      ${confidenceBadge(dino.comparison.confidence)}<p class="measurement-note">${escapeHtml(localized(dino.comparison.note))}</p>
    </div></details>`;
  }

  function renderRecognition(dino) {
    const traits = copy(dino).recognition;
    if (!traits?.length) return '';
    return `<section class="recognition" aria-labelledby="recognition-title"><span class="eyebrow">Všímej si detailů</span><h2 id="recognition-title">Podle čeho mě poznáš?</h2><ul>${traits.map(trait => `<li><p>${escapeHtml(localized(trait.text))}</p>${trait.confidence !== 'evidence' ? confidenceBadge(trait.confidence) : ''}</li>`).join('')}</ul>${readControls('recognition', 'Přečíst poznávací znaky')}</section>`;
  }

  function renderContemporaries(dino) {
    const context = copy(dino).contemporaries;
    if (!context?.ids?.length) return '';
    return `<section class="contemporaries" aria-labelledby="contemporaries-title"><h2 id="contemporaries-title">Ze stejného pravěkého prostředí</h2><p>${escapeHtml(localized(context.text))}</p>${confidenceBadge(context.confidence)}${readControls('contemporaries', 'Přečíst o prostředí')}<div class="neighbor-list">${context.ids.map(id => {
      const neighbor = byId.get(id);
      return `<a class="neighbor" href="#dinosaurus/${id}"><img src="${escapeHtml(neighbor.image.src)}" alt="" width="108" height="72" loading="lazy"><span>${escapeHtml(copy(neighbor).displayName)}<small>${escapeHtml(neighbor.scientificName)}</small></span><span aria-hidden="true">→</span></a>`;
    }).join('')}</div></section>`;
  }

  function renderDetail(dino) {
    const text = copy(dino);
    const facts = dino.facts.map(fact => `<div class="fact"><dt>${escapeHtml(localized(fact.label))}</dt><dd>${escapeHtml(localized(fact.value))}${fact.note ? `<small>${escapeHtml(localized(fact.note))}</small>` : ''}${confidenceBadge(fact.confidence)}</dd></div>`).join('');
    const sections = text.sections.map(section => `<details class="detail-section"><summary>${escapeHtml(section.title)}</summary><div class="section-text">${readControls(section.id, 'Přečíst tuto část')}${section.claims.map(claim => `<div class="claim">${confidenceBadge(claim.confidence)}<p>${escapeHtml(localized(claim.text))}</p></div>`).join('')}</div></details>`).join('');
    $('detail-view').innerHTML = `<a class="back-link" href="#atlas">← Zpět do atlasu</a>
      <div class="detail-title-row" id="detail-heading"><div><span class="eyebrow">${CATEGORY_LABELS[categoryOf(dino)]} · ${escapeHtml(text.groupLabel)}</span><div class="detail-name read-controls" data-read-controls="name"><h1 id="detail-title" tabindex="-1">${escapeHtml(text.displayName)}</h1><button class="button read-button name-read-button" type="button" data-read="name" aria-pressed="false" aria-label="Přečíst jméno zvířete" title="Přečíst jméno"><span aria-hidden="true">🔊</span></button><button class="button read-stop name-read-button" type="button" data-stop-read hidden aria-label="Zastavit čtení jména"><span aria-hidden="true">■</span></button><p class="read-status" data-read-status="name" role="status" aria-live="polite"></p></div><p class="scientific-name">${escapeHtml(dino.scientificName)}</p><p class="detail-age"><span class="period-tag">${PERIODS[dino.period]}</span>${escapeHtml(text.ageLabel)}</p></div>${favoriteButton(dino, 'detail-favorite')}</div>
      ${detailNavigation(dino)}
      <figure class="detail-figure"><div class="detail-image"><img data-image-viewer class="${atlasImageClass(dino)}" src="${escapeHtml(dino.image.src)}" alt="${escapeHtml(localized(dino.image.alt))}" width="1536" height="1024">${imageZoomButton()}</div><figcaption>${escapeHtml(localized(dino.image.note))}</figcaption></figure>
      <p class="lead">${escapeHtml(text.summary)}</p>
      <div class="narration">${readControls('summary', 'Přečíst popis')}</div>
      ${renderRecognition(dino)}
      <div class="evidence-key" aria-label="Jak číst míru jistoty">${['evidence', 'estimate', 'unknown'].map(confidenceBadge).join('')}</div>
      <section class="basic-facts" aria-labelledby="facts-title"><h2 id="facts-title">Základní údaje</h2>${readControls('facts', 'Přečíst základní údaje')}<dl class="fact-grid">${facts}</dl></section>
      <p class="taxonomy"><strong>Příbuzenské zařazení</strong>${dino.taxonomy.map(escapeHtml).join(' › ')}</p>
      ${renderComparison(dino)}${sections}${renderContemporaries(dino)}`;
  }

  function beginQuiz() {
    const questions = makeQuiz(categoryAnimals(dinosaurs, state.category));
    quiz = { questions, index: 0, firstTry: 0, answered: false, attempts: 0, hintRevealed: false, tried: new Set() };
    renderQuiz();
  }
  function renderQuiz() {
    if (!quiz) { beginQuiz(); return; }
    if (!quiz.questions.length) {
      $('quiz-content').innerHTML = '<p>Pro kvíz v této kategorii potřebujeme alespoň tři zvířata s obrázkem. Zkus přepnout na Vše.</p>';
      return;
    }
    if (quiz.index >= quiz.questions.length) {
      $('quiz-content').innerHTML = `<div class="quiz-finish"><span class="eyebrow">Výprava dokončena</span><h2>To bylo objevování!</h2><p class="score">Napoprvé poznáno: ${quiz.firstTry} z ${quiz.questions.length}.</p><p>Každý další pokus pomáhá poznat pravěká zvířata lépe.</p><div class="quiz-actions"><button class="button button-primary" id="quiz-restart" type="button">Hrát znovu</button><a class="button" href="#atlas">Prozkoumat atlas</a></div></div>`;
      return;
    }
    const question = quiz.questions[quiz.index];
    const dino = byId.get(question.answerId);
    $('quiz-content').innerHTML = `<p class="quiz-progress-label">Otázka ${quiz.index + 1} z ${quiz.questions.length} · Bez časového limitu</p><progress class="quiz-progress" max="${quiz.questions.length}" value="${quiz.index}" aria-label="Dokončené otázky"></progress>
      <div class="quiz-picture"><img data-image-viewer src="${escapeHtml(dino.image.src)}" width="1536" height="1024" alt="Pracovní rekonstrukce pravěkého zvířete. Vyber jeho jméno z možností pod obrázkem.">${imageZoomButton()}</div>
      <button id="quiz-hint" type="button" class="button button-quiet hint-button" aria-expanded="${quiz.hintRevealed}" aria-controls="quiz-hint-text">${quiz.hintRevealed ? 'Skrýt nápovědu' : 'Potřebuji nápovědu'}</button><p id="quiz-hint-text" class="hint-text" ${quiz.hintRevealed ? '' : 'hidden'}>${escapeHtml(copy(dino).quizHint)}</p>
      <div class="quiz-answers" role="group" aria-label="Vyber jméno zvířete">${question.optionIds.map((id, index) => `<button type="button" class="quiz-answer" data-answer="${id}"><span class="answer-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span><span class="answer-name">${escapeHtml(copy(byId.get(id)).displayName)}</span></button>`).join('')}</div>
      <div class="quiz-feedback" id="quiz-feedback" role="status" aria-live="polite" aria-atomic="true"></div>
      <div class="quiz-actions"><button id="quiz-next" class="button button-primary" type="button" hidden>${quiz.index === quiz.questions.length - 1 ? 'Dokončit kvíz' : 'Další otázka →'}</button></div>`;
    // Návrat z atlasu musí obnovit i rozehranou nebo již zodpovězenou otázku.
    document.querySelectorAll('[data-answer]').forEach(button => {
      if (quiz.tried.has(button.dataset.answer)) {
        button.classList.add(button.dataset.answer === question.answerId ? 'is-correct' : 'is-wrong');
        button.disabled = true;
      }
      if (quiz.answered) button.disabled = true;
    });
    if (quiz.answered) showCorrectAnswer(dino);
    else if (quiz.attempts > 0) $('quiz-feedback').textContent = `Ještě to není ono. Nápověda: ${copy(dino).quizHint}`;
  }
  function showCorrectAnswer(dino) {
    $('quiz-feedback').classList.add('is-success');
    const text = copy(dino);
    $('quiz-feedback').innerHTML = `<p><strong>Ano! Je to ${escapeHtml(text.displayName)}.</strong></p><p>${escapeHtml(text.quizExplanation ? localized(text.quizExplanation.text) : text.cardSummary)}</p><a class="quiz-detail-link" href="#dinosaurus/${dino.id}">Prohlédnout detail →</a>`;
    $('quiz-hint').hidden = true;
    $('quiz-hint-text').hidden = true;
    $('quiz-next').hidden = false;
  }
  function answerQuiz(id) {
    if (!quiz || quiz.answered || quiz.tried.has(id)) return;
    const question = quiz.questions[quiz.index];
    if (!question.optionIds.includes(id)) return;
    const dino = byId.get(question.answerId);
    quiz.attempts++;
    quiz.tried.add(id);
    const button = document.querySelector(`[data-answer="${id}"]`);
    if (id !== question.answerId) {
      button.classList.add('is-wrong');
      button.disabled = true;
      $('quiz-feedback').textContent = `Ještě to není ono. Nápověda: ${copy(dino).quizHint}`;
      document.querySelector('.quiz-answer:not(:disabled)')?.focus({ preventScroll: true });
      return;
    }
    quiz.answered = true;
    if (quiz.attempts === 1) quiz.firstTry++;
    button.classList.add('is-correct');
    document.querySelectorAll('[data-answer]').forEach(answer => { answer.disabled = true; });
    showCorrectAnswer(dino);
    const next = $('quiz-next');
    next.hidden = false;
    next.focus({ preventScroll: true });
  }

  function route() {
    if (!database) return;
    hidePicture(false);
    const hash = (!location.hash || location.hash === '#main') ? '#atlas' : location.hash;
    if (hash !== currentRoute) stopNarration(false);
    if (currentRoute === '#atlas' && hash !== '#atlas') galleryScroll = window.scrollY;
    ['atlas-view', 'detail-view', 'quiz-view', 'not-found'].forEach(id => { $(id).hidden = true; });
    const detailMatch = hash.match(/^#dinosaurus\/([a-z0-9-]+)$/);
    let nav = 'atlas';
    if (hash === '#atlas' || hash === '') {
      $('atlas-view').hidden = false;
      renderGallery();
      document.title = 'Dino Atlas — Objevuj pravěký svět';
      requestAnimationFrame(() => {
        window.scrollTo(0, galleryScroll);
        if (lastOpenedId) $(`card-${lastOpenedId}`)?.focus({ preventScroll: true });
      });
    } else if (hash === '#kviz') {
      nav = 'kviz';
      $('quiz-view').hidden = false;
      if (!quiz) beginQuiz(); else renderQuiz();
      document.title = 'Obrázkový kvíz — Dino Atlas';
      window.scrollTo(0, 0);
      $('main').focus({ preventScroll: true });
    } else if (detailMatch && byId.has(detailMatch[1])) {
      const dino = byId.get(detailMatch[1]);
      chooseDetailSequence(dino);
      lastOpenedId = dino.id;
      $('detail-view').hidden = false;
      renderDetail(dino);
      document.title = `${copy(dino).displayName} — Dino Atlas`;
      $('detail-title').focus({ preventScroll: true });
      requestAnimationFrame(() => {
        if (lastOpenedId === dino.id && !$('detail-view').hidden) $('detail-heading').scrollIntoView({ block: 'start' });
      });
    } else {
      $('not-found').hidden = false;
      document.title = 'Heslo nenalezeno — Dino Atlas';
      window.scrollTo(0, 0);
    }
    document.querySelectorAll('[data-nav]').forEach(link => {
      if (link.dataset.nav === nav) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
    currentRoute = hash;
    detailSwipe = null;
    scheduleScrollControls();
  }

  // Keep vertical scrolling and pinch zoom native to the WebView.
  const swipeIgnored = 'a, button, input, select, textarea, summary, [contenteditable], [role="button"]';
  $('detail-view').addEventListener('pointerdown', event => {
    detailSwipe = null;
    if (!event.isPrimary || event.pointerType !== 'touch' || event.target.closest(swipeIgnored)) return;
    if (event.clientX < 24 || event.clientX > document.documentElement.clientWidth - 24 || window.getSelection()?.toString()) return;
    detailSwipe = { id: event.pointerId, x: event.clientX, y: event.clientY, started: performance.now(), route: currentRoute };
  }, { passive: true });
  $('detail-view').addEventListener('pointermove', event => {
    if (!detailSwipe || event.pointerId !== detailSwipe.id) return;
    const dx = Math.abs(event.clientX - detailSwipe.x);
    const dy = Math.abs(event.clientY - detailSwipe.y);
    if (dy > 20 && dy > dx) detailSwipe = null;
  }, { passive: true });
  $('detail-view').addEventListener('pointercancel', () => { detailSwipe = null; });
  $('detail-view').addEventListener('pointerup', event => {
    const swipe = detailSwipe;
    detailSwipe = null;
    if (!swipe || event.pointerId !== swipe.id || swipe.route !== currentRoute || window.getSelection()?.toString()) return;
    const dx = event.clientX - swipe.x;
    const dy = event.clientY - swipe.y;
    const threshold = Math.min(100, Math.max(60, document.documentElement.clientWidth * .18));
    if (performance.now() - swipe.started > 1000 || Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.6) return;
    if (stepDetail(dx < 0 ? 1 : -1)) {
      suppressDetailClickUntil = performance.now() + 400;
      if (event.cancelable) event.preventDefault();
    }
  });
  $('detail-view').addEventListener('click', event => {
    if (performance.now() < suppressDetailClickUntil) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
  $('scroll-controls').addEventListener('click', event => {
    const button = event.target.closest('[data-scroll]');
    if (!button || button.disabled) return;
    const top = button.dataset.scroll === 'up' ? 0 : document.documentElement.scrollHeight;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    window.scrollTo({ top, behavior });
  });
  window.addEventListener('scroll', scheduleScrollControls, { passive: true });
  window.addEventListener('resize', scheduleScrollControls);
  document.addEventListener('focusin', scheduleScrollControls);
  document.addEventListener('focusout', scheduleScrollControls);
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(scheduleScrollControls).observe(document.body);

  $('category-filters').addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button || button.dataset.category === state.category) return;
    state.category = button.dataset.category;
    saveStorage('dinoatlas-category', state.category);
    syncCategory();
    quiz = null;
    galleryScroll = 0;
    if (currentRoute === '#kviz') beginQuiz();
    else if (currentRoute === '#atlas') renderGallery();
    else location.hash = 'atlas';
  });
  $('search').addEventListener('input', event => { state.query = event.target.value; renderGallery(); });
  $('diet-filter').addEventListener('change', event => { state.diet = event.target.value; renderGallery(); });
  $('period-filters').addEventListener('click', event => {
    const button = event.target.closest('[data-period]');
    if (!button) return;
    state.period = button.dataset.period;
    document.querySelectorAll('[data-period]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderGallery();
  });
  $('favorites-filter').addEventListener('click', () => { state.favoritesOnly = !state.favoritesOnly; renderGallery(); });
  $('clear-filters').addEventListener('click', () => {
    Object.assign(state, { query: '', period: 'all', diet: 'all', favoritesOnly: false });
    $('search').value = '';
    $('diet-filter').value = 'all';
    document.querySelectorAll('[data-period]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.period === 'all')));
    renderGallery();
  });
  $('random-button').addEventListener('click', () => {
    const visible = filteredDinosaurs(dinosaurs, state);
    if (visible.length) location.hash = `dinosaurus/${visible[Math.floor(Math.random() * visible.length)].id}`;
  });
  document.addEventListener('click', event => {
    const image = event.target.closest('[data-image-viewer]');
    if (image) { openPicture(image); return; }
    const step = event.target.closest('[data-detail-step]');
    if (step && !step.disabled) stepDetail(Number(step.dataset.detailStep));
    const height = event.target.closest('[data-human]');
    if (height) {
      const next = Number(height.dataset.human);
      if ([1.1, 1.8].includes(next)) {
        if (readTarget === 'comparison') stopNarration(false);
        comparisonHeight = next;
        const comparison = document.querySelector('.size-section');
        comparison.outerHTML = renderComparison(byId.get(lastOpenedId));
        document.querySelector('.size-section').open = true;
        document.querySelector(`[data-human="${next}"]`)?.focus({ preventScroll: true });
      }
    }
    if (event.target.closest('[data-stop-read]')) stopNarration();
    const read = event.target.closest('[data-read]');
    if (read) readDetail(read.dataset.read);
    const favorite = event.target.closest('[data-favorite]');
    if (favorite) {
      const id = favorite.dataset.favorite;
      if (state.favorites.has(id)) state.favorites.delete(id); else state.favorites.add(id);
      saveStorage('dinoatlas-favorites', JSON.stringify([...state.favorites]));
      if (currentRoute === '#atlas' && state.favoritesOnly) renderGallery(); else updateFavoriteButtons();
    }
    const answer = event.target.closest('[data-answer]');
    if (answer) answerQuiz(answer.dataset.answer);
    if (event.target.closest('#quiz-hint') && quiz && !quiz.answered) {
      quiz.hintRevealed = !quiz.hintRevealed;
      $('quiz-hint').setAttribute('aria-expanded', String(quiz.hintRevealed));
      $('quiz-hint').textContent = quiz.hintRevealed ? 'Skrýt nápovědu' : 'Potřebuji nápovědu';
      $('quiz-hint-text').hidden = !quiz.hintRevealed;
    }
    if (event.target.closest('#quiz-next') && quiz?.answered) {
      quiz.index++;
      quiz.answered = false;
      quiz.attempts = 0;
      quiz.hintRevealed = false;
      quiz.tried.clear();
      renderQuiz();
      $('quiz-title').scrollIntoView({ block: 'start' });
      $('quiz-content').querySelector('button')?.focus({ preventScroll: true });
    }
    if (event.target.closest('#quiz-restart')) {
      beginQuiz();
      $('quiz-title').scrollIntoView({ block: 'start' });
    }
  });
  window.addEventListener('hashchange', route);
  window.addEventListener('dinoatlas-speech', event => {
    const detail = event.detail;
    if (detail?.requestId !== readRequest || !readRequest) return;
    if (['loading', 'reading', 'done', 'error', 'idle'].includes(detail.state)) setReadingStatus(detail.state, String(detail.message || ''));
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopNarration(false); });
  window.addEventListener('pagehide', () => stopNarration(false));
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  async function init() {
    try {
      const response = await fetch('./dinosaurs.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Databáze se nenačetla (${response.status}).`);
      database = await response.json();
      validateDatabase(database);
      dinosaurs = sortAnimals(database.dinosaurs);
      byId = new Map(dinosaurs.map(dino => [dino.id, dino]));
      let saved = [];
      try { saved = JSON.parse(readStorage('dinoatlas-favorites', '[]')); } catch (_) {}
      state.favorites = new Set((Array.isArray(saved) ? saved : []).filter(id => byId.has(id)));
      const savedCategory = readStorage('dinoatlas-category', 'all');
      state.category = Object.prototype.hasOwnProperty.call(CATEGORIES, savedCategory) ? savedCategory : 'all';
      syncCategory();
      $('load-state').hidden = true;
      route();
    } catch (error) {
      database = undefined;
      console.error('Dino Atlas:', error);
      $('load-state').hidden = false;
      $('load-state').setAttribute('role', 'alert');
      $('load-state').innerHTML = '<h1>Atlas se nepodařilo načíst.</h1><p>Obsah atlasu se nepodařilo načíst nebo zobrazit. Zkus to prosím znovu. Pokud potíže přetrvají, může být potřeba opravená verze aplikace.</p><button class="button button-primary" id="retry-load" type="button">Zkusit znovu</button>';
      $('retry-load').addEventListener('click', init, { once: true });
    }
  }
  init();
})();
