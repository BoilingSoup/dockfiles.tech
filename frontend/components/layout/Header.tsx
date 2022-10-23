import {
  Header as MantineHeader,
  Autocomplete,
  ActionIcon,
  Group,
  Burger,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconMoon, IconSun } from "@tabler/icons";
import { LIGHT } from "../../contexts/ColorSchemeProvider";
import { useHeaderStyles } from "./hooks/useHeaderStyles";

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
          <Burger opened={opened} onClick={hamburgerHandler} size="sm" />
          <Text>Logo</Text>
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
          <ActionIcon onClick={toggleHandler} variant="default">
            {darkModeIcon}
          </ActionIcon>
        </Group>
      </div>
    </MantineHeader>
  );
};
