"use client";

import React, { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Custom helper to generate a leaf geometry (bent and tapered)
function createLeafGeometry() {
  const geom = new THREE.PlaneGeometry(1.2, 2.0, 16, 16);
  const pos = geom.attributes.position;
  
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    
    // Taper at the tip (y = 1) and base (y = -1)
    const normalizedY = y / 1.0; // range [-1, 1]
    const taper = 1.0 - Math.pow(Math.abs(normalizedY), 2);
    
    // Warp the plane along X based on taper to make a leaf shape
    pos.setX(i, x * taper * 0.85);
    
    // Bend leaf along Z for natural curl
    const curlZ = Math.sin(y * 1.5) * 0.22 + (x * x * 0.15);
    pos.setZ(i, curlZ);
  }
  geom.computeVertexNormals();
  return geom;
}

// Dynamically generate a canvas-based gold glow texture for particles
function createGoldGlowTexture() {
  if (typeof window === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255, 244, 210, 1)");
    grad.addColorStop(0.2, "rgba(212, 175, 55, 0.85)");
    grad.addColorStop(0.5, "rgba(212, 175, 55, 0.2)");
    grad.addColorStop(1, "rgba(212, 175, 55, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(canvas);
}

// Dynamically generate label textures for each tea canister
function createLabelTexture(teaName: string) {
  if (typeof window === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Elegant dark charcoal background
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, 512, 512);

    // Double Gold Borders
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, 472, 472);

    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, 440, 440);

    // Brand Monogram logo
    ctx.fillStyle = "#D4AF37";
    ctx.font = "bold 26px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("MILLENNIUM", 256, 100);

    ctx.fillStyle = "rgba(212, 175, 55, 0.5)";
    ctx.font = "italic 16px Georgia, serif";
    ctx.fillText("Thé Exceptionnel", 256, 130);

    // Separator line
    ctx.beginPath();
    ctx.moveTo(160, 160);
    ctx.lineTo(352, 160);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Product Title
    ctx.fillStyle = "#F7F4ED";
    ctx.font = "bold 36px Georgia, serif";
    
    // Split long titles
    const words = teaName.split(" ");
    if (words.length > 2) {
      const line1 = words.slice(0, 2).join(" ");
      const line2 = words.slice(2).join(" ");
      ctx.fillText(line1.toUpperCase(), 256, 240);
      ctx.fillText(line2.toUpperCase(), 256, 290);
    } else {
      ctx.fillText(teaName.toUpperCase(), 256, 265);
    }

    // Collection tag
    ctx.fillStyle = "#D4AF37";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("RESERVE EXCLUSIVE", 256, 350);

    // Details at the bottom
    ctx.fillStyle = "rgba(247, 244, 237, 0.5)";
    ctx.font = "14px sans-serif";
    ctx.fillText("Handcrafted Blend  •  Artisanal Sourcing", 256, 400);

    ctx.fillStyle = "#D4AF37";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("NET WT. 250G | 8.8 OZ", 256, 435);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Single Floating Leaf component
function FloatingLeaf({ geom, mat, ...props }: { geom: THREE.BufferGeometry; mat: THREE.Material; [key: string]: any }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Custom rotation speeds
  const rotSpeedY = useMemo(() => 0.003 + Math.random() * 0.007, []);
  const rotSpeedX = useMemo(() => 0.002 + Math.random() * 0.004, []);
  const waveOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y += rotSpeedY;
      meshRef.current.rotation.x += rotSpeedX;
      // Gentle floating drift
      meshRef.current.position.y += Math.sin(time + waveOffset) * 0.001;
    }
  });

  return <mesh ref={meshRef} geometry={geom} material={mat} {...props} />;
}

