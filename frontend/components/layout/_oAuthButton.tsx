import { Button, Text } from "@mantine/core";
import { cloneElement } from "react";
import { oAuthBtnSx } from "./styles";

type Props = {
  icon: JSX.Element;
  iconSize?: number;
  text: string;
  href: string;
};

const defaultIconSize = 30;

export const OAuthButton = ({ icon, iconSize, text, href }: Props) => {
  return (
    <Button
      component="a"
      href={href}
      variant="white"
      sx={oAuthBtnSx}
      leftIcon={cloneElement(icon, { size: iconSize ?? defaultIconSize })}
    >
      <Text size="lg">{text}</Text>
    </Button>
  );
};
