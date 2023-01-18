import { useForm } from "@mantine/form";
import { User } from "../../../contexts/AuthProvider";
import { validationRules } from "../../layout/hooks/constants";

const GITHUB_PLACEHOLDER = "GitHub Account";
const GITLAB_PLACEHOLDER = "GitLab Account";

export const useChangePasswordForm = (user: User) => {
  const isGitHubUser = user?.github_id !== null;
  const isGitLabUser = user?.gitlab_id !== null;

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

  const changePasswordForm = useForm({
    initialValues: {
      oldPassword: initialOldPassword,
      newPassword: initialNewPassword,
      confirmNewPassword: initialConfirmNewPassword,
    },
    validate: {
      oldPassword: validationRules.password,
      newPassword: validationRules.password,
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
