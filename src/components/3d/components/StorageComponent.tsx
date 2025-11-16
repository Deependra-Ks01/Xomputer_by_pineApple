import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Storage } from "@/types/pc-components";

interface StorageComponentProps {
  storage: Storage;
}

export const StorageComponent = ({ storage }: StorageComponentProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    if (meshRef.current) {
      // Fade in and scale up
      meshRef.current.scale.set(0, 0, 0);
      
      const duration = 800;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        if (meshRef.current) {
          meshRef.current.scale.set(eased, eased, eased);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [storage]);

  useFrame((state) => {
    if (materialRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2.5) * 0.5 + 0.5;
      materialRef.current.emissive.setHex(0x00ffff);
      materialRef.current.emissiveIntensity = pulse * 0.3;
    }
  });

  // M.2 NVMe drive (small stick)
  if (storage.type === "NVME") {
    return (
      <group ref={meshRef} position={[0, 0.23, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* M.2 PCB */}
        <mesh castShadow>
          <boxGeometry args={[0.15, 0.02, 0.01]} />
          <meshStandardMaterial
            ref={materialRef}
            color="#0a4d4d"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
        
        {/* Controller Chip */}
        <mesh position={[0, 0, 0.008]} castShadow>
          <boxGeometry args={[0.04, 0.015, 0.008]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Label */}
        <mesh position={[0, 0.005, 0.006]}>
          <boxGeometry args={[0.12, 0.015, 0.001]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    );
  }

  // SSD (2.5" drive)
  return (
    <group ref={meshRef} position={[0.3, 0.1, 0.3]}>
      <mesh castShadow>
        <boxGeometry args={[0.15, 0.02, 0.2]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#2a2a2a"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Label */}
      <mesh position={[0, 0.011, 0]}>
        <boxGeometry args={[0.13, 0.001, 0.08]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
};
