import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp } from "lucide-react";

interface BudgetSelectorProps {
  budget: number;
  onBudgetChange: (budget: number) => void;
}

const getPerformanceTier = (budget: number): { tier: string; description: string; color: string } => {
  if (budget < 800) return { 
    tier: "Entry Level", 
    description: "Great for office work and light gaming",
    color: "text-muted-foreground"
  };
  if (budget < 1500) return { 
    tier: "Mid-Range", 
    description: "1080p gaming at high settings",
    color: "text-primary"
  };
  if (budget < 2500) return { 
    tier: "High-End", 
    description: "1440p gaming at ultra settings",
    color: "text-primary"
  };
  return { 
    tier: "Enthusiast", 
    description: "4K gaming and professional workloads",
    color: "text-primary"
  };
};

export const BudgetSelector = ({ budget, onBudgetChange }: BudgetSelectorProps) => {
  const performance = getPerformanceTier(budget);
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Set Your Budget</h2>
        <p className="text-muted-foreground">We'll recommend components that fit your price range</p>
      </div>
      
      <Card className="p-8 bg-gradient-tech border-primary/20">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Budget Range</span>
            </div>
            <div className="text-3xl font-bold text-primary">${budget}</div>
          </div>
          
          <Slider
            value={[budget]}
            onValueChange={(values) => onBudgetChange(values[0])}
            min={500}
            max={4000}
            step={50}
            className="py-4"
          />
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>$500</span>
            <span>$4,000</span>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-lg bg-background/50 border border-border">
            <TrendingUp className={`w-6 h-6 mt-1 ${performance.color}`} />
            <div>
              <div className={`font-semibold mb-1 ${performance.color}`}>
                {performance.tier}
              </div>
              <p className="text-sm text-muted-foreground">
                {performance.description}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
