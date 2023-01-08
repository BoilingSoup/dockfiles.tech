import { useForm } from "@mantine/form";
import { validationRules } from "./constants";

export const useRegisterForm = () => {
  const registerForm = useForm({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
    validate: {
      displayName: validationRules.displayName,
      email: validationRules.email,
      password: validationRules.password,
      confirmPassword: validationRules.confirmPassword,
    },
    validateInputOnBlur: true,
  });

  const formKeys = {
    displayName: "displayName",
    email: "email",
    password: "password",
    confirmPassword: "confirmPassword",
    rememberMe: "rememberMe",
  };

  return { registerForm, formKeys };
};
