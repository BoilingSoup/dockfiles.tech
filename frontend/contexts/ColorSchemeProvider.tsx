import React, { ReactNode, useLayoutEffect, useState } from "react";
import { ColorSchemeProvider as Provider, ColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";

const MANTINE_COLOR_SCHEME_LOCALSTORAGE_KEY = "mantine-color-scheme";

const LIGHT: ColorScheme = "light";
const DARK: ColorScheme = "dark";
const DEFAULT_COLOR_SCHEME: ColorScheme = LIGHT;

const isValidColorScheme = (value: string | null) => value === LIGHT || value === DARK;

type Props = {
  children: ReactNode;
};

export const ColorSchemeProvider = (props: Props) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(DEFAULT_COLOR_SCHEME);

  useLayoutEffect(() => {
    const userColorScheme = localStorage.getItem(MANTINE_COLOR_SCHEME_LOCALSTORAGE_KEY);

    if (isValidColorScheme(userColorScheme)) {
      setColorScheme(userColorScheme as ColorScheme);
    } else {
      localStorage.setItem(MANTINE_COLOR_SCHEME_LOCALSTORAGE_KEY, DEFAULT_COLOR_SCHEME);
    }
  }, []);

  const toggleColorScheme = (value?: ColorScheme) => {
    const newColorScheme = colorScheme === DARK ? LIGHT : DARK;

    setColorScheme(newColorScheme);
    localStorage.setItem(MANTINE_COLOR_SCHEME_LOCALSTORAGE_KEY, newColorScheme);
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <Provider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      {props.children}
    </Provider>
  );
};
