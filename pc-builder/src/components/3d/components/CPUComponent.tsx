import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CPU } from "@/types/pc-components";

interface CPUComponentProps {
  cpu: CPU;
  hasMobo: boolean;
}

export const CPUComponent = ({ cpu, hasMobo }: CPUComponentProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const fanRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current && hasMobo) {
      // Drop from above with a bounce
      meshRef.current.position.y = 2.5;
      meshRef.current.rotation.set(0, Math.PI * 2, 0);
      
      const startY = 2.5;
      const endY = 0.27;
      const duration = 1000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Bounce easing
        let eased = progress;
        if (progress < 1) {
          eased = 1 - Math.pow(1 - progress, 2);
          if (progress > 0.7) {
            eased += Math.sin((progress - 0.7) * Math.PI * 3) * 0.05;
          }
        }
        
        if (meshRef.current) {
          meshRef.current.position.y = startY + (endY - startY) * eased;
          meshRef.current.rotation.y = (1 - progress) * Math.PI * 2;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [cpu, hasMobo]);

  useFrame((state) => {
    if (materialRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.5 + 0.5;
      materialRef.current.emissive.setHex(0xff6600);
      materialRef.current.emissiveIntensity = pulse * 0.4;
    }
    if (fanRef.current) {
      fanRef.current.rotation.y = state.clock.elapsedTime * 5;
    }
  });

  if (!hasMobo) return null;

  return (
    <group ref={meshRef} position={[0, 0.27, 0.1]}>
      {/* CPU Package */}
      <mesh castShadow>
        <boxGeometry args={[0.14, 0.02, 0.14]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#2a2a2a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* CPU Cooler */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.12, 32]} />
        <meshStandardMaterial
          color="#666666"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      
      {/* Cooler Fan */}
      <mesh ref={fanRef} position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.01, 6]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};
