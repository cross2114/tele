(() => {
  const story = document.querySelector('[data-brand-story]');
  if (!story) return;
  const vision = story.querySelector('.vision');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let visible = true;
  let panelHeight = 0;
  let pinTop = 0;

  function measure() {
    panelHeight = vision.offsetHeight;
    pinTop = parseFloat(getComputedStyle(vision).top) || 0;
    schedule();
  }

  function render() {
    frame = 0;
    if (!visible || media.matches) return;
    const rect = story.getBoundingClientRect();
    const travel = Math.max(1, innerHeight * .45);
    const progress = Math.max(0, Math.min(1, (pinTop - rect.top) / travel));
    const eased = progress * progress * (3 - 2 * progress);
    // Begin below the copy, then lift the smaller blurred artwork through the pinned scene.
    // The blue panel keeps its normal upward cover motion independently.
    const drift = panelHeight * (.4 - .58 * eased);
    const coverProgress = Math.max(0, Math.min(1, (pinTop - rect.top) / (panelHeight + innerHeight * .32)));
    story.style.setProperty('--vision-drift', `${drift.toFixed(2)}px`);
    story.style.setProperty('--copy-drift', `${(-panelHeight * .035 * coverProgress).toFixed(2)}px`);
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(render);
  }

  const visibility = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) schedule();
  }, { rootMargin: '200px' });
  visibility.observe(story);
  new ResizeObserver(measure).observe(vision);
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', measure, { passive: true });
  media.addEventListener('change', () => {
    if (media.matches) {
      story.style.removeProperty('--vision-drift');
      story.style.removeProperty('--copy-drift');
    }
    measure();
  });
  measure();
})();
