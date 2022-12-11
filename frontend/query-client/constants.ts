import { ALL_CATEGORIES, INITIAL_PAGE_CURSOR } from "../zustand-store/types";

const CATEGORIES = "categories";
const ENVIRONMENTS = "environments";

export const queryKeys = {
  categories: CATEGORIES,
  environments: ENVIRONMENTS,
  searchStrToKey(input: string): string {
    let trimmed = input?.trim();
    if (trimmed === "" || trimmed === undefined) {
      return "";
    }

    let whiteSpaceRemoved = trimmed.split(/\s+/);
    let lowerCase = whiteSpaceRemoved.map((el) => el.toLowerCase());
    let sortedLowerCase = lowerCase.sort((a, b) => a.localeCompare(b));

    return sortedLowerCase.join("");
  },
  initialHomePageQueryKey: [ENVIRONMENTS, ALL_CATEGORIES, "", INITIAL_PAGE_CURSOR],
};
