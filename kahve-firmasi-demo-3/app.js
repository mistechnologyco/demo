'use strict';
/* ============================================================
   Holly Coffee — Grand Reserve · Full E-Commerce App
   ============================================================ */

/* ── PRODUCT CATALOGUE ──────────────────────────────────────── */
const DEFAULT_PRODUCTS = [
  { id:'p01', title:'Holly Blend Espresso', category:'espresso', roastLevel:4, price:420, icon:'fa-mug-hot',
    notes:'Karamel, bitter çikolata ve kavrulmuş fındık notaları. Orta-koyu kavrum. Tüm espresso tabanlı içeceklere uygun.',
    stock:18, rating:4.8, reviewCount:52, badge:'Bestseller', tags:['karamel','çikolata','yoğun'],
    reviews:[
      {name:'Ceren T.',stars:5,date:'2026-06-14',text:'Sabahların vazgeçilmezi oldu. Çok dengeli bir espresso.'},
      {name:'Mert A.',stars:5,date:'2026-05-30',text:'Crema mükemmel, aroması çok zengin. Tekrar alacağım.'},
      {name:'Selin K.',stars:4,date:'2026-05-11',text:'Çok iyi ama biraz daha açık kavrum tercih ederdim.'}
    ]},
  { id:'p02', title:'Ethiopia Yirgacheffe', category:'filtre', roastLevel:2, price:380, icon:'fa-seedling',
    notes:'Yasemin, bergamot ve kırmızı meyve notaları. Açık kavrum. V60, Chemex ve Aeropress için ideal.',
    stock:9, rating:4.9, reviewCount:34, badge:'Yeni', tags:['çiçeksi','meyvemsi','hafif'],
    reviews:[
      {name:'Ahmet Y.',stars:5,date:'2026-06-20',text:'Hayatımda içtiğim en iyi filtre kahve. Tavsiye ederim!'},
      {name:'Naz D.',stars:5,date:'2026-06-02',text:'Yasemin kokusu inanılmaz. Çok farklı bir deneyim.'}
    ]},
  { id:'p03', title:'Colombia Supremo', category:'filtre', roastLevel:3, price:350, icon:'fa-leaf',
    notes:'Tatlı narenciye, elma ve hafif çikolata. Orta kavrum. Dengeli yapısıyla her demleme yöntemine uygun.',
    stock:24, rating:4.6, reviewCount:28, badge:'', tags:['dengeli','narenciye','elma'],
    reviews:[
      {name:'Kaan B.',stars:5,date:'2026-06-18',text:'Dengeli bir tatla çok güzel bir kahve.'},
      {name:'Aylin S.',stars:4,date:'2026-05-25',text:'Pour-over ile içince muhteşem.'}
    ]},
  { id:'p04', title:'Guatemala Antigua', category:'espresso', roastLevel:4, price:395, icon:'fa-mug-hot',
    notes:'Tatlı çikolata, İspanyol fıstığı ve hafif baharatlı bitiş. Koyu kavrum. Latte ve cappuccino için mükemmel.',
    stock:3, rating:4.7, reviewCount:19, badge:'Sınırlı', tags:['çikolata','fıstık','baharatlı'],
    reviews:[
      {name:'Emre K.',stars:5,date:'2026-06-10',text:'Latteyle içince birbirini tamamlıyor!'},
      {name:'Buse T.',stars:4,date:'2026-05-28',text:'Çok güçlü, biraz su ekliyorum.'}
    ]},
  { id:'p05', title:'Kenya AA', category:'filtre', roastLevel:2, price:440, icon:'fa-seedling',
    notes:'Ahududu, siyah kuşüzümü ve şarap benzeri ekşilik. Açık-orta kavrum. Aeropress ve filtre makinesi için ideal.',
    stock:12, rating:4.9, reviewCount:41, badge:'Önerilen', tags:['meyvemsi','ekşi','şarap'],
    reviews:[
      {name:'Dilara Ç.',stars:5,date:'2026-06-22',text:'Bu kadar meyvemsi bir kahve içmemiştim. Harika!'},
      {name:'Serdar M.',stars:5,date:'2026-06-05',text:'Şarap notaları gerçekten hissediliyor.'},
      {name:'Pınar A.',stars:4,date:'2026-05-20',text:'Ekşiliği sevenler için kesinlikle tavsiye.'}
    ]},
  { id:'p06', title:'Brazil Cerrado', category:'espresso', roastLevel:3, price:310, icon:'fa-mug-hot',
    notes:'Fındık, tatlı kakaolu bitiş ve hafif tatlılık. Orta kavrum. Yumuşak, kitleyi geniş bir espresso.',
    stock:30, rating:4.4, reviewCount:23, badge:'', tags:['fındık','kakao','yumuşak'],
    reviews:[
      {name:'Okan V.',stars:4,date:'2026-06-15',text:'Başlangıç kahvecileri için harika bir seçim.'},
      {name:'Zeynep L.',stars:5,date:'2026-06-01',text:'Çok pürüzsüz ve tatlı. Severek içiyorum.'}
    ]},
  { id:'p07', title:'Holly Single Origin Box', category:'filtre', roastLevel:2, price:520, icon:'fa-box-open',
    notes:'Her ay değişen 3 farklı single-origin çekirdekten oluşan koleksiyon kutusu. Dünya\'yı fincanınıza taşıyın.',
    stock:7, rating:4.8, reviewCount:15, badge:'Yeni', tags:['deneme','koleksiyon','hediye'],
    reviews:[
      {name:'Cansu M.',stars:5,date:'2026-06-25',text:'Hediye olarak aldım, çok beğendiler!'},
      {name:'Tolga Ö.',stars:5,date:'2026-06-08',text:'Her ay farklı bir ülke keşfediyorum.'}
    ]},
  { id:'p08', title:'Holly Signature Decaf', category:'espresso', roastLevel:3, price:365, icon:'fa-moon',
    notes:'İsviçre su yöntemi ile kafeinsizleştirilmiş. Çikolata ve karamel notaları korunmuş. Günün her saati içilebilir.',
    stock:20, rating:4.5, reviewCount:18, badge:'', tags:['kafeinsiz','çikolata','gece'],
    reviews:[
      {name:'Hande R.',stars:5,date:'2026-06-19',text:'Gece de kahve içmek isteyenler için harika!'},
      {name:'İlker T.',stars:4,date:'2026-05-30',text:'Normal espressodan neredeyse farksız.'}
    ]},
  { id:'p09', title:'Hario V60 Dripper', category:'ekipman', roastLevel:0, price:280, icon:'fa-filter',
    notes:'Japon yapımı V60 02 şeffaf dripper. 1-4 fincan kapasiteli. Başlangıç ve ileri seviye pour-over için ideal.',
    stock:15, rating:4.7, reviewCount:31, badge:'', tags:['v60','pour-over','japon'],
    reviews:[
      {name:'Burak S.',stars:5,date:'2026-06-12',text:'Klasik bir seçim. Sonuçlar her zaman tutarlı.'},
      {name:'Ece A.',stars:4,date:'2026-05-18',text:'Kağıt filtreler ayrı satılıyor, onu da alın.'}
    ]},
  { id:'p10', title:'Timemore Kettle Pro', category:'ekipman', roastLevel:0, price:950, icon:'fa-faucet-drip',
    notes:'Hassas ısı kontrolü ve kaz boynu tasarımıyla pour-over için geliştirilmiş premium elektrikli kettle. 600ml.',
    stock:5, rating:4.9, reviewCount:44, badge:'Bestseller', tags:['kettle','ısı','kontrol'],
    reviews:[
      {name:'Yusuf K.',stars:5,date:'2026-06-21',text:'En iyi yatırım! Hem güzel hem de çok işlevsel.'},
      {name:'Merve D.',stars:5,date:'2026-06-07',text:'Tasarımı çok şık, ısıyı mükemmel tutuyor.'},
      {name:'Alp G.',stars:5,date:'2026-05-22',text:'Fiyatı yüksek ama değer.'}
    ]},
  { id:'p11', title:'Comandante C40 Öğütücü', category:'ekipman', roastLevel:0, price:1850, icon:'fa-mortar-pestle',
    notes:'Alman yapımı nitroğen çelik bıçaklı el öğütücüsü. Tek tip öğütme boyutu. Profesyonel kalitede ev kullanımı.',
    stock:2, rating:4.9, reviewCount:27, badge:'Sınırlı', tags:['öğütücü','alman','profesyonel'],
    reviews:[
      {name:'Güneş P.',stars:5,date:'2026-06-24',text:'Para vermeye değer, tek tip öğütme harika!'},
      {name:'Arda M.',stars:5,date:'2026-06-09',text:'Yıllar sonra hâlâ ilk günkü gibi çalışıyor.'}
    ]},
  { id:'p12', title:'Holly Aksesuvar Seti', category:'ekipman', roastLevel:0, price:490, icon:'fa-scale-balanced',
    notes:'Hassas terazi (0.1g), termometre, kahve kaşığı ve bez peçete içeren başlangıç ekipman seti. Hediye kutulu.',
    stock:11, rating:4.6, reviewCount:20, badge:'Önerilen', tags:['set','başlangıç','hediye'],
    reviews:[
      {name:'Sude K.',stars:5,date:'2026-06-16',text:'Güzel bir başlangıç seti. Hepsini kullanıyorum.'},
      {name:'Cem A.',stars:4,date:'2026-06-03',text:'Hediye kutusu çok şık, tavsiye ederim.'}
    ]}
];

