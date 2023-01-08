import { Button, Center, Loader, Text } from "@mantine/core";
import { cloneElement } from "react";
import { oAuthBtnSx } from "./styles";

type Props = {
  icon: JSX.Element;
  iconSize?: number;
  text: string;
  href: string;
  loadingText: string;
  isLoading: boolean;
  onClick: () => void;
  disabled: boolean;
};

const defaultIconSize = 30;

export const OAuthButton = ({
  icon,
  iconSize,
  text,
  href,
  loadingText,
  isLoading,
  onClick: clickHandler,
  disabled,
}: Props) => {
  let buttonContent: JSX.Element;

  if (isLoading) {
    buttonContent = (
      <Text size="lg">
        <Center style={{ alignItems: "center" }}>
          <Loader mr="sm" />
          {loadingText}
        </Center>
      </Text>
    );
  } else {
    buttonContent = <Text size="lg">{text}</Text>;
  }

  return (
    <Button
      onClick={clickHandler}
      component="a"
      href={href}
      variant="white"
      sx={oAuthBtnSx}
      leftIcon={!isLoading && cloneElement(icon, { size: iconSize ?? defaultIconSize })}
      disabled={disabled}
    >
      <Text size="lg">{buttonContent}</Text>
    </Button>
  );
};
