import { Box, MediaQuery } from "@mantine/core";
import { NavLink } from "./_navLink";

type Props = {
  onLinkClick?: () => void;
};

const UserLinks = ({ onLinkClick: navbarCloseHandler }: Props) => {
  return (
    <Box onClick={navbarCloseHandler}>
      <NavLink href="/bookmarks" text="Bookmarks" />
      <MediaQuery largerThan="xl" styles={{ display: "none" }}>
        <Box>
          <NavLink href="/notifications" text="Notifications" />
        </Box>
      </MediaQuery>
      <NavLink href="/settings" text="Settings" />
    </Box>
  );
};

export const UserNavLinksGroup = ({ onLinkClick: navbarCloseHandler }: Props) => {
  return (
    <>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Box>
          <NavLink text="Account">
            <UserLinks onLinkClick={navbarCloseHandler} />
          </NavLink>
        </Box>
      </MediaQuery>

      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Box>
          <UserLinks />
        </Box>
      </MediaQuery>
    </>
  );
};
