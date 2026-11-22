import { days, packing, guide, links } from './data.js';

const shapes = {
  calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18"/><path d="M8 15h2m4 0h2"/>',
  check:'<rect x="3" y="3" width="18" height="18" rx="5"/><path d="m8 12 3 3 5-6"/>',
  note:'<path d="M7 3h10a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z M8 9h8m-8 4h8m-8 4h4"/>',
  link:'<path d="m10 13 4-4m-7 6-1 1a3.54 3.54 0 1 0 5 5l3-3a3.54 3.54 0 0 0 0-5m-4-2a3.54 3.54 0 0 1 0-5l3-3a3.54 3.54 0 1 1 5 5l-1 1" transform="translate(1 0)"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  plane:'<path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/>',
  leaf:'<path d="M20 4c-9-1-16 3-15 10a5 5 0 0 0 5 5c7 1 11-6 10-15ZM4 21l10-10"/>',
  mountain:'<path d="m2 19 7-12 4 6 3-4 6 10H2Zm5-8 2 2 2-2"/>',
  building:'<path d="M3 20h18M5 20v-7h14v7M3 13l9-6 9 6M9 20v-4h6v4M7 8l5-4 5 4"/>',
  camera:'<path d="M8 6 9 4h6l1 2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3Z"/><circle cx="12" cy="13" r="3"/>',
  heart:'<path d="M20 5a5 5 0 0 0-7 0l-1 1-1-1a5 5 0 1 0-7 7l8 8 8-8a5 5 0 0 0 0-7Z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  wallet:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M21 10h-5a2 2 0 0 0 0 4h5"/>',
  bag:'<rect x="4" y="6" width="16" height="14" rx="3"/><path d="M9 6V4h6v2M8 9v8m8-8v8"/>',
  bolt:'<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/>',
  globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  shield:'<path d="m12 3 8 3v6c0 5-5 8-8 9-3-1-8-4-8-9V6l8-3Z"/><path d="m9 12 2 2 4-4"/>',
  train:'<rect x="5" y="3" width="14" height="15" rx="4"/><path d="M5 11h14M8 18l-2 3m10-3 2 3M9 14h.01m6 0h.01"/>',
  phone:'<path d="M6 3h3l2 5-3 2a13 13 0 0 0 6 6l2-3 5 2v3a3 3 0 0 1-3 3A16 16 0 0 1 3 6a3 3 0 0 1 3-3Z"/>',
  pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  chevron:'<path d="m6 9 6 6 6-6"/>',
  external:'<path d="M13 5h6v6m0-6-9 9m8 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4"/>'
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name]}</svg>`;
}

const tabs = [
  ['itinerary','calendar','Itinerary'], ['checklist','check','Checklist'],
  ['catatan','note','Catatan'], ['tautan','link','Tautan'], ['info','info','Info Korea']
];
const main = document.querySelector('main');
const nav = document.querySelector('nav');
const keys = { checks:'k-trip-2026-checks', note:'k-trip-2026-note' };

function read(key) {
  try { return localStorage.getItem(key); }
  catch { return null; }
}

function save(key, value) {
  try { localStorage.setItem(key, value); return true; }
  catch { return false; }
}

let checked = {};
try { checked = JSON.parse(read(keys.checks)) ?? {}; } catch {}
let note = read(keys.note) ?? '';
let savedNote = note;
const collapse = new Set();

const heading = (symbol, title, description) => `<header class="page-heading"><span class="tile pink">${icon(symbol)}</span><h1>${title}</h1><p>${description}</p></header>`;

function itinerary() {
  return `<section class="hero" aria-labelledby="trip-title">
    <div class="hero-copy"><span class="hero-tag">✿ &nbsp; 7 hari · 5 malam</span>
    <h1 id="trip-title">Korea<br>Autumn <em>Escape</em></h1>
    <p>${icon('calendar')} 29 Nov – 5 Des 2026</p></div>
  </section>
  <div class="route-strip">${icon('pin')} <span>Incheon <b>·</b> Nami Island <b>·</b> Mt. Sorak <b>·</b> Seoul</span></div>
  <section aria-labelledby="itinerary-title">
    <div class="section-title"><div><h2 id="itinerary-title">Rencana perjalanan</h2><p>Ketuk hari untuk melihat detailnya.</p></div><span class="tile peach">${icon('calendar')}</span></div>
    <div class="day-jump" aria-label="Lompat ke hari">${days.map((day,i) => `<button type="button" data-jump="${i}"><span>${day.weekday}</span><strong>${day.date}</strong></button>`).join('')}</div>
    <div class="day-list">${days.map((day,i) => `<details class="card day" id="day-${i}" data-day="${i}" ${collapse.has(i) || (!collapse.has('initial') && i === 0) ? 'open' : ''}>
      <summary><span class="tile ${['peach','sage','lilac'][i%3]}">${icon(day.icon)}</span><span class="row-copy"><small>HARI ${String(i+1).padStart(2,'0')} · ${day.date}</small><strong>${day.title}</strong><span>${day.subtitle}</span></span><span class="arrow">${icon('chevron')}</span></summary>
      <div class="detail-body">
        ${day.flight ? `<div class="flight">${icon('plane')}<div><strong>${day.flight[0]}</strong><span>${day.flight[1]}</span></div></div>` : ''}
        <ol class="stops">${day.stops.map(([title,desc]) => `<li><strong>${title}</strong><p>${desc}</p></li>`).join('')}</ol>
        ${day.meal ? '<p class="meal">Termasuk makan pagi (MP)</p>' : ''}
        ${day.details ? `<dl class="pending">${day.details.map(label => `<div><dt>${label}</dt><dd aria-label="Belum tersedia">—</dd></div>`).join('')}</dl>` : ''}
      </div>
    </details>`).join('')}</div>
  </section>`;
}

const allItems = packing.flatMap(([, items]) => items);
function checklist() {
  const count = allItems.filter(([id]) => checked[id]).length;
  return `${heading('check','Checklist','Centang persiapanmu sebelum berangkat. Progres tersimpan di browser ini.')}
  <div class="card progress-card"><div><strong>Persiapan trip</strong><span id="progress-label">${count} / ${allItems.length}</span></div><progress aria-label="Progres checklist" value="${count}" max="${allItems.length}"></progress><small id="check-status" role="status"></small></div>
  ${packing.map(([group,items]) => `<section class="card check-group"><h2>${group}</h2>${items.map(([id,label]) => `<label class="check-row"><input type="checkbox" data-item="${id}" ${checked[id] ? 'checked' : ''}><span>${label}</span></label>`).join('')}</section>`).join('')}`;
}

function notes() {
  return `${heading('note','Catatan','Simpan ide hari bebas, tempat makan, atau pengingat pribadi di browser ini.')}
  <form id="note-form" class="card note-card"><label for="note-text">Catatan trip</label><textarea id="note-text" rows="10" placeholder="Tulis catatanmu…"></textarea><div class="note-actions"><button type="submit" class="primary">Simpan catatan</button><span role="status" id="note-status"></span></div></form>`;
}

function usefulLinks() {
  return `${heading('link','Tautan berguna','Aplikasi, situs resmi, dan akun yang bisa kamu buka selama trip.')}
  ${links.map(([group,items]) => `<section class="link-group"><h2>${group}</h2>${items.map(([title,desc,url,symbol]) => `<a class="card resource" href="${url}" rel="noopener noreferrer" target="_blank" aria-label="${title} (buka tab baru)"><span class="tile sage">${icon(symbol)}</span><span class="row-copy"><strong>${title}</strong><span>${desc}</span></span><span class="arrow">${icon('external')}</span></a>`).join('')}</section>`).join('')}`;
}

function koreaInfo() {
  return `${heading('info','Info Korea','Panduan singkat untuk persiapan dan hari-hari pertamamu di Korea.')}
  <div class="fact-grid"><div class="card"><span>Perkiraan suhu</span><strong>−2–12°C</strong></div><div class="card"><span>Zona waktu</span><strong>WIB +2 jam</strong></div><div class="card"><span>Mata uang</span><strong>Won · KRW</strong></div></div>
  <div class="guide-list">${guide.map(([symbol,title,desc],i) => `<details class="card guide"><summary><span class="tile ${['peach','sage','lilac'][i%3]}">${icon(symbol)}</span><strong>${title}</strong><span class="arrow">${icon('chevron')}</span></summary><p>${desc}</p></details>`).join('')}</div>
  <section class="card contact"><h2>Kontak trip</h2><dl class="pending"><div><dt>Tour leader</dt><dd aria-label="Belum tersedia">—</dd></div><div><dt>Grup WhatsApp</dt><dd aria-label="Belum tersedia">—</dd></div></dl></section>`;
}

const pages = { itinerary, checklist, catatan:notes, tautan:usefulLinks, info:koreaInfo };
let currentPage;
function render() {
  const hash = location.hash.slice(1);
  if (hash === 'content') return;
  const page = Object.hasOwn(pages,hash) ? hash : 'itinerary';
  if (page === currentPage) return;
  const moved = Boolean(currentPage);
  currentPage = page;
  main.innerHTML = pages[page]();
  nav.innerHTML = `<div class="nav-inner">${tabs.map(([id,symbol,label]) => `<a href="#${id}" ${page === id ? 'aria-current="page"' : ''}><span>${icon(symbol)}</span>${label}</a>`).join('')}</div>`;
  const editor = document.querySelector('textarea');
  if (editor) {
    editor.value = note;
    if (note !== savedNote) document.querySelector('#note-status').textContent = 'Perubahan belum disimpan.';
  }
  window.scrollTo(0,0);
  if (moved) main.focus({preventScroll:true});
}

main.addEventListener('click', event => {
  const button = event.target.closest('[data-jump]');
  if (!button) return;
  const day = document.getElementById(`day-${button.dataset.jump}`);
  day.open = true;
  day.querySelector('summary').focus({preventScroll:true});
  day.scrollIntoView({block:'start'});
});

main.addEventListener('toggle', event => {
  const day = event.target;
  if (!day.matches('[data-day]')) return;
  collapse.add('initial');
  if (day.open) collapse.add(Number(day.dataset.day));
  else collapse.delete(Number(day.dataset.day));
}, true);

main.addEventListener('change', event => {
  const item = event.target.dataset.item;
  if (!item) return;
  checked[item] = event.target.checked;
  const count = allItems.filter(([id]) => checked[id]).length;
  document.querySelector('progress').value = count;
  document.querySelector('#progress-label').textContent = `${count} / ${allItems.length}`;
  document.querySelector('#check-status').textContent = save(keys.checks, JSON.stringify(checked)) ? '' : 'Progres hanya tersimpan sementara karena penyimpanan browser tidak tersedia.';
});

main.addEventListener('input', event => {
  if (event.target.id !== 'note-text') return;
  note = event.target.value;
  document.querySelector('#note-status').textContent = note === savedNote ? '' : 'Perubahan belum disimpan.';
});

main.addEventListener('submit', event => {
  if (event.target.id !== 'note-form') return;
  event.preventDefault();
  const success = save(keys.note,note);
  if (success) savedNote = note;
  document.querySelector('#note-status').textContent = success ? 'Catatan tersimpan.' : 'Catatan gagal disimpan di browser ini.';
});

window.addEventListener('hashchange',render);
render();
