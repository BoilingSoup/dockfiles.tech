import { Badge, Button, Group, TextInput } from "@mantine/core";
import { useAuth } from "../../contexts/AuthProvider";
import { formInputStyles } from "../layout/styles";
import { useSettingsForm } from "./hooks/useSettingsForm";
import { buttonsSx, formStyles } from "./styles";

export const AccountSettingsForm = () => {
  const { user } = useAuth();
  const { settingsForm, formKeys } = useSettingsForm(user);

  if (user === null) {
    return <></>;
  }

  const emailIsVerified = user.email_verified_at !== null;
  const isGitHub = user.github_id;
  const isGitLab = user.gitlab_id;
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
    <Badge variant="gradient" gradient={{ from: "teal", to: "lime", deg: 105 }}>
      Verified
    </Badge>
  ) : (
    <Badge styles={{ root: { background: "#fcba03", color: "navy" } }}>Unverified</Badge>
  );

  return (
    user && (
      <form onSubmit={settingsForm.onSubmit((values) => console.log(values))} style={formStyles}>
        <TextInput
          styles={formInputStyles}
          mt="lg"
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
            Save Changes
          </Button>
        </Group>
      </form>
    )
  );
};
