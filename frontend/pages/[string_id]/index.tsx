import {
  CommentData,
  EnvironmentDetailsData,
  getAllEnvironmentPaths,
  getEnvironmentByStringId,
  getEnvironmentReadMe,
} from "../../hooks/api/helpers";
import markdownToHtml from "../../lib/markdownToHtml";
import Head from "next/head";
import { useRouter } from "next/router";
import { EnvironmentTabs } from "../../components/home/EnvironmentTabs";
import { DownloadTab } from "../../components/home/DownloadTab";
import { ReadMeTab } from "../../components/home/ReadMeTab";
import { CommentTab } from "../../components/home/CommentTab";
import { useInfiniteScrollComments } from "../../hooks/api/useComments";
import React from "react";
import { Comment } from "../../components/details/Comment";

export type Props = {
  environment: EnvironmentDetailsData & {
    readMe: string;
  };
};

const Environment = ({ environment }: Props) => {
  const router = useRouter();
  const stringId = router.query.string_id as string;

  const { data, lastCommentRef } = useInfiniteScrollComments(stringId);

  const content = data?.pages.map((pg, i) => {
    const isLastPage = data.pages.length === i + 1;
    const commentsPerPage = data.pages[0].data.data.per_page;
    return pg.data.data.data.map((comment: CommentData, i: number) => {
      const isLastComment = commentsPerPage === i + 1;
      if (isLastPage && isLastComment) {
        return <Comment ref={lastCommentRef} key={comment.id} data={comment} />;
      }
      return <Comment key={comment.id} data={comment} />;
    });
  });

  return (
    <>
      <Head>
        <title>Dockfiles.io | {environment.name}</title>
      </Head>

      <EnvironmentTabs
        readMe={<ReadMeTab environment={environment} />}
        download={<DownloadTab environment={environment} />}
        comments={<CommentTab content={content} />}
      />
    </>
  );
};

export default Environment;

type Params = {
  params: {
    string_id: string;
  };
};

export const getStaticProps = async ({ params }: Params): Promise<{ props: Props }> => {
  const stringId = params.string_id;
  const data = await getEnvironmentByStringId(stringId);

  const repoName = data.data.repo_name;
  const repoOwner = data.data.repo_owner;
  const repoBranch = data.data.repo_branch;

  const readMeUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${repoBranch}/README.md`;

  const readMe = await markdownToHtml(await getEnvironmentReadMe(readMeUrl));

  return {
    props: { environment: { ...data.data, readMe } },
  };
};

export const getStaticPaths = async () => {
  const paths = await getAllEnvironmentPaths();

  return {
    paths,
    fallback: false,
  };
};
