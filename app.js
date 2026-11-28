import { updateWeather } from './weather.js?v=weather-1';
import { days, packing, guide, links, meeting, hotels, tourLeader } from './data.js?v=qris-link-1';

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
const keys = { checks:'k-trip-2026-checks', note:'k-trip-2026-note', notes:'k-trip-2026-notes', items:'k-trip-2026-items' };

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
function readArray(key, fallback = []) {
  try {
    const value = JSON.parse(read(key));
    return Array.isArray(value) ? value : fallback;
  } catch { return fallback; }
}

const legacyNote = read(keys.note);
let entries = readArray(keys.notes, legacyNote ? [
  { id:'legacy', title:'Catatan trip', category:'', tags:[], body:legacyNote }
] : []);
let personalItems = readArray(keys.items).filter(item => !item.removed && item.id.startsWith('personal-'));
let draft = null;
let noteQuery = '';
let noteCategory = '';

const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
})[char]);
const newId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const collapse = new Set();

const heading = (symbol, title, description) => `<header class="page-heading"><span class="tile pink">${icon(symbol)}</span><h1>${title}</h1><p>${description}</p></header>`;

function telephone(phone) {
  return `<a class="contact-link" href="tel:${phone.replace(/[^+0-9]/g,'')}">${phone}</a>`;
}

const whatsappGroupLink = '<a href="https://chat.whatsapp.com/DATdhopMHd82jYYWUJLSTl?s=cl&amp;p=a&amp;iam=2" target="_blank" rel="noopener noreferrer">Grup WA</a>';

function tourLeaderActions(includeGroup = false) {
  const digits = tourLeader.phone.replace(/\D/g,'');
  return `<div class="contact-actions">
    <a href="tel:+${digits}">${icon('phone')} Telepon</a>
    <a href="https://wa.me/${digits}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    ${includeGroup ? whatsappGroupLink : ''}
  </div>`;
}

function hotelDetails(hotel) {
  const mapQuery = encodeURIComponent(`${hotel.name}, ${hotel.address}`);
  return `<div class="hotel-detail"><strong>${hotel.name}</strong><p>${hotel.address}</p>${telephone(hotel.phone)}
    <div class="contact-actions">
      <a href="https://www.google.com/maps/search/?api=1&amp;query=${mapQuery}" target="_blank" rel="noopener noreferrer" aria-label="Buka di Peta: ${hotel.name}">${icon('pin')} Buka di Peta</a>
      <a href="nmap://search?query=${mapQuery}&amp;appname=ktrip.kuro.my.id" aria-label="Buka Naver Map app: ${hotel.name}">Naver Map app</a>
      <a href="https://map.naver.com/p/search/${mapQuery}" target="_blank" rel="noopener noreferrer" aria-label="Buka Naver Map web: ${hotel.name}">Naver Map web ↗</a>
    </div>
  </div>`;
}

function meetingCard() {
  return `<section class="card meeting-card" aria-labelledby="meeting-title">
    <span class="tile peach">${icon('pin')}</span>
    <div><h2 id="meeting-title">Titik kumpul keberangkatan</h2>
    <p><strong>${meeting.date} · ${meeting.time}</strong></p>
    <p>${meeting.airport}<br>${meeting.spot}</p>
    <p>Tour leader · ${tourLeader.name} · ${tourLeader.phone}</p></div>
    ${tourLeaderActions(true)}
  </section>`;
}

