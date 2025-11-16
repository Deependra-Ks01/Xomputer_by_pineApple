import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Motherboard } from "@/types/pc-components";

interface MotherboardComponentProps {
  motherboard: Motherboard;
}

export const MotherboardComponent = ({ motherboard }: MotherboardComponentProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    if (meshRef.current) {
      // Start from above and slide down into position
      meshRef.current.position.y = 3;
      meshRef.current.scale.set(0.5, 0.5, 0.5);
      
      const startY = 3;
      const endY = 0.2;
      const duration = 1200;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        if (meshRef.current) {
          meshRef.current.position.y = startY + (endY - startY) * eased;
          const scale = 0.5 + 0.5 * eased;
          meshRef.current.scale.set(scale, scale, scale);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [motherboard]);

  useFrame((state) => {
    if (materialRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5;
      materialRef.current.emissive.setHex(0x00ff88);
      materialRef.current.emissiveIntensity = pulse * 0.3;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0.2, 0]}>
      {/* Main PCB */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.9, 0.02]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#0a4d2e"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* CPU Socket */}
      <mesh position={[0, 0.02, 0.1]} castShadow>
        <boxGeometry args={[0.15, 0.03, 0.15]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* RAM Slots */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0.15 + i * 0.05, 0.02, -0.2]} castShadow>
          <boxGeometry args={[0.03, 0.025, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      
      {/* PCIe Slots */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.15, 0.02, -0.1 + i * 0.15]} castShadow>
          <boxGeometry args={[0.25, 0.02, 0.02]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      
      {/* Chipset */}
      <mesh position={[0, 0.03, -0.15]} castShadow>
        <boxGeometry args={[0.1, 0.04, 0.1]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};
