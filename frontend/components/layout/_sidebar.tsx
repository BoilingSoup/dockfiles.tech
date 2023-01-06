import { Aside, Center, Text, useMantineTheme } from "@mantine/core";
import { IconMessage } from "@tabler/icons";
import React, { CSSProperties } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";
import { asideSx, unAuthSidebarSx } from "./styles";

export const asideWidth = 300;

export const Sidebar = () => {
  const { user } = useAuth();
  const { colors, colorScheme } = useMantineTheme();

  const placeholderStyles: CSSProperties = {
    color: colorSchemeHandler(colorScheme, {
      dark: colors.slate[7],
      light: colors.blue[1],
    }),
  };

  return (
    <Aside hidden={true} hiddenBreakpoint="xl" width={{ xl: asideWidth }} sx={asideSx}>
      {/* <Text>Notifications</Text> */}
      <Center sx={unAuthSidebarSx}>
        <IconMessage size={100} style={placeholderStyles} />
        <Text weight="bold" size="lg" style={placeholderStyles}>
          Sign in to post comments.
        </Text>
      </Center>
    </Aside>
  );
};
