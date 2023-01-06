import { Button, Text } from "@mantine/core";
import { cloneElement } from "react";
import { oAuthBtnSx } from "./styles";

type Props = {
  icon: JSX.Element;
  iconSize?: number;
  text: string;
};

const defaultIconSize = 30;

export const OAuthButton = ({ icon, iconSize, text }: Props) => {
  return (
    <Button variant="white" sx={oAuthBtnSx} leftIcon={cloneElement(icon, { size: iconSize ?? defaultIconSize })}>
      <Text size="lg">{text}</Text>
    </Button>
  );
};
