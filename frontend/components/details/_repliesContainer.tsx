import { Box } from "@mantine/core";
import { ReactElement } from "react";
import { repliesBoxMarginLeft } from "./styles";

type Props = {
  children: ReactElement;
};

export const RepliesContainer = ({ children }: Props) => <Box ml={repliesBoxMarginLeft}>{children}</Box>;
