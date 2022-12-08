export const queryKeys = {
  categories: "categories",
  environments: "environments",
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
};
