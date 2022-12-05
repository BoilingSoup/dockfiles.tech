import { Box, MediaQuery } from "@mantine/core";
import { NavLink } from "./_navLink";

export const UserNavLinksGroup = () => {
  const UserLinks = (
    <>
      <NavLink href="/bookmarks" text="Bookmarks" />
      <MediaQuery largerThan="xl" styles={{ display: "none" }}>
        <Box>
          <NavLink href="/notifications" text="Notifications" />
        </Box>
      </MediaQuery>
      <NavLink href="/settings" text="Settings" />
    </>
  );

  return (
    <>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Box>
          <NavLink text="Account">{UserLinks}</NavLink>
        </Box>
      </MediaQuery>

      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Box>{UserLinks}</Box>
      </MediaQuery>
    </>
  );
};
