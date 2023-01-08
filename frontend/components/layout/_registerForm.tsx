import { Button, Checkbox, Group, Loader, TextInput } from "@mantine/core";
import { useRegisterMutation } from "../../hooks/api/useRegisterMutation";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { checkboxStyles, formInputStyles, submitSx } from "./styles";

export const RegisterForm = () => {
  const { registerForm, formKeys } = useRegisterForm();
  const { mutate: register, isLoading } = useRegisterMutation();

  return (
    <form onSubmit={registerForm.onSubmit((values) => register(values))}>
      <TextInput
        type="text"
        styles={formInputStyles}
        label="Display Name"
        {...registerForm.getInputProps(formKeys.displayName)}
      />
      <TextInput
        mt={14}
        type="email"
        styles={formInputStyles}
        label="Email"
        {...registerForm.getInputProps(formKeys.email)}
      />
      <TextInput
        type="password"
        mt={14}
        styles={formInputStyles}
        label="Password"
        {...registerForm.getInputProps(formKeys.password)}
      />
      <TextInput
        type="password"
        mt={14}
        styles={formInputStyles}
        label="Confirm Password"
        {...registerForm.getInputProps(formKeys.confirmPassword)}
      />
      <Group align="end">
        <Checkbox
          styles={checkboxStyles}
          mt="md"
          label="Remember me"
          {...registerForm.getInputProps(formKeys.rememberMe, { type: "checkbox" })}
        />
      </Group>

      <Group position="right">
        <Button sx={submitSx} type="submit" style={{ width: "90px" }}>
          {isLoading ? <Loader color="gray" size="sm" /> : "Submit"}
        </Button>
      </Group>
    </form>
  );
};
