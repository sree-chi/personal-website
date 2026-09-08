import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Canvas-based particle intro.
 *
 * Props:
 *   onComplete — called when fade-out finishes
 *   fast       — shorter phase durations for use as a nav transition
 *
 * Full intro timing  (fast=false): dot 700 | assemble 1600 | glow 1200 | fade 800  ≈ 4.3s
 * Transition timing  (fast=true) : dot 300 | assemble  900 | glow  600 | fade 600  ≈ 2.4s
 */
const IntroAnimation = ({ onComplete, fast = false }) => {
  const canvasRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  const DOT_MS      = fast ?  300 :  700;
  const ASSEMBLE_MS = fast ?  900 : 1600;
  const GLOW_MS     = fast ?  600 : 1200;   // ← extended glow (was 500)
  const FADE_STEP   = fast ? 0.035 : 0.025;

  const samplePixels = useCallback(async (cx, cy) => {
    await document.fonts.ready;
    const fontSize = 160;
    const oc = document.createElement('canvas');
    oc.width = 640; oc.height = 320;
    const oc2 = oc.getContext('2d');
    oc2.fillStyle = '#fff';
    oc2.font = `700 ${fontSize}px "Noto Sans Telugu", sans-serif`;
    oc2.textAlign = 'center';
    oc2.textBaseline = 'middle';
    oc2.fillText('శ్రీ', oc.width / 2, oc.height / 2);
    const { data } = oc2.getImageData(0, 0, oc.width, oc.height);
    const pts = [];
    const gap = 5;
    for (let y = 0; y < oc.height; y += gap)
      for (let x = 0; x < oc.width; x += gap)
        if (data[(y * oc.width + x) * 4 + 3] > 100)
          pts.push({ tx: cx + x - oc.width / 2, ty: cy + y - oc.height / 2 });
    return pts;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth, H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    const cx = W / 2, cy = H / 2;
    const lerp = (a, b, t) => a + (b - a) * t;

    let rafId, particles = [];
    let phase = 'dot', phaseStart = performance.now(), fadeStarted = false;

    samplePixels(cx, cy).then(pts => {
      particles = pts.map(p => ({
        x: cx, y: cy,
        vx: (Math.random() - 0.5) * 22,
        vy: (Math.random() - 0.5) * 22,
        tx: p.tx, ty: p.ty,
        r: Math.random() * 1.6 + 0.4,
        settled: 0,
      }));

      const draw = (now) => {
        const dt = now - phaseStart;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#080813';
        ctx.fillRect(0, 0, W, H);

        /* ── DOT ── */
        if (phase === 'dot') {
          const pulse = 0.5 + 0.5 * Math.sin((dt / DOT_MS) * Math.PI * 4);
          const r = 5 + pulse * 3;
          const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
          grd.addColorStop(0, `rgba(251,191,36,${0.18 + pulse * 0.12})`);
          grd.addColorStop(1, 'rgba(251,191,36,0)');
          ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2);
          ctx.fillStyle = grd; ctx.fill();
          ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.shadowBlur = 18; ctx.shadowColor = '#fbbf24';
          ctx.fill(); ctx.shadowBlur = 0;

          if (dt > DOT_MS) {
            phase = 'assemble'; phaseStart = now;
            particles.forEach(p => {
              const angle = Math.random() * Math.PI * 2;
              const spd = Math.random() * 10 + 5;
              p.vx = Math.cos(angle) * spd;
              p.vy = Math.sin(angle) * spd;
              p.x = cx; p.y = cy;
            });
          }

        /* ── ASSEMBLE ── */
        } else if (phase === 'assemble') {
          const progress = Math.min(dt / ASSEMBLE_MS, 1);
          const k = 0.035 + progress * 0.085;
          const damp = 0.80 + progress * 0.06;
          let allClose = true;

          particles.forEach(p => {
            const dx = p.tx - p.x, dy = p.ty - p.y;
            p.vx = (p.vx + dx * k) * damp;
            p.vy = (p.vy + dy * k) * damp;
            p.x += p.vx; p.y += p.vy;
            const dist = Math.hypot(dx, dy);
            p.settled = Math.max(0, Math.min(1, 1 - dist / 80));
            if (dist > 2.5) allClose = false;

            const rv = lerp(140, 251, p.settled);
            const gv = lerp(60, 191, p.settled);
            const bv = lerp(240, 36, p.settled);
            const size = p.r * lerp(2.2, 1, p.settled);
            ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rv|0},${gv|0},${bv|0},${lerp(0.25, 1, p.settled)})`;
            if (p.settled > 0.7) { ctx.shadowBlur = 5; ctx.shadowColor = 'rgba(251,191,36,0.5)'; }
            ctx.fill(); ctx.shadowBlur = 0;
          });

          if (allClose || dt > ASSEMBLE_MS + 300) { phase = 'glow'; phaseStart = now; }

        /* ── GLOW ── */
        } else if (phase === 'glow') {
          const t = Math.min(dt / GLOW_MS, 1);

          particles.forEach(p => {
            ctx.beginPath(); ctx.arc(p.tx, p.ty, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(251,191,36,${lerp(0.85, 1, t)})`;
            ctx.shadowBlur = lerp(6, 24, t);
            ctx.shadowColor = '#fbbf24';
            ctx.fill(); ctx.shadowBlur = 0;
          });

          // Shockwave rings
          if (t > 0.2) {
            const rt = (t - 0.2) / 0.8;
            ctx.beginPath(); ctx.arc(cx, cy, rt * 180, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(251,191,36,${(1 - rt) * 0.7})`;
            ctx.lineWidth = 1.5 + (1 - rt) * 3; ctx.stroke();
            if (rt > 0.15) {
              const r2t = (rt - 0.15) / 0.85;
              ctx.beginPath(); ctx.arc(cx, cy, r2t * 240, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(167,139,250,${(1 - r2t) * 0.4})`;
              ctx.lineWidth = 1; ctx.stroke();
            }
          }

          if (dt > GLOW_MS && !fadeStarted) {
            fadeStarted = true;
            let op = 1;
            const tick = () => {
              op -= FADE_STEP;
              setOpacity(Math.max(0, op));
              if (op > 0) requestAnimationFrame(tick);
              else onComplete();
            };
            requestAnimationFrame(tick);
          }

        /* ── HOLD while fading ── */
        } else {
          particles.forEach(p => {
            ctx.beginPath(); ctx.arc(p.tx, p.ty, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(251,191,36,0.9)';
            ctx.shadowBlur = 14; ctx.shadowColor = '#fbbf24';
            ctx.fill(); ctx.shadowBlur = 0;
          });
        }

        rafId = requestAnimationFrame(draw);
      };

      rafId = requestAnimationFrame(draw);
    });

    return () => { if (rafId) cancelAnimationFrame(rafId); };
  }, [samplePixels, onComplete, DOT_MS, ASSEMBLE_MS, GLOW_MS, FADE_STEP]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      opacity, transition: 'none',
      pointerEvents: opacity <= 0 ? 'none' : 'auto',
    }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};

export default IntroAnimation;
