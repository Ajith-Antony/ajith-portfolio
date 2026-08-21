import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const WebGLCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Floating 3D Geometries Group
    const group = new THREE.Group();
    scene.add(group);

    // Material with Emerald Wireframe Glow
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    // Mesh 1: TorusKnot
    const torusGeo = new THREE.TorusKnotGeometry(3, 0.8, 100, 16);
    const torusMesh = new THREE.Mesh(torusGeo, wireframeMaterial);
    torusMesh.position.set(-10, 4, -5);
    group.add(torusMesh);

    // Mesh 2: Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(2.5, 1);
    const icoMesh = new THREE.Mesh(icoGeo, glowMaterial);
    icoMesh.position.set(11, -3, -4);
    group.add(icoMesh);

    // Mesh 3: Octahedron
    const octGeo = new THREE.OctahedronGeometry(2, 0);
    const octMesh = new THREE.Mesh(octGeo, wireframeMaterial);
    octMesh.position.set(-8, -6, -2);
    group.add(octMesh);

    // Mesh 4: Dodecahedron
    const dodGeo = new THREE.DodecahedronGeometry(2, 0);
    const dodMesh = new THREE.Mesh(dodGeo, glowMaterial);
    dodMesh.position.set(8, 7, -6);
    group.add(dodMesh);

    // Particles Starfield
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x34d399,
      transparent: true,
      opacity: 0.5,
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;

    const animate = () => {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate 3D Group
      group.rotation.y += 0.002;
      group.rotation.x += 0.001;
      group.rotation.y = targetX * 2;
      group.rotation.x = -targetY * 2;

      // Individual mesh spins
      torusMesh.rotation.x += 0.004;
      torusMesh.rotation.y += 0.005;
      icoMesh.rotation.x += 0.003;
      icoMesh.rotation.z += 0.004;
      octMesh.rotation.y += 0.006;
      dodMesh.rotation.x += 0.005;

      particlesMesh.rotation.y += 0.0005;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
};