function itinerary() {
  return `<section class="hero" aria-labelledby="trip-title">
    <div class="hero-copy"><span class="hero-tag">✿ &nbsp; 7 hari · 5 malam</span>
    <h1 id="trip-title">Korea<br>Autumn <em>Escape</em></h1>
    <p>${icon('calendar')} 29 Nov – 5 Des 2026</p></div>
  </section>
  <div class="route-strip">${icon('pin')} <span>Incheon <b>·</b> Nami Island <b>·</b> Mt. Sorak <b>·</b> Seoul</span></div>
  ${meetingCard()}
  <section aria-labelledby="itinerary-title">
    <div class="section-title"><div><h2 id="itinerary-title">Rencana perjalanan</h2><p>Ketuk hari untuk melihat detailnya. Durasi perjalanan darat dan feri adalah perkiraan kasar. Macet, antrean, dan pemberhentian bisa menambah waktu.</p></div><span class="tile peach">${icon('calendar')}</span></div>
    <div class="day-jump" aria-label="Lompat ke hari">${days.map((day,i) => `<button type="button" data-jump="${i}"><span class="day-number">Hari ${i+1}</span><span>${day.weekday}</span><strong>${day.date}</strong></button>`).join('')}</div>
    <div class="day-list">${days.map((day,i) => `<details class="card day" id="day-${i}" data-day="${i}" ${collapse.has(i) || (!collapse.has('initial') && i === 0) ? 'open' : ''}>
      <summary><span class="tile ${['peach','sage','lilac'][i%3]}">${icon(day.icon)}</span><span class="row-copy"><small>HARI ${String(i+1).padStart(2,'0')} · ${day.date}</small><strong>${day.title}</strong><span>${day.subtitle}</span></span><span class="arrow">${icon('chevron')}</span></summary>
      <div class="detail-body">
        <section class="day-weather" data-weather="${i}" aria-label="Prakiraan cuaca"><p>Memuat prakiraan cuaca…</p></section>
        ${day.flight ? `<div class="flight">${icon('plane')}<div><strong>${day.flight[0]}</strong><span>${day.flight[1]}</span><span>Durasi terjadwal · ${day.flight[2]}</span></div></div>` : ''}
        <ol class="stops">${day.stops.map(([title,desc,duration]) => `<li><strong>${title}</strong><p>${desc}</p>${duration ? `<p class="travel-time">${icon('clock')} <span>${duration}</span></p>` : ''}</li>`).join('')}</ol>
        ${day.hotel ? hotelDetails(hotels[day.hotel]) : ''}
        ${day.transport ? `<p class="meal">${day.transport}</p>` : ''}
        ${day.meal ? '<p class="meal">Termasuk makan pagi (MP)</p>' : ''}
        ${day.details ? `<dl class="pending">${day.details.map(label => `<div><dt>${label}</dt><dd aria-label="Belum tersedia">—</dd></div>`).join('')}</dl>` : ''}
      </div>
    </details>`).join('')}</div>
  </section>`;
}

function checklistGroups() {
  const personal = personalItems.map(({id,label}) => [id,label]);
  return personal.length ? [...packing,['Item tambahan pribadi',personal,true]] : packing;
}

function checklistRows(groups) {
  if (!groups.length) return '<p class="empty-state">Checklist kosong. Tambahkan item persiapanmu di atas.</p>';
  return groups.map(([group,items,personal]) => `<section class="card check-group"><h2>${group}</h2>${items.map(([id,label]) => `<div class="check-line">
    <label class="check-row"><input type="checkbox" data-item="${escape(id)}" ${checked[id] ? 'checked' : ''}><span>${escape(label)}</span></label>
    ${personal ? `<button class="quiet-button" type="button" data-remove-item="${escape(id)}" aria-label="Hapus ${escape(label)}">Hapus</button>` : ''}
  </div>`).join('')}</section>`).join('');
}

function updateProgress(groups) {
  const items = groups.flatMap(([,items]) => items);
  const count = items.filter(([id]) => checked[id]).length;
  const progress = main.querySelector('progress');
  progress.max = Math.max(1,items.length);
  progress.value = count;
  main.querySelector('#progress-label').textContent = `${count} / ${items.length}`;
}

function privacyNotice(title, description) {
  return `<aside class="privacy-notice" aria-label="Penyimpanan pribadi">
    <span class="tile pink">${icon('shield')}</span>
    <div><strong>${title}</strong><p>${description} Peserta lain yang membuka link yang sama di HP mereka tidak melihat perubahanmu. Kalau kamu buka dari HP atau aplikasi lain, datamu juga tidak ikut pindah.</p></div>
  </aside>`;
}

