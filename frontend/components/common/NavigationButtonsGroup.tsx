import { Button, ButtonVariant, Group, MantineSize } from "@mantine/core";
import { IconCaretLeft, IconCaretRight } from "@tabler/icons";

type Props = {
  size?: MantineSize;
  variant?: ButtonVariant;
};

export const NavigationButtonsGroup = ({ variant = "subtle", size = "xl" }: Props) => {
  return (
    <Group sx={{ justifyContent: "space-between" }}>
      <Button variant={variant} leftIcon={<IconCaretLeft />} size={size}>
        Prev
      </Button>
      <Button variant={variant} rightIcon={<IconCaretRight />} size={size}>
        Next
      </Button>
    </Group>
  );
};
