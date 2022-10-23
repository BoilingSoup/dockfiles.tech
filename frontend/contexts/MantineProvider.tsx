import React, { ReactNode } from "react";
import { MantineProvider as Provider } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";

type Props = {
  children: ReactNode;
};

export const MantineProvider = (props: Props) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Provider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme,
      }}
    >
      {props.children}
    </Provider>
  );
};
