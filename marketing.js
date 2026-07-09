/* ============================================================
   MARKETING.JS — Sabino Tech / Sabinovende
   Motor de generación de anuncios (Facebook orgánico + Meta Ads)
   y Centro de Difusión.

   Depende de variables/funciones ya definidas en index.html:
   window.PRODUCTOS_DATA, precio(), MARGEN, CAT_KEYS, WA_NUM, showToast()
   ============================================================ */

const ALIAS_FB = 'Sabinovende';
const SITE_URL = location.origin + location.pathname;

/* ---------- Utilidades de texto ---------- */

// Convierte texto normal a "negrita" con Unicode (Facebook no soporta HTML,
// pero estos caracteres especiales sí se ven en negrita dentro de un post normal).
function toBold(str) {
  return String(str).replace(/[A-Za-z0-9]/g, c => {
    const code = c.charCodeAt(0);
    if (c >= 'A' && c <= 'Z') return String.fromCodePoint(code + 119743);
    if (c >= 'a' && c <= 'z') return String.fromCodePoint(code + 119737);
    if (c >= '0' && c <= '9') return String.fromCodePoint(code + 120734);
    return c;
  });
}

function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function money(n) {
  return '$' + Math.round(n).toLocaleString('es-AR');
}

const CATEGORY_EMOJI = {
  audio: '🎧', led: '💡', cable: '🔌', herramienta: '🔧', bici: '🚲', carga: '⚡'
};

function detectCategoriaMk(p) {
  const q = (p.name + ' ' + p.id).toLowerCase();
  const keys = (typeof CAT_KEYS !== 'undefined') ? CAT_KEYS : {};
  for (const cat in keys) {
    if (keys[cat].some(k => q.includes(k))) return cat;
  }
  return null;
}

const HASHTAG_POOL = ['#OfertaDelDia', '#PrecioImbatible', '#StockDisponible', '#CompraSegura', '#EnvioDirecto', '#TodoEnUno'];

function pickHashtags(p, variant) {
  const cat = detectCategoriaMk(p);
  const tags = ['#SabinoTech', '#' + ALIAS_FB, '#BuenosAires'];
  if (cat) tags.push('#' + cat.charAt(0).toUpperCase() + cat.slice(1));
  const idx = (hashStr(p.id) + variant) % HASHTAG_POOL.length;
  tags.push(HASHTAG_POOL[idx]);
  return tags.join(' ');
}

function waLinkFor(p, pr) {
  const msg = `Hola! Te escribo por ${p.name} (cód ${p.id}) que vi en la tienda de Sabino Tech.`;
  return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;
}

/* ---------- Plantillas de post orgánico (6 estilos distintos) ---------- */

