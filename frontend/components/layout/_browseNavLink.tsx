import { Box, MediaQuery } from "@mantine/core";
import { NavLink } from "./_navLink";

type Props = {
  onLinkClick: () => void;
};

export const BrowseNavLink = ({ onLinkClick: navbarCloseHandler }: Props) => {
  return (
    <>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Box onClick={navbarCloseHandler}>
          <NavLink href="/" text="Browse" />
        </Box>
      </MediaQuery>

      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Box>
          <NavLink href="/" text="Browse" />
        </Box>
      </MediaQuery>
    </>
  );
};
