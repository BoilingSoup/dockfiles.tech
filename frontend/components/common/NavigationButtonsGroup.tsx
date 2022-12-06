import { Button, ButtonVariant, Group, MantineSize } from "@mantine/core";
import { IconCaretLeft, IconCaretRight } from "@tabler/icons";
import { navigationButtonSx } from "./styles";
import { CursorsObj } from "./types";

type Props = {
  size?: MantineSize;
  variant?: ButtonVariant;
  pageCursors: CursorsObj;
};

export const NavigationButtonsGroup = ({ variant = "filled", size = "xl", pageCursors }: Props) => {
  return (
    <Group sx={{ position: "absolute", bottom: 0, justifyContent: "space-between", width: "95%" }}>
      <Button
        sx={navigationButtonSx}
        variant={variant}
        leftIcon={<IconCaretLeft />}
        size={size}
        style={{ visibility: pageCursors.prev ? "initial" : "hidden" }}
      >
        Prev
      </Button>
      <Button
        sx={navigationButtonSx}
        variant={variant}
        rightIcon={<IconCaretRight />}
        size={size}
        style={{ visibility: pageCursors.next ? "initial" : "hidden" }}
      >
        Next
      </Button>
    </Group>
  );
};
