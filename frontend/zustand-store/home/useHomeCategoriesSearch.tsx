import create from "zustand";
import { ALL_CATEGORIES, CategoriesSearchState } from "../types";

const useHomeCategoriesSearchState = create<CategoriesSearchState>((set) => ({
  input: "",
  select: ALL_CATEGORIES,
  setInput: (input) => set(() => ({ input })),
  setSelect: (event) => set(() => ({ select: event.currentTarget.value })),
}));

export const useHomeCategoriesSearch = () => {
  const { input, setInput, select, setSelect } = useHomeCategoriesSearchState((state) => ({
    input: state.input,
    select: state.select,
    setInput: state.setInput,
    setSelect: state.setSelect,
  }));

  return { input, setInput, select, setSelect };
};
