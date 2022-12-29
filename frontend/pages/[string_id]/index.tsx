import {
  EnvironmentDetailsData,
  getAllEnvironmentPaths,
  getComments,
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
import { useComments } from "../../hooks/api/useComments";
import { useInfiniteQuery } from "react-query";
import { queryKeys } from "../../query-client/constants";
import React from "react";

export type Props = {
  environment: EnvironmentDetailsData & {
    readMe: string;
  };
};

const Environment = ({ environment }: Props) => {
  const router = useRouter();
  const cursor = "";
  const stringId = router.query.string_id as string;

  // const fetchProjects = ({ pageParam = 0 }) => fetch("/api/projects?cursor=" + pageParam);

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery(
    [stringId, "comments"],
    getComments(stringId),
    {
      getNextPageParam: (lastPage, pages) => lastPage.data.data.next_cursor ?? undefined,
    }
  );

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" && error instanceof Error ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.data.data.map((comment) => (
            <>
              <p key={comment.id}>{comment.name}</p>
              <p>{comment.content}</p>
            </>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
  // const { data } = useComments({ stringId, cursor });
  // console.log(data);
  // return (
  //   <>
  //     <Head>
  //       <title>Dockfiles.io | {environment.name}</title>
  //     </Head>
  //
  //     <EnvironmentTabs
  //       readMe={<ReadMeTab environment={environment} />}
  //       download={<DownloadTab environment={environment} />}
  //       comments={<CommentTab />}
  //     />
  //   </>
  // );
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
