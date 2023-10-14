import {
  Header as MantineHeader,
  ActionIcon,
  Group,
  Burger,
  useMantineColorScheme,
  MediaQuery,
  Text,
  Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconMoon, IconSun, IconBrandGithub } from "@tabler/icons";
import Image from "next/image";
import { SITE_NAME } from "../../config/config";
import { LIGHT } from "../../contexts/ColorSchemeProvider";
import { useHeaderStyles } from "../../hooks/layout/useHeaderStyles";
import Logo from "../../public/logo.svg";
import { iconSx } from "./styles";

const iconSize = 22;
const iconRadius = "xl";
const actionIconSize = "lg";

type Props = {
  hamburgerOpened: boolean;
  onHamburgerClick: () => void;
};

export const Header = ({ hamburgerOpened, onHamburgerClick: navbarToggleHandler }: Props) => {
  const { classes } = useHeaderStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const breakPoint1 = useMediaQuery("(min-width: 430px)");
  const breakPoint2 = useMediaQuery("(min-width: 370px)");

  const darkModeIcon = colorScheme === LIGHT ? <IconMoon size={iconSize} /> : <IconSun size={iconSize} />;
  const darkModeTooltip = colorScheme === LIGHT ? "Dark Mode (CTRL + J)" : "Light Mode (CTRL + J)";

  const colorSchemeToggleHandler = () => toggleColorScheme();

  const hamburgerAriaLabel = hamburgerOpened ? "Close navigation" : "Open navigation";

  return (
    <MantineHeader height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={hamburgerOpened}
              onClick={navbarToggleHandler}
              size="sm"
              title={hamburgerAriaLabel}
              aria-label={hamburgerAriaLabel}
            />
          </MediaQuery>
          <Image height={50} width={50} src={Logo} alt="logo" />
          <Text
            component="h1"
            sx={{ fontSize: breakPoint1 ? "1.8rem" : "1.4rem", display: breakPoint2 ? "initial" : "none" }}
          >
            {SITE_NAME}
          </Text>
        </Group>

        <Group>
          <Tooltip label="View source code" position="left-end">
            <ActionIcon
              component="a"
              href="https://github.com/BoilingSoup/dockfiles.xyz"
              target="_blank"
              variant="default"
              size={actionIconSize}
              sx={iconSx}
              radius={iconRadius}
            >
              <IconBrandGithub size={iconSize} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={darkModeTooltip} position="left-end">
            <ActionIcon
              onClick={colorSchemeToggleHandler}
              variant="default"
              size={actionIconSize}
              sx={iconSx}
              radius={iconRadius}
            >
              {darkModeIcon}
            </ActionIcon>
          </Tooltip>
        </Group>
      </div>
    </MantineHeader>
  );
};
