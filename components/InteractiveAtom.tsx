"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const shells = [
  { label: "K", electrons: 2, radius: 1.15, tilt: [0.18, 0.05, 0.2], speed: 0.78 },
  { label: "L", electrons: 8, radius: 1.72, tilt: [0.45, 0.28, -0.35], speed: 0.58 },
  { label: "M", electrons: 18, radius: 2.28, tilt: [0.72, -0.12, 0.48], speed: 0.42 },
  { label: "N", electrons: 18, radius: 2.84, tilt: [1.02, 0.38, -0.58], speed: 0.34 },
  { label: "O", electrons: 8, radius: 3.34, tilt: [1.28, -0.34, 0.76], speed: 0.28 }
];

const details = [
  { title: "Atomic Number", value: "54", body: "Xenon has 54 protons in its nucleus." },
  { title: "Symbol", value: "Xe", body: "The chemical symbol for xenon is Xe." },
  { title: "Group", value: "Noble Gas", body: "It sits with the noble gases, known for low reactivity." },
  { title: "Glow", value: "Blue-white", body: "Under electricity, xenon emits a bright blue-white glow." }
];

type Electron = {
  mesh: THREE.Mesh;
  orbit: THREE.Object3D;
  radius: number;
  phase: number;
  speed: number;
};

type InteractiveAtomProps = {
  mode?: "standard" | "slide";
};

