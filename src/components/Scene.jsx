import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene({ rotationY, rotationX, scale }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const propsRef = useRef({});

  const eventHorizonRef = useRef(null);
  const diskRef = useRef(null);
  const haloRef = useRef(null);
  const particlesRef = useRef(null);
  const particleDataRef = useRef([]);

  propsRef.current = { rotationY, rotationX, scale };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Create Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7.0; // Dynamic close framing

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Central Event Horizon (Matte Black Sphere)
    const sphereGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x000000
    });
    const eventHorizon = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(eventHorizon);
    eventHorizonRef.current = eventHorizon;

    // 5. Warped Accretion Disk (Interstellar Gravitational Lensing simulation)
    // Horizontal Disc (Equatorial Plane)
    const diskGeo = new THREE.RingGeometry(1.35, 2.7, 64);
    const diskMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00, // Warm orange
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const disk = new THREE.Mesh(diskGeo, diskMat);
    disk.rotation.x = Math.PI / 2.2; // Slightly tilted to see both horizontal and lensed rings
    scene.add(disk);
    diskRef.current = disk;

    // Vertical Halo (Lensed view of the back accretion disk bent over/under the horizon)
    const haloGeo = new THREE.RingGeometry(1.35, 2.65, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffa600, // Lighter amber gold
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    // Positioned vertically to match Gargantua's lensed halo appearance
    halo.rotation.y = 0;
    halo.rotation.x = 0;
    scene.add(halo);
    haloRef.current = halo;

    // 6. Keplerian Orbital Dust Particles (Simulating hot gas flows)
    const particleCount = 900;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const data = [];
    const colorChoices = [
      new THREE.Color(0xff8800), // Orange
      new THREE.Color(0xffbb00), // Gold
      new THREE.Color(0xffffff)  // Hot white
    ];

    for (let i = 0; i < particleCount; i++) {
      // Radius distribution (Keplerian disk span)
      const r = THREE.MathUtils.randFloat(1.4, 2.9);
      const angle = THREE.MathUtils.randFloat(0, Math.PI * 2);
      
      // Keplerian speed: closer orbits are faster
      const speed = 0.015 / Math.sqrt(r);

      data.push({ r, angle, speed });

      // Initial positions
      positions[i * 3] = r * Math.cos(angle);
      positions[i * 3 + 1] = (Math.sin(angle * 2) * 0.12) * r; // Natural warped disk oscillation
      positions[i * 3 + 2] = r * Math.sin(angle);

      // Color mapping
      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture (smooth glowing circle)
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;
    particleDataRef.current = data;

    // 7. Add light context to highlight space contours
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x465aff, 3.0, 15);
    blueLight.position.set(-3, -3, 2);
    scene.add(blueLight);

    // 8. Animation loop
    let animationFrameId;
    const animate = () => {
      const { rotationY: ry, rotationX: rx, scale: s } = propsRef.current;

      // Rotate group/elements dynamically on scroll
      if (eventHorizonRef.current) {
        eventHorizonRef.current.scale.setScalar(s);
      }
      if (diskRef.current) {
        diskRef.current.rotation.z = ry * 0.4;
        diskRef.current.rotation.x = Math.PI / 2.2 + rx * 0.15;
        diskRef.current.scale.setScalar(s);
      }
      if (haloRef.current) {
        haloRef.current.rotation.z = -ry * 0.25;
        haloRef.current.rotation.x = rx * 0.1;
        haloRef.current.scale.setScalar(s);
      }

      // Update Keplerian dust particle orbits
      if (particlesRef.current) {
        const posArr = particlesRef.current.geometry.attributes.position.array;
        const dataArr = particleDataRef.current;

        for (let i = 0; i < particleCount; i++) {
          const p = dataArr[i];
          p.angle += p.speed;

          // Compute warped coordinates simulating gravity lensing around the sphere
          const x = p.r * Math.cos(p.angle);
          const z = p.r * Math.sin(p.angle);
          
          // Bend lensed back-disk points upward/downward around the sphere
          let y = 0;
          if (z < 0) {
            y = Math.sin(p.angle) * 0.28 * p.r;
          } else {
            y = (Math.sin(p.angle * 2) * 0.06) * p.r;
          }

          posArr[i * 3] = x;
          posArr[i * 3 + 1] = y;
          posArr[i * 3 + 2] = z;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.rotation.y = ry * 0.3;
        particlesRef.current.scale.setScalar(s);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
      sphereGeo.dispose();
      sphereMat.dispose();
      diskGeo.dispose();
      diskMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      texture.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
