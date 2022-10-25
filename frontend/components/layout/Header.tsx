import {
  Header as MantineHeader,
  Autocomplete,
  ActionIcon,
  Group,
  Burger,
  useMantineColorScheme,
  MediaQuery,
  Text,
  Center,
  MantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconMoon, IconSun, IconBrandGithub } from "@tabler/icons";
import Image from "next/image";
import { LIGHT } from "../../contexts/ColorSchemeProvider";
import { useHeaderStyles } from "./hooks/useHeaderStyles";
import Logo from "../../public/logo.svg";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

interface Props {
  links?: { link: string; label: string }[];
  onHamburgerClick: () => void;
}

const iconSize = 22;
const iconRadius = "xl";
const actionIconSize = "lg";

const iconSxThemeCallback = (theme: MantineTheme) => ({
  backgroundColor: colorSchemeHandler(theme.colorScheme, {
    light: theme.colors.blue[2],
  }),
  "&:hover": {
    backgroundColor: colorSchemeHandler(theme.colorScheme, {
      light: theme.colors.blue[2],
    }),
  },
  color: colorSchemeHandler(theme.colorScheme, { light: theme.colors.navy[9] }),
  border: colorSchemeHandler(theme.colorScheme, { light: "2px solid rgba(10, 35, 81, 0.7)" }),
});

export const Header = ({ links, onHamburgerClick: navbarToggle }: Props) => {
  const [opened, { toggle: hamburgerAnimation }] = useDisclosure(false);
  const { classes } = useHeaderStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const items = links?.map((link) => (
    <a key={link.label} href={link.link} className={classes.link} onClick={(event) => event.preventDefault()}>
      {link.label}
    </a>
  ));

  const darkModeIcon = colorScheme === LIGHT ? <IconMoon size={iconSize} /> : <IconSun size={iconSize} />;

  const toggleHandler = () => toggleColorScheme();
  const hamburgerHandler = () => {
    navbarToggle();
    hamburgerAnimation();
  };

  return (
    <MantineHeader height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={hamburgerHandler}
              size="sm"
              title={opened ? "Close navigation" : "Open navigation"}
              aria-label={opened ? "Close navigation" : "Open navigation"}
            />
          </MediaQuery>
          <Image height={50} width={50} src={Logo} alt="logo" />
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Text component="h1" sx={{ fontSize: "2rem" }}>
              Dockfiles.io
            </Text>
          </MediaQuery>
        </Group>

        <Center style={{ position: "fixed", width: "100vw" }}>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
            data={["React", "Angular", "Vue", "Next.js", "Riot.js", "Svelte", "Blitz.js"]}
          />
        </Center>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
          <ActionIcon
            onClick={toggleHandler}
            variant="default"
            size={actionIconSize}
            sx={iconSxThemeCallback}
            radius={iconRadius}
          >
            <IconBrandGithub size={iconSize} />
          </ActionIcon>
          <ActionIcon
            onClick={toggleHandler}
            variant="default"
            size={actionIconSize}
            radius={iconRadius}
            sx={iconSxThemeCallback}
          >
            {darkModeIcon}
          </ActionIcon>
        </Group>
      </div>
    </MantineHeader>
  );
};
