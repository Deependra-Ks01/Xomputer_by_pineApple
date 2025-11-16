import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PCBuild, CPU, GPU, Motherboard, RAM, Storage, PSU, PCCase } from '@/types/pc-components';

interface BuildState {
  step: 'hero' | 'usecase' | 'budget' | 'components';
  componentStep: number;
  currentBuild: PCBuild;
}

const initialState: BuildState = {
  step: 'hero',
  componentStep: 0,
  currentBuild: {
    useCase: 'gaming',
    budget: 1000,
    cpu: null,
    gpu: null,
    motherboard: null,
    ram: null,
    storage: null,
    psu: null,
    case: null,
  },
};

const buildSlice = createSlice({
  name: 'build',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<'hero' | 'usecase' | 'budget' | 'components'>) => {
      state.step = action.payload;
    },
    setComponentStep: (state, action: PayloadAction<number>) => {
      state.componentStep = action.payload;
    },
    setUseCase: (state, action: PayloadAction<'gaming' | 'content-creation' | 'office'>) => {
      state.currentBuild.useCase = action.payload;
    },
    setBudget: (state, action: PayloadAction<number>) => {
      state.currentBuild.budget = action.payload;
    },
    setCPU: (state, action: PayloadAction<CPU | null>) => {
      state.currentBuild.cpu = action.payload;
    },
    setGPU: (state, action: PayloadAction<GPU | null>) => {
      state.currentBuild.gpu = action.payload;
    },
    setMotherboard: (state, action: PayloadAction<Motherboard | null>) => {
      state.currentBuild.motherboard = action.payload;
    },
    setRAM: (state, action: PayloadAction<RAM | null>) => {
      state.currentBuild.ram = action.payload;
    },
    setStorage: (state, action: PayloadAction<Storage | null>) => {
      state.currentBuild.storage = action.payload;
    },
    setPSU: (state, action: PayloadAction<PSU | null>) => {
      state.currentBuild.psu = action.payload;
    },
    setCase: (state, action: PayloadAction<PCCase | null>) => {
      state.currentBuild.case = action.payload;
    },
    loadBuild: (state, action: PayloadAction<PCBuild>) => {
      state.currentBuild = action.payload;
      state.step = 'components';
      state.componentStep = 0;
    },
    resetBuild: (state) => {
      state.currentBuild = initialState.currentBuild;
      state.step = 'hero';
      state.componentStep = 0;
    },
  },
});

export const {
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
  resetBuild,
} = buildSlice.actions;

export default buildSlice.reducer;