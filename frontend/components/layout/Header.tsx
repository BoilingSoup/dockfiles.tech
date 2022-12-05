import {
  Header as MantineHeader,
  ActionIcon,
  Group,
  Burger,
  useMantineColorScheme,
  MediaQuery,
  Text,
  MantineTheme,
  CSSObject,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoon, IconSun, IconBrandGithub } from "@tabler/icons";
import Image from "next/image";
import { LIGHT } from "../../contexts/ColorSchemeProvider";
import { useHeaderStyles } from "../../hooks/layout/useHeaderStyles";
import Logo from "../../public/logo.svg";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

const iconSize = 22;
const iconRadius = "xl";
const actionIconSize = "lg";

const iconSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  backgroundColor: colorSchemeHandler(colorScheme, {
    light: colors.blue[2],
  }),
  "&:hover": {
    backgroundColor: colorSchemeHandler(colorScheme, {
      light: colors.blue[1],
    }),
  },
  color: colorSchemeHandler(colorScheme, { light: colors.navy[9] }),
  border: colorSchemeHandler(colorScheme, {
    light: "2px solid rgba(10, 35, 81, 0.7)",
  }),
});

type Props = {
  onHamburgerClick: () => void;
};

export const Header = ({ onHamburgerClick: navbarToggle }: Props) => {
  const [opened, { toggle: hamburgerAnimation }] = useDisclosure(false);
  const { classes } = useHeaderStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const darkModeIcon = colorScheme === LIGHT ? <IconMoon size={iconSize} /> : <IconSun size={iconSize} />;
  const darkModeTooltip = colorScheme === LIGHT ? "Dark Mode (CTRL + J)" : "Light Mode (CTRL + J)";

  const toggleHandler = () => toggleColorScheme();
  const hamburgerHandler = () => {
    navbarToggle();
    hamburgerAnimation();
  };

  const hamburgerAriaLabel = opened ? "Close navigation" : "Open navigation";

  return (
    <MantineHeader height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <MediaQuery largerThan="lg" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={hamburgerHandler}
              size="sm"
              title={hamburgerAriaLabel}
              aria-label={hamburgerAriaLabel}
            />
          </MediaQuery>
          <Image height={50} width={50} src={Logo} alt="logo" />
          <Text component="h1" sx={{ fontSize: "1.8rem" }}>
            Dockfiles.io
          </Text>
        </Group>

        <Group>
          <Tooltip label="View source code" position="left-end">
            <ActionIcon onClick={toggleHandler} variant="default" size={actionIconSize} sx={iconSx} radius={iconRadius}>
              <IconBrandGithub size={iconSize} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={darkModeTooltip} position="left-end">
            <ActionIcon onClick={toggleHandler} variant="default" size={actionIconSize} sx={iconSx} radius={iconRadius}>
              {darkModeIcon}
            </ActionIcon>
          </Tooltip>
        </Group>
      </div>
    </MantineHeader>
  );
};
