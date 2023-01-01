import { Box, MediaQuery } from "@mantine/core";
import { PseudoLink } from "../common/PseudoLink";
import { NavLink } from "./_navLink";

type Props = {
  onLinkClick?: () => void;
};

const UserLinks = ({ onLinkClick: navbarCloseHandler }: Props) => {
  const bookmarksHref = "/bookmarks";
  const notificationsHref = "/notifications";
  const settingsHref = "/settings";

  return (
    <Box onClick={navbarCloseHandler}>
      <PseudoLink href={bookmarksHref}>
        <NavLink href={bookmarksHref} text="Bookmarks" />
      </PseudoLink>

      <MediaQuery largerThan="xl" styles={{ display: "none" }}>
        <Box>
          <PseudoLink href={notificationsHref}>
            <NavLink href={notificationsHref} text="Notifications" />
          </PseudoLink>
        </Box>
      </MediaQuery>

      <PseudoLink href={settingsHref}>
        <NavLink href={settingsHref} text="Settings" />
      </PseudoLink>
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
