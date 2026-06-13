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