// The Tea Cup & Saucer 3D Model Group
function TeaCup({ visible, scale = 1.0, position = [0, 0, 0] }: { visible: boolean; scale?: number; position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  // Math profile curves for lathing
  const cupPoints = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.28, 0));
    points.push(new THREE.Vector2(0.3, 0.05));
    // wall curve
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const x = 0.3 + t * 0.55;
      const y = 0.05 + t * 0.8;
      points.push(new THREE.Vector2(x, y));
    }
    // rim thickness
    points.push(new THREE.Vector2(0.85, 0.85));
    // inner wall
    for (let i = 10; i >= 0; i--) {
      const t = i / 10;
      const x = 0.28 + t * 0.53;
      const y = 0.08 + t * 0.74;
      points.push(new THREE.Vector2(x, y));
    }
    points.push(new THREE.Vector2(0, 0.08));
    return points;
  }, []);

  const saucerPoints = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.4, 0));
    points.push(new THREE.Vector2(0.7, 0.02));
    points.push(new THREE.Vector2(1.1, 0.15));
    points.push(new THREE.Vector2(1.13, 0.15));
    points.push(new THREE.Vector2(1.1, 0.12));
    points.push(new THREE.Vector2(0.7, 0.01));
    points.push(new THREE.Vector2(0, 0));
    return points;
  }, []);

  const ceramicMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0c0c0c"),
      roughness: 0.15,
      metalness: 0.35,
      bumpScale: 0.01,
    });
  }, []);

  const goldTrimMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#d4af37"),
      roughness: 0.1,
      metalness: 0.9,
    });
  }, []);

  const teaLiquidMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#b87d14"), // Amber/Golden Tea
      roughness: 0.05,
      metalness: 0.1,
      emissive: new THREE.Color("#5c3605"),
      emissiveIntensity: 0.3,
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current && visible) {
      const time = state.clock.getElapsedTime();
      // slow floating animation
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1;
      groupRef.current.rotation.y = time * 0.15;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* 1. Saucer */}
      <mesh position={[0, -0.05, 0]}>
        <latheGeometry args={[saucerPoints, 48]} />
        <primitive object={ceramicMat} attach="material" />
      </mesh>
      {/* Saucer gold rim */}
      <mesh position={[0, -0.05, 0]}>
        <torusGeometry args={[1.11, 0.015, 8, 48]} />
        <primitive object={goldTrimMat} attach="material" />
      </mesh>

      {/* 2. Cup Body */}
      <mesh>
        <latheGeometry args={[cupPoints, 48]} />
        <primitive object={ceramicMat} attach="material" />
      </mesh>
      {/* Cup gold rim */}
      <mesh position={[0, 0.85, 0]}>
        <torusGeometry args={[0.84, 0.015, 8, 48]} />
        <primitive object={goldTrimMat} attach="material" />
      </mesh>

      {/* 3. Cup Handle */}
      <mesh position={[-0.6, 0.45, 0]} rotation={[0, 0, Math.PI * 0.25]}>
        <torusGeometry args={[0.26, 0.06, 12, 32, Math.PI * 1.5]} />
        <primitive object={ceramicMat} attach="material" />
      </mesh>

      {/* 4. Tea Liquid (Inside Cup) */}
      <mesh position={[0, 0.76, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.78, 0.74, 0.02, 32]} />
        <primitive object={teaLiquidMat} attach="material" />
      </mesh>
    </group>
  );
}

