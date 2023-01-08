import { useForm } from "@mantine/form";

export const useRegisterForm = () => {
  return useForm({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      displayName: (value) => (value.length >= 4 ? null : "Display name must be at least 4 characters"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 8 ? null : "Password must be at least 8 characters"),
      confirmPassword: (value, values) => (value !== values.password ? "Passwords did not match" : null),
    },
    validateInputOnBlur: true,
  });
};
