import { PCBuild } from "@/types/pc-components";
import { cpuData, gpuData, ramData, storageData, psuData, caseData, motherboardData } from "./components-data";

export const exampleBuilds: PCBuild[] = [
  {
    useCase: "gaming",
    budget: 1500,
    cpu: cpuData[1], // Ryzen 7 7800X3D
    gpu: gpuData[1], // RTX 4070
    motherboard: motherboardData[0], // ASUS ROG Strix B650
    ram: ramData[1], // G.Skill Trident Z5 DDR5 32GB
    storage: storageData[0], // Samsung 970 EVO Plus 1TB
    psu: psuData[1], // Corsair RM750e 750W
    case: caseData[0], // NZXT H510 Flow
  },
  {
    useCase: "content-creation",
    budget: 2500,
    cpu: cpuData[3], // Core i7-14700K
    gpu: gpuData[3], // RTX 4080
    motherboard: motherboardData[2], // MSI MAG Z790 Tomahawk
    ram: ramData[1], // G.Skill Trident Z5 DDR5 32GB
    storage: storageData[1], // WD Black SN850X 2TB
    psu: psuData[2], // EVGA SuperNOVA 850W
    case: caseData[1], // Fractal Design Meshify 2
  },
  {
    useCase: "office",
    budget: 800,
    cpu: cpuData[0], // Ryzen 5 7600
    gpu: gpuData[0], // RTX 4060
    motherboard: motherboardData[1], // Gigabyte B650 Gaming X
    ram: ramData[0], // Corsair Vengeance DDR4 16GB
    storage: storageData[2], // Crucial P3 Plus 500GB
    psu: psuData[0], // Corsair CV650 650W
    case: caseData[2], // Cooler Master MasterBox Q300L
  },
  {
    useCase: "gaming",
    budget: 2000,
    cpu: cpuData[3], // Core i7-14700K
    gpu: gpuData[2], // RX 7700 XT
    motherboard: motherboardData[2], // MSI MAG Z790 Tomahawk
    ram: ramData[2], // Corsair Vengeance DDR5 32GB
    storage: storageData[1], // WD Black SN850X 2TB
    psu: psuData[1], // Corsair RM750e 750W
    case: caseData[1], // Fractal Design Meshify 2
  },
];