const DISCOUNT_CODES = { 'HOLLY10':10, 'HOLLY20':20, 'HOLLY50':50 };
const ADMIN_CREDS = { email:'admin@holly.coffee', password:'admin' };
const DEFAULT_CUSTOMER = { name:'Demo Müşteri', email:'user@holly.coffee', password:'user', phone:'0555 000 0000', address:'Kızılay, Ankara' };

/* ── STATE ─────────────────────────────────────────────────── */
let state = {
  products: [],
  cart: [],
  wishlist: [],
  orders: [],
  customers: [],
  currentUser: null,
  isAdminLoggedIn: false,
  discount: { code:'', percent:0 },
  filter: { category:'all', priceMin:0, priceMax:3000, sort:'default', search:'' },
  quiz: { step:1, answers:{} },
  theme: 'default'
};

/* ── LOCAL STORAGE ─────────────────────────────────────────── */
function save(key, val) { try { localStorage.setItem('hc3_' + key, JSON.stringify(val)); } catch(e){} }
function load(key, def) { try { const v = localStorage.getItem('hc3_' + key); return v ? JSON.parse(v) : def; } catch(e){ return def; } }

function persist() {
  save('products', state.products);
  save('cart', state.cart);
  save('wishlist', state.wishlist);
  save('orders', state.orders);
  save('customers', state.customers);
  save('currentUser', state.currentUser);
  save('theme', state.theme);
}

/* ── INIT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Load saved state
  const savedProds = load('products', null);
  state.products = savedProds && savedProds.length ? savedProds : [...DEFAULT_PRODUCTS];
  state.cart = load('cart', []);
  state.wishlist = load('wishlist', []);
  state.orders = load('orders', []);
  state.customers = load('customers', [DEFAULT_CUSTOMER]);
  state.currentUser = load('currentUser', null);
  state.theme = load('theme', 'default');

  applyTheme();
  setupHeader();
  renderProducts();
  updateCartBadge();
  updateWishlistBadge();
  updateUserUI();
  setupEventListeners();
});

/* ── THEME ─────────────────────────────────────────────────── */
function applyTheme() {
  document.body.classList.toggle('theme-rose', state.theme === 'rose');
}
function toggleTheme() {
  state.theme = state.theme === 'rose' ? 'default' : 'rose';
  applyTheme();
  persist();
}

/* ── HEADER SCROLL ─────────────────────────────────────────── */
function setupHeader() {
  const hdr = document.getElementById('site-header');
  if (!hdr) return;
  window.addEventListener('scroll', () => hdr.classList.toggle('scrolled', window.scrollY > 30));
}

/* ── CAMPAIGN BANNER ───────────────────────────────────────── */
function closeCampaignBanner() {
  const b = document.getElementById('campaign-banner');
  if (b) b.style.display = 'none';
}

