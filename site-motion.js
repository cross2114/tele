(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const design = document.querySelector('#design > div');
  const layout = design || document.body;
  const protectedLayers = '.vision, .vision__art, .why__background, .why__lines, .story-wave';
  const metrics = new Map();
  const targets = new Set();
  const hoverCards = new Set();
  const hoveredImages = new WeakSet();
  const logoGroups = [...document.querySelectorAll('[data-name="LOGO"], header > a:first-child')];

  // Clean old state before activating the common system. No script means content stays visible.
  document.querySelectorAll('.reveal.pending, .motion-target.waiting').forEach(e => e.classList.remove('pending', 'waiting'));
  root.classList.remove('js-motion');

  function box(element) {
    if (!metrics.has(element)) {
      const style = getComputedStyle(element);
      metrics.set(element, { style, width: element.offsetWidth, height: element.offsetHeight });
    }
    return metrics.get(element);
  }
  function protectedElement(element) { return !!element.closest(protectedLayers); }
  function ancestorIn(element, set) {
    for (let p = element.parentElement; p && p !== layout; p = p.parentElement) if (set.has(p)) return p;
    return null;
  }
  function addTarget(element) {
    if (!element || protectedElement(element)) return;
    const { style, width, height } = box(element);
    if (style.display === 'contents' || style.display === 'none' || !width || !height) return;
    targets.add(element);
  }

  document.querySelectorAll('.grid > article, .detail-cards > article, .download-grid > article, .faq-list > details, .stats > div, .benefits > article').forEach(e => hoverCards.add(e));
  if (design) {
    design.querySelectorAll('div').forEach(e => {
      if (protectedElement(e) || e.closest('[data-name="LOGO"]')) return;
      const { style, width, height } = box(e);
      if (style.display === 'contents' || width < 150 || width > 1000 || height < 100 || height > 1100) return;
      const hasPanel = style.backgroundColor !== 'rgba(0, 0, 0, 0)' || parseFloat(style.borderTopWidth) > 0;
      if (hasPanel && parseFloat(style.borderTopLeftRadius) >= 8 && e.querySelector('p,h1,h2,h3')) hoverCards.add(e);
    });
  }
  const cards = [...hoverCards].filter(e => !ancestorIn(e, hoverCards) && !protectedElement(e));
  hoverCards.clear();
  cards.forEach(e => {
    hoverCards.add(e);
    e.classList.add('motion-card');
    e.dataset.hoverSurface = '';
    if (box(e).style.translate === 'none' && box(e).style.position !== 'sticky') e.classList.add('can-lift');
    addTarget(e);
  });

  const text = design
    ? design.querySelectorAll('p, h1, h2, h3, .real-contact-form label, .real-contact-form button')
    : document.querySelectorAll('h1,h2,h3,main p,main small,.hero p,.hero .button,.simple-hero p,.simple-hero .button,.app-tabs button,.simple-hero input');
  text.forEach(e => {
    if (e.textContent.trim() || e.matches('input')) addTarget(e);
  });
  document.querySelectorAll('.wordmark,footer .footer-grid > div,footer .copyright').forEach(addTarget);
  document.querySelectorAll('header nav a, header .contact').forEach(addTarget);
  logoGroups.forEach(e => { e.classList.add('motion-logo'); e.dataset.hoverSurface = ''; addTarget(e); });

  function registerImage(image) {
    if (hoveredImages.has(image) || protectedElement(image) || logoGroups.some(e => e.contains(image))) return;
    const { width, height, style } = box(image);
    if (width < 7 || height < 7) return; // Hairlines, dots and structural connectors retain their geometry.
    hoveredImages.add(image);
    const aspect = width / height;
    const svg = /\.svg(?:\?|$)/i.test(image.getAttribute('src') || '');
    const small = width <= 100 && height <= 100;
    const wideLogo = aspect > 3 && aspect < 10 && height < 80;
    const backdrop = image.classList.contains('hero-image') || (width >= 1200 && height >= 600);
    if (aspect > 12 || (svg && height < 8)) return;
    if (style.scale === 'none') {
      if (small) image.classList.add('motion-icon');
      else if (wideLogo) image.classList.add('motion-logo');
      else if (!backdrop && !svg) image.classList.add('motion-media');
    }
    if (style.filter === 'none' && !small) image.classList.add('motion-tone');
    const surface = image.parentElement;
    if (surface && !surface.matches('body,#design') && surface !== design) surface.dataset.hoverSurface = '';
    if (backdrop || wideLogo) image.dataset.enterStill = '';
    if (image.closest('header')) image.dataset.enterStill = '';
    addTarget(image);
  }
  document.querySelectorAll('img').forEach(image => registerImage(image));

  // One entrance per visual unit. A card's children move with the card, rather than double-fading.
  const elements = [...targets].filter(e => !ancestorIn(e, targets));
  elements.forEach(e => {
    const style = box(e).style;
    e.classList.add('motion-enter');
    e.style.setProperty('--enter-opacity', style.opacity);
    if (style.translate === 'none' && style.position !== 'sticky' && !e.hasAttribute('data-enter-still')) e.classList.add('enter-moves');
    if (e.matches('img')) e.style.setProperty('--enter-distance', '14px');
    e.dataset.enterState = 'entered';
  });
  root.classList.add('site-motion', 'motion-preparing');

  function reveal(element, delay = 0) {
    element.style.setProperty('--enter-delay', `${delay}ms`);
    element.dataset.enterState = 'entered';
    observer?.unobserve(element);
    setTimeout(() => element.style.setProperty('--enter-delay', '0ms'), 760 + delay);
  }
  let observer = null;
  if (!reduced.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
        .forEach((entry, index) => reveal(entry.target, (index % 6) * 55));
    }, { threshold: .025, rootMargin: '0px 0px -20px 0px' });
    elements.forEach(e => {
      if (e.getBoundingClientRect().bottom <= 0) return;
      e.dataset.enterState = 'pending';
      observer.observe(e);
    });
  }
  document.addEventListener('focusin', event => {
    const element = event.target.closest('[data-enter-state="pending"]');
    if (element) reveal(element);
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      observer?.disconnect();
      elements.forEach(e => { e.dataset.enterState = 'entered'; e.style.setProperty('--enter-delay', '0ms'); });
    }
  });
  // Late-loading media can receive hover feedback without re-running page-wide entrance setup.
  document.querySelectorAll('img').forEach(image => {
    if (!image.complete) image.addEventListener('load', () => { metrics.delete(image); registerImage(image); }, { once: true });
  });
  // Commit the initial hidden state before enabling transitions, avoiding a first-frame flash.
  void root.offsetHeight;
  root.classList.remove('motion-preparing');
  root.dataset.motionReady = '';
})();
