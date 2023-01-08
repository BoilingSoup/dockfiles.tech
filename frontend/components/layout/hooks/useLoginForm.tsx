import { useForm } from "@mantine/form";
import { validationRules } from "./constants";

export const useLoginForm = () => {
  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: {
      email: validationRules.email,
      password: validationRules.password,
    },
    validateInputOnBlur: true,
  });

  const formKeys = {
    email: "email",
    password: "password",
    rememberMe: "rememberMe",
  };

  return { loginForm, formKeys };
};