/* ── RENDER PRODUCTS ───────────────────────────────────────── */
function getFilteredProducts() {
  let list = [...state.products];
  const { category, priceMin, priceMax, sort, search } = state.filter;
  if (category !== 'all') list = list.filter(p => p.category === category);
  list = list.filter(p => p.price >= priceMin && p.price <= priceMax);
  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.notes && p.notes.toLowerCase().includes(q)) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
      p.category.toLowerCase().includes(q)
    );
  }
  switch(sort) {
    case 'price-asc': list.sort((a,b) => a.price - b.price); break;
    case 'price-desc': list.sort((a,b) => b.price - a.price); break;
    case 'rating': list.sort((a,b) => b.rating - a.rating); break;
    case 'name-asc': list.sort((a,b) => a.title.localeCompare(b.title, 'tr')); break;
  }
  return list;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let s = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) s += '<i class="fa-solid fa-star"></i>';
    else if (i === full && half) s += '<i class="fa-solid fa-star-half-stroke"></i>';
    else s += '<i class="fa-regular fa-star"></i>';
  }
  return s;
}

function getStockBadge(stock) {
  if (stock === 0) return '<span class="stock-badge stock-out">Tükendi</span>';
  if (stock <= 3) return `<span class="stock-badge stock-low">Son ${stock} adet!</span>`;
  return '';
}

function getBadgeClass(badge) {
  const m = {'Yeni':'badge-new','Sınırlı':'badge-limited','Önerilen':'badge-recommended','Bestseller':'','':''};
  return m[badge] || '';
}

function isInWishlist(id) { return state.wishlist.includes(id); }

