import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PCBuild } from "@/types/pc-components";
import { calculateTotalCost, calculateTotalPowerDraw, checkCompatibility } from "@/utils/compatibility";
import { DollarSign, Zap, AlertTriangle, CheckCircle, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BuildSummaryProps {
  build: PCBuild;
}

export const BuildSummary = ({ build }: BuildSummaryProps) => {
  const { toast } = useToast();
  const totalCost = calculateTotalCost(build);
  const totalPowerDraw = calculateTotalPowerDraw(build);
  const issues = checkCompatibility(build);
  const errors = issues.filter(issue => issue.type === "error");
  const warnings = issues.filter(issue => issue.type === "warning");

  const isComplete = build.cpu && build.gpu && build.motherboard && build.ram && build.storage && build.psu && build.case;

  const handleExport = () => {
    const buildData = {
      ...build,
      totalCost,
      totalPowerDraw,
      exportedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(buildData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pc-build-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Build Exported",
      description: "Your PC build has been downloaded as JSON",
    });
  };

  const handleShare = async () => {
    const buildUrl = `${window.location.origin}?build=${encodeURIComponent(btoa(JSON.stringify(build)))}`;
    
    try {
      await navigator.clipboard.writeText(buildUrl);
      toast({
        title: "Link Copied!",
        description: "Share this link to show your build to others",
      });
    } catch (err) {
      toast({
        title: "Share Build",
        description: buildUrl,
        variant: "default",
      });
    }
  };

  return (
    <Card className="sticky top-6 p-6 bg-gradient-tech border-primary/20">
      <h3 className="text-xl font-bold mb-4">Build Summary</h3>
      
      {/* Cost and Power */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="font-medium">Total Cost</span>
          </div>
          <span className="text-2xl font-bold text-primary">${totalCost}</span>
        </div>
        
        <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-warning" />
            <span className="font-medium">Power Draw</span>
          </div>
          <span className="text-lg font-semibold">{totalPowerDraw}W</span>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Components List */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-semibold text-muted-foreground">Components</h4>
        {[
          { label: "CPU", component: build.cpu },
          { label: "GPU", component: build.gpu },
          { label: "Motherboard", component: build.motherboard },
          { label: "RAM", component: build.ram },
          { label: "Storage", component: build.storage },
          { label: "PSU", component: build.psu },
          { label: "Case", component: build.case },
        ].map(({ label, component }) => (
          <div key={label} className="flex justify-between items-start text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-right font-medium max-w-[60%]">
              {component ? component.name : "—"}
            </span>
          </div>
        ))}
      </div>

      <Separator className="my-6" />

      {/* Compatibility Status */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-semibold text-muted-foreground">Compatibility</h4>
        
        {errors.length === 0 && warnings.length === 0 && isComplete && (
          <div className="flex items-center gap-2 text-success">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">All components compatible</span>
          </div>
        )}
        
        {errors.map((issue, idx) => (
          <div key={idx} className="flex items-start gap-2 text-destructive text-sm">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{issue.message}</span>
          </div>
        ))}
        
        {warnings.map((issue, idx) => (
          <div key={idx} className="flex items-start gap-2 text-warning text-sm">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{issue.message}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button 
          className="w-full" 
          disabled={!isComplete || errors.length > 0}
          onClick={handleExport}
        >
          <Download className="w-4 h-4 mr-2" />
          Export Build
        </Button>
        
        <Button 
          variant="outline"
          className="w-full"
          disabled={!isComplete || errors.length > 0}
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Build
        </Button>
      </div>
      
      {totalCost > build.budget && (
        <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/30">
          <p className="text-sm text-warning">
            Build exceeds budget by ${totalCost - build.budget}
          </p>
        </div>
      )}
    </Card>
  );
};