const ORGANIC_TEMPLATES = [
  // 0 - Urgencia / stock limitado
  (p, o) => `🔥 ¡SE ESTÁ ACABANDO! ${o.catEmoji}

${toBold(p.name)}

✅ Envío directo desde Buenos Aires
✅ Transferencia o cripto (BTC/USDT/USDC)
💰 ${toBold(money(o.pr))}
📦 ¿Comprás para revender? Precio mayorista disponible desde x${p.bulto} unidades: ${money(o.prMay)} c/u

📲 Escribime YA por WhatsApp y te lo aparto: ${o.waLink}

${o.hashtags}`,

  // 1 - Storytelling / problema-solución
  (p, o) => `¿Andabas buscando algo así? ${o.catEmoji}

Te presento: ${toBold(p.name)}

Lo tengo disponible para entrega directa en Buenos Aires, con pago por transferencia o cripto — sin vueltas, sin intermediarios.

💰 ${toBold(money(o.pr))}

📲 Consultá disponibilidad acá: ${o.waLink}

${o.hashtags}`,

  // 2 - Ficha técnica directa
  (p, o) => `📋 FICHA RÁPIDA

Producto: ${toBold(p.name)}
Código: ${p.id}
Precio unidad: ${toBold(money(o.pr))}
Precio mayorista (x${p.bulto}+): ${money(o.prMay)} c/u
Entrega: Buenos Aires · Pago: transferencia o cripto (BTC/USDT/USDC)

📲 Pedidos por WhatsApp: ${o.waLink}

${o.hashtags}`,

  // 3 - Pregunta directa al lector
  (p, o) => `¿Estabas buscando algo de ${o.catEmoji}? Lo tengo 👇

${toBold(p.name)}

💰 ${toBold(money(o.pr))} — entrega directa en Buenos Aires, pago como prefieras.

📲 Escribime y te lo reservo ahora: ${o.waLink}

${o.hashtags}`,

  // 4 - Oferta relámpago con comparación mayorista/minorista
  (p, o) => `⚡ OFERTA DEL DÍA ⚡

${toBold(p.name)}

🔹 Por unidad: ${toBold(money(o.pr))}
🔹 Por mayor (x${p.bulto}+): ${money(o.prMay)} c/u

Pagás como quieras: transferencia bancaria o cripto (BTC/USDT/USDC) 💰

📲 ${o.waLink}

${o.hashtags}`,

  // 5 - Emocional / beneficio directo
  (p, o) => `Sumá esto a tu día a día sin moverte de tu casa 🙌

${toBold(p.name)} ya está disponible.

💰 ${toBold(money(o.pr))} · Coordinamos entrega por WhatsApp
🔒 Compra segura, trato directo, sin intermediarios.

📲 ${o.waLink}

${o.hashtags}`
];

// Estado de variante/pestaña por producto (para el Centro de Difusión)
const mkVariantState = {};
const mkTabState = {};

function defaultVariant(p) {
  return hashStr(p.id) % ORGANIC_TEMPLATES.length;
}

function generateOrganicPost(p, variantIndex) {
  const modo = (typeof getModo === 'function') ? getModo() : 'min';
  const pr = (typeof precio === 'function') ? precio(p) : Math.round(p.price * 1.6);
  const prMay = Math.round(p.price * (typeof MARGEN !== 'undefined' ? MARGEN.may : 1.2));
  const cat = detectCategoriaMk(p);
  const o = {
    pr, prMay,
    catEmoji: CATEGORY_EMOJI[cat] || '🛍️',
    hashtags: pickHashtags(p, variantIndex),
    waLink: waLinkFor(p, pr)
  };
  const idx = ((variantIndex % ORGANIC_TEMPLATES.length) + ORGANIC_TEMPLATES.length) % ORGANIC_TEMPLATES.length;
  return ORGANIC_TEMPLATES[idx](p, o);
}

/* ---------- Copy para Meta Ads (Título / Texto principal / Descripción) ---------- */

function generateMetaAdsCopy(p) {
  const pr = (typeof precio === 'function') ? precio(p) : Math.round(p.price * 1.6);
  const prMay = Math.round(p.price * (typeof MARGEN !== 'undefined' ? MARGEN.may : 1.2));
  const cat = detectCategoriaMk(p);
  const emoji = CATEGORY_EMOJI[cat] || '🛍️';
  const waLink = waLinkFor(p, pr);

  let headline = p.name;
  if (headline.length > 40) headline = headline.slice(0, 37) + '...';

  const description = `Entrega en Buenos Aires · Transf. o cripto`;

  const primary = `${emoji} ${p.name} a ${money(pr)}. Envío directo desde Buenos Aires, pago por transferencia o cripto (BTC/USDT/USDC). ¿Comprás para revender? Precio mayorista desde x${p.bulto} unidades (${money(prMay)} c/u). Escribinos por WhatsApp y coordinamos tu pedido hoy mismo: ${waLink}`;

  return { headline, description, primary };
}

function metaAdsText(p) {
  const a = generateMetaAdsCopy(p);
  return `📌 TÍTULO (máx. ~40 car.):\n${a.headline}\n\n📝 TEXTO PRINCIPAL:\n${a.primary}\n\n💬 DESCRIPCIÓN (línea corta):\n${a.description}`;
}

