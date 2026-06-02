export function setupReveal() {
  if (typeof window === "undefined") return;
  const items = Array.from(document.querySelectorAll(".reveal-in"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  items.forEach((item) => observer.observe(item));

  const aboutSection = document.querySelector<HTMLElement>(".about-section");
  if (!aboutSection || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  aboutSection.classList.add("is-scroll-bound");

  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
  let ticking = false;

  const updateAboutScroll = () => {
    ticking = false;
    const rect = aboutSection.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const range = Math.max(1, rect.height - viewport);
    const progress = clamp(-rect.top / range);
    const logo = easeOutCubic(clamp((progress - 0.1) / 0.3));
    const panelRaw = clamp((progress - 0.16) / 0.5);
    const panel = easeOutCubic(panelRaw);

    aboutSection.style.setProperty("--about-logo", logo.toFixed(4));
    aboutSection.style.setProperty("--about-panel", panel.toFixed(4));
  };

  const requestAboutScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateAboutScroll);
  };

  updateAboutScroll();
  window.addEventListener("scroll", requestAboutScroll, { passive: true });
  window.addEventListener("resize", requestAboutScroll);
}
