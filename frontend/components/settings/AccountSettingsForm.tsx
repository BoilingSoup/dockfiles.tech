import { Badge, Button, Group, TextInput } from "@mantine/core";
import { useAuth } from "../../contexts/AuthProvider";
import { formInputStyles } from "../layout/styles";
import { buttonsSx, formMaxWidth, formWidth } from "./styles";

export const AccountSettingsForm = () => {
  const { user } = useAuth();

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
    emailValue = user.email;
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
      <div style={{ maxWidth: formMaxWidth, width: formWidth, margin: "auto", marginTop: "30px" }}>
        <TextInput styles={formInputStyles} mt="lg" label="Display Name" value={user.name} />
        <TextInput
          styles={formInputStyles}
          mt="lg"
          label="Email"
          value={emailValue}
          disabled={!emailIsVerified || isOAuth}
          rightSection={badge}
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
    )
  );
};
