import create from "zustand";
import { SearchState } from "../types";

const useBookmarksSearchState = create<SearchState>((set) => ({
  input: "",
  setInput: (input) => set(() => ({ input })),
}));

export const useBookmarksSearch = () => {
  const input = useBookmarksSearchState((state) => state.input);
  const setInput = useBookmarksSearchState((state) => state.setInput);

  return { input, setInput };
};