function checklist() {
  return `${heading('check','Checklist','Sesuaikan daftar persiapanmu.')}
  ${privacyNotice('Checklist ini untukmu', 'Yang kamu centang dan tambahkan tersimpan di tempat kamu membuka web ini. Kamu bisa menghapus barang yang kamu tambahkan sendiri.')}
  <div class="card progress-card"><div><strong>Persiapan trip</strong><span id="progress-label"></span></div><progress aria-label="Progres checklist" value="0" max="1"></progress><small id="check-status" role="status"></small></div>
  <form id="item-form" class="card entry-form"><label for="item-name">Item baru</label><div class="add-row"><input id="item-name" name="label" type="text" required maxlength="120" placeholder="Contoh: Sarung tangan"><button type="submit" class="primary">Tambah</button></div></form>
  <div id="check-groups"></div>`;
}

function refreshChecklist() {
  const groups = checklistGroups();
  main.querySelector('#check-groups').innerHTML = checklistRows(groups);
  updateProgress(groups);
}

const attachmentLimit = 10 * 1024 * 1024;
let savingNote = false;

async function attachmentStore(mode, operation) {
  const db = await new Promise((resolve, reject) => {
    const request = indexedDB.open('k-trip-2026-attachments', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('files');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction('files', mode);
      transaction.oncomplete = () => resolve(request?.result);
      transaction.onabort = () => reject(transaction.error);
      const request = operation(transaction.objectStore('files'));
    });
  } finally {
    db.close();
  }
}

async function deleteAttachments(files) {
  if (!files.length) return;
  try {
    await attachmentStore('readwrite', store => files.forEach(file => store.delete(file.id)));
  } catch {
    setNoteStatus('Lampiran gagal dibersihkan dari penyimpanan browser.');
  }
}

function setNoteStatus(message) {
  const status = main.querySelector('#note-status');
  if (status) status.textContent = message;
}

function attachmentList(files, editing = false) {
  if (!files.length) return '';
  return `<ul class="attachments">${files.map(file => `<li>${editing ?
    `<span>${escape(file.name)}</span><button type="button" class="quiet-button" data-detach="${escape(file.id)}" aria-label="Lepas ${escape(file.name)}">Lepas</button>` :
    `<button type="button" class="quiet-button" data-download="${escape(file.id)}" aria-label="Unduh ${escape(file.name)}">${icon('link')} ${escape(file.name)}</button>`
  }</li>`).join('')}</ul>`;
}

async function downloadAttachment(id) {
  const file = entries.flatMap(entry => entry.attachments ?? []).find(item => item.id === id);
  if (!file) return;
  try {
    const blob = await attachmentStore('readonly', store => store.get(id));
    if (!blob) throw new Error('Attachment missing');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  } catch {
    setNoteStatus('File tidak bisa dibuka dari penyimpanan browser ini.');
  }
}

