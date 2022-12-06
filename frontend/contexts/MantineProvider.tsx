import React, { ReactNode } from "react";
import { MantineProvider as Provider } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { colorSchemeHandler } from "../theme/color-scheme-handler";

type Props = {
  children: ReactNode;
};

export const markdownClass = "markdown";

export const MantineProvider = (props: Props) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Provider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme,
        colors: {
          navy: [
            "#e7e9ee",
            "#ced3dc",
            "#b6bdcb",
            "#9da7b9",
            "#8591a8",
            "#6c7b97",
            "#546585",
            "#3b4f74",
            "#233962",
            "#0a2351",
          ],
          slate: [
            "#e7e8ea",
            "#cfd1d4",
            "#b7b9bf",
            "#9fa2aa",
            "#878b95",
            "#6f747f",
            "#575d6a",
            "#3f4555",
            "#272e3f",
            "#0f172a",
          ],
        },
        globalStyles: ({ colors, colorScheme }) => ({
          ".markdown pre": {
            backgroundColor: colorSchemeHandler(colorScheme, {
              light: colors.blue[1],
              dark: colors.navy[7],
            }),
            overflowX: "auto",
            padding: 20,
          },
          ".markdown a": {
            color: colorSchemeHandler(colorScheme, {
              light: colors.blue[9],
              dark: colors.slate[0],
            }),
          },
        }),
      }}
    >
      {props.children}
    </Provider>
  );
};
