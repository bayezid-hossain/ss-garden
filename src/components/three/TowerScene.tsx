"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { buildTower, type Box, type Foliage, type TowerGeometry } from "./tower-geometry";

export interface TowerSceneProps {
  floors: number;
  seed: number;
  sky: "day" | "dusk";
  az: number;
  el: number;
  dist: number;
  quality?: "high" | "low";
  frameloop?: "always" | "never";
  dpr?: [number, number];
  float?: boolean;
  pointer?: { current: { x: number; y: number } };
  scroll?: { current: number };
  onReady?: () => void;
}

const FOLIAGE_TONES = ["#2f7d1a", "#3f9124", "#5aa832", "#256012"].map((c) => new THREE.Color(c));

function Boxes({ items, shadow = true, children }: { items: Box[]; shadow?: boolean; children: React.ReactNode }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const o = new THREE.Object3D();
    items.forEach((b, i) => {
      o.position.set(...b.p);
      o.scale.set(...b.s);
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [items]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]} castShadow={shadow} receiveShadow>
      <boxGeometry />
      {children}
    </instancedMesh>
  );
}

function Crowns({ items }: { items: Foliage[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const o = new THREE.Object3D();
    items.forEach((f, i) => {
      o.position.set(...f.p);
      o.scale.setScalar(f.r);
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
      mesh.setColorAt(i, FOLIAGE_TONES[f.tone]);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [items]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]} castShadow receiveShadow>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#ffffff" flatShading roughness={0.9} />
    </instancedMesh>
  );
}

function Tower({ geo, dusk, float }: { geo: TowerGeometry; dusk: boolean; float: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (float && group.current) group.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.05;
  });
  return (
    <group ref={group}>
      <Boxes items={geo.base}><meshStandardMaterial color="#c9cec4" roughness={1} /></Boxes>
      <Boxes items={geo.slabs}><meshStandardMaterial color="#e8ebe4" roughness={0.9} /></Boxes>
      <Boxes items={geo.columns}><meshStandardMaterial color="#d3d7cd" roughness={0.9} /></Boxes>
      <Boxes items={geo.planters}><meshStandardMaterial color="#7d8279" roughness={1} /></Boxes>
      <Boxes items={geo.trunks}><meshStandardMaterial color="#5b4a3a" roughness={1} /></Boxes>
      <Crowns items={geo.foliage} />
      <Boxes items={geo.glass} shadow={false}>
        <meshStandardMaterial
          color="#7fa39a"
          transparent
          opacity={0.55}
          roughness={0.15}
          metalness={0.3}
          emissive={dusk ? "#ffcf8a" : "#000000"}
          emissiveIntensity={dusk ? 0.45 : 0}
        />
      </Boxes>
    </group>
  );
}

function Rig({
  az, el, dist, height, pointer, scroll, onReady,
}: {
  az: number; el: number; dist: number; height: number;
  pointer?: { current: { x: number; y: number } };
  scroll?: { current: number };
  onReady?: () => void;
}) {
  const camera = useThree((s) => s.camera);
  const smooth = useRef({ x: 0, y: 0 });
  const target = useRef(new THREE.Vector3());
  const frames = useRef(0);

  useFrame((_, dt) => {
    const sp = scroll?.current ?? 0;
    smooth.current.x = THREE.MathUtils.damp(smooth.current.x, pointer?.current.x ?? 0, 4, dt);
    smooth.current.y = THREE.MathUtils.damp(smooth.current.y, pointer?.current.y ?? 0, 4, dt);
    const a = THREE.MathUtils.degToRad(az + sp * 40 + smooth.current.x * 6);
    const e = THREE.MathUtils.degToRad(el - smooth.current.y * 3);
    target.current.set(0, height * 0.45, 0);
    camera.position.set(
      Math.sin(a) * Math.cos(e) * dist,
      target.current.y + Math.sin(e) * dist,
      Math.cos(a) * Math.cos(e) * dist,
    );
    camera.lookAt(target.current);
    frames.current += 1;
    if (frames.current === 3) onReady?.();
  });
  return null;
}

export default function TowerScene({
  floors, seed, sky, az, el, dist,
  quality = "high", frameloop = "always", dpr = [1, 2], float = false,
  pointer, scroll, onReady,
}: TowerSceneProps) {
  const geo = useMemo(() => buildTower(floors, seed), [floors, seed]);
  const dusk = sky === "dusk";
  const bg = dusk ? "#26303c" : "#cfe0e6";
  const shadows = quality === "high";

  return (
    <Canvas
      shadows={shadows}
      dpr={dpr}
      frameloop={frameloop}
      camera={{ fov: 34, near: 0.1, far: 200, position: [0, 6, dist] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[bg, dist * 1.4, dist * 4]} />
      <hemisphereLight args={[dusk ? "#8aa0c0" : "#ffffff", dusk ? "#2a2218" : "#a8b59a", dusk ? 0.55 : 0.9]} />
      <directionalLight
        position={dusk ? [-8, 5, 6] : [7, 12, 8]}
        intensity={dusk ? 1.4 : 2.2}
        color={dusk ? "#ffb27a" : "#fff4e0"}
        castShadow={shadows}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
      />
      <Tower geo={geo} dusk={dusk} float={float} />
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color={dusk ? "#1f2a22" : "#9fae8f"} roughness={1} />
      </mesh>
      <Rig az={az} el={el} dist={dist} height={geo.height} pointer={pointer} scroll={scroll} onReady={onReady} />
    </Canvas>
  );
}
