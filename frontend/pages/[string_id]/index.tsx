import { GetStaticProps } from "next";
import { getAllEnvironmentPaths } from "../../hooks/api/helpers";
import { apiFetch } from "../../query-client/baseFetcher";
import { ALL_CATEGORIES, INITIAL_PAGE_CURSOR } from "../../zustand-store/types";

export const getStaticPaths = async () => {
  const paths = await getAllEnvironmentPaths();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { data: "nothing yet" },
  };
};

const Environment = ({}) => {
  return <div>Environment page</div>;
};

export default Environment;
