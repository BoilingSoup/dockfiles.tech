import { useForm } from "@mantine/form";
import { User } from "../../../contexts/AuthProvider";
import { validationRules } from "../../layout/hooks/constants";

export const useSettingsForm = (user: User) => {
  const settingsForm = useForm({
    initialValues: {
      displayName: user?.name ?? "",
      email: user?.email ?? "",
    },
    validate: {
      displayName: validationRules.displayName,
      email: validationRules.email,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const formKeys = {
    displayName: "displayName",
    email: "email",
    // password: "password",
    // rememberMe: "rememberMe",
  };

  return { settingsForm, formKeys };
};