function mkTextFor(p) {
  const tab = mkTabState[p.id] || 'organic';
  if (tab === 'ads') return metaAdsText(p);
  const variant = (mkVariantState[p.id] !== undefined) ? mkVariantState[p.id] : defaultVariant(p);
  return generateOrganicPost(p, variant);
}

/* ---------- Clipboard con fallback (Safari / iPhone incluido) ---------- */

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(ta);
}

/* ---------- Acciones rápidas desde cada tarjeta de producto ---------- */

function copyProductoAd(id) {
  const p = (window.PRODUCTOS_DATA || []).find(x => x.id === id);
  if (!p) return;
  const text = generateOrganicPost(p, defaultVariant(p));
  copyToClipboard(text);
  if (typeof showToast === 'function') showToast('📋 Anuncio copiado — pegalo en tu grupo de Facebook');
}

/* ---------- Centro de Difusión (Marketing Hub) ---------- */

let mkLimit = 24;

function openMarketingHub() {
  mkLimit = 24;
  document.getElementById('mk-overlay').classList.add('open');
  document.getElementById('mk-modal').classList.add('open');
  mkRenderList(true);
}

function closeMarketingHub() {
  document.getElementById('mk-overlay').classList.remove('open');
  document.getElementById('mk-modal').classList.remove('open');
}

function mkFilteredProducts() {
  const q = (document.getElementById('mk-search').value || '').toLowerCase().trim();
  const data = window.PRODUCTOS_DATA || [];
  if (!q) return data;
  return data.filter(p => (p.name + ' ' + p.id).toLowerCase().includes(q));
}

function mkItemHTML(p) {
  const pr = (typeof precio === 'function') ? precio(p) : Math.round(p.price * 1.6);
  const tab = mkTabState[p.id] || 'organic';
  const text = mkTextFor(p);
  const checked = mkSelected.has(p.id) ? 'checked' : '';
  return `
  <div class="mk-item" data-mkitem="${p.id}">
    <div class="mk-select-wrap">
      <input type="checkbox" id="mk-chk-${p.id}" ${checked} onchange="mkToggleSelect('${p.id}', this.checked)">
      <label for="mk-chk-${p.id}" style="font-size:11.5px;color:var(--muted)">Incluir en combo múltiple</label>
    </div>
    <div class="mk-item-top">
      <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/60x60/1c1c28/888?text=%20'">
      <div class="mk-item-name">${p.name}<br><span style="color:var(--muted);font-weight:400">${p.id}</span></div>
      <div class="mk-item-price">${money(pr)}</div>
    </div>
    <div class="mk-tabs">
      <button class="mk-tab ${tab === 'organic' ? 'active' : ''}" data-mktab-for="${p.id}" data-tab="organic" onclick="mkSetTab('${p.id}','organic')">📘 Post orgánico</button>
      <button class="mk-tab ${tab === 'ads' ? 'active' : ''}" data-mktab-for="${p.id}" data-tab="ads" onclick="mkSetTab('${p.id}','ads')">🎯 Meta Ads</button>
    </div>
    <textarea class="mk-text" id="mk-text-${p.id}">${text}</textarea>
    <div class="mk-item-actions">
      <button class="mk-copy" onclick="mkCopy('${p.id}')">📋 Copiar</button>
      <button class="mk-fb" onclick="openShareMenu(event,'${p.id}')">🔗 Compartir</button>
      <button class="mk-regen" onclick="mkRegen('${p.id}')">🔀 Otra variante</button>
    </div>
  </div>`;
}

function mkRenderList(reset) {
  const list = document.getElementById('mk-list');
  const data = mkFilteredProducts();
  const slice = data.slice(0, mkLimit);
  list.innerHTML = slice.map(mkItemHTML).join('');
  const loadmore = document.getElementById('mk-loadmore');
  loadmore.style.display = (mkLimit < data.length) ? 'block' : 'none';
}

function mkLoadMore() {
  mkLimit += 24;
  mkRenderList(false);
}

function mkSetTab(id, tab) {
  mkTabState[id] = tab;
  document.querySelectorAll(`[data-mktab-for="${id}"]`).forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  mkUpdateItemText(id);
}

