import { Button, ButtonVariant, Group, MantineSize } from "@mantine/core";
import { IconCaretLeft, IconCaretRight } from "@tabler/icons";
import { navigationButtonSx } from "./styles";
import { CursorsObj } from "./types";

type Props = {
  size?: MantineSize;
  variant?: ButtonVariant;
  pageCursors: CursorsObj;
  onClick: (cursor: string) => void;
};

export const NavigationButtonsGroup = ({ variant = "filled", size = "xl", pageCursors, onClick: setCursor }: Props) => {
  const buttonClickHandler = (cursor: string | undefined | null) => {
    if (cursor) {
      return () => {
        setCursor(cursor);
      };
    }
    return undefined;
  };

  return (
    <Group sx={{ position: "absolute", bottom: 0, justifyContent: "space-between", width: "95%" }}>
      <Button
        sx={navigationButtonSx}
        variant={variant}
        leftIcon={<IconCaretLeft />}
        size={size}
        style={{ visibility: pageCursors.prev ? "initial" : "hidden" }}
        onClick={buttonClickHandler(pageCursors.prev)}
      >
        Prev
      </Button>
      <Button
        sx={navigationButtonSx}
        variant={variant}
        rightIcon={<IconCaretRight />}
        size={size}
        style={{ visibility: pageCursors.next ? "initial" : "hidden" }}
        onClick={buttonClickHandler(pageCursors.next)}
      >
        Next
      </Button>
    </Group>
  );
};
