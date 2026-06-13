// Kopines — small interactions

// Header switches to cream once past the hero
const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');

const onScroll = () => {
  const past = window.scrollY > (hero ? hero.offsetHeight - 90 : 80);
  header.classList.toggle('scrolled', past);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile hamburger menu
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

const setMenu = (open) => {
  header.classList.toggle('nav-open', open);
  document.body.classList.toggle('no-scroll', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};

navToggle.addEventListener('click', () => setMenu(!header.classList.contains('nav-open')));
mainNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

// Reveal sections and cards as they enter the viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Make sure the muted lifestyle video actually plays once it's on screen
const video = document.querySelector('.life-grid video');
if (video) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.25 }
  );
  videoObserver.observe(video);
}

// ============================================================
// Language toggle (EN / ქართული)
// Translatable chrome carries a data-ka attribute holding the
// Georgian markup; the English source stays in the element and is
// captured on load. Product descriptions are translated via the
// dictionary below, keyed by the card's English product name.
// ============================================================
const PRODUCT_DESC_EN = {
  'Cheesecake': 'Cream cheese filling on a biscuit base',
  'Honey Cake': 'Honey layers with condensed-milk cream',
  'Almond Cake': 'Almond-flour layers with buttercream',
  'Paris-Brest': 'Choux pastry with praline cream',
  'Napoleon': 'Classic Napoleon with pastry cream (2 portions)',
  'Choux Classic': 'French choux with custard cream',
  'Eclair': 'Eclair with custard cream and a milk-chocolate glaze',
  'Carrot Cake': 'Carrot cake with walnuts and cream-cheese frosting',
  'Apple Cake': 'Apple cake with cinnamon (vegan)',
  'Brownie': 'Brownie with chocolate chunks and hazelnuts',
  'Zebra Cake': 'Zebra loaf with hazelnuts and milk chocolate',
  'Cinnamon Rolls': 'Cinnamon roll with cream-cheese frosting',
  'Truffle Cookies': 'Butter cookies rolled in cocoa',
  'Tiramisu': 'Classic Italian tiramisu with mascarpone cream',
  'Pistachio Tiramisu': 'Tiramisu with mascarpone and pistachio cream',
};

(() => {
  const translatable = document.querySelectorAll('[data-ka]');
  // capture the English source once
  translatable.forEach((el) => { el.dataset.en = el.innerHTML; });

  // product descriptions: capture Georgian (in markup) + map English by name
  const descs = [...document.querySelectorAll('.product-grid .card .desc')];
  descs.forEach((d) => {
    d.dataset.ka = d.innerHTML;
    const h3 = d.closest('.card').querySelector('h3');
    const name = h3 && h3.firstChild ? h3.firstChild.textContent.trim() : '';
    d.dataset.en = PRODUCT_DESC_EN[name] || d.innerHTML;
  });

  const buttons = document.querySelectorAll('.lang-btn');

  const apply = (lang) => {
    document.documentElement.lang = lang;
    translatable.forEach((el) => {
      el.innerHTML = lang === 'ka' ? el.dataset.ka : el.dataset.en;
    });
    descs.forEach((d) => {
      d.innerHTML = lang === 'ka' ? d.dataset.ka : d.dataset.en;
      d.lang = lang;
    });
    buttons.forEach((b) => {
      const active = b.dataset.lang === lang;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    try { localStorage.setItem('kopines-lang', lang); } catch (e) {}
  };

  // default: saved choice → browser language → English
  let initial = 'en';
  try { initial = localStorage.getItem('kopines-lang'); } catch (e) {}
  if (!initial) initial = (navigator.language || '').toLowerCase().startsWith('ka') ? 'ka' : 'en';

  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.lang)));
  apply(initial);
})();
