/* The Hat 06 chart flower from the Sparkling Yuzu archive. The body of
   mountChartFlower is copied as-is from chartFlower in ~/sparklingyuzu/main.js
   (only its .stage lookup becomes the canvas's parent, and its palette is
   black instead of cobalt, and shiftLeft pins the flower to the left edge
   and slides it further left by that fraction of its size); the helpers above it
   are the ones main.js defines, scoped to this one canvas. */

export function mountChartFlower(cv, { shiftLeft = 0 } = {}) {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // size a canvas to its CSS box (only touches the bitmap when the size really changed)
  function fit(cv, maxDpr = 2) {
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const w = Math.max(1, Math.round(cv.clientWidth));
    const h = Math.max(1, Math.round(cv.clientHeight));
    const changed = cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr);
    if (changed) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h, changed };
  }

  const visible = new WeakSet();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
  }, { rootMargin: '150px' });
  const watch = (el) => { if (el) io.observe(el); return el; };
  const isVis = (el) => el && visible.has(el);

  const tickers = [];
  const onTick = (fn) => tickers.push(fn);
  const resizers = [];
  const onResize = (fn) => resizers.push(fn);
  const local = (el, e) => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

    const stage = watch(cv.parentElement);
    // recoloured from the poster's cobalt to black, to sit beside the hero video
    const BLUE = '#000', LINE = '#2b2b2b', PAPER = '#f3f3f1', INK = '#111';
    let W = 0, H = 0, ctx, cols = 0, rows = 0, cs = 0, cells = [], ptr = null, nextStep = 0, drawn = false;

    // smooth value noise, a few octaves
    const hash = (x, y) => { const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return h - Math.floor(h); };
    function vnoise(x, y) {
      const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
      const sx = xf * xf * (3 - 2 * xf), sy = yf * yf * (3 - 2 * yf);
      return lerp(lerp(hash(xi, yi), hash(xi + 1, yi), sx), lerp(hash(xi, yi + 1), hash(xi + 1, yi + 1), sx), sy);
    }
    const fbm = (x, y) => vnoise(x, y) * 0.55 + vnoise(x * 2.1, y * 2.1) * 0.3 + vnoise(x * 4.3, y * 4.3) * 0.15;

    // the flower, in a 1 × 1.33 design space: lobes of the head, a drooping petal, two stems
    const ELL = [[0.49, 0.3, 0.12, 0.15], [0.47, 0.17, 0.05, 0.07], [0.66, 0.42, 0.23, 0.13], [0.55, 0.45, 0.2, 0.15], [0.25, 0.49, 0.12, 0.075]];
    const segDist = (px, py, ax, ay, bx, by) => {
      const vx = bx - ax, vy = by - ay, t = clamp(((px - ax) * vx + (py - ay) * vy) / (vx * vx + vy * vy), 0, 1);
      return Math.hypot(px - ax - vx * t, py - ay - vy * t);
    };
    const STEM = [];
    for (let n = 0; n <= 30; n++) {
      const t = n / 30, a = [0.46, 0.55], c = [0.18, 0.75], e = [0.24, 1.34];
      STEM.push([(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t * t * e[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t * t * e[1]]);
    }
    // signed distance to the flower (negative inside) and how shaded that spot is at rest
    function shape(x, y) {
      let d = 1e9;
      for (const [cx, cy, rx, ry] of ELL) d = Math.min(d, (Math.hypot((x - cx) / rx, (y - cy) / ry) - 1) * Math.min(rx, ry));
      // drooping petal: a fat capsule that swells toward its end
      d = Math.min(d, segDist(x, y, 0.53, 0.56, 0.69, 0.66) - (0.035 + 0.025 * clamp((x - 0.53) / 0.16, 0, 1)));
      for (let n = 0; n < STEM.length - 1; n++) d = Math.min(d, segDist(x, y, ...STEM[n], ...STEM[n + 1]) - 0.016);
      d = Math.min(d, segDist(x, y, 0.37, 0.91, 0.42, 1.34) - 0.009 - 0.014 * clamp((y - 0.91) / 0.4, 0, 1));
      // ragged edges, like a photo traced cell by cell
      return d + (fbm(x * 22, y * 22) - 0.5) * 0.024;
    }

    // wind and bloom, as a warp from where a cell sits back to the spot of the resting flower it shows.
    // the stem is pinned at the bottom and bends more the higher it goes; the head swings,
    // its petals flutter in the gusts, and it slowly opens and closes around its centre
    function warp(x, y, t) {
      const gust = Math.sin(t * 0.8) * 0.03 + Math.sin(t * 1.9 + 1.3) * 0.012 + Math.sin(t * 3.7) * 0.004;
      const lift = clamp((1.34 - y) / 1.05, 0, 1.2);
      let qx = x - gust * lift * lift, qy = y - Math.abs(gust) * lift * lift * 0.25;
      const head = clamp((0.68 - qy) / 0.14, 0, 1);
      if (head > 0) {
        const bloom = 1 + Math.sin(t * 0.55) * 0.05 * head;
        qx = 0.5 + (qx - 0.5) / bloom; qy = 0.42 + (qy - 0.42) / bloom;
        qx -= Math.sin(t * 2.6 + qy * 18) * 0.006 * head;
        qy -= Math.sin(t * 2.2 + qx * 16) * 0.005 * head;
      }
      return [qx, qy];
    }

    function build() {
      ({ ctx, w: W, h: H } = fit(cv));
      cs = Math.max(6, Math.round(W / 88)); cols = Math.ceil(W / cs); rows = Math.ceil(H / cs);
      // fit the 1 × 1.33 design to the stage, centred, its stems running off the bottom
      const sc = Math.min(W, H / 1.18), ox = shiftLeft ? -sc * shiftLeft : (W - sc) / 2, oy = (H - sc * 1.18) / 2 + sc * 0.02;
      cells = [];
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        cells.push({ i, j, x: ((i + 0.5) * cs - ox) / sc, y: ((j + 0.5) * cs - oy) / sc, lv: -1, stitch: 0 });
      }
      drawn = false;
    }

    // tone → chart symbol: -1 background, 0 plain, 1 fine dots, 2 centre dot, 3 cross, 4 hollow square, 5 blue gap
    const LEVELS = [0.34, 0.46, 0.53, 0.64, 0.86];
    function level(c, t) {
      // skip the far background quickly: nothing of the flower reaches out there
      if (c.x < 0.04 || c.x > 0.98 || c.y < 0.04) return -1;
      const [x, y] = warp(c.x, c.y, t);
      const d = shape(x, y);
      if (d > 0) return -1;
      if (c.stitch > 0) return 3;
      // deeper in the head and lower down reads darker, the upper-left lobes catch the light
      const base = clamp(0.25 + (y - 0.3) * 0.9 + (x < 0.36 ? -0.08 : 0) + Math.min(0.2, -d * 4) * 0.2, 0, 1);
      // the mottling is fixed to the petals, so it travels with them; it also drifts a little on its own
      const n = fbm(x * 9 + t * 0.03, y * 9) * 0.75 + fbm(x * 26, y * 26 - t * 0.02) * 0.25;
      // stretch the noise so the petals mottle hard, the way a traced photo does
      const v = base * 0.4 + clamp((n - 0.5) * 2.3 + 0.5, 0, 1) * 0.72;
      let lv = 0;
      while (lv < LEVELS.length && v > LEVELS[lv]) lv++;
      return lv;
    }

    function grid() {
      ctx.fillStyle = BLUE; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = LINE; ctx.lineWidth = 1; ctx.beginPath();
      for (let i = 0; i <= cols; i++) { ctx.moveTo(i * cs + 0.5, 0); ctx.lineTo(i * cs + 0.5, H); }
      for (let j = 0; j <= rows; j++) { ctx.moveTo(0, j * cs + 0.5); ctx.lineTo(W, j * cs + 0.5); }
      ctx.stroke();
    }
    function cell(c) {
      const x = c.i * cs, y = c.j * cs, m = cs * 0.2;
      if (c.lv === -1) {
        ctx.fillStyle = BLUE; ctx.fillRect(x, y, cs + 0.5, cs + 0.5);
        ctx.strokeStyle = LINE; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, cs, cs);
        return;
      }
      if (c.lv === 5) {
        ctx.fillStyle = BLUE; ctx.fillRect(x + 1, y + 1, cs - 1, cs - 1);
        return;
      }
      ctx.fillStyle = PAPER; ctx.fillRect(x, y, cs + 0.5, cs + 0.5);
      ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineWidth = Math.max(1, cs * 0.12);
      if (c.lv === 1) {
        const q = Math.max(1, cs * 0.12);
        for (const a of [0.3, 0.7]) for (const b of [0.3, 0.7]) ctx.fillRect(x + cs * a - q / 2, y + cs * b - q / 2, q, q);
      } else if (c.lv === 2) {
        const q = Math.max(1.5, cs * 0.24); ctx.fillRect(x + (cs - q) / 2 + 0.5, y + (cs - q) / 2 + 0.5, q, q);
      } else if (c.lv === 3) {
        ctx.beginPath(); ctx.moveTo(x + m, y + m); ctx.lineTo(x + cs - m, y + cs - m); ctx.moveTo(x + cs - m, y + m); ctx.lineTo(x + m, y + cs - m); ctx.stroke();
      } else if (c.lv === 4) {
        ctx.strokeRect(x + m, y + m, cs - 2 * m, cs - 2 * m);
      }
    }

    // re-chart every cell, repainting only the ones whose symbol changed
    function step(t) {
      for (const c of cells) {
        const lv = level(c, t);
        if (lv !== c.lv) { c.lv = lv; cell(c); }
      }
    }

    stage.addEventListener('pointermove', (e) => { ptr = local(stage, e); });
    stage.addEventListener('pointerleave', () => { ptr = null; });
    onResize(() => { if (W) build(); });

    onTick((now) => {
      if (!isVis(stage)) return;
      if (!W) build();
      const t = reduce ? 0 : now / 1000;
      if (!drawn) { grid(); for (const c of cells) c.lv = -1; step(t); drawn = true; return; }
      if (reduce || now < nextStep) return;
      nextStep = now + 70;
      if (ptr) {
        const ci = ptr.x / cs, cj = ptr.y / cs;
        for (const c of cells) if (Math.hypot(c.i + 0.5 - ci, c.j + 0.5 - cj) < 2.2) c.stitch = 1;
      }
      for (const c of cells) if (c.stitch > 0) c.stitch = Math.max(0, c.stitch - 0.04);
      step(t);
    });

  let raf = requestAnimationFrame(function loop(now) {
    for (let i = 0; i < tickers.length; i++) tickers[i](now);
    raf = requestAnimationFrame(loop);
  });
  const ro = new ResizeObserver(() => resizers.forEach((f) => f()));
  ro.observe(cv);
  return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
}
