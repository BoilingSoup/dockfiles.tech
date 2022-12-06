import { Button, ButtonVariant, Group, MantineSize } from "@mantine/core";
import { IconCaretLeft, IconCaretRight } from "@tabler/icons";
import { navigationButtonSx } from "./styles";

type Props = {
  size?: MantineSize;
  variant?: ButtonVariant;
};

export const NavigationButtonsGroup = ({ variant = "filled", size = "xl" }: Props) => {
  return (
    <Group sx={{ position: "absolute", bottom: 0, justifyContent: "space-between", width: "95%" }}>
      <Button sx={navigationButtonSx} variant={variant} leftIcon={<IconCaretLeft />} size={size}>
        Prev
      </Button>
      <Button sx={navigationButtonSx} variant={variant} rightIcon={<IconCaretRight />} size={size}>
        Next
      </Button>
    </Group>
  );
};
