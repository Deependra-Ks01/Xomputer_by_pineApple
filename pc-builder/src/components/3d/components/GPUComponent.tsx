import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GPU } from "@/types/pc-components";

interface GPUComponentProps {
  gpu: GPU;
  hasMobo: boolean;
}

export const GPUComponent = ({ gpu, hasMobo }: GPUComponentProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const fanRef1 = useRef<THREE.Mesh>(null);
  const fanRef2 = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    if (meshRef.current && hasMobo) {
      // Slide in from the side
      meshRef.current.position.x = -2;
      meshRef.current.position.y = 0.3;
      
      const startX = -2;
      const endX = -0.15;
      const duration = 1200;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        if (meshRef.current) {
          meshRef.current.position.x = startX + (endX - startX) * eased;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [gpu, hasMobo]);

  useFrame((state) => {
    if (fanRef1.current) {
      fanRef1.current.rotation.z += 0.1;
    }
    if (fanRef2.current) {
      fanRef2.current.rotation.z -= 0.1;
    }
    if (materialRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5;
      materialRef.current.emissive.setHex(0x00ff00);
      materialRef.current.emissiveIntensity = pulse * 0.3;
    }
  });

  if (!hasMobo) return null;

  const gpuLength = (gpu.length / 1000) * 0.3; // Scale down

  return (
    <group ref={meshRef} position={[-0.15, 0.3, 0]} rotation={[0, Math.PI / 2, 0]}>
      {/* GPU PCB */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[gpuLength, 0.15, 0.02]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#0a3d2e"
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      {/* GPU Cooler Shroud */}
      <mesh position={[0, 0, 0.06]} castShadow>
        <boxGeometry args={[gpuLength - 0.05, 0.12, 0.08]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Cooling Fans */}
      <mesh ref={fanRef1} position={[-0.1, 0, 0.11]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 8]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      <mesh ref={fanRef2} position={[0.1, 0, 0.11]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 8]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* RGB Strip */}
      <mesh position={[0, 0.065, 0.06]}>
        <boxGeometry args={[gpuLength - 0.1, 0.005, 0.08]} />
        <meshStandardMaterial
          color="#00ff00"
          emissive="#00ff00"
          emissiveIntensity={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Backplate */}
      <mesh position={[0, 0, -0.02]} castShadow>
        <boxGeometry args={[gpuLength - 0.02, 0.14, 0.005]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};
