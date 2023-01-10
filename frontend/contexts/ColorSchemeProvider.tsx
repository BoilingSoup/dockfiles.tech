import React, { ReactNode, useState } from "react";
import { ColorSchemeProvider as Provider, ColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { setCookie } from "cookies-next";

export const COLOR_SCHEME_COOKIE_KEY = "color-scheme";
export const LIGHT: ColorScheme = "light";
export const DARK: ColorScheme = "dark";
export const DEFAULT_COLOR_SCHEME: ColorScheme = DARK;

export const isValidColorScheme = (value: any) => value === LIGHT || value === DARK;

type Props = {
  value: ColorScheme;
  children: ReactNode;
};

export const ColorSchemeProvider = (props: Props) => {
  // colorScheme initialized by cookie value (or DEFAULT_COLOR_SCHEME if cookie value is invalid)
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.value);

  /** toggleColorScheme updates both the MantineTheme colorScheme and the cookie so there is no flash when a user enters the application. */
  const toggleColorScheme = (value?: ColorScheme) => {
    const updateStates = (newColorScheme: ColorScheme) => {
      setColorScheme(newColorScheme);
      setCookie(COLOR_SCHEME_COOKIE_KEY, newColorScheme);
    };

    if (isValidColorScheme(value)) {
      updateStates(value as ColorScheme);
      return;
    }

    const newColorScheme = colorScheme === DARK ? LIGHT : DARK;
    updateStates(newColorScheme);
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <Provider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      {props.children}
    </Provider>
  );
};
