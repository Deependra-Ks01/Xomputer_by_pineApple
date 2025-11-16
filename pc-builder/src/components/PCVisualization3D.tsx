import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Grid } from "@react-three/drei";
import { PCAssembly } from "./3d/PCAssembly";
import { PCBuild } from "@/types/pc-components";

interface PCVisualization3DProps {
  build: PCBuild;
}

export const PCVisualization3D = ({ build }: PCVisualization3DProps) => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-background to-background/50 border border-primary/20 relative">
      {/* Info overlay */}
      <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30">
        <p className="text-xs text-muted-foreground">Click and drag to rotate • Scroll to zoom</p>
      </div>
      
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[3, 2, 3]} fov={50} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={8}
          maxPolarAngle={Math.PI / 2}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00d9ff" />
        <pointLight position={[5, -5, 5]} intensity={0.3} color="#0099ff" />
        
        {/* Environment */}
        <Environment preset="city" />
        
        {/* Grid */}
        <Grid
          args={[10, 10]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#00d9ff"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#0099ff"
          fadeDistance={25}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={true}
        />
        
        {/* PC Assembly */}
        <PCAssembly build={build} />
      </Canvas>
    </div>
  );
};
