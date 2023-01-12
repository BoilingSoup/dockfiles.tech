import { Badge, Button, Center, Container, Group, Text, TextInput } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Divider } from "../../components/common/Divider";
import { mainContainerSx } from "../../components/common/styles";
import { formInputStyles } from "../../components/layout/styles";
import { Avatar } from "../../components/settings/Avatar";
import { DeleteAccountAccordion } from "../../components/settings/DeleteAccountAccordion";
import { buttonsSx, formMaxWidth, formWidth, titleTextSx } from "../../components/settings/styles";
import { SITE_NAME } from "../../config/config";
import { useAuth } from "../../contexts/AuthProvider";
import { useRedirectUnauthenticated } from "../../hooks/helpers/useRedirectUnauthenticated";

const Settings: NextPage = () => {
  useRedirectUnauthenticated("/");
  const { user } = useAuth();

  const emailIsVerified = user?.email_verified_at !== null;

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
            <Avatar mt={50} />
            <div style={{ maxWidth: formMaxWidth, width: formWidth, margin: "auto", marginTop: "30px" }}>
              <TextInput styles={formInputStyles} mt="lg" label="Display Name" placeholder="Name" value={user.name} />
              <TextInput
                styles={formInputStyles}
                mt="lg"
                label="Email"
                placeholder="Email"
                value={Boolean(user.github_id || user.gitlab_id) ? "GitHub/GitLab account" : user.email}
                disabled={!emailIsVerified || Boolean(user.github_id || user.gitlab_id)}
                rightSection={
                  emailIsVerified ? (
                    <Badge variant="gradient" gradient={{ from: "teal", to: "lime", deg: 105 }}>
                      Verified
                    </Badge>
                  ) : (
                    <Badge styles={{ root: { background: "#fcba03", color: "navy" } }}>Unverified</Badge>
                  )
                }
                rightSectionWidth={100}
              />
              <Group mt="xl">
                <Button sx={buttonsSx} mt="lg" disabled={emailIsVerified}>
                  Resend Verification Email
                </Button>
                <Button sx={buttonsSx} mt="lg" ml="auto">
                  Save Changes
                </Button>
              </Group>
            </div>
          </Center>
          <Divider mt={30} size="xl" />
          <Center style={{ alignItems: "center", maxWidth: formMaxWidth, width: formWidth, margin: "auto" }}>
            <DeleteAccountAccordion />
          </Center>
        </Container>
      )}
    </>
  );
};

export default Settings;
