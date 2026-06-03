/* ===== COMMON.JS – shared data & UI ===== */

const STORAGE_KEY = 'asuphoto_data';
const LINE_URL_DEFAULT = 'https://line.me/ここを差し替え';

/* ── フォント選択肢（各ページのapplyFonts/管理画面で共有） ── */
const FONT_OPTIONS = {
  /* 本文フォント 10種 */
  body: [
    { value: "'Noto Sans JP', sans-serif",        label: 'Noto Sans JP',        sub: '読みやすいゴシック',      google: 'Noto+Sans+JP:wght@400;500;700' },
    { value: "'Noto Serif JP', serif",            label: 'Noto Serif JP',       sub: '上品な明朝体',           google: 'Noto+Serif+JP:wght@400;500;700' },
    { value: "'M PLUS Rounded 1c', sans-serif",   label: 'M PLUS Rounded 1c',   sub: '丸ゴシック・やわらかい',   google: 'M+PLUS+Rounded+1c:wght@400;500;700' },
    { value: "'M PLUS 1p', sans-serif",           label: 'M PLUS 1p',           sub: 'スタンダードゴシック',    google: 'M+PLUS+1p:wght@400;500;700' },
    { value: "'Kosugi Maru', sans-serif",         label: 'Kosugi Maru',         sub: 'ポップな丸ゴシック',      google: 'Kosugi+Maru' },
    { value: "'Sawarabi Gothic', sans-serif",     label: 'Sawarabi Gothic',     sub: 'さわらびゴシック',        google: 'Sawarabi+Gothic' },
    { value: "'Sawarabi Mincho', serif",          label: 'Sawarabi Mincho',     sub: 'さわらび明朝',           google: 'Sawarabi+Mincho' },
    { value: "'Zen Kaku Gothic New', sans-serif", label: 'Zen Kaku Gothic New', sub: '禅角ゴシック',           google: 'Zen+Kaku+Gothic+New:wght@400;500;700' },
    { value: "'Shippori Mincho', serif",          label: 'Shippori Mincho',     sub: 'しっぽり明朝・和風',      google: 'Shippori+Mincho:wght@400;500;700' },
    { value: "'BIZ UDPGothic', sans-serif",       label: 'BIZ UDPGothic',       sub: 'ビジネス向けゴシック',    google: 'BIZ+UDPGothic:wght@400;700' },
  ],
  /* セクションタイトル英字フォント 10種 */
  display: [
    { value: "'Cormorant Garamond', serif",  label: 'Cormorant Garamond', sub: 'エレガントなセリフ',        google: 'Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600' },
    { value: "'Playfair Display', serif",    label: 'Playfair Display',   sub: '上品なセリフ',              google: 'Playfair+Display:ital,wght@0,400;0,600;1,400;1,600' },
    { value: "'Libre Baskerville', serif",   label: 'Libre Baskerville',  sub: 'クラシックなセリフ',         google: 'Libre+Baskerville:ital,wght@0,400;0,700;1,400' },
    { value: "'Lora', serif",                label: 'Lora',               sub: 'やわらかいセリフ',           google: 'Lora:ital,wght@0,400;0,600;1,400;1,600' },
    { value: "'Josefin Sans', sans-serif",   label: 'Josefin Sans',       sub: 'スタイリッシュなサンセリフ',  google: 'Josefin+Sans:ital,wght@0,300;0,400;0,600;1,300' },
    { value: "'Raleway', sans-serif",        label: 'Raleway',            sub: '細くおしゃれなサンセリフ',   google: 'Raleway:ital,wght@0,300;0,400;0,600;1,300' },
    { value: "'Montserrat', sans-serif",     label: 'Montserrat',         sub: 'モダンなサンセリフ',         google: 'Montserrat:ital,wght@0,300;0,400;0,600;1,300' },
    { value: "'EB Garamond', serif",         label: 'EB Garamond',        sub: 'クラシックガラモン',         google: 'EB+Garamond:ital,wght@0,400;0,600;1,400;1,600' },
    { value: "'Cinzel', serif",              label: 'Cinzel',             sub: 'ローマ字風・格調高い',        google: 'Cinzel:wght@400;600;700' },
    { value: "'Great Vibes', cursive",       label: 'Great Vibes',        sub: 'エレガントな筆記体',         google: 'Great+Vibes' },
  ],
  /* キャッチコピーフォント 10種 */
  catch: [
    { value: "'Noto Serif JP', serif",       label: 'Noto Serif JP',      sub: '上品な明朝体',              google: 'Noto+Serif+JP:wght@400;500;700' },
    { value: "'Shippori Mincho', serif",     label: 'Shippori Mincho',    sub: 'しっぽり明朝',              google: 'Shippori+Mincho:wght@400;500;700' },
    { value: "'Zen Old Mincho', serif",      label: 'Zen Old Mincho',     sub: '禅旧明朝',                  google: 'Zen+Old+Mincho:wght@400;500;700' },
    { value: "'Hina Mincho', serif",         label: 'Hina Mincho',        sub: 'ひな明朝・繊細',            google: 'Hina+Mincho' },
    { value: "'Kaisei Decol', serif",        label: 'Kaisei Decol',       sub: 'カイセイデコール',           google: 'Kaisei+Decol:wght@400;500;700' },
    { value: "'Yomogi', cursive",            label: 'Yomogi',             sub: 'よもぎ・手書き風',           google: 'Yomogi' },
    { value: "'Reggae One', cursive",        label: 'Reggae One',         sub: 'レゲエOne・インパクト',      google: 'Reggae+One' },
    { value: "'Dela Gothic One', cursive",   label: 'Dela Gothic One',    sub: 'デラゴシック・太い',         google: 'Dela+Gothic+One' },
    { value: "'Zen Maru Gothic', sans-serif",label: 'Zen Maru Gothic',    sub: '禅丸ゴシック',              google: 'Zen+Maru+Gothic:wght@400;500;700' },
    { value: "'Klee One', cursive",          label: 'Klee One',           sub: 'クレーOne・手書き風',        google: 'Klee+One:wght@400;600' },
  ],
};

