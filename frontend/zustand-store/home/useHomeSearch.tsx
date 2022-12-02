import create from "zustand";
import { SearchState } from "../types";

const useHomeSearchState = create<SearchState>((set) => ({
  input: "",
  setInput: (input) => set(() => ({ input })),
}));

export const useHomeSearch = () => {
  const input = useHomeSearchState((state) => state.input);
  const setInput = useHomeSearchState((state) => state.setInput);

  return { input, setInput };
};
