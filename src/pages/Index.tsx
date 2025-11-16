import { useState } from "react";
import { Hero } from "@/components/Hero";
import { UseCaseSelector, UseCase } from "@/components/UseCaseSelector";
import { BudgetSelector } from "@/components/BudgetSelector";
import { ComponentSelector } from "@/components/ComponentSelector";
import { BuildSummary } from "@/components/BuildSummary";
import { PCVisualization3D } from "@/components/PCVisualization3D";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PCBuild } from "@/types/pc-components";
import { cpuData, gpuData, motherboardData, ramData, storageData, psuData, caseData } from "@/data/components-data";
import { checkCompatibility } from "@/utils/compatibility";

const Index = () => {
  const [step, setStep] = useState<"hero" | "usecase" | "budget" | "components">("hero");
  const [build, setBuild] = useState<PCBuild>({
    useCase: null as any,
    budget: 1500,
    cpu: null,
    gpu: null,
    motherboard: null,
    ram: null,
    storage: null,
    psu: null,
    case: null,
  });
  const [componentStep, setComponentStep] = useState< "motherboard" | "cpu" | "ram" | "gpu" | "storage" | "psu" | "case">("cpu");

  const handleStartBuild = () => setStep("usecase");
  
  const handleUseCaseSelect = (useCase: UseCase) => {
    setBuild({ ...build, useCase });
  };

  const handleBudgetChange = (budget: number) => {
    setBuild({ ...build, budget });
  };

  const componentSteps = ["cpu", "motherboard", "ram", "gpu", "storage", "psu", "case"] as const;
  const currentComponentIndex = componentSteps.indexOf(componentStep);

  const handleNextComponent = () => {
    const nextIndex = currentComponentIndex + 1;
    if (nextIndex < componentSteps.length) {
      setComponentStep(componentSteps[nextIndex]);
    }
  };

  const handlePrevComponent = () => {
    const prevIndex = currentComponentIndex - 1;
    if (prevIndex >= 0) {
      setComponentStep(componentSteps[prevIndex]);
    } else {
      setStep("budget");
    }
  };

  const getCompatibilityIssues = () => {
    const issues = checkCompatibility(build);
    return issues.map(issue => issue.message);
  };

  const renderComponentSelector = () => {
    const compatibilityIssues = getCompatibilityIssues();

    switch (componentStep) {
      case "motherboard":
        return (
          <ComponentSelector
            title="Select Motherboard"
            components={motherboardData}
            selectedComponent={build.motherboard}
            onSelectComponent={(motherboard) => setBuild({ ...build, motherboard: motherboard as any })}
            compatibilityIssues={compatibilityIssues}
          />
        );
      case "cpu":
        return (
          <ComponentSelector
            title="Select CPU"
            components={cpuData}
            selectedComponent={build.cpu}
            onSelectComponent={(cpu) => setBuild({ ...build, cpu: cpu as any })}
            compatibilityIssues={compatibilityIssues}
          />
        );
      case "ram":
        return (
          <ComponentSelector
            title="Select RAM"
            components={ramData}
            selectedComponent={build.ram}
            onSelectComponent={(ram) => setBuild({ ...build, ram: ram as any })}
            compatibilityIssues={compatibilityIssues}
          />
        );
      case "gpu":
        return (
          <ComponentSelector
            title="Select GPU"
            components={gpuData}
            selectedComponent={build.gpu}
            onSelectComponent={(gpu) => setBuild({ ...build, gpu: gpu as any })}
            compatibilityIssues={compatibilityIssues}
          />
        );
      case "storage":
        return (
          <ComponentSelector
            title="Select Storage"
            components={storageData}
            selectedComponent={build.storage}
            onSelectComponent={(storage) => setBuild({ ...build, storage: storage as any })}
            compatibilityIssues={compatibilityIssues}
          />
        );
      case "psu":
        return (
          <ComponentSelector
            title="Select Power Supply"
            components={psuData}
            selectedComponent={build.psu}
            onSelectComponent={(psu) => setBuild({ ...build, psu: psu as any })}
            compatibilityIssues={compatibilityIssues}
          />
        );
      case "case":
        return (
          <ComponentSelector
            title="Select Case"
            components={caseData}
            selectedComponent={build.case}
            onSelectComponent={(pcCase) => setBuild({ ...build, case: pcCase as any })}
            compatibilityIssues={compatibilityIssues}
          />
        );
    }
  };

  if (step === "hero") {
    return <Hero onStartBuild={handleStartBuild} />;
  }

  if (step === "usecase") {
    return (
      <div className="min-h-screen bg-background">
        <UseCaseSelector
          selectedUseCase={build.useCase}
          onSelectUseCase={handleUseCaseSelect}
        />
        <div className="max-w-6xl mx-auto px-6 pb-12">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep("hero")}
              className="border-primary/30"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={() => setStep("budget")}
              disabled={!build.useCase}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Next: Budget
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "budget") {
    return (
      <div className="min-h-screen bg-background">
        <BudgetSelector budget={build.budget} onBudgetChange={handleBudgetChange} />
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep("usecase")}
              className="border-primary/30"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={() => setStep("components")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start Selecting Components
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-[2000px] mx-auto px-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Step {currentComponentIndex + 1} of {componentSteps.length}
            </h2>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentComponentIndex + 1) / componentSteps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 shadow-glow"
              style={{ width: `${((currentComponentIndex + 1) / componentSteps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid xl:grid-cols-12 gap-6">
          {/* Component Selection - Left Side */}
          <div className="xl:col-span-5 space-y-6">
            {renderComponentSelector()}
            
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevComponent}
                className="border-primary/30"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              {currentComponentIndex < componentSteps.length - 1 && (
                <Button
                  onClick={handleNextComponent}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* 3D Visualization - Center */}
          <div className="xl:col-span-4 h-[600px]">
            <PCVisualization3D build={build} />
          </div>

          {/* Build Summary - Right Side */}
          <div className="xl:col-span-3">
            <BuildSummary build={build} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
