import React, { ReactNode, useState } from "react";
import {
  ColorSchemeProvider as Provider,
  ColorScheme,
} from "@mantine/core";

type Props = {
  children: ReactNode;
};

export const ColorSchemeProvider = (props: Props) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <Provider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      {props.children}
    </Provider>
  );
};
