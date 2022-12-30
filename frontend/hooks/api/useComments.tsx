import { useCallback, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { getComments } from "./helpers";

export const useInfiniteScrollComments = (stringId: string) => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, isError, error } = useInfiniteQuery(
    [stringId, "comments"],
    getComments(stringId),
    {
      getNextPageParam: (lastPage) => lastPage.data.data.next_cursor ?? undefined,
    }
  );

  const observer = useRef<IntersectionObserver>();
  const lastCommentRef = useCallback(
    (el: HTMLElement) => {
      if (isFetchingNextPage) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((elements) => {
        if (elements[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (el) observer.current.observe(el);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return { data, lastCommentRef, isFetchingNextPage, isError, error };
};
