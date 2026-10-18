/* Dino Atlas — společné rozhraní aplikace. Obsah patří do dinosaurs.json. */
(() => {
  'use strict';

  const LANG = 'cs';
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
  const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  const compactName = value => normalize(value).replace(/ /g, '');

  function filteredDinosaurs(dinosaurs, state) {
    const query = normalize(state.query);
    return dinosaurs.filter(dino => {
      const words = [dino.scientificName, copy(dino).displayName, ...(dino.aliases || [])].map(normalize);
      const matchesName = !query || words.some(word => word.includes(query) || compactName(word).includes(compactName(query)));
      return matchesName && (state.period === 'all' || dino.period === state.period)
        && (state.diet === 'all' || dino.diet === state.diet)
        && (!state.favoritesOnly || state.favorites.has(dino.id));
    });
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
    return shuffle(usable, random).slice(0, count).map(answer => ({
      answerId: answer.id,
      optionIds: shuffle([answer, ...shuffle(usable.filter(dino => dino.id !== answer.id), random).slice(0, 2)], random).map(dino => dino.id)
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
      const text = copy(dino);
      if (!text.displayName || !text.summary || !text.ageLabel || !text.location || !text.quizHint) throw new Error('Heslu chybí text.');
      if (!/^images\/[a-z0-9-]+\.(png|webp|jpe?g)$/.test(dino.image?.src || '')) throw new Error('Neplatná cesta k obrázku.');
      if (!Array.isArray(dino.facts) || !Array.isArray(text.sections)) throw new Error('Heslu chybí fakta nebo sekce.');
      dino.facts.forEach(validateClaim);
      const sectionIds = new Set();
      text.sections.forEach(section => {
        if (!/^[a-z0-9-]+$/.test(section.id) || sectionIds.has(section.id) || !section.title || !Array.isArray(section.claims)) throw new Error('Neplatná sekce.');
        sectionIds.add(section.id);
        section.claims.forEach(validateClaim);
      });
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
    );
  }

  function narrationText(dino, sectionId = 'summary') {
    const text = copy(dino);
    if (sectionId === 'summary') {
      const age = text.ageLabel.replace(/mil\.\s*let/g, 'miliony let');
      return pronunciationText(`${text.displayName}. ${text.summary} ${PERIODS[dino.period]}. ${age}. ${text.location}.`);
    }
    const section = text.sections.find(item => item.id === sectionId);
    if (!section) return '';
    const qualifiers = { evidence: '', estimate: 'Vědecký odhad. ', unknown: 'Co zatím nevíme. ', pending: 'Údaj připravujeme. ' };
    return pronunciationText(`${text.displayName}. ${section.title}. ${section.claims.map(claim => qualifiers[claim.confidence] + localized(claim.text)).join(' ')}`);
  }

  // Stejné čisté funkce používá web i kontrola v Node; v prohlížeči se nic neexportuje.
  if (typeof module !== 'undefined' && module.exports) module.exports = { normalize, filteredDinosaurs, shuffle, makeQuiz, validateDatabase, escapeHtml, narrationText, pronunciationText };
  if (typeof document === 'undefined') return;

  const $ = id => document.getElementById(id);
  let database;
  let dinosaurs = [];
  let byId = new Map();
  let currentRoute = '';
  let galleryScroll = 0;
  let lastOpenedId = '';
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
  const state = { query: '', period: 'all', diet: 'all', favoritesOnly: false, favorites: new Set() };

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
    return `<button type="button" class="favorite-button ${extraClass}" data-favorite="${dino.id}" aria-pressed="${saved}" aria-label="${saved ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}: ${escapeHtml(copy(dino).displayName)}"><span aria-hidden="true">${saved ? '♥' : '♡'}</span></button>`;
  }
  function confidenceBadge(level) {
    const [symbol, label] = CONFIDENCE[level];
    return `<span class="confidence confidence-${level}"><span aria-hidden="true">${symbol}</span>${label}</span>`;
  }
  function readControls(target, label) {
    return `<div class="read-controls"><button class="button read-button" type="button" data-read="${target}"><span aria-hidden="true">🔊</span>${label}</button><button class="button read-stop" type="button" data-stop-read hidden><span aria-hidden="true">■</span>Zastavit</button></div>`;
  }
  function setReadingStatus(status, message) {
    reading = status === 'loading' || status === 'reading';
    if (status !== 'loading') clearTimeout(readTimer);
    document.querySelectorAll('[data-stop-read]').forEach(button => { button.hidden = !reading; });
    document.querySelectorAll('[data-read]').forEach(button => {
      button.disabled = reading && button.dataset.read === readTarget;
    });
    const output = $('read-status');
    if (output) output.textContent = message;
  }
  function stopNarration(announce = true) {
    readRequest = '';
    readTarget = '';
    clearTimeout(voiceTimer);
    clearTimeout(readTimer);
    if (voiceListener) window.speechSynthesis?.removeEventListener('voiceschanged', voiceListener);
    voiceListener = undefined;
    try { window.DinoSpeech?.stop(); } catch (_) {}
    try { window.speechSynthesis?.cancel(); } catch (_) {}
    setReadingStatus('idle', announce ? 'Čtení zastaveno.' : '');
  }
  function readDetail(target) {
    const dino = byId.get(lastOpenedId);
    if (!dino || !currentRoute.startsWith('#dinosaurus/')) return;
    const text = narrationText(dino, target);
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
      button.innerHTML = `<span aria-hidden="true">${saved ? '♥' : '♡'}</span>`;
    });
    $('favorites-count').textContent = state.favorites.size;
  }
  function renderGallery() {
    const visible = filteredDinosaurs(dinosaurs, state);
    $('gallery').innerHTML = visible.map((dino, index) => {
      const text = copy(dino);
      return `<article class="dino-card">
        <a class="card-link" id="card-${dino.id}" href="#dinosaurus/${dino.id}">
          <div class="card-picture"><img src="${escapeHtml(dino.image.src)}" alt="${escapeHtml(localized(dino.image.alt))}" width="1536" height="1024" ${index > 1 ? 'loading="lazy"' : ''} decoding="async"></div>
          <div class="card-body"><h3>${escapeHtml(text.displayName)}</h3><p class="scientific-name">${escapeHtml(dino.scientificName)}</p>
          <div class="card-meta"><span class="period-tag">${PERIODS[dino.period]}</span><span>${escapeHtml(text.ageLabel)}</span></div>
          <p class="card-location">${escapeHtml(text.location)}</p><p class="card-summary">${escapeHtml(text.cardSummary)}</p><span class="card-open">Prozkoumat →</span></div>
        </a>${favoriteButton(dino)}
      </article>`;
    }).join('');
    $('result-count').textContent = `${visible.length} z ${dinosaurs.length} dinosaurů`;
    $('empty-state').hidden = visible.length !== 0;
    $('random-button').disabled = visible.length === 0;
    $('favorites-filter').setAttribute('aria-pressed', String(state.favoritesOnly));
    updateFavoriteButtons();
  }

  function renderDetail(dino) {
    const text = copy(dino);
    const facts = dino.facts.map(fact => `<div class="fact"><dt>${escapeHtml(localized(fact.label))}</dt><dd>${escapeHtml(localized(fact.value))}${fact.note ? `<small>${escapeHtml(localized(fact.note))}</small>` : ''}${confidenceBadge(fact.confidence)}</dd></div>`).join('');
    const sections = text.sections.map(section => `<details class="detail-section"><summary>${escapeHtml(section.title)}</summary><div class="section-text">${section.claims.map(claim => `<div class="claim">${confidenceBadge(claim.confidence)}<p>${escapeHtml(localized(claim.text))}</p></div>`).join('')}${readControls(section.id, 'Přečíst tuto část')}</div></details>`).join('');
    $('detail-view').innerHTML = `<a class="back-link" href="#atlas">← Zpět do atlasu</a>
      <figure class="detail-figure"><div class="detail-image"><img src="${escapeHtml(dino.image.src)}" alt="${escapeHtml(localized(dino.image.alt))}" width="1536" height="1024"></div><figcaption>${escapeHtml(localized(dino.image.note))}</figcaption></figure>
      <div class="detail-title-row"><div><span class="eyebrow">${PERIODS[dino.period]} · ${escapeHtml(text.groupLabel)}</span><h1>${escapeHtml(text.displayName)}</h1><p class="scientific-name">${escapeHtml(dino.scientificName)}</p></div>${favoriteButton(dino, 'detail-favorite')}</div>
      <p class="lead">${escapeHtml(text.summary)}</p>
      <div class="narration">${readControls('summary', 'Přečíst shrnutí')}<p class="read-status" id="read-status" role="status" aria-live="polite"></p></div>
      <div class="evidence-key" aria-label="Jak číst míru jistoty">${['evidence', 'estimate', 'unknown'].map(confidenceBadge).join('')}</div>
      <dl class="fact-grid">${facts}</dl>
      <p class="taxonomy"><strong>Příbuzenské zařazení</strong>${dino.taxonomy.map(escapeHtml).join(' › ')}</p>
      ${sections}`;
  }

  function beginQuiz() {
    const questions = makeQuiz(dinosaurs);
    quiz = { questions, index: 0, firstTry: 0, answered: false, attempts: 0, tried: new Set() };
    renderQuiz();
  }
  function renderQuiz() {
    if (!quiz) { beginQuiz(); return; }
    if (!quiz.questions.length) {
      $('quiz-content').innerHTML = '<p>Pro kvíz potřebujeme alespoň tři dinosaury s obrázkem.</p>';
      return;
    }
    if (quiz.index >= quiz.questions.length) {
      $('quiz-content').innerHTML = `<div class="quiz-finish"><span class="eyebrow">Výprava dokončena</span><h2>To bylo objevování!</h2><p class="score">Napoprvé poznáno: ${quiz.firstTry} z ${quiz.questions.length}.</p><p>Každý další pokus pomáhá poznat dinosaury lépe.</p><div class="quiz-actions"><button class="button button-primary" id="quiz-restart" type="button">Hrát znovu</button><a class="button" href="#atlas">Prozkoumat atlas</a></div></div>`;
      return;
    }
    const question = quiz.questions[quiz.index];
    const dino = byId.get(question.answerId);
    $('quiz-content').innerHTML = `<p class="quiz-progress-label">Otázka ${quiz.index + 1} z ${quiz.questions.length} · Bez časového limitu</p><progress class="quiz-progress" max="${quiz.questions.length}" value="${quiz.index}" aria-label="Dokončené otázky"></progress>
      <div class="quiz-picture"><img src="${escapeHtml(dino.image.src)}" width="1536" height="1024" alt="Pracovní rekonstrukce dinosaura. Vyber jeho jméno z možností pod obrázkem."></div>
      <div class="quiz-answers" role="group" aria-label="Vyber jméno dinosaura">${question.optionIds.map((id, index) => `<button type="button" class="quiz-answer" data-answer="${id}"><span class="answer-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span>${escapeHtml(copy(byId.get(id)).displayName)}</button>`).join('')}</div>
      <div class="quiz-feedback" id="quiz-feedback" role="status" aria-live="polite" aria-atomic="true"></div>
      <div class="quiz-actions"><button id="quiz-next" class="button button-primary" type="button" hidden>${quiz.index === quiz.questions.length - 1 ? 'Dokončit kvíz' : 'Další dinosaurus →'}</button></div>`;
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
    $('quiz-feedback').innerHTML = `<p><strong>Ano! Je to ${escapeHtml(copy(dino).displayName)}.</strong> ${escapeHtml(copy(dino).cardSummary)}</p>`;
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
      lastOpenedId = dino.id;
      $('detail-view').hidden = false;
      renderDetail(dino);
      document.title = `${copy(dino).displayName} — Dino Atlas`;
      window.scrollTo(0, 0);
      $('main').focus({ preventScroll: true });
    } else {
      $('not-found').hidden = false;
      document.title = 'Heslo nenalezeno — Dino Atlas';
      window.scrollTo(0, 0);
    }
    document.querySelectorAll('[data-nav]').forEach(link => {
      if (link.dataset.nav === nav) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
    currentRoute = hash;
  }

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
    if (event.target.closest('#quiz-next') && quiz?.answered) {
      quiz.index++;
      quiz.answered = false;
      quiz.attempts = 0;
      quiz.tried.clear();
      renderQuiz();
      $('quiz-content').querySelector('button')?.focus({ preventScroll: true });
    }
    if (event.target.closest('#quiz-restart')) beginQuiz();
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
      dinosaurs = database.dinosaurs;
      byId = new Map(dinosaurs.map(dino => [dino.id, dino]));
      let saved = [];
      try { saved = JSON.parse(readStorage('dinoatlas-favorites', '[]')); } catch (_) {}
      state.favorites = new Set((Array.isArray(saved) ? saved : []).filter(id => byId.has(id)));
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