// Steam Particles Rising from the Cup
function SteamEffect({ visible, position = [0, 0.8, 0] }: { visible: boolean; position?: [number, number, number] }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 50;

  // Particle positions & speed vectors
  const [positions, speeds, offsets] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const offs = new Float32Array(count * 2);
    
    for (let i = 0; i < count; i++) {
      // spread particles inside the tea surface radius
      const r = Math.random() * 0.6;
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.random() * 2.0; // random height
      pos[i * 3 + 2] = Math.sin(theta) * r;
      
      spd[i] = 0.01 + Math.random() * 0.015; // rising speed
      offs[i * 2] = Math.random() * 100; // x offset
      offs[i * 2 + 1] = Math.random() * 100; // z offset
    }
    return [pos, spd, offs];
  }, []);

  const particleTexture = useMemo(() => createGoldGlowTexture(), []);

  useFrame((state) => {
    if (pointsRef.current && visible) {
      const time = state.clock.getElapsedTime();
      const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        // Rise up
        posArr[i * 3 + 1] += speeds[i];
        
        // Horizontal drift/wobble
        posArr[i * 3] += Math.sin(time * 2.0 + offsets[i * 2]) * 0.005;
        posArr[i * 3 + 2] += Math.cos(time * 1.5 + offsets[i * 2 + 1]) * 0.005;

        // Reset if reached max height
        if (posArr[i * 3 + 1] > 2.2) {
          posArr[i * 3 + 1] = 0.0;
          const r = Math.random() * 0.5;
          const theta = Math.random() * Math.PI * 2;
          posArr[i * 3] = Math.cos(theta) * r;
          posArr[i * 3 + 2] = Math.sin(theta) * r;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!visible) return null;

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        map={particleTexture || undefined}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Premium Canister 3D Model Component
function TeaCanister({
  visible,
  scale = 1.0,
  position = [0, 0, 0],
  teaName,
}: {
  visible: boolean;
  scale?: number;
  position?: [number, number, number];
  teaName: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Canister materials
  const bodyMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0c0c0c"), // matte charcoal black
      roughness: 0.65,
      metalness: 0.2,
    });
  }, []);

  const goldMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#d4af37"), // rich shiny gold
      roughness: 0.18,
      metalness: 0.9,
    });
  }, []);

  // Generate label texture
  const labelTexture = useMemo(() => createLabelTexture(teaName), [teaName]);
  
  const labelMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.35,
      metalness: 0.1,
    });
  }, [labelTexture]);

  useFrame((state) => {
    if (groupRef.current && visible) {
      const time = state.clock.getElapsedTime();
      // slow rotation
      groupRef.current.rotation.y = time * 0.25;
      groupRef.current.position.y = position[1] + Math.sin(time * 0.7) * 0.08;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* 1. Canister Lid (Gold, slightly beveled top) */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.2, 36]} />
        <primitive object={goldMat} attach="material" />
      </mesh>
      {/* Top chamfer dome */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.66, 0.72, 0.05, 36]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      {/* 2. Canister Main Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 2.7, 36]} />
        <primitive object={bodyMat} attach="material" />
      </mesh>

      {/* 3. Gold Trim bands (Middle bands / lid connection) */}
      <mesh position={[0, 1.34, 0]}>
        <cylinderGeometry args={[0.71, 0.71, 0.02, 36]} />
        <primitive object={goldMat} attach="material" />
      </mesh>
      
      {/* 4. Canister Base (Gold band) */}
      <mesh position={[0, -1.36, 0]}>
        <cylinderGeometry args={[0.71, 0.71, 0.05, 36]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      {/* 5. Elegant Label Wrap (Slightly larger cylinder segment in center) */}
      <mesh position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.705, 0.705, 1.6, 36, 1, true]} />
        <primitive object={labelMat} attach="material" />
      </mesh>
    </group>
  );
}

// Scene Content (handles camera coordinates, scrolls, lighting, and elements)
interface SceneContentProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
}

