import {
  Header as MantineHeader,
  Autocomplete,
  ActionIcon,
  Group,
  Burger,
  useMantineColorScheme,
  MediaQuery,
  Button,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconMoon, IconSun } from "@tabler/icons";
import Image from "next/image";
import { LIGHT } from "../../contexts/ColorSchemeProvider";
import { useHeaderStyles } from "./hooks/useHeaderStyles";
import Logo from "../../public/logo.svg";

interface Props {
  links: { link: string; label: string }[];
  onHamburgerClick: () => void;
}

export const Header = ({ links, onHamburgerClick: navbarToggle }: Props) => {
  const [opened, { toggle: hamburgerAnimation }] = useDisclosure(false);
  const { classes } = useHeaderStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const items = links.map((link) => (
    <a key={link.label} href={link.link} className={classes.link} onClick={(event) => event.preventDefault()}>
      {link.label}
    </a>
  ));

  const darkModeIcon = colorScheme === LIGHT ? <IconMoon size={16} /> : <IconSun size={16} />;
  const toggleHandler = () => toggleColorScheme();
  const hamburgerHandler = () => {
    navbarToggle();
    hamburgerAnimation();
  };

  return (
    <MantineHeader height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          {/* <MediaQuery largerThan="sm" styles={{ display: "none" }}> */}
            <Burger
              opened={opened}
              onClick={hamburgerHandler}
              size="sm"
              title={opened ? "Close navigation" : "Open navigation"}
              aria-label={opened ? "Close navigation" : "Open navigation"}
            />
          {/* </MediaQuery> */}
          <Image height={50} width={50} src={Logo} alt="logo" />
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Text component="h1" sx={{ fontSize: "2rem" }}>
              Dockfiles.io
            </Text>
          </MediaQuery>
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
            data={["React", "Angular", "Vue", "Next.js", "Riot.js", "Svelte", "Blitz.js"]}
          />
          <Button>Sign In</Button>
          <ActionIcon onClick={toggleHandler} variant="default" size="lg">
            {darkModeIcon}
          </ActionIcon>
        </Group>
      </div>
    </MantineHeader>
  );
};
