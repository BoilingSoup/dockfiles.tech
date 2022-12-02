import create from "zustand";

type HomeSearchState = {
  input: string;
  setInput: (input: string) => void;
};

const useHomeSearchState = create<HomeSearchState>((set) => ({
  input: "",
  setInput: (input) => set(() => ({ input })),
}));

export const useHomeSearch = () => {
  const input = useHomeSearchState((state) => state.input);
  const setInput = useHomeSearchState((state) => state.setInput);

  return { input, setInput };
};
