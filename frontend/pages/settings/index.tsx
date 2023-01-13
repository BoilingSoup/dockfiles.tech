import { Center, Container, Text } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Divider } from "../../components/common/Divider";
import { mainContainerSx } from "../../components/common/styles";
import { AccountSettingsForm } from "../../components/settings/AccountSettingsForm";
import { Avatar } from "../../components/settings/Avatar";
import { ChangePasswordAccordion } from "../../components/settings/ChagePasswordAccordion";
import { DeleteAccountAccordion } from "../../components/settings/DeleteAccountAccordion";
import { accordionContainerStyles, formMaxWidth, formWidth, titleTextSx } from "../../components/settings/styles";
import { SITE_NAME } from "../../config/config";
import { useAuth } from "../../contexts/AuthProvider";
import { useRedirectUnauthenticated } from "../../hooks/helpers/useRedirectUnauthenticated";

const Settings: NextPage = () => {
  useRedirectUnauthenticated("/");
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>{SITE_NAME} | Settings</title>
      </Head>

      {user && (
        <Container sx={mainContainerSx}>
          <Center>
            <Text component="h1" sx={titleTextSx}>
              Account Settings
            </Text>
          </Center>
          <Center style={{ justifyContent: "space-around", flexDirection: "column" }}>
            <Avatar mt={10} />
            <AccountSettingsForm />
          </Center>
          <Divider mt={30} mb={30} size="xl" />
          <Center style={accordionContainerStyles}>
            <ChangePasswordAccordion />
          </Center>
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
