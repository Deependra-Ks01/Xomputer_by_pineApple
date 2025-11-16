export interface Component {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  specs: Record<string, string | number>;
}

export interface CPU extends Component {
  socket: string;
  cores: number;
  threads: number;
  tdp: number;
  integratedGraphics: boolean;
}

export interface GPU extends Component {
  vram: number;
  tdp: number;
  length: number;
  performance: number;
}

export interface RAM extends Component {
  type: string;
  speed: number;
  capacity: number;
}

export interface Storage extends Component {
  type: "SSD" | "HDD" | "NVME";
  capacity: number;
  read: number;
  write: number;
}

export interface PSU extends Component {
  wattage: number;
  efficiency: string;
  modular: boolean;
}

export interface PCCase extends Component {
  formFactor: string;
  maxGPULength: number;
}

export interface Motherboard extends Component {
  socket: string;
  chipset: string;
  ramType: string;
  maxRamSpeed: number;
  formFactor: string;
}

export interface PCBuild {
  useCase: "gaming" | "content-creation" | "office";
  budget: number;
  cpu: CPU | null;
  gpu: GPU | null;
  motherboard: Motherboard | null;
  ram: RAM | null;
  storage: Storage | null;
  psu: PSU | null;
  case: PCCase | null;
}

export interface CompatibilityIssue {
  type: "error" | "warning";
  component: string;
  message: string;
}
