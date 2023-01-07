import { Button, Center, Loader, Text } from "@mantine/core";
import { cloneElement, useState } from "react";
import { oAuthBtnSx } from "./styles";

type Props = {
  icon: JSX.Element;
  iconSize?: number;
  text: string;
  href: string;
  loadingText: string;
};

const defaultIconSize = 30;

export const OAuthButton = ({ icon, iconSize, text, href, loadingText }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

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
  
  const clickHandler = () => {
    setIsLoading(true);
  };

  return (
    <Button
      onClick={clickHandler}
      component="a"
      href={href}
      variant="white"
      sx={oAuthBtnSx}
      leftIcon={!isLoading && cloneElement(icon, { size: iconSize ?? defaultIconSize })}
    >
      <Text size="lg">{buttonContent}</Text>
    </Button>
  );
};
