import create from "zustand";
import { INITIAL_PAGE_CURSOR, PageCursorState } from "../types";

const useHomePageCursorState = create<PageCursorState>((set) => ({
  cursor: INITIAL_PAGE_CURSOR,
  setCursor: (cursor) => set(() => ({ cursor })),
}));

export const useHomePageCursor = () => {
  const { cursor, setCursor } = useHomePageCursorState((state) => ({
    cursor: state.cursor,
    setCursor: state.setCursor,
  }));

  return { cursor, setCursor };
};
