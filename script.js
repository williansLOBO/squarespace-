(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuLinks = mobileMenu.querySelectorAll('a');

  function setMenu(open) {
    menuButton.classList.toggle('active', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  }
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  menuLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 640) setMenu(false); });

  const domainForm = document.querySelector('.domain-search');
  domainForm.addEventListener('submit', event => {
    event.preventDefault();
    const value = document.querySelector('#domain').value.trim();
    if (value) {
      const clean = value.replace(/^https?:\/\//, '').replace(/\s+/g, '');
      document.querySelector('#domain').value = clean.includes('.') ? clean : `${clean}.com`;
      document.querySelector('#domain').blur();
    }
  });

  // Lucide icons
  const renderIcons = () => { if (window.lucide) window.lucide.createIcons(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderIcons);
  else renderIcons();

  // GSAP + ScrollTrigger: reveals suaves e movimento editorial.
  window.addEventListener('load', () => {
    if (!window.gsap || !window.ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-copy > *', { y: 28, opacity: 0, duration: 1, stagger: .12, ease: 'power3.out', delay: .15 });
    gsap.utils.toArray('.section-heading, .feature-heading, .feature-card, .ai-panel, .faq details').forEach((element) => {
      gsap.from(element, {
        y: 35, opacity: 0, duration: .8, ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true }
      });
    });
    gsap.to('.hero-image', {
      yPercent: 14, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.from('.intro-card', {
      y: 70, rotate: 0, opacity: 0, stagger: .12, duration: 1,
      scrollTrigger: { trigger: '.intro-art', start: 'top 78%', once: true }
    });
    gsap.from('.community-gallery img', {
      y: 35, opacity: 0, stagger: .08, duration: .7,
      scrollTrigger: { trigger: '.community-gallery', start: 'top 85%', once: true }
    });
  });
})();