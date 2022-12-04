import { ChangeEventHandler } from "react";

export type CategoriesSearchState = {
  input: string;
  select: string;
  setInput: (input: string) => void;
  setSelect: ChangeEventHandler<HTMLSelectElement>;
};

export const ALL_CATEGORIES = "All Categories";

export type PageCursorState = {
  cursor: string;
  setCursor: (cursor: string) => void;
};

export const INITIAL_PAGE_CURSOR = "INITIAL_PAGE_CURSOR";