function mkUpdateItemText(id) {
  const p = (window.PRODUCTOS_DATA || []).find(x => x.id === id);
  const el = document.getElementById('mk-text-' + id);
  if (p && el) el.value = mkTextFor(p);
}

function mkRegen(id) {
  mkVariantState[id] = ((mkVariantState[id] !== undefined ? mkVariantState[id] : defaultVariant({ id })) + 1) % ORGANIC_TEMPLATES.length;
  mkTabState[id] = 'organic';
  document.querySelectorAll(`[data-mktab-for="${id}"]`).forEach(b => b.classList.toggle('active', b.dataset.tab === 'organic'));
  mkUpdateItemText(id);
  if (typeof showToast === 'function') showToast('🔀 Nueva variante generada');
}

function mkCopy(id) {
  const el = document.getElementById('mk-text-' + id);
  if (!el) return;
  copyToClipboard(el.value);
  if (typeof showToast === 'function') showToast('📋 Copiado — pegalo en Facebook');
}


function mkCopyAllVisible() {
  const areas = document.querySelectorAll('.mk-text');
  const all = Array.from(areas).map(a => a.value).join('\n\n———\n\n');
  if (!all) { if (typeof showToast === 'function') showToast('❌ No hay productos visibles'); return; }
  copyToClipboard(all);
  if (typeof showToast === 'function') showToast(`📋 Copiados ${areas.length} anuncios`);
}

/* ============================================================
   COMPARTIR EN VARIAS PLATAFORMAS (Facebook, WhatsApp, Telegram, X)
   ============================================================ */

function fbShareUrl(text, url) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
}
function waShareUrl(text) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
function tgShareUrl(text, url) {
  return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}
function xShareUrl(text, url) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}

function openPlatform(platform, text, url) {
  copyToClipboard(text); // siempre queda copiado por las dudas de que la plataforma no cargue el texto solo
  let target;
  if (platform === 'facebook') target = fbShareUrl(text, url);
  else if (platform === 'whatsapp') target = waShareUrl(text);
  else if (platform === 'telegram') target = tgShareUrl(text, url);
  else if (platform === 'x') target = xShareUrl(text, url);
  else return;
  window.open(target, '_blank', 'width=600,height=560');
  if (typeof showToast === 'function') showToast('📋 Copiado · pegalo si la red no lo cargó solo');
}

// Popover simple de "compartir en..." para usar desde cualquier tarjeta o item del Hub
let shareMenuTargetId = null;
function openShareMenu(ev, id) {
  ev.stopPropagation();
  shareMenuTargetId = id;
  const menu = document.getElementById('share-menu');
  menu.innerHTML = `
    <button onclick="shareMenuPick('facebook')">📘 Facebook</button>
    <button onclick="shareMenuPick('whatsapp')">🟢 WhatsApp</button>
    <button onclick="shareMenuPick('telegram')">✈️ Telegram</button>
    <button onclick="shareMenuPick('x')">✖️ X (Twitter)</button>
    <button onclick="shareMenuPick('copy')">📋 Solo copiar</button>
  `;
  const rect = ev.currentTarget.getBoundingClientRect();
  menu.style.top = (window.scrollY + rect.bottom + 6) + 'px';
  menu.style.left = Math.max(8, window.scrollX + rect.left - 120) + 'px';
  menu.classList.add('open');
  setTimeout(() => document.addEventListener('click', closeShareMenuOnOutsideClick), 0);
}
function closeShareMenuOnOutsideClick(e) {
  const menu = document.getElementById('share-menu');
  if (menu && !menu.contains(e.target)) {
    menu.classList.remove('open');
    document.removeEventListener('click', closeShareMenuOnOutsideClick);
  }
}
function shareMenuPick(platform) {
  document.getElementById('share-menu').classList.remove('open');
  const id = shareMenuTargetId;
  if (!id) return;
  // Si el id corresponde a un item abierto en el Hub (con textarea propio) usamos ese texto exacto,
  // si no, generamos el post orgánico por defecto para esa tarjeta.
  const areaHub = document.getElementById('mk-text-' + id);
  const p = (window.PRODUCTOS_DATA || []).find(x => x.id === id);
  if (!p) return;
  const text = areaHub ? areaHub.value : generateOrganicPost(p, defaultVariant(p));
  if (platform === 'copy') {
    copyToClipboard(text);
    if (typeof showToast === 'function') showToast('📋 Anuncio copiado');
    return;
  }
  openPlatform(platform, text, SITE_URL);
}

