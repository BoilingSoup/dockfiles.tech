import { useCallback, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { Comment } from "../../components/details/Comment";
import { queryKeys } from "../../query-client/constants";
import { CommentData, getComments } from "./helpers";

/**
 * Handles IntersectionObserver on DOM nodes to enable infinite scroll.
 * @returns infinite scroll loading/error states, and a dynamic 2d array of Comments components.
 * The array of Comments will update when the observer gets triggered and fetches more data.
 **/
export const useInfiniteScrollComments = (stringId: string) => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, isError, error } = useInfiniteQuery(
    queryKeys.comments(stringId),
    getComments(stringId),
    {
      getNextPageParam: (lastPage) => lastPage.meta.next_cursor ?? undefined,
    }
  );

  /**
   * observer is used to observe/unobserve DOM nodes in the following context:
   *
   * 1. When observed DOM node enters the viewport, fetch next page.
   * 2. New data retrieved. Stop observing the old DOM node because the new data is closer to the bottom of the page.
   * 3. Begin observing a new DOM node which is now close to the bottom of the page.
   */
  const observer = useRef<IntersectionObserver>();

  /**
   * lastCommentRef is used as a callback ref. This ref gets attached to a comment near the
   * bottom of the page every time new data is retrieved.
   */
  const lastCommentRef = useCallback(
    // el is a reference to the element lastCommentRef is attached to.
    // (A comment near the end of the page.)
    (el: HTMLElement) => {
      if (isFetchingNextPage) {
        return;
      }

      // unobserve previously observed DOM node.
      if (observer.current) {
        observer.current.disconnect();
      }

      // define the callback to trigger when an observed DOM node scrolls into the viewport
      observer.current = new IntersectionObserver((elements) => {
        if (elements[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      // observe a comment near the end of the page
      if (el) observer.current.observe(el);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  /**
   * comments maps through all the pages returned by react-query,
   * and creates a Comment component for each piece of data.
   * Only the `nthFromLast` comment receives the callback ref to add that Comment to the IntersectionObserver
   * @returns 2d array of Comments components.
   */
  const nthFromLast = 6; // when 6th from last comment is visible in the viewport, fetch more data.
  const comments = data?.pages.map((pg, i) => {
    const isLastPage = data.pages.length === i + 1;
    const commentsPerPage = data.pages[0].meta.per_page;

    return pg.data.map((comment: CommentData, i) => {
      const isNthToLastComment = commentsPerPage === i + nthFromLast;
      const isNearEndOfPage = isLastPage && isNthToLastComment;

      // attach callback ref if 6th from last comment
      if (isNearEndOfPage) {
        return <Comment ref={lastCommentRef} key={comment.id} data={comment} />;
      }

      // otherwise, no ref
      return <Comment key={comment.id} data={comment} />;
    });
  });

  return { comments, isFetchingNextPage, isError, error };
};
