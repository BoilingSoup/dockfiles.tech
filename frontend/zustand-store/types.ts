import { ChangeEventHandler } from "react";

export type CategoriesSearchState = {
  input: string;
  select: string;
  setInput: (input: string) => void;
  setSelect: ChangeEventHandler<HTMLSelectElement>;
};

export const ALL_CATEGORIES = "All Categories";
