import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

interface HeroSceneProps {
  isDarkMode?: boolean;
}

const DNAHelix = (props: any) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 100; // Number of base pairs
  const radius = 2;
  const height = 12;

  // Generate DNA Strand Data
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 2 * 3);
    const colors = new Float32Array(count * 2 * 3);
    const color1 = new THREE.Color("#06b6d4"); // Cyan
    const color2 = new THREE.Color("#10b981"); // Green

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 8; // 4 full turns
      const y = (t - 0.5) * height;

      // Strand 1
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      
      positions[i * 6] = x1;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z1;

      colors[i * 6] = color1.r;
      colors[i * 6 + 1] = color1.g;
      colors[i * 6 + 2] = color1.b;

      // Strand 2 (Offset by PI)
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      positions[i * 6 + 3] = x2;
      positions[i * 6 + 4] = y;
      positions[i * 6 + 5] = z2;

      colors[i * 6 + 3] = color2.r;
      colors[i * 6 + 4] = color2.g;
      colors[i * 6 + 5] = color2.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.005;
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group {...props}>
      <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const HeroScene: React.FC<HeroSceneProps> = ({ isDarkMode = true }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        {/* Adjust fog based on theme to blend mesh into background */}
        <fog attach="fog" args={[isDarkMode ? '#020617' : '#f8fafc', 5, 25]} />
        <ambientLight intensity={0.5} />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <DNAHelix rotation={[0, 0, Math.PI / 6]} scale={0.8} />
        </Float>
        
        {/* Only show stars in dark mode, creates a cleaner medical look in light mode */}
        {isDarkMode && (
          <Stars 
            radius={50} 
            depth={50} 
            count={2000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5} 
          />
        )}
      </Canvas>
    </div>
  );
};

export default HeroScene;