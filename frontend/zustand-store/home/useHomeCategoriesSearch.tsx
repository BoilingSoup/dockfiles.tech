// import { ChangeEvent } from "react";
import create from "zustand";
import { ALL_CATEGORIES, CategoriesSearchState } from "../types";

const useHomeCategoriesSearchState = create<CategoriesSearchState>((set) => ({
  input: "",
  select: ALL_CATEGORIES,
  setInput: (input) => set(() => ({ input })),
  setSelect: (payload: any) =>
    set(() => {
      if (typeof payload === "string") {
        return { select: payload };
      }
      return { select: payload.currentTarget.value };
    }),
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
