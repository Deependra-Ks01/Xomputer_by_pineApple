import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PSU } from "@/types/pc-components";

interface PSUComponentProps {
  psu: PSU;
  hasCase: boolean;
}

export const PSUComponent = ({ psu, hasCase }: PSUComponentProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const fanRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    if (meshRef.current && hasCase) {
      // Slide in from bottom
      meshRef.current.position.y = -1.5;
      
      const startY = -1.5;
      const endY = -0.45;
      const duration = 1000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        if (meshRef.current) {
          meshRef.current.position.y = startY + (endY - startY) * eased;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [psu, hasCase]);

  useFrame((state) => {
    if (fanRef.current) {
      fanRef.current.rotation.y += 0.15;
    }
    if (materialRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5;
      materialRef.current.emissive.setHex(0xffaa00);
      materialRef.current.emissiveIntensity = pulse * 0.2;
    }
  });

  if (!hasCase) return null;

  return (
    <group ref={meshRef} position={[0, -0.45, -0.3]}>
      {/* PSU Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.2, 0.3]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Fan Grill */}
      <mesh position={[0, 0.101, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.005, 32]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Fan Blades */}
      <mesh ref={fanRef} position={[0, 0.11, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.01, 6]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Power Label */}
      <mesh position={[0.201, 0, 0]}>
        <boxGeometry args={[0.001, 0.08, 0.12]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ffaa00"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Cables */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0.15, 0.08 - i * 0.03, 0.15]}>
          <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
          <meshStandardMaterial
            color="#ff0000"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};
