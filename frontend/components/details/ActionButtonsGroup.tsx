import { Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactElement } from "react";
import { asideBreakPoint, asideWidth } from "../layout/_sidebar";

type Props = {
  buttons: ReactElement;
};

export const ActionButtonsGroup = ({ buttons }: Props) => {
  const breakPoint = useMediaQuery(`(min-width: ${asideBreakPoint})`);

  return (
    <Group mt="xs" style={{ position: "absolute", right: breakPoint ? asideWidth : 0, justifyContent: "space-evenly" }}>
      {buttons}
    </Group>
  );
};
