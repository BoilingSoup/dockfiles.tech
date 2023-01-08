type FormKeys = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
};

export const validationRules = {
  displayName: (value: string) => (value.length >= 4 ? null : "Display Name must be at least 4 characters long"),
  email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
  password: (value: string) => (value.length >= 8 ? null : "Password must be at least 8 characters long"),
  confirmPassword: (value: string, values: FormKeys) => (value !== values.password ? "Passwords did not match" : null),
};
