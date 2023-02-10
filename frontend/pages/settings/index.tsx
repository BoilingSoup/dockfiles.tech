import { Center, Container } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Divider } from "../../components/common/Divider";
import { mainContainerSx } from "../../components/common/styles";
import { AccountSettingsForm } from "../../components/settings/AccountSettingsForm";
import { DeleteAccountAccordion } from "../../components/settings/DeleteAccountAccordion";
import { accordionContainerStyles } from "../../components/settings/styles";
import { SITE_NAME } from "../../config/config";
import { useAuth } from "../../contexts/AuthProvider";
import { useRedirectUnauthenticated } from "../../hooks/helpers/useRedirectUnauthenticated";
import { ChangePasswordForm } from "../../components/settings/ChangePasswordForm";
import { usePrefetchBookmarksInitialPage } from "../../hooks/api/usePrefetchBookmarksInitialPage";

const Settings: NextPage = () => {
  useRedirectUnauthenticated("/");
  const { user } = useAuth();

  usePrefetchBookmarksInitialPage();

  return (
    <>
      <Head>
        <title>{SITE_NAME} | Settings</title>
      </Head>

      {user && (
        <Container sx={mainContainerSx}>
          <AccountSettingsForm />
          <Divider mt={30} mb={30} size="xl" />
          <ChangePasswordForm />
          <Divider mt={30} mb={30} size="xl" />
          <Center style={accordionContainerStyles}>
            <DeleteAccountAccordion />
          </Center>
        </Container>
      )}
    </>
  );
};

export default Settings;