/* ============================================================
   SELECCIÓN MÚLTIPLE PARA COMBO (máximo 12 productos por publicación)
   ============================================================ */

const MK_MAX_COMBO = 12;
const mkSelected = new Set();

function mkUpdateSelCount() {
  const el = document.getElementById('mk-sel-count');
  if (el) el.textContent = `${mkSelected.size}/${MK_MAX_COMBO}`;
}

function mkToggleSelect(id, checked) {
  if (checked) {
    if (mkSelected.size >= MK_MAX_COMBO) {
      if (typeof showToast === 'function') showToast(`❌ Máximo ${MK_MAX_COMBO} productos por combo`);
      const chk = document.getElementById('mk-chk-' + id);
      if (chk) chk.checked = false;
      return;
    }
    mkSelected.add(id);
  } else {
    mkSelected.delete(id);
  }
  mkUpdateSelCount();
}

function mkClearSelection() {
  mkSelected.clear();
  document.querySelectorAll('[id^="mk-chk-"]').forEach(c => c.checked = false);
  mkUpdateSelCount();
  document.getElementById('mk-combo-result').classList.remove('open');
}

function generateComboPost(products) {
  if (!products.length) return '';
  const lines = products.map(p => {
    const pr = (typeof precio === 'function') ? precio(p) : Math.round(p.price * 1.6);
    return `▪️ ${toBold(p.name)} — ${money(pr)} (Cód: ${p.id})`;
  });
  const cats = new Set(products.map(detectCategoriaMk).filter(Boolean));
  const emoji = cats.size === 1 ? (CATEGORY_EMOJI[[...cats][0]] || '🛍️') : '🛍️';
  const waMsg = `Hola! Te escribo por este combo de productos que vi en Sabino Tech.`;
  const waLink = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(waMsg)}`;
  return `${emoji} ¡COMBO DE OFERTAS! ${emoji}

${lines.join('\n')}

📲 Consultá stock y coordiná tu pedido por WhatsApp: ${waLink}

#SabinoTech #${ALIAS_FB} #BuenosAires #ComboDeOfertas`;
}

function mkBuildCombo() {
  const ids = [...mkSelected];
  if (!ids.length) { if (typeof showToast === 'function') showToast('❌ Seleccioná al menos 1 producto'); return; }
  const products = ids.map(id => (window.PRODUCTOS_DATA || []).find(p => p.id === id)).filter(Boolean);
  const text = generateComboPost(products);
  const box = document.getElementById('mk-combo-text');
  box.value = text;
  document.getElementById('mk-combo-result').classList.add('open');
  box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function comboCopy() {
  const box = document.getElementById('mk-combo-text');
  copyToClipboard(box.value);
  if (typeof showToast === 'function') showToast('📋 Combo copiado');
}

function comboShare(platform) {
  const box = document.getElementById('mk-combo-text');
  openPlatform(platform, box.value, SITE_URL);
}

/* ============================================================
   PROGRAMA DE VENDEDORES (afiliados / revendedores externos)
   ------------------------------------------------------------
   Cualquier persona genera su link con su código + margen extra.
   Quien entra por ese link ve los precios con ese margen sumado.
   El pedido por WhatsApp queda marcado con el código del vendedor
   y muestra precio base vs. precio de vendedor, para que Sabino
   sepa cuánto es la parte de cada uno. La cobranza y el reparto
   real del dinero se coordinan por fuera (WhatsApp/efectivo/
   transferencia), esto solo arma el link y hace la cuenta.
   ============================================================ */

const RS_CODE_KEY = 'sb_reseller_code';
const RS_MARGIN_KEY = 'sb_reseller_margin';
let _origPrecio = null;

function slugify(str) {
  return String(str).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '').slice(0, 12) || 'vendedor';
}

