import create from "zustand";

type HomeSearchState = {
  input: string;
  setInput: (input: string) => void;
};

export const useHomeSearch = create<HomeSearchState>((set) => ({
  input: "",
  setInput: (input) => set(() => ({ input })),
}));