function renderProducts() {
  const grid = document.getElementById('storefront-products-grid');
  const noRes = document.getElementById('no-results');
  const countEl = document.getElementById('results-count');
  const searchDisp = document.getElementById('search-query-display');
  if (!grid) return;

  const list = getFilteredProducts();
  countEl.textContent = `${list.length} ürün listeleniyor`;

  if (state.filter.search.trim()) {
    searchDisp.style.display = 'inline-block';
    searchDisp.textContent = `"${state.filter.search}" için sonuçlar`;
  } else {
    searchDisp.style.display = 'none';
  }

  if (list.length === 0) {
    grid.innerHTML = '';
    noRes.style.display = 'block';
    return;
  }
  noRes.style.display = 'none';

  grid.innerHTML = list.map(p => {
    const isWL = isInWishlist(p.id);
    const stockOut = p.stock === 0;
    return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-image-container" onclick="openProductDetail('${p.id}')">
        <i class="fa-solid ${p.icon}"></i>
        ${p.badge ? `<span class="product-badge ${getBadgeClass(p.badge)}">${p.badge}</span>` : ''}
        ${getStockBadge(p.stock)}
        <button class="wishlist-toggle ${isWL ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist('${p.id}', this)">
          <i class="fa-${isWL ? 'solid' : 'regular'} fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <div class="product-meta">
          <span class="product-category">${p.category.toUpperCase()}</span>
          <div class="roast-meter">${[0,1,2,3,4].map(i=>`<span class="dot${i < p.roastLevel ? ' active' : ''}"></span>`).join('')}</div>
        </div>
        <div class="product-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span class="rating-val">${p.rating}</span>
          <span class="review-count">(${p.reviewCount})</span>
        </div>
        <span class="product-title" onclick="openProductDetail('${p.id}')">${p.title}</span>
        <p class="product-notes">${p.notes.length > 90 ? p.notes.slice(0,90)+'…' : p.notes}</p>
        <div class="product-footer">
          <span class="product-price">₺${p.price.toLocaleString('tr-TR')}</span>
          <div class="product-actions">
            <button class="detail-btn" onclick="openProductDetail('${p.id}')" title="Detay"><i class="fa-solid fa-expand"></i></button>
            <button class="add-to-cart-btn" onclick="addToCart('${p.id}')" ${stockOut ? 'disabled title="Tükendi"' : 'title="Sepete Ekle"'}>
              <i class="fa-solid ${stockOut ? 'fa-ban' : 'fa-plus'}"></i>
            </button>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ── WISHLIST ──────────────────────────────────────────────── */
function toggleWishlist(id, btn) {
  if (isInWishlist(id)) {
    state.wishlist = state.wishlist.filter(i => i !== id);
    if (btn) { btn.classList.remove('active'); btn.innerHTML = '<i class="fa-regular fa-heart"></i>'; }
  } else {
    state.wishlist.push(id);
    if (btn) { btn.classList.add('active'); btn.innerHTML = '<i class="fa-solid fa-heart"></i>'; }
  }
  persist();
  updateWishlistBadge();
}

function updateWishlistBadge() {
  const cnt = document.getElementById('wishlist-count');
  const n = state.wishlist.length;
  if (cnt) { cnt.textContent = n; cnt.style.display = n > 0 ? 'flex' : 'none'; }
}

function renderWishlistDrawer() {
  const c = document.getElementById('wishlist-items-container');
  const countEl = document.getElementById('wishlist-count-drawer');
  if (!c) return;
  const items = state.products.filter(p => state.wishlist.includes(p.id));
  countEl.textContent = items.length;
  if (!items.length) {
    c.innerHTML = '<div class="empty-cart-msg"><i class="fa-regular fa-heart"></i>Favori listeniz boş.</div>';
    return;
  }
  c.innerHTML = items.map(p => `
    <div class="wishlist-item">
      <div class="wi-icon"><i class="fa-solid ${p.icon}"></i></div>
      <div class="wi-details">
        <div class="wi-title">${p.title}</div>
        <div class="wi-price">₺${p.price.toLocaleString('tr-TR')}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
        <button class="wi-add-btn" onclick="addToCart('${p.id}'); showToast('Sepete eklendi!')">Sepete Ekle</button>
        <button class="wi-remove-btn" onclick="removeFromWishlist('${p.id}')">Kaldır</button>
      </div>
    </div>`).join('');
}

function removeFromWishlist(id) {
  state.wishlist = state.wishlist.filter(i => i !== id);
  persist();
  updateWishlistBadge();
  renderWishlistDrawer();
  renderProducts();
}

/* ── CART ──────────────────────────────────────────────────── */
function addToCart(id) {
  const prod = state.products.find(p => p.id === id);
  if (!prod || prod.stock === 0) return;
  const existing = state.cart.find(i => i.id === id);
  if (existing) {
    if (existing.qty < prod.stock) existing.qty++;
    else { showToast('Maksimum stok adedine ulaştınız!'); return; }
  } else {
    state.cart.push({ id, qty:1 });
  }
  persist();
  updateCartBadge();
  animateCartBtn();
  showToast(`${prod.title} sepete eklendi!`);
}

function removeFromCart(id) {
  state.cart = state.cart.filter(i => i.id !== id);
  persist();
  updateCartBadge();
  renderCartDrawer();
}

function changeQty(id, delta) {
  const item = state.cart.find(i => i.id === id);
  const prod = state.products.find(p => p.id === id);
  if (!item || !prod) return;
  item.qty = Math.max(1, Math.min(prod.stock, item.qty + delta));
  persist();
  updateCartBadge();
  renderCartDrawer();
}

function updateCartBadge() {
  const total = state.cart.reduce((s,i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = total);
  document.querySelectorAll('.cart-count-drawer').forEach(el => el.textContent = total);
}

function cartSubtotal() {
  return state.cart.reduce((s,i) => {
    const p = state.products.find(x => x.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
}

function renderCartDrawer() {
  const c = document.getElementById('cart-items-container');
  if (!c) return;
  if (!state.cart.length) {
    c.innerHTML = '<div class="empty-cart-msg"><i class="fa-solid fa-bag-shopping"></i>Sepetiniz boş.</div>';
    updateCartTotals();
    return;
  }
  c.innerHTML = state.cart.map(item => {
    const p = state.products.find(x => x.id === item.id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <div class="cart-item-icon"><i class="fa-solid ${p.icon}"></i></div>
        <div class="cart-item-details">
          <div class="cart-item-title">${p.title}</div>
          <div class="cart-item-price">₺${(p.price * item.qty).toLocaleString('tr-TR')}</div>
        </div>
        <div class="cart-item-actions">
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty('${p.id}',-1)"><i class="fa-solid fa-minus"></i></button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${p.id}',1)"><i class="fa-solid fa-plus"></i></button>
          </div>
          <button class="remove-item-btn" onclick="removeFromCart('${p.id}')">Kaldır</button>
        </div>
      </div>`;
  }).join('');
  updateCartTotals();
}

function updateCartTotals() {
  const sub = cartSubtotal();
  const discountAmt = (sub * state.discount.percent) / 100;
  const total = sub - discountAmt;
  const rawEl = document.getElementById('cart-subtotal-raw');
  const discRow = document.getElementById('discount-row');
  const discLabel = document.getElementById('discount-label');
  const discAmtEl = document.getElementById('discount-amount');
  const totalEl = document.getElementById('cart-subtotal-value');
  const chkTotal = document.getElementById('checkout-total-val');
  if (rawEl) rawEl.textContent = `₺${sub.toLocaleString('tr-TR', {minimumFractionDigits:2})}`;
  if (discRow) discRow.style.display = discountAmt > 0 ? 'flex' : 'none';
  if (discLabel) discLabel.textContent = `İndirim (${state.discount.code} -%${state.discount.percent})`;
  if (discAmtEl) discAmtEl.textContent = `-₺${discountAmt.toLocaleString('tr-TR', {minimumFractionDigits:2})}`;
  if (totalEl) totalEl.textContent = `₺${total.toLocaleString('tr-TR', {minimumFractionDigits:2})}`;
  if (chkTotal) chkTotal.textContent = `₺${total.toLocaleString('tr-TR', {minimumFractionDigits:2})}`;
}

function animateCartBtn() {
  const btn = document.getElementById('cart-open-btn');
  if (!btn) return;
  btn.style.transform = 'scale(1.2)';
  setTimeout(() => btn.style.transform = '', 280);
}

/* ── DISCOUNT ──────────────────────────────────────────────── */
function applyDiscount() {
  const input = document.getElementById('discount-code-input');
  const result = document.getElementById('discount-result');
  if (!input || !result) return;
  const code = input.value.trim().toUpperCase();
  if (DISCOUNT_CODES[code]) {
    state.discount = { code, percent: DISCOUNT_CODES[code] };
    result.innerHTML = `<div class="discount-success"><i class="fa-solid fa-check-circle"></i> "${code}" kodu uygulandı! %${DISCOUNT_CODES[code]} indirim kazandınız.</div>`;
    updateCartTotals();
  } else {
    result.innerHTML = `<div class="discount-error"><i class="fa-solid fa-xmark-circle"></i> Geçersiz indirim kodu.</div>`;
  }
}

/* ── PRODUCT DETAIL MODAL ──────────────────────────────────── */
function openProductDetail(id) {
  const p = state.products.find(x => x.id === id);
  if (!p) return;
  const modal = document.getElementById('product-detail-modal');
  const content = document.getElementById('product-detail-content');
  if (!modal || !content) return;

  const stockClass = p.stock === 0 ? 'pd-stock-out' : p.stock <= 3 ? 'pd-stock-low' : 'pd-stock-ok';
  const stockText = p.stock === 0 ? 'Stokta Yok' : p.stock <= 3 ? `Son ${p.stock} adet!` : `${p.stock} adet stokta`;
  const isWL = isInWishlist(p.id);

  const reviewsHtml = (p.reviews || []).map(r => `
    <div class="review-item">
      <div class="rv-header">
        <span class="rv-name">${r.name}</span>
        <span class="rv-stars">${renderStars(r.stars)}</span>
        <span class="rv-date">${r.date}</span>
      </div>
      <p class="rv-text">${r.text}</p>
    </div>`).join('');

  content.innerHTML = `
    <div class="pd-layout">
      <div class="pd-visual">
        <i class="fa-solid ${p.icon} pd-icon"></i>
        <div class="pd-roast">${[0,1,2,3,4].map(i=>`<span class="dot${i < p.roastLevel ? ' active' : ''}"></span>`).join('')}</div>
        <div class="product-rating" style="justify-content:center;">
          <span class="stars">${renderStars(p.rating)}</span>
          <span class="rating-val">${p.rating}</span>
          <span class="review-count">(${p.reviewCount})</span>
        </div>
      </div>
      <div class="pd-info">
        <span class="pd-eyebrow">${p.category.toUpperCase()}</span>
        <h2 class="pd-title">${p.title}</h2>
        ${p.badge ? `<span class="product-badge ${getBadgeClass(p.badge)}" style="position:static;margin-bottom:12px;">${p.badge}</span>` : ''}
        <p class="pd-notes">${p.notes}</p>
        ${p.tags && p.tags.length ? `<div class="pd-tags">${p.tags.map(t=>`<span class="pd-tag">${t}</span>`).join('')}</div>` : ''}
        <p class="pd-stock-info ${stockClass}">${stockText}</p>
        <div class="pd-price">₺${p.price.toLocaleString('tr-TR')}</div>
        <div class="pd-actions">
          <button class="btn-primary-dark" onclick="addToCart('${p.id}'); closeModal('product-detail-modal')" ${p.stock===0?'disabled':''}>
            <i class="fa-solid fa-bag-shopping"></i> ${p.stock===0?'Stokta Yok':'Sepete Ekle'}
          </button>
          <button class="btn-ghost-light wl-det-btn" onclick="toggleWishlistFromDetail('${p.id}', this)">
            <i class="fa-${isWL?'solid':'regular'} fa-heart"></i> ${isWL?'Favoride':'Favoriye Ekle'}
          </button>
        </div>
      </div>
    </div>
    ${reviewsHtml ? `<div class="pd-reviews"><h4>Müşteri Yorumları</h4>${reviewsHtml}</div>` : ''}`;

  openModal('product-detail-modal');
}

function toggleWishlistFromDetail(id, btn) {
  const isWL = isInWishlist(id);
  toggleWishlist(id, null);
  const newWL = isInWishlist(id);
  if (btn) {
    btn.innerHTML = `<i class="fa-${newWL?'solid':'regular'} fa-heart"></i> ${newWL?'Favoride':'Favoriye Ekle'}`;
  }
  renderProducts();
}

/* ── QUIZ ──────────────────────────────────────────────────── */
function initQuiz() {
  document.querySelectorAll('.qo-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const step = this.closest('.quiz-step');
      const val = this.dataset.value;
      const stepNum = parseInt(step.dataset.step);
      state.quiz.answers['step' + stepNum] = val;
      nextQuizStep(stepNum);
    });
  });
  const restart = document.getElementById('quiz-restart-btn');
  if (restart) restart.addEventListener('click', restartQuiz);
}

function nextQuizStep(current) {
  const cur = document.getElementById('quiz-step-' + current);
  const next = document.getElementById('quiz-step-' + (current + 1));
  if (cur) cur.classList.remove('active');
  const dot = document.getElementById('qp-' + (current + 1));
  if (dot) dot.classList.add('active');

  if (next) {
    next.classList.add('active');
    state.quiz.step = current + 1;
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  const resultEl = document.getElementById('quiz-result');
  const cardEl = document.getElementById('recommended-product-card');
  const progressDot = document.getElementById('qp-3');
  if (progressDot) progressDot.classList.add('active');
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  resultEl.classList.add('active');

  const ans = state.quiz.answers;
  let match = null;
  if (ans.step1 === 'espresso' && ans.step2 === 'cikolata') match = state.products.find(p => p.id === 'p01');
  else if (ans.step1 === 'espresso' && ans.step2 === 'dengeli') match = state.products.find(p => p.id === 'p06');
  else if (ans.step1 === 'espresso' && ans.step2 === 'meyve') match = state.products.find(p => p.id === 'p04');
  else if (ans.step1 === 'filtre' && ans.step2 === 'meyve') match = state.products.find(p => p.id === 'p02');
  else if (ans.step1 === 'filtre' && ans.step2 === 'cikolata') match = state.products.find(p => p.id === 'p03');
  else if (ans.step1 === 'filtre' && ans.step2 === 'dengeli') match = state.products.find(p => p.id === 'p05');
  if (!match) match = state.products[0];

  if (cardEl && match) {
    cardEl.innerHTML = `
      <div style="background:var(--ivory);border:1px solid var(--ivory-dark);border-radius:6px;padding:18px;display:flex;gap:14px;align-items:center;">
        <div style="width:50px;height:50px;background:var(--ivory-mid);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:22px;color:var(--gold);flex-shrink:0;">
          <i class="fa-solid ${match.icon}"></i>
        </div>
        <div style="flex:1;">
          <div style="font-size:10px;font-weight:700;color:var(--gold);letter-spacing:1px;text-transform:uppercase;margin-bottom:3px;">${match.category}</div>
          <div style="font-family:var(--font-serif);font-size:18px;color:var(--leather);font-weight:600;margin-bottom:4px;">${match.title}</div>
          <div style="font-family:var(--font-serif);font-size:18px;color:var(--leather);font-weight:700;">₺${match.price.toLocaleString('tr-TR')}</div>
        </div>
        <button class="btn-primary-dark" onclick="addToCart('${match.id}'); showToast('${match.title} sepete eklendi!')">
          <i class="fa-solid fa-bag-shopping"></i> Ekle
        </button>
      </div>`;
  }
}

function restartQuiz() {
  state.quiz = { step:1, answers:{} };
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  const r = document.getElementById('quiz-result');
  if (r) r.classList.remove('active');
  const s1 = document.getElementById('quiz-step-1');
  if (s1) s1.classList.add('active');
  document.querySelectorAll('.qp-dot').forEach((d,i) => d.classList.toggle('active', i===0));
}

/* ── AUTH ──────────────────────────────────────────────────── */
function updateUserUI() {
  const nameEl = document.getElementById('user-display-name');
  const dropdown = document.getElementById('user-dropdown-menu');
  if (state.currentUser) {
    const first = state.currentUser.name.split(' ')[0];
    if (nameEl) nameEl.textContent = first;
    if (dropdown) dropdown.style.display = 'none';
  } else {
    if (nameEl) nameEl.textContent = 'Giriş';
  }
}

function handleCustomerLogin(e) {
  e.preventDefault();
  const email = document.getElementById('customer-email').value.trim();
  const pass = document.getElementById('customer-password').value;
  const err = document.getElementById('customer-login-error');
  const customer = state.customers.find(c => c.email === email && c.password === pass);
  if (customer) {
    state.currentUser = customer;
    persist();
    updateUserUI();
    closeModal('user-portal-modal');
    showToast(`Hoş geldiniz, ${customer.name.split(' ')[0]}!`);
    if (err) err.style.display = 'none';
  } else {
    if (err) err.style.display = 'block';
  }
}

function handleCustomerRegister(e) {
  e.preventDefault();
  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const phone = document.getElementById('register-phone').value.trim();
  const address = document.getElementById('register-address').value.trim();
  if (state.customers.find(c => c.email === email)) {
    showToast('Bu e-posta zaten kayıtlı!');
    return;
  }
  const newCustomer = { name, email, password, phone, address };
  state.customers.push(newCustomer);
  state.currentUser = newCustomer;
  persist();
  updateUserUI();
  closeModal('user-portal-modal');
  showToast(`Hoş geldiniz, ${name.split(' ')[0]}! Hesabınız oluşturuldu.`);
}

function logoutUser() {
  state.currentUser = null;
  persist();
  updateUserUI();
  showToast('Başarıyla çıkış yapıldı.');
}

function showOrdersModal() {
  const tbody = document.getElementById('customer-orders-history-tbody');
  if (!tbody || !state.currentUser) return;
  const myOrders = state.orders.filter(o => o.customerEmail === state.currentUser.email);
  if (!myOrders.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);">Henüz siparişiniz yok.</td></tr>';
  } else {
    tbody.innerHTML = myOrders.map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.date}</td>
        <td>${(o.items||[]).map(i=>{ const p=state.products.find(x=>x.id===i.id); return p?`${p.title} (x${i.qty})`:''; }).join('<br>')}</td>
        <td>₺${o.total.toLocaleString('tr-TR',{minimumFractionDigits:2})}</td>
        <td><span class="badge-status status-${o.status==='Tamamlandı'?'completed':o.status==='Kargoda'?'shipping':'pending'}">${o.status}</span></td>
      </tr>`).join('');
  }
  openModal('customer-orders-modal');
}

/* ── CHECKOUT ─────────────────────────────────────────────── */
function openCheckout() {
  if (!state.cart.length) { showToast('Sepetiniz boş!'); return; }
  if (!state.currentUser) { openModal('user-portal-modal'); showToast('Lütfen önce giriş yapın.'); return; }
  document.getElementById('checkout-name').value = state.currentUser.name || '';
  document.getElementById('checkout-phone').value = state.currentUser.phone || '';
  document.getElementById('checkout-address').value = state.currentUser.address || '';
  setCheckoutStep(1);
  closeAllDrawers();
  openModal('checkout-modal');
}

function setCheckoutStep(n) {
  [1,2,3].forEach(i => {
    const panel = document.getElementById('checkout-panel-' + i);
    const dot = document.getElementById('step-dot-' + i);
    if (panel) panel.style.display = i === n ? 'block' : 'none';
    if (dot) dot.classList.toggle('active', i <= n);
  });
  updateCartTotals();
}

function handleAddressForm(e) {
  e.preventDefault();
  setCheckoutStep(2);
  document.getElementById('checkout-card-name').value = state.currentUser ? state.currentUser.name : '';
}

function handlePaymentForm(e) {
  e.preventDefault();
  const sub = cartSubtotal();
  const disc = (sub * state.discount.percent) / 100;
  const total = sub - disc;
  const orderId = '#HL-' + String(Date.now()).slice(-5);
  const order = {
    id: orderId,
    date: new Date().toLocaleDateString('tr-TR'),
    customerName: state.currentUser.name,
    customerEmail: state.currentUser.email,
    address: document.getElementById('checkout-address').value,
    phone: document.getElementById('checkout-phone').value,
    items: [...state.cart],
    total: total,
    discount: { code: state.discount.code, percent: state.discount.percent },
    status: 'Beklemede'
  };
  state.orders.push(order);
  state.cart = [];
  state.discount = { code:'', percent:0 };
  const discInput = document.getElementById('discount-code-input');
  const discResult = document.getElementById('discount-result');
  if (discInput) discInput.value = '';
  if (discResult) discResult.innerHTML = '';
  persist();
  updateCartBadge();
  renderCartDrawer();
  const idEl = document.getElementById('success-order-id');
  if (idEl) idEl.textContent = orderId;
  setCheckoutStep(3);
}

/* ── ADMIN ─────────────────────────────────────────────────── */
function handleAdminLogin(e) {
  e.preventDefault();
  const email = document.getElementById('admin-email').value.trim();
  const pass = document.getElementById('admin-password').value;
  const err = document.getElementById('admin-login-error');
  if (email === ADMIN_CREDS.email && pass === ADMIN_CREDS.password) {
    state.isAdminLoggedIn = true;
    document.getElementById('admin-login-wrapper').style.display = 'none';
    document.getElementById('admin-dashboard-wrapper').style.display = 'grid';
    if (err) err.style.display = 'none';
    renderAdminTab('tab-analytics');
  } else {
    if (err) err.style.display = 'block';
  }
}

function renderAdminTab(tabId) {
  document.querySelectorAll('.dash-tab').forEach(t => t.style.display = 'none');
  const tab = document.getElementById(tabId);
  if (tab) tab.style.display = 'block';
  document.querySelectorAll('.adm-nav li').forEach(li => li.classList.toggle('active', li.dataset.tab === tabId));

  if (tabId === 'tab-analytics') renderAdminAnalytics();
  else if (tabId === 'tab-orders') renderAdminOrders();
  else if (tabId === 'tab-products') renderAdminProducts();
}

function renderAdminAnalytics() {
  const totalRevenue = state.orders.reduce((s,o) => s + (o.total||0), 0);
  const avgBasket = state.orders.length ? totalRevenue / state.orders.length : 0;
  const el = (id, val) => { const e = document.getElementById(id); if(e) e.textContent = val; };
  el('stat-revenue', '₺' + totalRevenue.toLocaleString('tr-TR',{minimumFractionDigits:2}));
  el('stat-orders', state.orders.length);
  el('stat-avg', '₺' + avgBasket.toLocaleString('tr-TR',{minimumFractionDigits:2}));
  el('stat-customers', state.customers.length);

  // Bestsellers
  const salesMap = {};
  state.orders.forEach(o => {
    (o.items||[]).forEach(i => {
      salesMap[i.id] = (salesMap[i.id] || 0) + i.qty;
    });
  });
  const bestsellers = Object.entries(salesMap)
    .sort((a,b) => b[1]-a[1])
    .slice(0,5)
    .map(([id, qty]) => {
      const p = state.products.find(x => x.id === id);
      if (!p) return null;
      return { p, qty, revenue: p.price * qty };
    }).filter(Boolean);

  const tbody = document.getElementById('bestsellers-tbody');
  if (tbody) {
    tbody.innerHTML = bestsellers.length
      ? bestsellers.map(b => `<tr><td>${b.p.title}</td><td>${b.p.category}</td><td>${b.qty}</td><td>₺${b.revenue.toLocaleString('tr-TR',{minimumFractionDigits:2})}</td></tr>`).join('')
      : '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);">Henüz sipariş yok.</td></tr>';
  }
}

function renderAdminOrders() {
  const tbody = document.getElementById('admin-orders-tbody');
  if (!tbody) return;
  if (!state.orders.length) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);">Henüz sipariş bulunmuyor.</td></tr>';
    return;
  }
  tbody.innerHTML = state.orders.map((o, idx) => {
    const itemsText = (o.items||[]).map(i => { const p=state.products.find(x=>x.id===i.id); return p?`${p.title}(x${i.qty})`:''; }).join(', ');
    const statusClass = o.status==='Tamamlandı'?'completed':o.status==='Kargoda'?'shipping':'pending';
    return `<tr>
      <td><strong>${o.id}</strong><br><small style="color:var(--text-muted);">${o.date}</small></td>
      <td>${o.customerName||''}<br><small style="color:var(--text-muted);">${o.customerEmail||''}</small></td>
      <td><small>${(o.address||'').slice(0,40)}</small><br><small style="color:var(--text-muted);">${o.phone||''}</small></td>
      <td><small>${itemsText}</small></td>
      <td>₺${(o.total||0).toLocaleString('tr-TR',{minimumFractionDigits:2})}</td>
      <td>
        <select class="admin-select-status" onchange="updateOrderStatus(${idx}, this.value)">
          <option ${o.status==='Beklemede'?'selected':''}>Beklemede</option>
          <option ${o.status==='Kargoda'?'selected':''}>Kargoda</option>
          <option ${o.status==='Tamamlandı'?'selected':''}>Tamamlandı</option>
        </select>
      </td>
    </tr>`;
  }).join('');
}

function updateOrderStatus(idx, val) {
  state.orders[idx].status = val;
  persist();
}

function renderAdminProducts() {
  const tbody = document.getElementById('admin-products-tbody');
  if (!tbody) return;
  tbody.innerHTML = state.products.map(p => `
    <tr>
      <td><div class="admin-img-preview"><i class="fa-solid ${p.icon}"></i></div></td>
      <td><strong>${p.title}</strong></td>
      <td>${p.category}</td>
      <td>${'●'.repeat(p.roastLevel)}</td>
      <td><input type="number" class="admin-input-stock" value="${p.stock}" min="0" onchange="updateProductStock('${p.id}', this.value)"></td>
      <td>${p.rating} ⭐ (${p.reviewCount})</td>
      <td><input type="number" class="admin-input-price" value="${p.price}" min="1" onchange="updateProductPrice('${p.id}', this.value)"></td>
      <td>
        <button class="btn-primary-dark btn-mini" onclick="saveProductChanges('${p.id}', this)">Kaydet</button>
      </td>
    </tr>`).join('');
}

function updateProductPrice(id, val) {
  const p = state.products.find(x => x.id === id);
  if (p) p.price = parseFloat(val) || p.price;
}

function updateProductStock(id, val) {
  const p = state.products.find(x => x.id === id);
  if (p) p.stock = parseInt(val) || 0;
}

function saveProductChanges(id, btn) {
  persist();
  renderProducts();
  if (btn) {
    btn.textContent = 'Kaydedildi ✓';
    setTimeout(() => { btn.textContent = 'Kaydet'; }, 2000);
  }
}

function handleAddProduct(e) {
  e.preventDefault();
  const title = document.getElementById('new-prod-title').value.trim();
  const category = document.getElementById('new-prod-category').value;
  const icon = document.getElementById('new-prod-icon').value;
  const roastLevel = parseInt(document.getElementById('new-prod-roast').value);
  const price = parseFloat(document.getElementById('new-prod-price').value);
  const stock = parseInt(document.getElementById('new-prod-stock').value);
  const notes = document.getElementById('new-prod-notes').value.trim();
  const badge = document.getElementById('new-prod-badge').value;

  if (!title || !price || !notes) return;

  const newProd = {
    id: 'p' + Date.now(),
    title, category, roastLevel, price, stock, notes, badge,
    icon, rating:4.5, reviewCount:0, tags:[], reviews:[]
  };
  state.products.push(newProd);
  persist();
  renderProducts();

  const resultEl = document.getElementById('add-product-result');
  if (resultEl) resultEl.innerHTML = `<div class="success-msg"><i class="fa-solid fa-check-circle"></i> "${title}" mağazaya eklendi!</div>`;
  e.target.reset();
  setTimeout(() => { if(resultEl) resultEl.innerHTML=''; }, 3500);
}

/* ── MODAL HELPERS ─────────────────────────────────────────── */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.style.display = 'flex';
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.style.display = 'none';
}
function closeAllDrawers() {
  document.getElementById('cart-drawer-backdrop').style.display = 'none';
  document.getElementById('wishlist-drawer-backdrop').style.display = 'none';
}

/* ── TOAST ─────────────────────────────────────────────────── */
function showToast(msg) {
  let t = document.getElementById('hc-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'hc-toast';
    t.style.cssText = `
      position:fixed;bottom:28px;right:28px;z-index:9999;
      background:var(--leather);color:var(--gold-lt);
      border:1px solid var(--gold-border);
      padding:13px 20px;border-radius:6px;font-family:var(--font-sans);
      font-size:13px;font-weight:500;
      box-shadow:0 8px 24px rgba(42,28,15,0.2);
      transform:translateY(20px);opacity:0;
      transition:all 0.35s cubic-bezier(0.22,1,0.36,1);
      max-width:300px;line-height:1.4;`;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  requestAnimationFrame(() => { t.style.transform='translateY(0)'; t.style.opacity='1'; });
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.transform='translateY(20px)'; t.style.opacity='0'; }, 3000);
}

/* ── EVENT LISTENERS ───────────────────────────────────────── */
function setupEventListeners() {

  // Theme
  document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);

  // Campaign Banner
  document.getElementById('cb-close-btn')?.addEventListener('click', closeCampaignBanner);

  // Search
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear-btn');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      state.filter.search = this.value;
      if (searchClear) searchClear.style.display = this.value ? 'block' : 'none';
      renderProducts();
    });
  }
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.filter.search = '';
      searchClear.style.display = 'none';
      renderProducts();
    });
  }

  // Category filters
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      state.filter.category = this.dataset.category;
      renderProducts();
    });
  });

  // Price range
  const priceMin = document.getElementById('price-min');
  const priceMax = document.getElementById('price-max');
  const priceDisplay = document.getElementById('price-display');
  function updatePrice() {
    let min = parseInt(priceMin.value), max = parseInt(priceMax.value);
    if (min > max) { [priceMin.value, priceMax.value] = [max, min]; [min, max] = [max, min]; }
    if (priceDisplay) priceDisplay.textContent = `₺${min.toLocaleString('tr-TR')} – ₺${max.toLocaleString('tr-TR')}`;
    state.filter.priceMin = min;
    state.filter.priceMax = max;
    renderProducts();
  }
  if (priceMin) priceMin.addEventListener('input', updatePrice);
  if (priceMax) priceMax.addEventListener('input', updatePrice);

  // Sort
  document.getElementById('sort-select')?.addEventListener('change', function() {
    state.filter.sort = this.value;
    renderProducts();
  });

  // Clear filters
  document.getElementById('clear-filters-btn')?.addEventListener('click', () => {
    state.filter = { category:'all', priceMin:0, priceMax:3000, sort:'default', search:'' };
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.style.display = 'none';
    if (priceMin) priceMin.value = 0;
    if (priceMax) priceMax.value = 3000;
    if (priceDisplay) priceDisplay.textContent = '₺0 – ₺3.000';
    document.getElementById('sort-select').value = 'default';
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.toggle('active', b.dataset.category==='all'));
    renderProducts();
  });

  // Cart
  document.getElementById('cart-open-btn')?.addEventListener('click', () => {
    renderCartDrawer();
    document.getElementById('cart-drawer-backdrop').style.display = 'flex';
  });
  document.getElementById('cart-close-btn')?.addEventListener('click', () => {
    document.getElementById('cart-drawer-backdrop').style.display = 'none';
  });
  document.getElementById('cart-drawer-backdrop')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) e.currentTarget.style.display = 'none';
  });
  document.getElementById('cart-checkout-btn')?.addEventListener('click', () => {
    document.getElementById('cart-drawer-backdrop').style.display = 'none';
    openCheckout();
  });

  // Discount
  document.getElementById('apply-discount-btn')?.addEventListener('click', applyDiscount);
  document.getElementById('discount-code-input')?.addEventListener('keydown', e => { if(e.key==='Enter') applyDiscount(); });

  // Wishlist
  document.getElementById('wishlist-open-btn')?.addEventListener('click', () => {
    renderWishlistDrawer();
    document.getElementById('wishlist-drawer-backdrop').style.display = 'flex';
  });
  document.getElementById('wishlist-close-btn')?.addEventListener('click', () => {
    document.getElementById('wishlist-drawer-backdrop').style.display = 'none';
  });
  document.getElementById('wishlist-drawer-backdrop')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) e.currentTarget.style.display = 'none';
  });

  // User Portal
  const userBtn = document.getElementById('user-portal-btn');
  const dropdown = document.getElementById('user-dropdown-menu');
  userBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (state.currentUser) {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    } else {
      openModal('user-portal-modal');
    }
  });
  document.addEventListener('click', () => { if(dropdown) dropdown.style.display = 'none'; });
  document.getElementById('user-orders-btn')?.addEventListener('click', () => { dropdown.style.display='none'; showOrdersModal(); });
  document.getElementById('user-logout-btn')?.addEventListener('click', () => { dropdown.style.display='none'; logoutUser(); });

  // Auth forms
  document.getElementById('customer-login-form')?.addEventListener('submit', handleCustomerLogin);
  document.getElementById('customer-register-form')?.addEventListener('submit', handleCustomerRegister);
  document.getElementById('switch-to-register')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('customer-login-form').style.display = 'none';
    document.getElementById('customer-register-form').style.display = 'block';
    document.getElementById('user-modal-title').textContent = 'Hesap Oluştur';
  });
  document.getElementById('switch-to-login')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('customer-register-form').style.display = 'none';
    document.getElementById('customer-login-form').style.display = 'block';
    document.getElementById('user-modal-title').textContent = 'Giriş Yap';
  });

  // Close modals
  ['modal-close-btn-user','modal-close-btn-orders','modal-close-btn-checkout','modal-close-btn-detail'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      const modalId = btn.closest('.modal-bg')?.id;
      if (modalId) btn.addEventListener('click', () => closeModal(modalId));
    }
  });
  document.querySelectorAll('.modal-bg').forEach(bg => {
    bg.addEventListener('click', e => { if(e.target === bg) bg.style.display = 'none'; });
  });

  // Checkout
  document.getElementById('checkout-address-form')?.addEventListener('submit', handleAddressForm);
  document.getElementById('checkout-payment-form')?.addEventListener('submit', handlePaymentForm);
  document.getElementById('checkout-success-close-btn')?.addEventListener('click', () => {
    closeModal('checkout-modal');
    renderProducts();
  });
  // Card number auto-format
  document.getElementById('checkout-card-number')?.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19);
  });
  document.getElementById('checkout-card-expiry')?.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g,'').replace(/^(\d{2})(\d)/,'$1/$2').slice(0,5);
  });

  // Admin footer link
  document.getElementById('admin-footer-link')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('storefront-wrapper').style.display = 'none';
    document.getElementById('admin-login-wrapper').style.display = 'flex';
  });

  // Admin login
  document.getElementById('admin-login-form')?.addEventListener('submit', handleAdminLogin);

  // Admin sidebar navigation
  document.querySelectorAll('.adm-nav li').forEach(li => {
    li.addEventListener('click', function() { renderAdminTab(this.dataset.tab); });
  });

  // Admin back to store
  ['back-to-store-btn-1','back-to-store-btn-2'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      document.getElementById('storefront-wrapper').style.display = 'block';
      document.getElementById('admin-login-wrapper').style.display = 'none';
      document.getElementById('admin-dashboard-wrapper').style.display = 'none';
      state.isAdminLoggedIn = false;
    });
  });

  // Admin logout
  document.getElementById('admin-logout-btn')?.addEventListener('click', () => {
    state.isAdminLoggedIn = false;
    document.getElementById('admin-dashboard-wrapper').style.display = 'none';
    document.getElementById('admin-login-wrapper').style.display = 'flex';
  });

  // Admin add product
  document.getElementById('admin-add-product-form')?.addEventListener('submit', handleAddProduct);

  // Quiz
  initQuiz();
}
