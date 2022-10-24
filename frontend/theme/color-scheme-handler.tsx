import { ColorScheme } from "@mantine/core";
import { DARK } from "../contexts/ColorSchemeProvider";

type Styles = {
  light: string;
  dark: string;
};

export const colorSchemeHandler = (colorScheme: ColorScheme, styles: Styles) => {
  return colorScheme === DARK ? styles.dark : styles.light;
};
