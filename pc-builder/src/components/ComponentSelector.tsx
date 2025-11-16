import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle } from "lucide-react";
import { Component } from "@/types/pc-components";

interface ComponentSelectorProps {
  title: string;
  components: Component[];
  selectedComponent: Component | null;
  onSelectComponent: (component: Component) => void;
  compatibilityIssues?: string[];
}

export const ComponentSelector = ({
  title,
  components,
  selectedComponent,
  onSelectComponent,
  compatibilityIssues = [],
}: ComponentSelectorProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">Choose the best option for your build</p>
      </div>
      
      <div className="grid gap-4">
        {components.map((component) => {
          const isSelected = selectedComponent?.id === component.id;
          const hasIssue = compatibilityIssues.some(issue => issue.includes(component.name));
          
          return (
            <Card
              key={component.id}
              className={`p-6 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "bg-primary/10 border-primary shadow-glow"
                  : hasIssue
                  ? "bg-destructive/5 border-destructive/50"
                  : "bg-card border-border hover:border-primary/50"
              }`}
              onClick={() => onSelectComponent(component)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1">
                  <div className="w-20 h-20 rounded-lg bg-background/50 flex items-center justify-center border border-border">
                    <img
                      src={component.image}
                      alt={component.name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold mb-1">{component.name}</h4>
                        <p className="text-sm text-muted-foreground">{component.brand}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${component.price}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {Object.entries(component.specs).map(([key, value]) => (
                        <Badge key={key} variant="secondary" className="text-xs">
                          {typeof value === "string" ? value : `${key}: ${value}`}
                        </Badge>
                      ))}
                    </div>
                    
                    {hasIssue && (
                      <div className="mt-3 flex items-start gap-2 text-sm text-destructive">
                        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>
                          {compatibilityIssues.find(issue => issue.includes(component.name))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {isSelected && (
                  <div className="flex items-center gap-2 text-primary">
                    <Check className="w-5 h-5" />
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
