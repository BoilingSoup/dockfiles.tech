import { ALL_CATEGORIES, INITIAL_PAGE_CURSOR } from "../zustand-store/types";

const CATEGORIES = "categories";
const ENVIRONMENTS = "environments";
export const COMMENT = "comment";
export const COMMENTS = "comments";
export const BOOKMARKS = "bookmarks";
const LIKES = "likes";
export const REPLIES = "replies";
export const NOTIFICATIONS = "notifications";

const INITIAL_SEARCH_PARAM = "";

export const queryKeys = {
  categories: CATEGORIES,

  environments: ENVIRONMENTS,

  bookmarks: BOOKMARKS,

  notifications(pageNum: number) {
    return [NOTIFICATIONS, pageNum];
  },

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

  initialHomePageQueryKey: [ENVIRONMENTS, ALL_CATEGORIES, INITIAL_SEARCH_PARAM, INITIAL_PAGE_CURSOR],

  comments(stringId: string) {
    return [COMMENTS, stringId];
  },

  comment(commentId: string) {
    return [COMMENT, commentId];
  },

  commentsCount(stringId: string) {
    return [COMMENTS, stringId, "count"];
  },

  environmentDetails(stringId: string) {
    return [ENVIRONMENTS, stringId, "details"];
  },

  bookmarkLikeStatus(id: number) {
    return [BOOKMARKS, LIKES, id];
  },

  replies({ commentId, page }: { commentId: number; page: number }) {
    return [REPLIES, commentId, page];
  },
};
