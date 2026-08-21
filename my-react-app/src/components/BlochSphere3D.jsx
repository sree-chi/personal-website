import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Maps section name → unit vector on the Bloch sphere
export const getVectorForSection = (section) => {
  switch (section) {
    case 'internships': return new THREE.Vector3(0, 1, 0);   // +Y
    case 'projects':    return new THREE.Vector3(1, 0, 0);   // +X
    case 'clubs':       return new THREE.Vector3(0, 0, 1);   // +Z
    case 'home':
    default:            return new THREE.Vector3(1, 1, 1).normalize(); // superposition
  }
};

const AXES_LABELS = [
  { text: '+|Internships⟩', pos: new THREE.Vector3(0,  1.35, 0),  color: '#22d3ee' },
  { text: '−|Internships⟩', pos: new THREE.Vector3(0, -1.35, 0),  color: '#475569' },
  { text: '+|Projects⟩',    pos: new THREE.Vector3( 1.35, 0, 0),  color: '#a855f7' },
  { text: '−|Projects⟩',    pos: new THREE.Vector3(-1.35, 0, 0),  color: '#475569' },
  { text: '+|Clubs⟩',       pos: new THREE.Vector3(0, 0,  1.35),  color: '#10b981' },
  { text: '−|Clubs⟩',       pos: new THREE.Vector3(0, 0, -1.35),  color: '#475569' },
];

const BlochSphere3D = ({ source, target, step }) => {
  const mountRef  = useRef(null);
  const labelsRef = useRef([]);

  useEffect(() => {
    const W = 380, H = 380;

    /* ── Scene ──────────────────────────────────── */
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(2.5, 2.0, 3.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    /* ── Wireframe sphere ───────────────────────── */
    const sphereGeo = new THREE.SphereGeometry(1, 20, 20);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.12,
    });
    group.add(new THREE.Mesh(sphereGeo, sphereMat));

    /* ── Equator / meridian rings ───────────────── */
    const ringMat = new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.5 });
    const makeRing = (axis, segs = 64) => {
      const pts = [];
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        if (axis === 'y') pts.push(new THREE.Vector3(Math.cos(a), 0, Math.sin(a)));
        if (axis === 'x') pts.push(new THREE.Vector3(0, Math.cos(a), Math.sin(a)));
        if (axis === 'z') pts.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
      }
      return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat);
    };
    group.add(makeRing('y'));
    group.add(makeRing('x'));
    group.add(makeRing('z'));

    /* ── Axes lines ─────────────────────────────── */
    const axMat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.7 });
    [
      [new THREE.Vector3(-1.15,0,0), new THREE.Vector3(1.15,0,0)],
      [new THREE.Vector3(0,-1.15,0), new THREE.Vector3(0,1.15,0)],
      [new THREE.Vector3(0,0,-1.15), new THREE.Vector3(0,0,1.15)],
    ].forEach(([a, b]) =>
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), axMat))
    );

    /* ── State vector arrow ─────────────────────── */
    const arrowDir = getVectorForSection(source).clone();
    const arrow = new THREE.ArrowHelper(arrowDir, new THREE.Vector3(0,0,0), 1, 0xa855f7, 0.18, 0.09);
    group.add(arrow);

    /* ── Animate ────────────────────────────────── */
    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      // Idle rotation
      group.rotation.y += 0.004;
      group.rotation.x += 0.001;

      // Lerp arrow toward target when animation has started
      if (step >= 1 && target) {
        const tgt = getVectorForSection(target);
        arrowDir.lerp(tgt, 0.06).normalize();
        arrow.setDirection(arrowDir);
      }

      // Project axis label positions to screen
      labelsRef.current.forEach((el, i) => {
        if (!el) return;
        const worldPos = AXES_LABELS[i].pos.clone().applyMatrix4(group.matrixWorld);
        worldPos.project(camera);
        const x = ( worldPos.x * 0.5 + 0.5) * W;
        const y = (-worldPos.y * 0.5 + 0.5) * H;
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        el.style.opacity  = worldPos.z > 0.6 ? '0.25' : '1';
        el.style.zIndex   = worldPos.z > 0.6 ? '0'    : '10';
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
    };
  }, [source, target, step]);

  return (
    <div className="relative" style={{ width: 380, height: 380 }}>
      <div ref={mountRef} className="absolute inset-0" />
      {AXES_LABELS.map((label, i) => (
        <div
          key={i}
          ref={el => { labelsRef.current[i] = el; }}
          className="absolute top-0 left-0 font-mono text-[10px] whitespace-nowrap pointer-events-none transition-opacity duration-200"
          style={{ color: label.color, willChange: 'transform' }}
        >
          {label.text}
        </div>
      ))}
    </div>
  );
};

export default BlochSphere3D;
