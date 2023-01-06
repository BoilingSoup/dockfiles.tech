import { useForm } from "@mantine/form";

export const useLoginForm = () => {
  return useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 8 ? null : "Password must be at least 8 characters long"),
    },
    validateInputOnBlur: true,
  });
};
