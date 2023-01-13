import { Badge, Button, Center, Group, Loader, Text, TextInput } from "@mantine/core";
import { useAuth } from "../../contexts/AuthProvider";
import { UpdateUserFormValues, UpdateUserPayload } from "../../hooks/api/helpers";
import { useUpdateUserMutation } from "../../hooks/api/useUpdateUserMutation";
import { formInputStyles } from "../layout/styles";
import { Avatar } from "./Avatar";
import { useSettingsForm } from "./hooks/useSettingsForm";
import {
  buttonsSx,
  formCenterStyles,
  formStyles,
  titleTextSx,
  unverifiedBadgeStyles,
  verifiedBadgeGradient,
} from "./styles";

export const AccountSettingsForm = () => {
  const { user } = useAuth();
  const { settingsForm, formKeys } = useSettingsForm(user);
  const { mutate: updateUserMutation, isLoading } = useUpdateUserMutation();

  if (user === null) {
    return <></>;
  }

  const emailIsVerified = user.email_verified_at !== null;
  const isGitHub = user.github_id !== null;
  const isGitLab = user.gitlab_id !== null;
  const isOAuth = Boolean(isGitHub || isGitLab);
  let emailValue: string;

  if (isGitHub) {
    emailValue = "GitHub Account";
  } else if (isGitLab) {
    emailValue = "GitLab Account";
  } else {
    emailValue = settingsForm.getInputProps(formKeys.email).value;
  }

  const badge = emailIsVerified ? (
    <Badge variant="gradient" gradient={verifiedBadgeGradient}>
      Verified
    </Badge>
  ) : (
    <Badge styles={unverifiedBadgeStyles}>Unverified</Badge>
  );

  const submitHandler = settingsForm.onSubmit((values: UpdateUserFormValues) => {
    if (isLoading) return;

    const nameIsChanged = settingsForm.isDirty(formKeys.displayName);
    const emailIsChanged = settingsForm.isDirty(formKeys.email);

    const payload: UpdateUserPayload = {};

    if (nameIsChanged) payload.name = values.displayName;
    if (emailIsChanged) payload.email = values.email;

    return updateUserMutation(payload);
    // TODO: throttle on backend.
    // TODO: access payload data in mutation onSuccess hook to show appropriate notification(s)
  });

  return (
    <Center style={formCenterStyles}>
      <form onSubmit={submitHandler} style={formStyles}>
        <Text component="h2" sx={titleTextSx} mr="auto" my={0}>
          Account Settings
        </Text>
        <Avatar mt={10} />
        <TextInput
          styles={formInputStyles}
          label="Display Name"
          {...settingsForm.getInputProps(formKeys.displayName)}
        />
        <TextInput
          styles={formInputStyles}
          mt="lg"
          label="Email"
          {...settingsForm.getInputProps(formKeys.email)}
          value={emailValue}
          disabled={!emailIsVerified || isOAuth}
          rightSection={!settingsForm.isDirty(formKeys.email) && badge}
          rightSectionWidth={100}
        />
        <Group mt="xl">
          <Button sx={buttonsSx} mt="lg" disabled={emailIsVerified}>
            Resend Verification Email
          </Button>
          <Button type="submit" sx={buttonsSx} mt="lg" ml="auto" disabled={!settingsForm.isDirty()}>
            {isLoading ? <Loader color="gray" size="sm" /> : "Save Changes"}
          </Button>
        </Group>
      </form>
    </Center>
  );
};
