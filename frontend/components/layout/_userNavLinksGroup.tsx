import { Box, MediaQuery } from "@mantine/core";
import { useAuth } from "../../contexts/AuthProvider";
import { PseudoLink } from "../common/PseudoLink";
import { NavLink } from "./_navLink";

type Props = {
  onLinkClick?: () => void;
};

const UserLinks = ({ onLinkClick: navbarCloseHandler, disabled }: Props & { disabled: boolean }) => {
  const { user } = useAuth();

  const bookmarksHref = "/bookmarks";
  const notificationsHref = "/notifications";
  const settingsHref = "/settings";

  return (
    <Box onClick={navbarCloseHandler}>
      {user?.email_verified_at && (
        <>
          <PseudoLink href={bookmarksHref}>
            <NavLink href={bookmarksHref} text="Bookmarks" disabled={disabled} />
          </PseudoLink>

          <MediaQuery largerThan="xl" styles={{ display: "none" }}>
            <Box>
              <PseudoLink href={notificationsHref}>
                <NavLink href={notificationsHref} text="Notifications" disabled={disabled} />
              </PseudoLink>
            </Box>
          </MediaQuery>
        </>
      )}

      <PseudoLink href={settingsHref}>
        <NavLink href={settingsHref} text="Settings" disabled={disabled} />
      </PseudoLink>
    </Box>
  );
};

export const UserNavLinksGroup = ({ onLinkClick: navbarCloseHandler }: Props) => {
  const { user } = useAuth();
  return (
    <>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Box>
          <NavLink text="Account" disabled={!user}>
            <UserLinks onLinkClick={navbarCloseHandler} disabled={!user} />
          </NavLink>
        </Box>
      </MediaQuery>

      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Box>
          <UserLinks disabled={!user} />
        </Box>
      </MediaQuery>
    </>
  );
};
