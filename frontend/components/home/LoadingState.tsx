import { Container } from "@mantine/core";
import { EnvironmentListItemShell } from "../common/EnvironmentListItem";
import { LoadingSpinner } from "../common/LoadingSpinner";

export const LoadingState = () => {
  return (
    <>
      <LoadingSpinner />
      <Container mt={10} p={0}>
        {new Array(15).fill(0).map((_, index) => (
          <EnvironmentListItemShell key={index} />
        ))}
      </Container>
    </>
  );
};
