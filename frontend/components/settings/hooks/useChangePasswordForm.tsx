import { useForm } from "@mantine/form";
import { User } from "../../../contexts/AuthProvider";
import { validationRules } from "../../layout/hooks/constants";

const GITHUB_PLACEHOLDER = "GitHub Account";
const GITLAB_PLACEHOLDER = "GitLab Account";

export type ChangePasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const useChangePasswordForm = (user: User) => {
  const isGitHubUser = user?.github_id !== null;
  const isGitLabUser = user?.gitlab_id !== null;

  const { initialOldPassword, initialNewPassword, initialConfirmNewPassword } = getInitialValues(
    isGitHubUser,
    isGitLabUser
  );

  const changePasswordForm = useForm({
    initialValues: {
      oldPassword: initialOldPassword,
      newPassword: initialNewPassword,
      confirmNewPassword: initialConfirmNewPassword,
    },
    validate: {
      oldPassword: validationRules.password,
      newPassword: (value: string, allValues) => {
        if (value === allValues.oldPassword) {
          return "New password can not be the same as old password";
        } else if (value.length < 8) {
          return "Password must be at least 8 characters long";
        } else {
          return null;
        }
      },
      confirmNewPassword: (value: string, allValues) =>
        value !== allValues.newPassword ? "Passwords did not match" : null,
    },
    validateInputOnBlur: true,
  });

  const formKeys = {
    oldPassword: "oldPassword",
    newPassword: "newPassword",
    confirmNewPassword: "confirmNewPassword",
  };

  return { changePasswordForm, formKeys };
};

function getInitialValues(isGitHubUser: boolean, isGitLabUser: boolean) {
  let initialOldPassword: string;
  let initialNewPassword: string;
  let initialConfirmNewPassword: string;

  if (isGitHubUser) {
    initialOldPassword = GITHUB_PLACEHOLDER;
    initialNewPassword = GITHUB_PLACEHOLDER;
    initialConfirmNewPassword = GITHUB_PLACEHOLDER;
  } else if (isGitLabUser) {
    initialOldPassword = GITLAB_PLACEHOLDER;
    initialNewPassword = GITLAB_PLACEHOLDER;
    initialConfirmNewPassword = GITLAB_PLACEHOLDER;
  } else {
    initialOldPassword = "";
    initialNewPassword = "";
    initialConfirmNewPassword = "";
  }

  return { initialOldPassword, initialNewPassword, initialConfirmNewPassword };
}
