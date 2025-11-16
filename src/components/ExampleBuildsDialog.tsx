import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PCBuild } from "@/types/pc-components";
import { exampleBuilds } from "@/data/example-builds";
import { calculateTotalCost } from "@/utils/compatibility";
import { DollarSign, Cpu, Monitor, Zap } from "lucide-react";

interface ExampleBuildsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectBuild: (build: PCBuild) => void;
}

export const ExampleBuildsDialog = ({ open, onOpenChange, onSelectBuild }: ExampleBuildsDialogProps) => {
  const getUseCaseInfo = (useCase: string) => {
    switch (useCase) {
      case "gaming":
        return { label: "Gaming", icon: Monitor, color: "bg-primary" };
      case "content-creation":
        return { label: "Content Creation", icon: Cpu, color: "bg-purple-500" };
      case "office":
        return { label: "Office", icon: Zap, color: "bg-green-500" };
      default:
        return { label: useCase, icon: Monitor, color: "bg-primary" };
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Example PC Builds</DialogTitle>
          <DialogDescription>
            Choose from our pre-configured builds optimized for different use cases
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {exampleBuilds.map((build, index) => {
            const useCaseInfo = getUseCaseInfo(build.useCase);
            const Icon = useCaseInfo.icon;
            const totalCost = calculateTotalCost(build);

            return (
              <Card key={index} className="p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`${useCaseInfo.color} text-white`}>
                    <Icon className="w-3 h-3 mr-1" />
                    {useCaseInfo.label}
                  </Badge>
                  <div className="flex items-center gap-1 text-lg font-bold text-primary">
                    <DollarSign className="w-4 h-4" />
                    {totalCost}
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CPU:</span>
                    <span className="font-medium text-right">{build.cpu?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GPU:</span>
                    <span className="font-medium text-right">{build.gpu?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RAM:</span>
                    <span className="font-medium text-right">{build.ram?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span className="font-medium text-right">{build.storage?.name}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    onSelectBuild(build);
                    onOpenChange(false);
                  }}
                >
                  Use This Build
                </Button>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};