import { Card } from "@/components/ui/card";
import { Gamepad2, Film, Briefcase, ChevronRight } from "lucide-react";

export type UseCase = "gaming" | "content-creation" | "office";

interface UseCaseSelectorProps {
  selectedUseCase: UseCase | null;
  onSelectUseCase: (useCase: UseCase) => void;
}

const useCases = [
  {
    id: "gaming" as UseCase,
    title: "Gaming",
    description: "High FPS, smooth gameplay, latest titles",
    icon: Gamepad2,
    color: "text-primary",
  },
  {
    id: "content-creation" as UseCase,
    title: "Content Creation",
    description: "Video editing, 3D rendering, multitasking",
    icon: Film,
    color: "text-primary",
  },
  {
    id: "office" as UseCase,
    title: "Office & Productivity",
    description: "Documents, browsing, light tasks",
    icon: Briefcase,
    color: "text-primary",
  },
];

export const UseCaseSelector = ({ selectedUseCase, onSelectUseCase }: UseCaseSelectorProps) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What will you use your PC for?</h2>
        <p className="text-muted-foreground">Choose your primary use case to get optimized recommendations</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {useCases.map((useCase) => {
          const Icon = useCase.icon;
          const isSelected = selectedUseCase === useCase.id;
          
          return (
            <Card
              key={useCase.id}
              className={`relative p-8 cursor-pointer transition-all duration-300 hover:scale-105 group ${
                isSelected 
                  ? "bg-primary/10 border-primary shadow-glow" 
                  : "bg-card border-border hover:border-primary/50"
              }`}
              onClick={() => onSelectUseCase(useCase.id)}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-2xl bg-background/50 ${isSelected ? "shadow-glow" : ""}`}>
                  <Icon className={`w-10 h-10 ${isSelected ? useCase.color : "text-muted-foreground"} transition-colors`} />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </div>
                
                {isSelected && (
                  <div className="flex items-center gap-1 text-primary text-sm font-medium">
                    Selected <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