function SceneContent({ scrollProgress, mousePos }: SceneContentProps) {
  const { camera } = useThree();

  // Shared geometries and materials
  const leafGeom = useMemo(() => createLeafGeometry(), []);
  
  const greenLeafMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2E4F25"), // Deep organic green
      roughness: 0.6,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
  }, []);

  const goldLeafMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#d4af37"), // Gold leaf
      roughness: 0.2,
      metalness: 0.9,
      side: THREE.DoubleSide,
    });
  }, []);

  const particleTexture = useMemo(() => createGoldGlowTexture(), []);

  // Spotlights for canister presentation
  const canisterSpotlightRef = useRef<THREE.SpotLight>(null);

  // Floating background leaves generator
  const floatingLeavesData = useMemo(() => {
    const items = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      const isGold = i % 3 === 0; // 1/3 gold, 2/3 green leaves
      items.push({
        id: i,
        isGold,
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 1,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: 0.35 + Math.random() * 0.4,
      });
    }
    return items;
  }, []);

  // Floating gold particles background data
  const goldParticlesData = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      randoms[i] = Math.random();
    }
    return { positions, randoms };
  }, []);

  const backgroundParticlesRef = useRef<THREE.Points>(null);
  const leafGroupRef = useRef<THREE.Group>(null);

  // Interpolated states
  const lerpScroll = useRef(0);
  const lerpMouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Smooth interpolation of input sources
    lerpScroll.current = THREE.MathUtils.lerp(lerpScroll.current, scrollProgress, 0.045);
    lerpMouse.current.x = THREE.MathUtils.lerp(lerpMouse.current.x, mousePos.x, 0.05);
    lerpMouse.current.y = THREE.MathUtils.lerp(lerpMouse.current.y, mousePos.y, 0.05);

    const p = lerpScroll.current;
    const mx = lerpMouse.current.x;
    const my = lerpMouse.current.y;

    // 1. Camera positioning system based on scroll stage
    let targetZ = 6.8;
    let targetY = 0;
    let targetX = 0;

    if (p <= 0.15) {
      // Hero scene: Camera is close and looks down slightly at the cup
      targetZ = 5.2 - p * 3;
      targetY = 0.3 - p * 1.5;
    } else if (p > 0.15 && p <= 0.32) {
      // Special Masala Tea Canister (Left align)
      targetZ = 4.8;
      targetX = 0.15;
      targetY = 0;
    } else if (p > 0.32 && p <= 0.49) {
      // Ginger Tea Canister (Right align)
      targetZ = 4.8;
      targetX = -0.15;
      targetY = 0;
    } else if (p > 0.49 && p <= 0.66) {
      // Lemon Tea Canister (Left align)
      targetZ = 4.8;
      targetX = 0.15;
      targetY = 0;
    } else if (p > 0.66 && p <= 0.83) {
      // Green Tea Canister (Right align)
      targetZ = 4.8;
      targetX = -0.15;
      targetY = 0;
    } else if (p > 0.83 && p <= 0.95) {
      // Turmeric Tea Canister (Left align)
      targetZ = 4.8;
      targetX = 0.15;
      targetY = 0;
    } else {
      // Footer and Contact: Camera zoom out and pan up
      targetZ = 6.4;
      targetY = -0.6;
      targetX = 0;
    }

    // Apply camera parallax
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + mx * 0.35, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + my * 0.35, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.lookAt(new THREE.Vector3(targetX * 0.4, targetY * 0.8, 0));

    // 2. Slow animation of background leaf group
    if (leafGroupRef.current) {
      leafGroupRef.current.rotation.y = time * 0.015 + p * 0.4;
      leafGroupRef.current.position.y = -p * 3.5;
    }

    // 3. Animate background golden particles
    if (backgroundParticlesRef.current) {
      const positions = backgroundParticlesRef.current.geometry.attributes.position.array as Float32Array;
      const count = goldParticlesData.positions.length / 3;
      
      for (let i = 0; i < count; i++) {
        // Slow float up
        const speed = 0.008 + goldParticlesData.randoms[i] * 0.012;
        positions[i * 3 + 1] += speed;
        // Reset at top
        if (positions[i * 3 + 1] > 6) {
          positions[i * 3 + 1] = -6;
        }
        // Drift
        positions[i * 3] += Math.sin(time * 0.4 + goldParticlesData.randoms[i] * 5) * 0.0015;
      }
      backgroundParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      backgroundParticlesRef.current.position.y = p * 1.5;
    }

    // 4. Control Spotlight intensity matching canister states
    if (canisterSpotlightRef.current) {
      if (p > 0.14 && p < 0.94) {
        canisterSpotlightRef.current.intensity = 25;
      } else {
        canisterSpotlightRef.current.intensity = 0;
      }
    }
  });

  // Calculate visibility ratios for individual elements based on scroll progress p
  const p = scrollProgress;
  
  // Hero elements (Tea Cup & Steam)
  const isHeroActive = p <= 0.18;
  const heroShowRatio = p <= 0.15 ? 1.0 : Math.max(0, 1 - (p - 0.15) / 0.03);
  const cupPos: [number, number, number] = [0, -0.4 - (1 - heroShowRatio) * 1.5, 0];
  const cupScale = 1.35 * heroShowRatio;

  // Showcase 1: Masala Tea Canister (Active 0.15 to 0.32)
  const activeS1 = p > 0.13 && p < 0.34;
  let ratioS1 = 0;
  if (p >= 0.13 && p < 0.20) ratioS1 = (p - 0.13) / 0.07;
  else if (p >= 0.20 && p <= 0.27) ratioS1 = 1.0;
  else if (p > 0.27 && p < 0.34) ratioS1 = 1.0 - (p - 0.27) / 0.07;
  const posS1: [number, number, number] = [-1.4 - (1 - ratioS1) * 2.5, 0, 0];
  const scaleS1 = 1.25 * ratioS1;

  // Showcase 2: Ginger Tea Canister (Active 0.32 to 0.49)
  const activeS2 = p > 0.30 && p < 0.51;
  let ratioS2 = 0;
  if (p >= 0.30 && p < 0.37) ratioS2 = (p - 0.30) / 0.07;
  else if (p >= 0.37 && p <= 0.44) ratioS2 = 1.0;
  else if (p > 0.44 && p < 0.51) ratioS2 = 1.0 - (p - 0.44) / 0.07;
  const posS2: [number, number, number] = [1.4 + (1 - ratioS2) * 2.5, 0, 0];
  const scaleS2 = 1.25 * ratioS2;

  // Showcase 3: Lemon Tea Canister (Active 0.49 to 0.66)
  const activeS3 = p > 0.47 && p < 0.68;
  let ratioS3 = 0;
  if (p >= 0.47 && p < 0.54) ratioS3 = (p - 0.47) / 0.07;
  else if (p >= 0.54 && p <= 0.61) ratioS3 = 1.0;
  else if (p > 0.61 && p < 0.68) ratioS3 = 1.0 - (p - 0.61) / 0.07;
  const posS3: [number, number, number] = [-1.4 - (1 - ratioS3) * 2.5, 0, 0];
  const scaleS3 = 1.25 * ratioS3;

  // Showcase 4: Green Tea Canister (Active 0.66 to 0.83)
  const activeS4 = p > 0.64 && p < 0.85;
  let ratioS4 = 0;
  if (p >= 0.64 && p < 0.71) ratioS4 = (p - 0.64) / 0.07;
  else if (p >= 0.71 && p <= 0.78) ratioS4 = 1.0;
  else if (p > 0.78 && p < 0.85) ratioS4 = 1.0 - (p - 0.78) / 0.07;
  const posS4: [number, number, number] = [1.4 + (1 - ratioS4) * 2.5, 0, 0];
  const scaleS4 = 1.25 * ratioS4;

  // Showcase 5: Turmeric Health Tea Canister (Active 0.83 to 0.96)
  const activeS5 = p > 0.81 && p < 0.97;
  let ratioS5 = 0;
  if (p >= 0.81 && p < 0.88) ratioS5 = (p - 0.81) / 0.07;
  else if (p >= 0.88 && p <= 0.93) ratioS5 = 1.0;
  else if (p > 0.93 && p < 0.97) ratioS5 = 1.0 - (p - 0.93) / 0.04;
  const posS5: [number, number, number] = [-1.4 - (1 - ratioS5) * 2.5, 0, 0];
  const scaleS5 = 1.25 * ratioS5;

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 12, 5]} intensity={1.8} color="#fff" />
      <directionalLight position={[-6, -6, -6]} intensity={0.4} color="#d4af37" />
      
      {/* Studio Gold Spotlights for products */}
      <spotLight
        ref={canisterSpotlightRef}
        position={[0, 6, 5]}
        angle={0.75}
        penumbra={0.7}
        color="#d4af37"
        intensity={0}
        castShadow
      />



      {/* Showcases: Tea Canisters Removed as per request */}

      {/* Floating Tea Leaves Group */}
      <group ref={leafGroupRef}>
        {floatingLeavesData.map((item) => (
          <FloatingLeaf
            key={item.id}
            geom={leafGeom}
            mat={item.isGold ? goldLeafMat : greenLeafMat}
            position={item.position}
            rotation={item.rotation}
            scale={[item.scale, item.scale, item.scale]}
          />
        ))}
      </group>

      {/* Golden Glowing Particles Background */}
      <points ref={backgroundParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[goldParticlesData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          map={particleTexture || undefined}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

// Main Root Canvas Container
export default function ThreeScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      setScrollProgress(window.scrollY / maxScroll);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="canvas-container select-none">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <SceneContent scrollProgress={scrollProgress} mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
