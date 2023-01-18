import { Button, Center, Group, Text, TextInput } from "@mantine/core";
import { useAuth } from "../../contexts/AuthProvider";
import { formInputStyles } from "../layout/styles";
import { useChangePasswordForm } from "./hooks/useChangePasswordForm";
import { formCenterStyles, formStyles } from "./styles";

export const ChangePasswordForm = () => {
  const { user } = useAuth();
  const { changePasswordForm, formKeys } = useChangePasswordForm(user);

  if (user === null) {
    return <></>;
  }

  const isGitHub = user.github_id !== null;
  const isGitLab = user.gitlab_id !== null;
  const isOAuth = Boolean(isGitHub || isGitLab);

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
          styles={formInputStyles}
          {...changePasswordForm.getInputProps(formKeys.oldPassword)}
        />
        <TextInput
          type={isOAuth ? "text" : "password"}
          disabled={isOAuth}
          mt="lg"
          label="New Password"
          styles={formInputStyles}
          {...changePasswordForm.getInputProps(formKeys.newPassword)}
        />
        <TextInput
          type={isOAuth ? "text" : "password"}
          disabled={isOAuth}
          mt="lg"
          label="Confirm New Password"
          styles={formInputStyles}
          {...changePasswordForm.getInputProps(formKeys.confirmNewPassword)}
        />
        <Group>
          <Button mt="lg" ml="auto" disabled={!changePasswordForm.isDirty() || !changePasswordForm.isValid()}>
            Change Password
          </Button>
        </Group>
      </form>
    </Center>
  );
};
