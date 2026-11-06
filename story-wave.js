(() => {
  const host = document.querySelector('.story-wave');
  if (!host) return;

  // A projected particle surface fits this quiet grayscale composition without a 3D dependency.
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d');
  if (!ctx) return; // Preserve the original image when Canvas is unavailable.
  host.append(canvas);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const width = 1920;
  const height = 1080;
  let seed = 91825;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const nodes = [];
  const cols = 23;
  const rows = 6;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      nodes.push({
        u: (col + (random() - .5) * .95) / (cols - 1),
        v: (row + (random() - .5) * .8) / (rows - 1),
        phase: random() * Math.PI * 2,
        radius: 1.7 + random() * 2.4,
        depth: random(),
      });
    }
  }
  const edges = [];
  nodes.forEach((node, i) => {
    const col = i % cols;
    if (col < cols - 1 && random() > .15) edges.push([i, i + 1]);
    if (i + cols < nodes.length && random() > .3) edges.push([i, i + cols]);
    if (col < cols - 1 && i + cols + 1 < nodes.length && random() > .45) edges.push([i, i + cols + 1]);
  });
  const motes = Array.from({ length: 55 }, () => ({
    u: random(), v: .42 + random() * .56,
    phase: random() * Math.PI * 2,
    radius: 2 + random() * 4,
    alpha: .08 + random() * .15,
  }));
  const softDot = document.createElement('canvas');
  softDot.width = softDot.height = 40;
  const dot = softDot.getContext('2d');
  const glow = dot.createRadialGradient(20, 20, 0, 20, 20, 20);
  glow.addColorStop(0, 'rgba(60,65,70,.65)');
  glow.addColorStop(.25, 'rgba(60,65,70,.32)');
  glow.addColorStop(1, 'rgba(60,65,70,0)');
  dot.fillStyle = glow;
  dot.fillRect(0, 0, 40, 40);

  let visible = false;
  let frame = 0;
  let lastDraw = 0;
  let previous = 0;
  let time = 0;
  let frames = 0;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function surface(u, v, t) {
    return Math.sin(u * Math.PI * 3.8 + v * 2.5 - t * .36) * (71 + v * 28)
      + Math.sin(u * Math.PI * 1.7 - v * 4.4 + t * .23) * 49
      + Math.cos(u * Math.PI * 7 + v * 3 + t * .18) * 13;
  }

  function project(u, v, t, spread = 118) {
    const x = -95 + u * (width + 190) + (v - .5) * 44 + pointer.x * (v - .2) * 13;
    const y = height * .77 + (v - .5) * spread + surface(u, v, t) + pointer.y * 9;
    return [x, y];
  }

  function draw(t) {
    pointer.x += (pointer.targetX - pointer.x) * .055;
    pointer.y += (pointer.targetY - pointer.y) * .055;
    ctx.clearRect(0, 0, width, height);

    // Dense, perspective-like dot rows form the flowing cloth; batch each row into one path.
    const pointCols = canvas.width < 800 ? 118 : 164;
    const pointRows = 38;
    for (let row = 0; row < pointRows; row++) {
      const v = row / (pointRows - 1);
      const radius = .73 + v * .48;
      ctx.fillStyle = `rgba(75,81,87,${.17 + Math.sin(v * Math.PI) * .24})`;
      ctx.beginPath();
      for (let col = 0; col < pointCols; col++) {
        const u = col / (pointCols - 1);
        const [x, y] = project(u, v, t);
        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, radius, 0, Math.PI * 2);
      }
      ctx.fill();
    }

    // A few fine continuous strands reinforce the wave's depth without becoming a solid mesh.
    ctx.lineWidth = .6;
    ctx.strokeStyle = 'rgba(100,106,112,.095)';
    for (let row = 0; row < pointRows; row += 5) {
      ctx.beginPath();
      for (let col = 0; col < pointCols; col++) {
        const [x, y] = project(col / (pointCols - 1), row / (pointRows - 1), t);
        if (col) ctx.lineTo(x, y); else ctx.moveTo(x, y);
      }
      ctx.stroke();
    }

    const positions = nodes.map(n => {
      const [x, y] = project(n.u, n.v, t, 270);
      return [x + Math.sin(t * .22 + n.phase) * 9, y + Math.cos(t * .19 + n.phase) * 17];
    });
    ctx.lineWidth = .85;
    ctx.strokeStyle = 'rgba(112,119,125,.19)';
    ctx.beginPath();
    edges.forEach(([a, b]) => {
      const p = positions[a], q = positions[b];
      ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]);
    });
    ctx.stroke();

    nodes.forEach((node, i) => {
      const [x, y] = positions[i];
      if (node.depth < .3) {
        ctx.globalAlpha = .3;
        const r = node.radius * 2.4;
        ctx.drawImage(softDot, x - r, y - r, r * 2, r * 2);
        ctx.globalAlpha = 1;
      } else {
        ctx.fillStyle = `rgba(84,91,97,${.2 + node.depth * .28})`;
        ctx.beginPath(); ctx.arc(x, y, node.radius, 0, Math.PI * 2); ctx.fill();
      }
    });
    motes.forEach(m => {
      const x = m.u * width + Math.sin(t * .14 + m.phase) * 19;
      const y = m.v * height + Math.cos(t * .12 + m.phase) * 15;
      const r = m.radius * 2.1;
      ctx.globalAlpha = m.alpha;
      ctx.drawImage(softDot, x - r, y - r, r * 2, r * 2);
    });
    ctx.globalAlpha = 1;
    host.classList.add('story-wave--ready');
    frames++;
    if (frames % 15 === 0) canvas.dataset.frame = String(frames);
  }

  function tick(now) {
    frame = 0;
    if (!visible || document.hidden || reduced.matches) { previous = 0; return; }
    if (now - lastDraw >= 1000 / 30) {
      if (previous) time += Math.min((now - previous) / 1000, .1);
      previous = now;
      lastDraw = now;
      draw(time);
    }
    frame = requestAnimationFrame(tick);
  }

  function start() {
    if (!frame && visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
  }

  function resize() {
    const rect = host.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    draw(time);
    start();
  }

  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) { previous = 0; draw(time); start(); }
    else { cancelAnimationFrame(frame); frame = 0; previous = 0; }
  }, { threshold: .01 });
  observer.observe(host);
  new ResizeObserver(resize).observe(host);
  addEventListener('resize', resize, { passive: true });
  addEventListener('pointermove', event => {
    if (!visible || reduced.matches || event.pointerType !== 'mouse') return;
    const rect = host.getBoundingClientRect();
    pointer.targetX = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    pointer.targetY = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; previous = 0; }
    else start();
  });
  reduced.addEventListener('change', () => {
    cancelAnimationFrame(frame); frame = 0; previous = 0;
    draw(time);
    start();
  });
  resize();
})();
