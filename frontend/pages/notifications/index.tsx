import { Text } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { SITE_NAME } from "../../config/config";
import { usePrefetchBookmarksInitialPage } from "../../hooks/api/usePrefetchBookmarksInitialPage";
import { useRedirectUnauthenticated } from "../../hooks/helpers/useRedirectUnauthenticated";

const Notifications: NextPage = () => {
  useRedirectUnauthenticated("/");
  usePrefetchBookmarksInitialPage();

  return (
    <>
      <Head>
        <title>{SITE_NAME} | Notifications</title>
      </Head>

      <Text component="h1">Notifications</Text>
    </>
  );
};

export default Notifications;