function createTextSprite(text: string, options: { size?: number; color?: string; weight?: string } = {}) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const size = options.size ?? 64;
  const padding = 26;

  canvas.width = 256;
  canvas.height = 128;

  if (!context) {
    return new THREE.Sprite();
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = `${options.weight ?? "800"} ${size}px Arial, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.shadowColor = "rgba(124,247,255,0.85)";
  context.shadowBlur = 18;
  context.fillStyle = options.color ?? "#ffffff";
  context.fillText(text, canvas.width / 2, canvas.height / 2 + padding * 0.08);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.6, 0.8, 1);
  return sprite;
}

export function InteractiveAtom({ mode = "standard" }: InteractiveAtomProps) {
  const [selected, setSelected] = useState(0);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const isSlideMode = mode === "slide";

  const openAtomSlide = () => {
    window.dispatchEvent(new CustomEvent("presentation:go-to-slide", { detail: { id: "xenon-atom-3d" } }));
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.45, 8.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.touchAction = "none";
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;
    controls.minDistance = 4.8;
    controls.maxDistance = 12;
    controls.target.set(0, 0, 0);
    controls.update();

    const atomGroup = new THREE.Group();
    scene.add(atomGroup);

    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(0x7cf7ff, 4.5, 18);
    keyLight.position.set(3.6, 3.8, 4.8);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xffb86b, 1.4, 14);
    fillLight.position.set(-4.8, -2.6, 3.5);
    scene.add(fillLight);

    const nucleusGeometry = new THREE.SphereGeometry(0.58, 48, 48);
    const nucleusMaterial = new THREE.MeshStandardMaterial({
      color: 0x8dfaff,
      emissive: 0x146b78,
      emissiveIntensity: 1.25,
      metalness: 0.15,
      roughness: 0.28
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    atomGroup.add(nucleus);

    const nucleusGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.82, 48, 48),
      new THREE.MeshBasicMaterial({
        color: 0x7cf7ff,
        transparent: true,
        opacity: 0.16,
        depthWrite: false
      })
    );
    atomGroup.add(nucleusGlow);

    const symbolSprite = createTextSprite("Xe", { size: 68, color: "#ffffff" });
    symbolSprite.position.set(0, 0.12, 0.62);
    atomGroup.add(symbolSprite);

    const numberSprite = createTextSprite("54", { size: 34, color: "#7cf7ff" });
    numberSprite.scale.set(0.95, 0.48, 1);
    numberSprite.position.set(0, -0.36, 0.68);
    atomGroup.add(numberSprite);

    const electronGeometry = new THREE.SphereGeometry(0.055, 16, 16);
    const electronMaterial = new THREE.MeshStandardMaterial({
      color: 0xdffcff,
      emissive: 0x7cf7ff,
      emissiveIntensity: 1.8,
      roughness: 0.2
    });

    const electrons: Electron[] = [];
    const disposableObjects: Array<THREE.Object3D> = [nucleus, nucleusGlow, symbolSprite, numberSprite];

    shells.forEach((shell) => {
      const orbit = new THREE.Group();
      orbit.rotation.set(shell.tilt[0], shell.tilt[1], shell.tilt[2]);
      atomGroup.add(orbit);

      const ringGeometry = new THREE.TorusGeometry(shell.radius, 0.006, 8, 160);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x9aefff,
        transparent: true,
        opacity: 0.34
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      orbit.add(ring);
      disposableObjects.push(ring);

      const label = createTextSprite(shell.label, { size: 36, color: "#dffcff" });
      label.scale.set(0.6, 0.3, 1);
      label.position.set(shell.radius + 0.35, 0, 0);
      orbit.add(label);
      disposableObjects.push(label);

      Array.from({ length: shell.electrons }, (_, electronIndex) => {
        const phase = (Math.PI * 2 * electronIndex) / shell.electrons;
        const mesh = new THREE.Mesh(electronGeometry, electronMaterial);
        orbit.add(mesh);
        electrons.push({
          mesh,
          orbit,
          radius: shell.radius,
          phase,
          speed: shell.speed
        });
      });
    });

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      const safeWidth = Math.max(width, 1);
      const safeHeight = Math.max(height, 1);
      camera.aspect = safeWidth / safeHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(safeWidth, safeHeight, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let animationFrame = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      atomGroup.rotation.y = elapsed * 0.04;
      atomGroup.rotation.x = Math.sin(elapsed * 0.32) * 0.08;
      nucleusGlow.scale.setScalar(1 + Math.sin(elapsed * 1.5) * 0.055);

      electrons.forEach((electron) => {
        const angle = electron.phase + elapsed * electron.speed;
        electron.mesh.position.set(Math.cos(angle) * electron.radius, Math.sin(angle) * electron.radius, 0);
      });

      controls.update();
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement);
      controls.dispose();

      disposableObjects.forEach((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }

        if (object instanceof THREE.Sprite) {
          object.material.map?.dispose();
          object.material.dispose();
        }
      });

      electronGeometry.dispose();
      electronMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`glass-panel relative overflow-hidden rounded-lg p-5 ${isSlideMode ? "min-h-[58dvh]" : "min-h-[31rem]"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,247,255,.18),transparent_38%)]" />
      <div className={`relative grid h-full gap-5 ${isSlideMode ? "lg:grid-cols-[1fr_15rem]" : "lg:grid-cols-[1fr_13rem]"}`}>
        <div
          role="application"
          className={`relative cursor-grab overflow-hidden rounded-lg border border-white/10 bg-black/20 active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-neon/70 ${
            isSlideMode ? "min-h-[48dvh]" : "min-h-[24rem]"
          }`}
          aria-label="Interactive 3D xenon atom viewport. Drag to rotate and use the mouse wheel to zoom."
          tabIndex={0}
          onWheel={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
          onPointerMove={(event) => event.stopPropagation()}
          onPointerUp={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
          onTouchEnd={(event) => event.stopPropagation()}
        >
          <div ref={mountRef} className="absolute inset-0" />
          <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-neon/25 bg-black/30 px-3 py-1 text-xs font-bold uppercase text-neon backdrop-blur-md">
            Xenon electron shells: 2 / 8 / 18 / 18 / 8
          </div>
          <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-bold uppercase text-white/55 backdrop-blur-md">
            Drag rotate / wheel zoom
          </span>
          {!isSlideMode && (
            <motion.button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openAtomSlide();
              }}
              className="absolute bottom-12 right-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:border-neon/50 hover:bg-neon/15 focus:outline-none focus:ring-2 focus:ring-neon/70"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Open full 3D atom slide"
              title="Open full 3D atom slide"
            >
              <Maximize2 className="h-4 w-4" />
            </motion.button>
          )}
          <span
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.stopPropagation();
              setSelected((value) => (value + 1) % details.length);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelected((value) => (value + 1) % details.length);
              }
            }}
            className="absolute bottom-12 left-4 rounded-full border border-neon/35 bg-neon/15 px-3 py-1 text-[10px] font-bold uppercase text-white backdrop-blur-md transition hover:bg-neon/25"
          >
            Cycle facts
          </span>
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-bold uppercase text-white/45">
            <span>Orbit controls enabled</span>
            <span>3D science model</span>
          </div>
        </div>

        <div className="relative flex flex-col justify-between rounded-lg border border-white/10 bg-black/20 p-4">
          <div>
            <p className="font-display text-xs font-black uppercase text-neon">Interactive Atom</p>
            <h3 className="mt-3 font-display text-2xl font-black uppercase text-white">{details[selected].title}</h3>
            <p className="mt-1 font-display text-4xl font-black text-neon">{details[selected].value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{details[selected].body}</p>
          </div>
          <div className="mt-5 grid grid-cols-4 gap-2">
            {details.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setSelected(index)}
                className={`h-2 rounded-full transition ${selected === index ? "bg-neon" : "bg-white/20"}`}
                aria-label={`Show ${item.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
