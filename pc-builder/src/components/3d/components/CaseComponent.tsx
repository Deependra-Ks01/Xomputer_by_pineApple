import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PCCase } from "@/types/pc-components";

interface CaseComponentProps {
  hasCase: boolean;
  caseData: PCCase | null;
}

export const CaseComponent = ({ hasCase, caseData }: CaseComponentProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(0, 0, 0);
      if (hasCase) {
        // Animate in
        const startScale = 0;
        const endScale = 1;
        const duration = 1000;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
          
          if (meshRef.current) {
            const scale = startScale + (endScale - startScale) * eased;
            meshRef.current.scale.set(scale, scale, scale);
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      }
    }
  }, [hasCase]);

  // Glow effect when selected
  useFrame((state) => {
    if (materialRef.current && hasCase) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5;
      materialRef.current.emissive.setHex(0x00d9ff);
      materialRef.current.emissiveIntensity = pulse * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0.5, 0]}>
      {/* Main case body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1.6, 1.2]} />
        <meshStandardMaterial
          ref={materialRef}
          color={hasCase ? "#1a1a2e" : "#2a2a3e"}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={hasCase ? 1 : 0.3}
        />
      </mesh>
      
      {/* Front panel accent */}
      <mesh position={[0.41, 0, 0]} castShadow>
        <boxGeometry args={[0.02, 1.5, 1.1]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={hasCase ? 0.5 : 0.1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Side panel - semi-transparent to see inside */}
      <mesh position={[0, 0, 0.61]} castShadow>
        <boxGeometry args={[0.78, 1.58, 0.02]} />
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={hasCase ? 0.3 : 0.1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};
