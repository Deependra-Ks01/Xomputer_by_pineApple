import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RAM } from "@/types/pc-components";

interface RAMComponentProps {
  ram: RAM;
  hasMobo: boolean;
}

export const RAMComponent = ({ ram, hasMobo }: RAMComponentProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    if (meshRef.current && hasMobo) {
      // Pop in from above with stagger
      meshRef.current.position.y = 2;
      meshRef.current.scale.set(1, 0.1, 1);
      
      const startY = 2;
      const endY = 0.25;
      const duration = 800;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        if (meshRef.current) {
          meshRef.current.position.y = startY + (endY - startY) * eased;
          const scaleY = 0.1 + 0.9 * eased;
          meshRef.current.scale.set(1, scaleY, 1);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [ram, hasMobo]);

  useFrame((state) => {
    if (materialRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5;
      materialRef.current.emissive.setHex(0x9900ff);
      materialRef.current.emissiveIntensity = pulse * 0.4;
    }
  });

  if (!hasMobo) return null;

  // Determine number of sticks (2 for 16GB, 2 for 32GB in this simple version)
  const sticks = 2;

  return (
    <group ref={meshRef} position={[0.2, 0.25, -0.2]}>
      {Array.from({ length: sticks }).map((_, i) => (
        <group key={i} position={[i * 0.05, 0, 0]}>
          {/* RAM Stick Body */}
          <mesh castShadow>
            <boxGeometry args={[0.03, 0.12, 0.3]} />
            <meshStandardMaterial
              ref={i === 0 ? materialRef : undefined}
              color="#1a1a1a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          {/* RAM Heatsink */}
          <mesh position={[0.015, 0, 0]} castShadow>
            <boxGeometry args={[0.005, 0.13, 0.3]} />
            <meshStandardMaterial
              color="#333333"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          
          <mesh position={[-0.015, 0, 0]} castShadow>
            <boxGeometry args={[0.005, 0.13, 0.3]} />
            <meshStandardMaterial
              color="#333333"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          
          {/* RGB Strip on top */}
          <mesh position={[0, 0.065, 0]}>
            <boxGeometry args={[0.03, 0.01, 0.28]} />
            <meshStandardMaterial
              color="#9900ff"
              emissive="#9900ff"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
