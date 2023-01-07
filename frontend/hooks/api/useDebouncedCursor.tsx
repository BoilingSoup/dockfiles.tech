import { useEffect } from "react";
import { INITIAL_PAGE_CURSOR } from "../../zustand-store/types";

type Deps = {
  searchParam: string;
  setCursor: (cursor: string) => void;
};

/** useDebouncedCursor waits for the debounced searched param value to change before setting the pagination cursor. */
export const useDebouncedCursor = ({ searchParam, setCursor }: Deps) => {
  useEffect(() => {
    if (searchParam !== "") {
      setCursor(INITIAL_PAGE_CURSOR);
    }
  }, [searchParam, setCursor]);
};
