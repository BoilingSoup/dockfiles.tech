import { Box, MediaQuery } from "@mantine/core";
import { PseudoLink } from "../common/PseudoLink";
import { NavLink } from "./_navLink";

type Props = {
  onLinkClick: () => void;
};

export const BrowseNavLink = ({ onLinkClick: navbarCloseHandler }: Props) => {
  const href = "/";

  const link = (
    <PseudoLink href={href}>
      <NavLink href={href} text="Browse" />
    </PseudoLink>
  );

  return (
    <>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Box onClick={navbarCloseHandler}>{link}</Box>
      </MediaQuery>

      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Box>{link}</Box>
      </MediaQuery>
    </>
  );
};
