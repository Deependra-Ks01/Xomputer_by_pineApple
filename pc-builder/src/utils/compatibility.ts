import { PCBuild, CompatibilityIssue, CPU, Motherboard, RAM, GPU, PSU } from "@/types/pc-components";

export const checkCompatibility = (build: PCBuild): CompatibilityIssue[] => {
  const issues: CompatibilityIssue[] = [];

  // Check CPU and Motherboard socket compatibility
  if (build.cpu && build.motherboard) {
    if (build.cpu.socket !== build.motherboard.socket) {
      issues.push({
        type: "error",
        component: "CPU/Motherboard",
        message: `CPU socket ${build.cpu.socket} is not compatible with motherboard socket ${build.motherboard.socket}`,
      });
    }
  }

  // Check RAM type compatibility
  if (build.ram && build.motherboard) {
    if (build.ram.type !== build.motherboard.ramType) {
      issues.push({
        type: "error",
        component: "RAM/Motherboard",
        message: `RAM type ${build.ram.type} is not compatible with motherboard (requires ${build.motherboard.ramType})`,
      });
    }
    
    if (build.ram.speed > build.motherboard.maxRamSpeed) {
      issues.push({
        type: "warning",
        component: "RAM/Motherboard",
        message: `RAM speed ${build.ram.speed}MHz exceeds motherboard maximum ${build.motherboard.maxRamSpeed}MHz. Will run at lower speed.`,
      });
    }
  }

  // Check GPU and Case clearance
  if (build.gpu && build.case) {
    if (build.gpu.length > build.case.maxGPULength) {
      issues.push({
        type: "error",
        component: "GPU/Case",
        message: `GPU length ${build.gpu.length}mm exceeds case clearance ${build.case.maxGPULength}mm`,
      });
    }
  }

  // Check PSU wattage
  if (build.psu && (build.cpu || build.gpu)) {
    let totalTDP = 0;
    if (build.cpu) totalTDP += build.cpu.tdp;
    if (build.gpu) totalTDP += build.gpu.tdp;
    
    const recommendedWattage = Math.ceil(totalTDP * 1.5);
    
    if (build.psu.wattage < recommendedWattage) {
      issues.push({
        type: "warning",
        component: "PSU",
        message: `PSU wattage ${build.psu.wattage}W may be insufficient. Recommended: ${recommendedWattage}W or higher`,
      });
    }
  }

  return issues;
};

export const calculateTotalCost = (build: PCBuild): number => {
  let total = 0;
  if (build.cpu) total += build.cpu.price;
  if (build.gpu) total += build.gpu.price;
  if (build.motherboard) total += build.motherboard.price;
  if (build.ram) total += build.ram.price;
  if (build.storage) total += build.storage.price;
  if (build.psu) total += build.psu.price;
  if (build.case) total += build.case.price;
  return total;
};

export const calculateTotalPowerDraw = (build: PCBuild): number => {
  let total = 0;
  if (build.cpu) total += build.cpu.tdp;
  if (build.gpu) total += build.gpu.tdp;
  return total;
};