function resellerGenerar() {
  const nombre = document.getElementById('rs-nombre').value.trim();
  const margen = parseFloat(document.getElementById('rs-margen').value);
  if (!nombre) { if (typeof showToast === 'function') showToast('❌ Poné un nombre o alias'); return; }
  if (!margen || margen <= 0 || margen > 100) { if (typeof showToast === 'function') showToast('❌ Margen inválido (1-100%)'); return; }
  const code = slugify(nombre) + hashStr(nombre + Date.now()).toString().slice(-4);
  const link = `${SITE_URL}?ref=${encodeURIComponent(code)}&mk=${margen}`;
  document.getElementById('rs-link').value = link;
  document.getElementById('rs-result').classList.add('open');
  if (typeof showToast === 'function') showToast('✅ Link de vendedor generado');
}

function resellerCopyLink() {
  const link = document.getElementById('rs-link').value;
  if (!link) return;
  copyToClipboard(link);
  if (typeof showToast === 'function') showToast('📋 Link copiado');
}

function resellerShareLink(platform) {
  const link = document.getElementById('rs-link').value;
  if (!link) return;
  const nombre = document.getElementById('rs-nombre').value.trim();
  const text = `¡Mirá los productos de Sabino Tech! ${nombre ? '(' + nombre + ')' : ''} 👉`;
  openPlatform(platform, text, link);
}

function openResellerModal() {
  document.getElementById('rs-overlay').classList.add('open');
  document.getElementById('rs-modal').classList.add('open');
}
function closeResellerModal() {
  document.getElementById('rs-overlay').classList.remove('open');
  document.getElementById('rs-modal').classList.remove('open');
}

function resellerInfo() {
  const code = localStorage.getItem(RS_CODE_KEY);
  const margin = parseFloat(localStorage.getItem(RS_MARGIN_KEY));
  if (!code || !margin) return null;
  return { code, margin };
}

function resellerWaSuffix(sellerPrice) {
  const info = resellerInfo();
  if (!info) return '';
  const basePrice = _origPrecio ? Math.round(sellerPrice / (1 + info.margin / 100)) : sellerPrice;
  return `\n\n🤝 *Vendedor referente:* ${info.code} (+${info.margin}%)\n💵 Precio base (Sabino): $${basePrice.toLocaleString('es-AR')}\n💰 Precio vendedor: $${Math.round(sellerPrice).toLocaleString('es-AR')}`;
}

function resellerRenderBanner() {
  const info = resellerInfo();
  const banner = document.getElementById('reseller-banner');
  if (!banner) return;
  if (!info) { banner.classList.remove('show'); return; }
  banner.innerHTML = `🤝 Estás viendo esta tienda con precio de vendedor: <strong>${info.code}</strong> (+${info.margin}%)
    <button onclick="resellerClear()">✕ Quitar</button>`;
  banner.classList.add('show');
}

function resellerClear() {
  localStorage.removeItem(RS_CODE_KEY);
  localStorage.removeItem(RS_MARGIN_KEY);
  const url = new URL(location.href);
  url.searchParams.delete('ref');
  url.searchParams.delete('mk');
  location.href = url.toString();
}

function resellerInit() {
  const params = new URLSearchParams(location.search);
  const ref = params.get('ref');
  const mk = parseFloat(params.get('mk'));
  if (ref && mk > 0) {
    localStorage.setItem(RS_CODE_KEY, ref);
    localStorage.setItem(RS_MARGIN_KEY, String(mk));
  }
  const info = resellerInfo();
  if (info && typeof precio === 'function' && !_origPrecio) {
    _origPrecio = precio;
    precio = function (p) {
      const base = _origPrecio(p);
      return Math.round(base * (1 + info.margin / 100));
    };
  }
  resellerRenderBanner();
  if (typeof render === 'function') render();
}

// Se ejecuta apenas carga marketing.js (después de que ya existen precio(), render(), etc.)
resellerInit();

