import create from "zustand";
import { ALL_CATEGORIES, CategoriesSearchState } from "../types";

const useBookmarksCategoriesSearchState = create<CategoriesSearchState>((set) => ({
  input: "",
  select: ALL_CATEGORIES,
  setInput: (input) => set(() => ({ input })),
  setSelect: (event) => set(() => ({ select: event.currentTarget.value })),
}));

export const useBookmarksCategoriesSearch = () => {
  const { input, setInput, select, setSelect } = useBookmarksCategoriesSearchState((state) => ({
    input: state.input,
    select: state.select,
    setInput: state.setInput,
    setSelect: state.setSelect,
  }));

  return { input, setInput, select, setSelect };
};