function noteList() {
  const query = noteQuery.trim().toLocaleLowerCase('id');
  const matches = entries.filter(entry =>
    (!noteCategory || entry.category === noteCategory) &&
    [entry.title,entry.category,...entry.tags,entry.body].some(value => value.toLocaleLowerCase('id').includes(query))
  );
  if (!entries.length) return '<p class="empty-state">Belum ada catatan. Tambahkan catatan pertamamu.</p>';
  if (!matches.length) return '<p class="empty-state">Tidak ada catatan yang cocok.</p>';
  return matches.map(entry => `<article class="card saved-note">
    <h2>${escape(entry.title)}</h2>
    <div class="note-labels">${entry.category ? `<span>${escape(entry.category)}</span>` : ''}
    ${entry.tags.map(tag => `<span class="tag">#${escape(tag)}</span>`).join('')}</div>
    ${entry.body ? `<p>${escape(entry.body)}</p>` : ''}
    ${attachmentList(entry.attachments ?? [])}
    <div class="note-actions"><button class="quiet-button" type="button" data-edit-note="${escape(entry.id)}">Edit</button><button class="quiet-button" type="button" data-remove-note="${escape(entry.id)}">Hapus</button></div>
  </article>`).join('');
}

function renderNoteEditor(focus = false) {
  const editor = main.querySelector('#note-editor');
  editor.innerHTML = draft ? `<form id="note-form" class="card note-card entry-form">
    <h2>${draft.id ? 'Edit catatan' : 'Catatan baru'}</h2>
    <fieldset ${savingNote ? 'disabled' : ''}>
    <label for="note-title">Judul</label><input id="note-title" name="title" required maxlength="100" value="${escape(draft.title)}">
    <label for="note-category">Kategori</label><input id="note-category" name="category" list="note-categories" maxlength="45" value="${escape(draft.category)}" placeholder="Contoh: Kuliner">
    <label for="note-tags">Tag <small>(pisahkan dengan koma)</small></label><input id="note-tags" name="tags" maxlength="180" value="${escape(draft.tags)}" placeholder="Contoh: Seoul, hari 6">
    <label for="note-text">Isi catatan</label><textarea id="note-text" name="body" rows="5">${escape(draft.body)}</textarea>
    <label for="note-files">Lampiran <small>(maks. 10 MB per file)</small></label>
    <input id="note-files" type="file" multiple>
    <div id="draft-files">${attachmentList(draft.attachments,true)}</div>
    <div class="note-actions"><button type="submit" class="primary" ${savingNote ? 'disabled' : ''}>Simpan catatan</button><button type="button" class="quiet-button" data-cancel-note>Batal</button></div>
    </fieldset>
  </form>` : '<button type="button" class="primary add-note" data-add-note>+ Catatan baru</button>';
  if (focus) editor.querySelector('input,button').focus();
}

function refreshNotes() {
  const categories = [...new Set(entries.map(entry => entry.category).filter(Boolean))].sort((a,b) => a.localeCompare(b,'id'));
  if (!categories.includes(noteCategory)) noteCategory = '';
  const options = categories.map(category => `<option value="${escape(category)}">${escape(category)}</option>`).join('');
  main.querySelector('#note-categories').innerHTML = options;
  const filter = main.querySelector('#category-filter');
  filter.innerHTML = '<option value="">Semua kategori</option>' + options;
  filter.value = noteCategory;
  main.querySelector('#note-list').innerHTML = noteList();
}

function notes() {
  return `${heading('note','Catatan','Temukan catatan dengan mencari judul, isi, kategori, atau tag.')}
  ${privacyNotice('Catatan ini untukmu', 'Catatan dan lampiran tersimpan di tempat kamu membuka web ini.')}
  <div id="note-editor"></div><p id="note-status" class="action-status" role="status"></p>
  <div class="card entry-form filters"><div><label for="note-search">Cari catatan</label><input id="note-search" type="search" value="${escape(noteQuery)}" placeholder="Judul, isi, atau tag"></div>
  <div><label for="category-filter">Kategori</label><select id="category-filter"></select><datalist id="note-categories"></datalist></div></div>
  <div id="note-list" class="note-list"></div>`;
}

function usefulLinks() {
  return `${heading('link','Tautan berguna','Aplikasi, situs resmi, dan akun yang bisa kamu buka selama trip.')}
  ${links.map(([group,items]) => `<section class="link-group"><h2>${group}</h2>${items.map(([title,desc,url,symbol,stores]) => `<div class="card resource-card">
    <a class="resource" href="${url}" rel="noopener noreferrer" target="_blank" aria-label="${title} (buka tab baru)"><span class="tile sage">${icon(symbol)}</span><span class="row-copy"><strong>${title}</strong><span>${desc}</span></span><span class="arrow">${icon('external')}</span></a>
    ${stores ? `<div class="contact-actions store-actions"><a href="${stores.android}" target="_blank" rel="noopener noreferrer" aria-label="Instal ${title} di Android">Android · Google Play ↗</a><a href="${stores.iphone}" target="_blank" rel="noopener noreferrer" aria-label="Instal ${title} di iPhone">iPhone · App Store ↗</a></div>` : ''}
  </div>`).join('')}</section>`).join('')}`;
}

function paymentReferences() {
  return `<div class="payment-references">
    <div class="contact-actions"><a href="https://ezeelink.co.id/blog/qris-korea-selatan/" target="_blank" rel="noopener noreferrer">Baca artikel QRIS Korea · Ezeelink ↗</a></div>
    <p>Kenali nama layanan di kasir</p>
    <div class="payment-names"><span><strong>SeoulPay</strong><small>서울페이</small></span><span><strong>Jeju Pay</strong></span></div>
    <p>Gambar logo resmi belum tersedia di sini. Buka pencarian gambar untuk melihat contohnya, lalu cocokkan dengan tanda pembayaran dan konfirmasi ke kasir.</p>
    <div class="contact-actions">
      <a href="https://www.google.com/search?tbm=isch&amp;q=SeoulPay+서울페이+logo" target="_blank" rel="noopener noreferrer">Lihat contoh logo SeoulPay ↗</a>
      <a href="https://www.google.com/search?tbm=isch&amp;q=Jeju+Pay+payment+logo" target="_blank" rel="noopener noreferrer">Lihat contoh logo Jeju Pay ↗</a>
    </div>
  </div>`;
}

function wonTable() {
  const rupiahPerWon = 13.66;
  const amounts = [100, 500, 1000, 5000, 10000];
  const format = new Intl.NumberFormat('id-ID');
  return `<section class="card exchange-card" aria-labelledby="exchange-title">
    <h2 id="exchange-title">Perkiraan Won ke Rupiah</h2>
    <p>1 won ≈ Rp${format.format(rupiahPerWon)}. Acuan Pergi.com, 27 Oktober 2026. Kurs saat menukar uang bisa berbeda.</p>
    <table aria-labelledby="exchange-title">
      <thead><tr><th scope="col">Won (KRW)</th><th scope="col">Rupiah (IDR)</th></tr></thead>
      <tbody>${amounts.map(amount => `<tr><th scope="row">₩${format.format(amount)}</th><td>≈ Rp${format.format(Math.round(amount * rupiahPerWon))}</td></tr>`).join('')}</tbody>
    </table>
  </section>`;
}

function koreaInfo() {
  return `${heading('info','Info Korea','Panduan singkat untuk persiapan dan hari-hari pertamamu di Korea.')}
  <div class="fact-grid"><div class="card"><span>Perkiraan suhu</span><strong>−2–12°C</strong></div><div class="card"><span>Zona waktu</span><strong>WIB +2 jam</strong></div><div class="card"><span>Mata uang</span><strong>Won · KRW</strong></div></div>
  ${wonTable()}
  <div class="guide-list">${guide.map(([symbol,title,desc],i) => `<details class="card guide"><summary><span class="tile ${['peach','sage','lilac'][i%3]}">${icon(symbol)}</span><strong>${title}</strong><span class="arrow">${icon('chevron')}</span></summary>${Array.isArray(desc) ? `<ul class="guide-details">${desc.map(point => `<li>${point}</li>`).join('')}</ul>` : `<p>${desc}</p>`}${title === 'Pembayaran QRIS di Korea' ? paymentReferences() : ''}</details>`).join('')}</div>
  <section class="card contact"><h2>Hotel trip</h2>${Object.values(hotels).map(hotel => `<p class="hotel-dates">${hotel.dates}</p>${hotelDetails(hotel)}`).join('')}</section>
  <section class="card contact"><h2>Kontak trip</h2><dl class="pending"><div><dt>Tour leader</dt><dd>${tourLeader.name}<br>${tourLeader.phone}${tourLeaderActions()}</dd></div><div><dt>Grup WhatsApp</dt><dd class="contact-actions">${whatsappGroupLink}</dd></div></dl></section>`;
}

const pages = { itinerary, checklist, catatan:notes, tautan:usefulLinks, info:koreaInfo };
const viewCounter = document.querySelector('#view-counter');
let counterLoaded = false;
function updateViewCounter(page) {
  viewCounter.hidden = page !== 'itinerary' || !counterLoaded;
  if (page !== 'itinerary' || viewCounter.hasAttribute('src')) return;
  if (location.hostname !== 'ktrip.kuro.my.id') return;
  viewCounter.addEventListener('load', () => {
    counterLoaded = true;
    viewCounter.hidden = currentPage !== 'itinerary';
  }, {once:true});
  viewCounter.src = 'https://hits.sh/ktrip.kuro.my.id.svg?style=flat-square&label=%E2%80%8B&labelColor=9b3d63&color=9b3d63';
}

let currentPage;
function render() {
  const hash = location.hash.slice(1);
  if (hash === 'content') return;
  const page = Object.hasOwn(pages,hash) ? hash : 'itinerary';
  if (page === currentPage) return;
  const moved = Boolean(currentPage);
  currentPage = page;
  updateViewCounter(page);
  main.innerHTML = pages[page]();
  if (page === 'itinerary') void updateWeather();
  nav.innerHTML = `<div class="nav-inner">${tabs.map(([id,symbol,label]) => `<a href="#${id}" ${page === id ? 'aria-current="page"' : ''}><span>${icon(symbol)}</span>${label}</a>`).join('')}</div>`;
  if (page === 'checklist') refreshChecklist();
  if (page === 'catatan') {
    renderNoteEditor();
    refreshNotes();
  }
  window.scrollTo(0,0);
  if (moved) main.focus({preventScroll:true});
}

main.addEventListener('click', event => {
  const button = event.target.closest('[data-jump]');
  if (button) {
    const day = document.getElementById(`day-${button.dataset.jump}`);
    day.open = true;
    day.querySelector('summary').focus({preventScroll:true});
    day.scrollIntoView({block:'start'});
  }

  const removeItem = event.target.closest('[data-remove-item]');
  const itemId = removeItem?.dataset.removeItem;
  if (personalItems.some(item => item.id === itemId) &&
      window.confirm(`${removeItem.getAttribute('aria-label')} dari checklist?`)) {
    const next = personalItems.filter(item => item.id !== itemId);
    if (storeItems(next,'Item dihapus.')) main.querySelector('#item-name').focus();
  }

  const download = event.target.closest('[data-download]');
  if (download) void downloadAttachment(download.dataset.download);
  if (savingNote) return;

  const detach = event.target.closest('[data-detach]');
  if (detach) {
    draft.attachments = draft.attachments.filter(file => file.id !== detach.dataset.detach);
    main.querySelector('#draft-files').innerHTML = attachmentList(draft.attachments,true);
    main.querySelector('#note-files').focus();
  }

  const editNote = event.target.closest('[data-edit-note]');
  const addNote = event.target.closest('[data-add-note]');
  const cancelNote = event.target.closest('[data-cancel-note]');
  if (editNote || addNote || cancelNote) {
    if (draft && !cancelNote && !window.confirm('Ganti catatan yang sedang ditulis?')) return;
    const entry = entries.find(item => item.id === editNote?.dataset.editNote);
    draft = cancelNote ? null : entry ?
      {...entry,tags:entry.tags.join(', '),attachments:[...(entry.attachments ?? [])]} : {title:'',category:'',tags:'',body:'',attachments:[]};
    renderNoteEditor(true);
    main.querySelector('#note-status').textContent = '';
  }

  const removeNote = event.target.closest('[data-remove-note]');
  if (removeNote && window.confirm('Hapus catatan ini?')) {
    const {removeNote:id} = removeNote.dataset;
    const removed = entries.find(entry => entry.id === id);
    if (!storeNotes(entries.filter(entry => entry.id !== id),'Catatan dihapus.')) return;
    void deleteAttachments(removed?.attachments ?? []);
    if (draft?.id === id) {
      draft = null;
      renderNoteEditor();
    }
    main.querySelector('#note-search').focus();
  }
});

main.addEventListener('toggle', event => {
  const day = event.target;
  if (!day.matches('[data-day]')) return;
  collapse.add('initial');
  if (day.open) collapse.add(Number(day.dataset.day));
  else collapse.delete(Number(day.dataset.day));
}, true);

function storeItems(next, message) {
  const success = save(keys.items, JSON.stringify(next));
  if (success) {
    personalItems = next;
    refreshChecklist();
  }
  main.querySelector('#check-status').textContent = success ? message : 'Perubahan gagal disimpan di browser ini.';
  return success;
}

function storeNotes(next, message) {
  const success = save(keys.notes, JSON.stringify(next));
  if (success) {
    entries = next;
    if (currentPage === 'catatan') refreshNotes();
  }
  setNoteStatus(success ? message : 'Catatan gagal disimpan di browser ini.');
  return success;
}

main.addEventListener('change', event => {
  if (event.target.id === 'note-files') {
    const files = Array.from(event.target.files);
    event.target.value = '';
    if (savingNote) return;
    const accepted = files.filter(file => file.size <= attachmentLimit);
    draft.attachments.push(...accepted.map(file => ({id:newId(),name:file.name,blob:file})));
    main.querySelector('#draft-files').innerHTML = attachmentList(draft.attachments,true);
    setNoteStatus(accepted.length < files.length ? 'File di atas 10 MB tidak ditambahkan.' : '');
    return;
  }
  if (event.target.id === 'category-filter') {
    noteCategory = event.target.value;
    main.querySelector('#note-list').innerHTML = noteList();
  }
  const item = event.target.dataset.item;
  if (!item) return;
  const next = {...checked,[item]:event.target.checked};
  const success = save(keys.checks, JSON.stringify(next));
  if (success) checked = next;
  else event.target.checked = Boolean(checked[item]);
  updateProgress(checklistGroups());
  main.querySelector('#check-status').textContent = success ? '' : 'Progres gagal disimpan di browser ini.';
});

main.addEventListener('input', event => {
  if (event.target.id === 'note-search') {
    noteQuery = event.target.value;
    main.querySelector('#note-list').innerHTML = noteList();
  }
  if (event.target.form?.id === 'note-form' && event.target.name && !savingNote) draft[event.target.name] = event.target.value;
});

main.addEventListener('submit', async event => {
  const form = event.target;
  if (form.id === 'item-form') {
    event.preventDefault();
    const label = new FormData(form).get('label').trim();
    if (!label) {
      main.querySelector('#check-status').textContent = 'Isi nama item terlebih dahulu.';
      return;
    }
    if (storeItems([...personalItems,{id:`personal-${newId()}`,label}],'Item ditambahkan.')) form.reset();
  }
  if (form.id !== 'note-form') return;
  event.preventDefault();
  if (savingNote) return;
  const title = draft.title.trim();
  const body = draft.body.trim();
  const files = draft.attachments;
  if (!title || (!body && !files.length)) {
    setNoteStatus('Isi judul dan tambahkan isi catatan atau lampiran.');
    return;
  }
  const tags = [...new Set(draft.tags.split(',').map(tag => tag.trim().replace(/^#+/,'').trim()).filter(Boolean))];
  const previous = entries.find(entry => entry.id === draft.id);
  const entry = {id:draft.id ?? newId(), title, body, category:draft.category.trim(), tags,
    attachments:files.map(({id,name}) => ({id,name}))};
  const next = previous ? entries.map(item => item.id === entry.id ? entry : item) : [entry,...entries];
  const added = files.filter(file => file.blob);
  const kept = new Set(files.map(file => file.id));
  const removed = (previous?.attachments ?? []).filter(file => !kept.has(file.id));

  savingNote = true;
  form.querySelector('fieldset').disabled = true;
  try {
    if (added.length) {
      await attachmentStore('readwrite', store => added.forEach(file => store.put(file.blob,file.id)));
    }
    if (storeNotes(next,'Catatan tersimpan.')) {
      draft = null;
      await deleteAttachments(removed);
    } else {
      await deleteAttachments(added);
    }
  } catch {
    setNoteStatus('File gagal disimpan. Ruang penyimpanan browser mungkin tidak cukup.');
  } finally {
    savingNote = false;
    if (currentPage === 'catatan') renderNoteEditor(true);
  }
});

window.addEventListener('hashchange',render);
render();

const installButton = document.querySelector('#install-app');
const standalone = window.matchMedia('(display-mode: standalone)');
let installPrompt;
function updateInstallButton() {
  installButton.hidden = standalone.matches || navigator.standalone === true;
}
updateInstallButton();
standalone.addEventListener('change',updateInstallButton);

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  installPrompt = event;
});

installButton.addEventListener('click', async () => {
  if (!installPrompt) {
    document.querySelector('#install-help').showModal();
    return;
  }
  const prompt = installPrompt;
  installPrompt = null;
  try {
    const result = await prompt.prompt();
    if (result.outcome === 'accepted') installButton.hidden = true;
  } catch {
    document.querySelector('#install-help').showModal();
  }
});

window.addEventListener('appinstalled', () => {
  installPrompt = null;
  installButton.hidden = true;
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(error => console.warn('Offline K-Trip:',error));
}