/* ── フォント適用（全ページで呼び出す） ── */
function applyFonts() {
  const d = getData();
  const fonts = d.fonts || {};

  const bodyVal    = fonts.body    || FONT_OPTIONS.body[0].value;
  const displayVal = fonts.display || FONT_OPTIONS.display[0].value;
  const catchVal   = fonts.catch   || FONT_OPTIONS.catch[0].value;

  /* CSS変数を上書き */
  const root = document.documentElement;
  root.style.setProperty('--font-body',    bodyVal);
  root.style.setProperty('--font-display', displayVal);
  root.style.setProperty('--font-catch',   catchVal);

  /* 必要なGoogle Fontsを動的ロード */
  const needed = new Set();
  [
    { val: bodyVal,    opts: FONT_OPTIONS.body },
    { val: displayVal, opts: FONT_OPTIONS.display },
    { val: catchVal,   opts: FONT_OPTIONS.catch },
  ].forEach(({ val, opts }) => {
    const opt = opts.find(o => o.value === val);
    if (opt && opt.google) needed.add(opt.google);
  });

  needed.forEach(g => {
    const id = 'gf-' + g.replace(/[^a-zA-Z0-9]/g, '_');
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id   = id;
      link.rel  = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${g}&display=swap`;
      document.head.appendChild(link);
    }
  });
}

/* ── カラーテーマ プリセット ── */
const THEME_PRESETS = [
  {
    id: 'bluegray',
    name: 'ブルーグレー',
    emoji: '🩵',
    bg: '#EEF2F5', surface: '#FFFFFF', text: '#333333',
    textLight: '#6b7a8d', accent: '#5B7FA6',
    headerBg: '#FFFFFF', titleColor: '#2C3E50',
  },
  {
    id: 'beige',
    name: 'ナチュラルベージュ',
    emoji: '🌿',
    bg: '#F5F0EA', surface: '#FFFDF8', text: '#4A3728',
    textLight: '#8a7060', accent: '#8B7355',
    headerBg: '#FFFFFF', titleColor: '#4A3728',
  },
  {
    id: 'white',
    name: 'ホワイト',
    emoji: '🤍',
    bg: '#FFFFFF', surface: '#FFFFFF', text: '#222222',
    textLight: '#888888', accent: '#666666',
    headerBg: '#FFFFFF', titleColor: '#222222',
  },
  {
    id: 'dark',
    name: 'ダークモード',
    emoji: '🌙',
    bg: '#1A1A2E', surface: '#252D3D', text: '#EAEAEA',
    textLight: '#7a8fa8', accent: '#E94560',
    headerBg: '#16213E', titleColor: '#FFFFFF',
  },
  {
    id: 'sakura',
    name: 'さくらピンク',
    emoji: '🌸',
    bg: '#FDF0F3', surface: '#FFF8FA', text: '#4A2030',
    textLight: '#9a6878', accent: '#D4708A',
    headerBg: '#FFFFFF', titleColor: '#4A2030',
  },
];

/* ── hex → rgba 変換ヘルパー ── */
function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0,2), 16);
  const g = parseInt(h.substring(2,4), 16);
  const b = parseInt(h.substring(4,6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ── カラーテーマ適用（全ページで呼び出す） ── */
function applyColors() {
  const d = getData();
  const c = d.colors || {};
  const root = document.documentElement;

  if (c.bg)         root.style.setProperty('--bg',          c.bg);
  if (c.surface)    root.style.setProperty('--surface',     c.surface);
  if (c.text)       root.style.setProperty('--text',        c.text);
  if (c.textLight)  root.style.setProperty('--text-light',  c.textLight);
  if (c.accent)     root.style.setProperty('--accent',      c.accent);
  if (c.titleColor) root.style.setProperty('--title-color', c.titleColor);
  if (c.headerBg)   root.style.setProperty('--header-bg-rgba', hexToRgba(c.headerBg, 0.92));
}

/* ── Data helpers ── */
function getData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch(e) { return {}; }
}

function getImage(key, fallback) {
  const d = getData();
  return (d.images && d.images[key]) ? d.images[key] : fallback;
}

/* ── LINE SVG icon ── */
const LINE_SVG = `<svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
</svg>`;

/* ── Header ── */
function renderHeader(activePage) {
  const links = [
    { href: 'index.html', label: 'Home' },
    { href: 'index.html#plan', label: 'Plan' },
    { href: 'gallery.html', label: 'Gallery' },
    { href: 'index.html#profile', label: 'Profile' },
    { href: 'index.html#faq', label: 'FAQ' },
    { href: 'index.html#line-cta', label: 'Contact' },
  ];
  const navLinks = links.map(l => `<a href="${l.href}">${l.label}</a>`).join('');
  return `
<header>
  <a href="index.html" class="logo">
    <span class="logo-icon">📷</span>
    <span class="logo-text">Asu Photo</span>
  </a>
  <button class="hamburger" id="hamburger" aria-label="メニュー">
    <span></span><span></span><span></span>
  </button>
</header>
<div class="nav-overlay" id="navOverlay"></div>
<nav class="nav-drawer" id="navDrawer" aria-label="ナビゲーション">
  <button class="nav-close" id="navClose" aria-label="閉じる">✕</button>
  ${navLinks}
</nav>`;
}

/* ── Footer ── */
function renderFooter() {
  return `
<footer>
  <p class="footer-logo">Asu Photo</p>
  <p class="footer-info">出張撮影カメラマン｜関東全域</p>
  <div class="footer-links">
    <a href="gallery.html">Gallery</a>
    <a href="index.html#faq">FAQ</a>
    <a href="index.html#line-cta">Contact</a>
    <a href="admin.html">管理</a>
  </div>
  <p class="footer-copy">© 2025 Asu Photo. All rights reserved.</p>
</footer>`;
}

/* ── Fixed CTA ── */
function renderFixedCta() {
  const d = getData();
  const url = d.lineUrl || LINE_URL_DEFAULT;
  return `<div class="fixed-cta"><a href="${url}" target="_blank" rel="noopener">${LINE_SVG}撮影のご予約</a></div>`;
}

/* ── Nav init ── */
function initNav() {
  const ham = document.getElementById('hamburger');
  const drawer = document.getElementById('navDrawer');
  const overlay = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('navClose');

  function open() {
    ham && ham.classList.add('active');
    drawer && drawer.classList.add('open');
    overlay && overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    ham && ham.classList.remove('active');
    drawer && drawer.classList.remove('open');
    overlay && overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  ham && ham.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  overlay && overlay.addEventListener('click', close);
}

/* ── Image resize & encode ── */
function resizeAndEncode(file, callback) {
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const MAX = 1200;
      let w = img.width, h = img.height;
      if (w > MAX || h > MAX) {
        if (w >= h) { h = Math.round(h * MAX / w); w = MAX; }
        else { w = Math.round(w * MAX / h); h = MAX; }
      }
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      callback(c.toDataURL('image/jpeg', 0.85));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

/* ── Toast ── */
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── Carousel ── */
function initCarousel(imageUrls, opts) {
  const outer = document.querySelector('.carousel-outer');
  const track = document.getElementById('carouselTrack');
  if (!outer || !track) return;

  const imgs = imageUrls.filter(Boolean);
  if (!imgs.length) return;

  const vcDesktop = (opts && opts.visCount) || 4;
  function visCount() { return window.innerWidth >= 768 ? vcDesktop : Math.min(2, vcDesktop); }

  let vc = visCount();
  const cloneN = vc;
  const all = [...imgs.slice(-cloneN), ...imgs, ...imgs.slice(0, cloneN)];
  const total = all.length;

  track.innerHTML = '';
  all.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    const im = document.createElement('img');
    im.src = src;
    im.alt = '撮影写真';
    im.loading = i < vc ? 'eager' : 'lazy';
    slide.appendChild(im);
    track.appendChild(slide);
  });

  /* width calculations */
  function applyWidths() {
    vc = visCount();
    track.style.width = `${total / vc * 100}%`;
    document.querySelectorAll('.carousel-slide').forEach(s => {
      s.style.width = `${100 / total}%`;
    });
  }
  applyWidths();

  let idx = cloneN;

  function moveTo(i, animate) {
    const pct = -(i / total * 100);
    const dur = animate ? '0.5s' : '0s';
    const ease = animate ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'linear';
    track.style.webkitTransition = `-webkit-transform ${dur} ${ease}`;
    track.style.transition = `transform ${dur} ${ease}`;
    track.style.webkitTransform = `translateX(${pct}%)`;
    track.style.transform = `translateX(${pct}%)`;
  }

  moveTo(idx, false);

  track.addEventListener('transitionend', () => {
    if (idx >= imgs.length + cloneN) { idx = cloneN; moveTo(idx, false); }
    else if (idx < cloneN) { idx = imgs.length + cloneN - 1; moveTo(idx, false); }
  });

  let timer;
  function next() { idx++; moveTo(idx, true); }
  function start() { timer = setInterval(next, 2000); }
  function stop() { clearInterval(timer); }

  start();

  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : (stop(), start());
  });

  window.addEventListener('resize', () => {
    stop(); applyWidths(); moveTo(idx, false); start();
  });
}
