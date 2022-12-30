import { forwardRef } from "react";
import { CommentData } from "../../hooks/api/helpers";

type Props = {
  data: CommentData;
};

type Ref = HTMLElement;

export const Comment = forwardRef<Ref, Props>(({ data }: Props, ref) => {
  const commentBody = (
    <>
      <h2>{data.name}</h2>
      <p>{data.content}</p>
      <p>Comment ID: {data.id}</p>
    </>
  );

  let content: JSX.Element;

  if (ref) {
    content = <article ref={ref}>{commentBody}</article>;
  } else {
    content = <article>{commentBody}</article>;
  }

  return content;
});

Comment.displayName = "Comment";
