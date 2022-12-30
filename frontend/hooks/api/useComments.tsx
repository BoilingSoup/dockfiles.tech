import { useCallback, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { Comment } from "../../components/details/Comment";
import { CommentData, getComments } from "./helpers";

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

  const comments = data?.pages.map((pg, i) => {
    const isLastPage = data.pages.length === i + 1;
    const commentsPerPage = data.pages[0].data.data.per_page;

    return pg.data.data.data.map((comment: CommentData, i) => {
      const isSecondToLastComment = commentsPerPage === i + 2;

      // attach observer ref if 2nd last comment
      if (isLastPage && isSecondToLastComment) {
        return <Comment ref={lastCommentRef} key={comment.id} data={comment} />;
      }

      return <Comment key={comment.id} data={comment} />;
    });
  });

  return { comments, isFetchingNextPage, isError, error };
};
