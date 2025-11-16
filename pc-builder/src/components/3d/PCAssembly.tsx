import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { PCBuild } from "@/types/pc-components";
import * as THREE from "three";
import { CaseComponent } from "./components/CaseComponent";
import { MotherboardComponent } from "./components/MotherboardComponent";
import { CPUComponent } from "./components/CPUComponent";
import { GPUComponent } from "./components/GPUComponent";
import { RAMComponent } from "./components/RAMComponent";
import { StorageComponent } from "./components/StorageComponent";
import { PSUComponent } from "./components/PSUComponent";

interface PCAssemblyProps {
  build: PCBuild;
}

export const PCAssembly = ({ build }: PCAssemblyProps) => {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Case - always visible as the base */}
      <CaseComponent hasCase={!!build.case} caseData={build.case} />
      
      {/* Motherboard - mounted inside case */}
      {build.motherboard && (
        <MotherboardComponent motherboard={build.motherboard} />
      )}
      
      {/* CPU - mounted on motherboard */}
      {build.cpu && (
        <CPUComponent cpu={build.cpu} hasMobo={!!build.motherboard} />
      )}
      
      {/* GPU - mounted on motherboard */}
      {build.gpu && (
        <GPUComponent gpu={build.gpu} hasMobo={!!build.motherboard} />
      )}
      
      {/* RAM - mounted on motherboard */}
      {build.ram && (
        <RAMComponent ram={build.ram} hasMobo={!!build.motherboard} />
      )}
      
      {/* Storage - mounted on motherboard or case */}
      {build.storage && (
        <StorageComponent storage={build.storage} />
      )}
      
      {/* PSU - mounted at bottom of case */}
      {build.psu && (
        <PSUComponent psu={build.psu} hasCase={!!build.case} />
      )}
    </group>
  );
};
