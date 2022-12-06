import { GetStaticProps } from "next";
import { EnvironmentDetails, getAllEnvironmentPaths, getEnvironmentByStringId } from "../../hooks/api/helpers";
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
  const stringId = context.params!.string_id;
  const data = await getEnvironmentByStringId(stringId as string);

  return {
    props: { environment: data },
  };
};

type Props = {
  environment: EnvironmentDetails;
};

const Environment = ({ environment }: Props) => {
  console.log(environment);
  return <div>Environment page</div>;
};

export default Environment;
