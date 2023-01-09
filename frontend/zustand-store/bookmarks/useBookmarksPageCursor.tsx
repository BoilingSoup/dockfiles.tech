import create from "zustand";
import { INITIAL_PAGE_CURSOR, PageCursorState } from "../types";

const useBookmarksPageCursorState = create<PageCursorState>((set) => ({
  cursor: INITIAL_PAGE_CURSOR,
  setCursor: (cursor) => set(() => ({ cursor })),
}));

export const useBookmarksPageCursor = () => {
  const { cursor, setCursor } = useBookmarksPageCursorState((state) => ({
    cursor: state.cursor,
    setCursor: state.setCursor,
  }));

  return { cursor, setCursor };
};
