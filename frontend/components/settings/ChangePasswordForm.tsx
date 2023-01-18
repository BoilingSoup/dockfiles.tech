import { Button, Center, Group, Loader, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useAuth } from "../../contexts/AuthProvider";
import { ChangePasswordMetadata } from "../../hooks/api/helpers";
import { useChangePasswordMutation } from "../../hooks/api/useChangePasswordMutation";
import { formInputStyles } from "../layout/styles";
import { ChangePasswordFormValues, useChangePasswordForm } from "./hooks/useChangePasswordForm";
import { formCenterStyles, formStyles } from "./styles";

export const ChangePasswordForm = () => {
  const { user } = useAuth();
  const { changePasswordForm, formKeys } = useChangePasswordForm(user);
  const { mutate: changePasswordMutation, isLoading } = useChangePasswordMutation();
  const { colors } = useMantineTheme();

  if (user === null) {
    return <></>;
  }

  const isGitHub = user.github_id !== null;
  const isGitLab = user.gitlab_id !== null;
  const isOAuth = Boolean(isGitHub || isGitLab);

  const submitHandler = changePasswordForm.onSubmit((values: ChangePasswordFormValues) => {
    if (isLoading) return;

    const meta: ChangePasswordMetadata = {
      payload: {
        current_password: values.oldPassword,
        password: values.newPassword,
        password_confirmation: values.confirmNewPassword,
      },
      form: changePasswordForm,
    };

    return changePasswordMutation(meta);
  });

  return (
    <Center style={formCenterStyles}>
      <form onSubmit={submitHandler} style={formStyles}>
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
          <Button
            type="submit"
            mt="lg"
            ml="auto"
            disabled={!changePasswordForm.isDirty() || !changePasswordForm.isValid() || isLoading}
          >
            {isLoading ? <Loader color={colors.navy[6]} size="sm" /> : "Change Password"}
          </Button>
        </Group>
      </form>
    </Center>
  );
};
