import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Maps section name → unit vector on the Bloch sphere
export const getVectorForSection = (section) => {
  switch (section) {
    case 'internships': return new THREE.Vector3(0, 1, 0);   // +Y
    case 'projects':    return new THREE.Vector3(1, 0, 0);   // +X
    case 'research':    return new THREE.Vector3(0, 0, 1);   // +Z
    case 'home':
    default:            return new THREE.Vector3(1, 1, 1).normalize(); // superposition
  }
};

const AXES_LABELS = [
  { text: '+|Internships⟩', pos: new THREE.Vector3(0,  1.35, 0),  color: '#fbbf24' },  // amber
  { text: '−|Internships⟩', pos: new THREE.Vector3(0, -1.35, 0),  color: '#3d3d6a' },
  { text: '+|Projects⟩',    pos: new THREE.Vector3( 1.35, 0, 0),  color: '#a78bfa' },  // violet
  { text: '−|Projects⟩',    pos: new THREE.Vector3(-1.35, 0, 0),  color: '#3d3d6a' },
  { text: '+|Research⟩',      pos: new THREE.Vector3(0, 0,  1.35),  color: '#34d399' },
  { text: '−|Research⟩',      pos: new THREE.Vector3(0, 0, -1.35),  color: '#3d3d6a' },
];

const BlochSphere3D = ({ source, target }) => {
  const mountRef  = useRef(null);
  const labelsRef = useRef([]);
  // Use a ref for target so the animation loop always sees the latest value
  // without causing a remount of the Three.js canvas
  const targetRef = useRef(target);
  useEffect(() => { targetRef.current = target; }, [target]);

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
    // Clear any leftover canvas from StrictMode's double-invoke before appending
    if (mountRef.current) {
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);
    }

    const group = new THREE.Group();
    scene.add(group);

    /* ── Wireframe sphere — violet tint ─────────── */
    const sphereGeo = new THREE.SphereGeometry(1, 20, 20);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.14,
    });
    group.add(new THREE.Mesh(sphereGeo, sphereMat));

    /* ── Equator / meridian rings — indigo ──────── */
    const ringMat = new THREE.LineBasicMaterial({ color: 0x2a2a4a, transparent: true, opacity: 0.7 });
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

    /* ── Axes lines — muted indigo ──────────────── */
    const axMat = new THREE.LineBasicMaterial({ color: 0x3d3d6a, transparent: true, opacity: 0.8 });
    [
      [new THREE.Vector3(-1.15,0,0), new THREE.Vector3(1.15,0,0)],
      [new THREE.Vector3(0,-1.15,0), new THREE.Vector3(0,1.15,0)],
      [new THREE.Vector3(0,0,-1.15), new THREE.Vector3(0,0,1.15)],
    ].forEach(([a, b]) =>
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), axMat))
    );

    /* ── State vector arrow — amber/gold ─────────── */
    const arrowDir = getVectorForSection(source).clone();
    const arrow = new THREE.ArrowHelper(arrowDir, new THREE.Vector3(0,0,0), 1, 0xfbbf24, 0.18, 0.09);
    group.add(arrow);

    /* ── Animate ────────────────────────────────── */
    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      // Slow idle rotation
      group.rotation.y += 0.004;
      group.rotation.x += 0.001;

      // Continuously lerp arrow toward target — slow, single smooth sweep
      const tgt = targetRef.current;
      if (tgt) {
        const tgtVec = getVectorForSection(tgt);
        arrowDir.lerp(tgtVec, 0.055).normalize();
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
        el.style.opacity  = worldPos.z > 0.6 ? '0.2' : '1';
        el.style.zIndex   = worldPos.z > 0.6 ? '0'   : '10';
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
  // Only mount once per source — target changes are handled via ref
  }, [source]);

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
