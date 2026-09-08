import { useState, useEffect } from 'react';
import BlochSphere3D from './BlochSphere3D';

// Build operator name, e.g. "H2I", "I2P", "P2C"
const operatorName = (src, tgt) => {
  const label = (s) => {
    if (!s || s === 'home') return 'H';
    return s.charAt(0).toUpperCase();
  };
  return `${label(src)}2${label(tgt)}`;
};

const fmt = (s) => {
  if (!s || s === 'home') return 'Home';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * Full-screen overlay that plays the quantum transition animation.
 * Total duration: ~2500ms
 *
 * Timeline:
 *   0ms   — step 0: show "Applying Û_X2Y to |source⟩"
 *   600ms — step 1: show computation line
 *   1400ms — step 2: show "Observing state vector…"
 *   2000ms — step 3: show collapse result with glow
 */
const QuantumTransition = ({ source, target }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 350);
    const t2 = setTimeout(() => setStep(2), 900);
    const t3 = setTimeout(() => setStep(3), 1350);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const op  = operatorName(source, target);
  const src = fmt(source);
  const tgt = fmt(target);

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-2"
      style={{ background: 'rgba(8,8,19,0.96)', backdropFilter: 'blur(12px)' }}
    >

      {/* ── Text block — sits above the sphere ─── */}
      <div className="font-mono text-center space-y-4 px-6">

        {/* Step 0: operator intro */}
        <div
          className="text-base md:text-lg transition-opacity duration-400"
          style={{ opacity: step >= 0 ? 1 : 0, color: '#a8a4c0' }}
        >
          Applying operator{' '}
          <span className="font-bold" style={{ color: '#a78bfa' }}>Û_{op}</span>
          {' '}to state{' '}
          <span className="font-bold" style={{ color: '#fbbf24' }}>|{src}⟩</span>
        </div>

        {/* Step 1: computation */}
        <div
          className="text-lg md:text-xl font-bold transition-opacity duration-400"
          style={{ opacity: step >= 1 ? 1 : 0 }}
        >
          <span style={{ color: '#a78bfa' }}>Û_{op}</span>
          <span className="mx-2" style={{ color: '#fbbf24' }}>|{src}⟩</span>
          <span className="mx-2" style={{ color: '#6b6890' }}>→</span>
          <span className="animate-pulse" style={{ color: '#a8a4c0' }}>Computing…</span>
        </div>

        {/* Step 2: observing */}
        <div
          className="text-sm transition-opacity duration-400"
          style={{ opacity: step >= 2 ? 1 : 0, color: '#6b6890' }}
        >
          Observing state vector…
        </div>

        {/* Step 3: collapse result */}
        <div
          className="text-2xl md:text-4xl font-bold transition-all duration-500"
          style={{
            opacity:    step >= 3 ? 1 : 0,
            transform:  step >= 3 ? 'scale(1)' : 'scale(0.9)',
            color:      '#fbbf24',
            textShadow: step >= 3 ? '0 0 24px rgba(251,191,36,0.65)' : 'none',
          }}
        >
          State collapsed to: |{tgt}⟩
        </div>

      </div>

      {/* ── Single Bloch sphere — below the text ─── */}
      <BlochSphere3D source={source} target={target} />

    </div>
  );
};

export default QuantumTransition;
