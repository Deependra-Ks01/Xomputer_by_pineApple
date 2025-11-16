import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { UseCaseSelector } from "@/components/UseCaseSelector";
import { BudgetSelector } from "@/components/BudgetSelector";
import { ComponentSelector } from "@/components/ComponentSelector";
import { BuildSummary } from "@/components/BuildSummary";
import { ExampleBuildsDialog } from "@/components/ExampleBuildsDialog";
import { PCVisualization3D } from "@/components/PCVisualization3D";
import { Progress } from "@/components/ui/progress";
import { checkCompatibility } from "@/utils/compatibility";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setStep,
  setComponentStep,
  setUseCase,
  setBudget,
  setCPU,
  setGPU,
  setMotherboard,
  setRAM,
  setStorage,
  setPSU,
  setCase,
  loadBuild,
} from "@/store/buildSlice";
import {
  cpuData,
  gpuData,
  motherboardData,
  ramData,
  storageData,
  psuData,
  caseData,
} from "@/data/components-data";
import { PCBuild } from "@/types/pc-components";

const Index = () => {
  const dispatch = useAppDispatch();
  const { step, componentStep, currentBuild } = useAppSelector((state) => state.build);
  const [exampleBuildsOpen, setExampleBuildsOpen] = useState(false);

  const handleStartBuild = () => {
    dispatch(setStep("usecase"));
  };

  const handleViewExamples = () => {
    setExampleBuildsOpen(true);
  };

  const handleSelectExampleBuild = (build: PCBuild) => {
    dispatch(loadBuild(build));
  };

  const handleUseCaseSelect = (useCase: "gaming" | "content-creation" | "office") => {
    dispatch(setUseCase(useCase));
    dispatch(setStep("budget"));
  };

  const handleBudgetChange = (budget: number) => {
    dispatch(setBudget(budget));
  };

  const handleNextComponent = () => {
    if (componentStep < 6) {
      dispatch(setComponentStep(componentStep + 1));
    }
  };

  const handlePrevComponent = () => {
    if (componentStep > 0) {
      dispatch(setComponentStep(componentStep - 1));
    }
  };

  const getCompatibilityIssues = (componentType: string) => {
    const issues = checkCompatibility(currentBuild);
    return issues.filter((issue) => issue.component === componentType);
  };

  const renderComponentSelector = () => {
    const componentTypes = [
      { type: "cpu", data: cpuData, label: "CPU", title: "Select CPU" },
      { type: "gpu", data: gpuData, label: "GPU", title: "Select GPU" },
      { type: "motherboard", data: motherboardData, label: "Motherboard", title: "Select Motherboard" },
      { type: "ram", data: ramData, label: "RAM", title: "Select RAM" },
      { type: "storage", data: storageData, label: "Storage", title: "Select Storage" },
      { type: "psu", data: psuData, label: "PSU", title: "Select PSU" },
      { type: "case", data: caseData, label: "Case", title: "Select Case" },
    ];

    const currentComponent = componentTypes[componentStep];
    const issues = getCompatibilityIssues(currentComponent.label);

    return (
      <ComponentSelector
        key={currentComponent.type}
        title={currentComponent.title}
        components={currentComponent.data}
        selectedComponent={
          currentBuild[currentComponent.type as keyof PCBuild] as any
        }
        onSelectComponent={(component) => {
          switch (currentComponent.type) {
            case "cpu":
              dispatch(setCPU(component as any));
              break;
            case "gpu":
              dispatch(setGPU(component as any));
              break;
            case "motherboard":
              dispatch(setMotherboard(component as any));
              break;
            case "ram":
              dispatch(setRAM(component as any));
              break;
            case "storage":
              dispatch(setStorage(component as any));
              break;
            case "psu":
              dispatch(setPSU(component as any));
              break;
            case "case":
              dispatch(setCase(component as any));
              break;
          }
        }}
        compatibilityIssues={issues.map(i => i.message)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {step === "hero" && (
        <Hero onStartBuild={handleStartBuild} onViewExamples={handleViewExamples} />
      )}

      {step === "usecase" && (
        <div className="container mx-auto px-6 py-12">
          <UseCaseSelector 
            selectedUseCase={currentBuild.useCase} 
            onSelectUseCase={handleUseCaseSelect} 
          />
          <div className="mt-8 flex justify-center">
            <Button variant="outline" onClick={() => dispatch(setStep("hero"))}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      )}

      {step === "budget" && (
        <div className="container mx-auto px-6 py-12">
          <BudgetSelector
            budget={currentBuild.budget}
            onBudgetChange={handleBudgetChange}
          />
          <div className="mt-8 flex justify-center gap-4">
            <Button variant="outline" onClick={() => dispatch(setStep("usecase"))}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={() => dispatch(setStep("components"))}>
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {step === "components" && (
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                Step {componentStep + 1} of 7
              </h2>
              <span className="text-sm text-muted-foreground">
                Budget: ${currentBuild.budget}
              </span>
            </div>
            <Progress value={((componentStep + 1) / 7) * 100} />
          </div>

          <div className="grid xl:grid-cols-12 gap-6">
            <div className="xl:col-span-4 space-y-6">
              {renderComponentSelector()}

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrevComponent}
                  disabled={componentStep === 0}
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleNextComponent}
                  disabled={componentStep === 6}
                  className="flex-1"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="xl:col-span-5">
              <PCVisualization3D build={currentBuild} />
            </div>

            <div className="xl:col-span-3">
              <BuildSummary build={currentBuild} />
            </div>
          </div>
        </div>
      )}

      <ExampleBuildsDialog
        open={exampleBuildsOpen}
        onOpenChange={setExampleBuildsOpen}
        onSelectBuild={handleSelectExampleBuild}
      />
    </div>
  );
};

export default Index;