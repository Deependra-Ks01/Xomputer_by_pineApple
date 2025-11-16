import { Button } from "@/components/ui/button";
import { Cpu, Zap } from "lucide-react";

interface HeroProps {
  onStartBuild: () => void;
  onViewExamples: () => void;
}

export const Hero = ({ onStartBuild, onViewExamples }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-tech opacity-50" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-primary/20 mb-8 backdrop-blur-sm">
          <Cpu className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">Smart PC Builder</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Build Your Xcomputer with PineApple
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
          Get guided through compatible components based on your performance needs and budget. 
          Real-time compatibility checks and smart suggestions included.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Button 
            size="lg" 
            onClick={onStartBuild}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-glow-strong transition-all duration-300 text-lg px-8 py-6"
          >
            <Zap className="w-5 h-5 mr-2" />
            Start Building
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            onClick={onViewExamples}
            className="border-primary/30 hover:border-primary hover:bg-primary/10 text-lg px-8 py-6"
          >
            View Example Builds
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-sm text-muted-foreground">Components</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Compatible</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">Real-time</div>
            <div className="text-sm text-muted-foreground">Price Tracking</div>
          </div>
        </div>
      </div>
    </div>
  );
};
