import { create } from "zustand";

type StageData = {
  [key: string]: any;
};
type PetStore = {
  currentStage: number;
  currentStageData: StageData;
  petInformation: StageData;
  updateStageData: (stageKey: string, data: any) => void;
};

const usePetStore = create<PetStore>((set, get) => ({
  currentStage: 0,
  currentStageData: { careTakers: [] },
  petInformation: {},

  updateStageData: (stageKey, data) => {
    set((state) => ({
      currentStageData: {
        ...state.currentStageData,
        [stageKey]: data,
      },
    }));
  },
}));

export default usePetStore;
