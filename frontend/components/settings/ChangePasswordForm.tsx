import { Button, Center, Group, Text, TextInput } from "@mantine/core";
import { useAuth } from "../../contexts/AuthProvider";
import { formInputStyles } from "../layout/styles";
import { formCenterStyles, formStyles } from "./styles";

export const ChangePasswordForm = () => {
  const { user } = useAuth();

  if (user === null) {
    return <></>;
  }

  const isGitHub = user.github_id !== null;
  const isGitLab = user.gitlab_id !== null;
  const isOAuth = Boolean(isGitHub || isGitLab);

  let placeholderValue: string;
  if (isGitHub) {
    placeholderValue = "GitHub Account";
  } else if (isGitLab) {
    placeholderValue = "GitLab Account";
  } else {
    placeholderValue = "";
  }

  return (
    <Center style={formCenterStyles}>
      <form style={formStyles}>
        <Text component="h2" mr="auto" my={0} style={{ fontSize: "1.3rem" }}>
          Change Password
        </Text>
        <TextInput
          type={isOAuth ? "text" : "password"}
          disabled={isOAuth}
          mt="lg"
          label="Old Password"
          value={placeholderValue}
          styles={formInputStyles}
        />
        <TextInput
          type={isOAuth ? "text" : "password"}
          disabled={isOAuth}
          mt="lg"
          label="New Password"
          value={placeholderValue}
          styles={formInputStyles}
        />
        <TextInput
          type={isOAuth ? "text" : "password"}
          disabled={isOAuth}
          mt="lg"
          label="Confirm New Password"
          value={placeholderValue}
          styles={formInputStyles}
        />
        <Group>
          <Button mt="lg" ml="auto" disabled={isOAuth}>
            Change Password
          </Button>
        </Group>
      </form>
    </Center>
  );
};
