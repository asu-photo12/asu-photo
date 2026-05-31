/* ===== COMMON.JS – shared data & UI ===== */

const STORAGE_KEY = 'asuphoto_data';
const LINE_URL_DEFAULT = 'https://line.me/ここを差し替え';

/* ── フォント選択肢 ── */
const FONT_OPTIONS = {
  body: [
    { value: "'Noto Sans JP', sans-serif",         label: 'Noto Sans JP（デフォルト）',   google: 'Noto+Sans+JP:wght@400;500;700' },
    { value: "'Noto Serif JP', serif",             label: 'Noto Serif JP（明朝体）',      google: 'Noto+Serif+JP:wght@400;500;700' },
    { value: "'M PLUS Rounded 1c', sans-serif",    label: 'M PLUS Rounded 1c（丸ゴシック）', google: 'M+PLUS+Rounded+1c:wght@400;500;700' },
    { value: "'Zen Maru Gothic', sans-serif",      label: 'Zen Maru Gothic（丸ゴシック）',  google: 'Zen+Maru+Gothic:wght@400;500;700' },
    { value: "'Shippori Mincho', serif",           label: 'しっぽり明朝',                  google: 'Shippori+Mincho:wght@400;500;700' },
    { value: "'BIZ UDPGothic', sans-serif",        label: 'BIZ UDPGothic',               google: 'BIZ+UDPGothic:wght@400;700' },
    { value: "'Zen Kaku Gothic New', sans-serif",  label: 'Zen Kaku Gothic New',         google: 'Zen+Kaku+Gothic+New:wght@400;500;700' },
    { value: "'Kaisei Decol', serif",              label: 'Kaisei Decol（明朝系デコ）',    google: 'Kaisei+Decol:wght@400;500;700' },
  ],
  display: [
    { value: "'Cormorant Garamond', serif",   label: 'Cormorant Garamond（デフォルト）', google: 'Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600' },
    { value: "'Playfair Display', serif",     label: 'Playfair Display',               google: 'Playfair+Display:ital,wght@0,400;0,600;1,400;1,600' },
    { value: "'EB Garamond', serif",          label: 'EB Garamond',                    google: 'EB+Garamond:ital,wght@0,400;0,600;1,400;1,600' },
    { value: "'Lora', serif",                 label: 'Lora',                           google: 'Lora:ital,wght@0,400;0,600;1,400;1,600' },
    { value: "'Libre Baskerville', serif",    label: 'Libre Baskerville',              google: 'Libre+Baskerville:ital,wght@0,400;0,700;1,400' },
    { value: "'DM Serif Display', serif",     label: 'DM Serif Display',               google: 'DM+Serif+Display:ital@0;1' },
  ],
  catch: [
    { value: "'Noto Sans JP', sans-serif",                                                            label: 'Noto Sans JP（デフォルト）',    google: null },
    { value: "'砧丸丸ゴシック B','砧丸丸ゴシックB','Hiragino Maru Gothic Pro',sans-serif",              label: '砧丸丸ゴシックB（システム）',  google: null },
    { value: "'M PLUS Rounded 1c', sans-serif",                                                       label: 'M PLUS Rounded 1c（丸ゴシック）', google: 'M+PLUS+Rounded+1c:wght@400;500;700' },
    { value: "'Zen Maru Gothic', sans-serif",                                                         label: 'Zen Maru Gothic（丸ゴシック）',   google: 'Zen+Maru+Gothic:wght@400;500;700' },
    { value: "'Noto Serif JP', serif",                                                                label: 'Noto Serif JP（明朝体）',          google: 'Noto+Serif+JP:wght@400;500;700' },
    { value: "'Shippori Mincho', serif",                                                              label: 'しっぽり明朝',                     google: 'Shippori+Mincho:wght@400;500;700' },
    { value: "'Kaisei Decol', serif",                                                                 label: 'Kaisei Decol（明朝系デコ）',       google: 'Kaisei+Decol:wght@400;500;700' },
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
function initCarousel(imageUrls) {
  const outer = document.querySelector('.carousel-outer');
  const track = document.getElementById('carouselTrack');
  if (!outer || !track) return;

  const imgs = imageUrls.filter(Boolean);
  if (!imgs.length) return;

  function visCount() { return window.innerWidth >= 768 ? 4 : 2; }

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
