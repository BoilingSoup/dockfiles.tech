import { Container } from "@mantine/core";
import { EnvironmentListItemShell } from "../common/EnvironmentListItem";
import { LoadingSpinner } from "../common/LoadingSpinner";

type Props = {
  isSkeleton: boolean;
};

export const LoadingState = ({ isSkeleton }: Props) => {
  return (
    <>
      <LoadingSpinner />
      {isSkeleton && (
        <Container mt={10} p={0}>
          {new Array(15).fill(0).map((_, index) => (
            <EnvironmentListItemShell key={index} />
          ))}
        </Container>
      )}
    </>
  );
};
