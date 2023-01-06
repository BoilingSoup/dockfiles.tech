import { Button, Checkbox, Group, Loader, TextInput } from "@mantine/core";
import { useRegisterMutation } from "../../hooks/api/useRegisterMutation";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { checkboxStyles, formInputStyles, submitSx } from "./styles";

export const RegisterForm = () => {
  const registerForm = useRegisterForm();
  const { mutate: register, isLoading } = useRegisterMutation();

  return (
    <form onSubmit={registerForm.onSubmit((values) => register(values))}>
      <TextInput styles={formInputStyles} label="Email" {...registerForm.getInputProps("email")} />
      <TextInput mt={14} styles={formInputStyles} label="Password" {...registerForm.getInputProps("password")} />
      <TextInput
        mt={14}
        styles={formInputStyles}
        label="Confirm Password"
        {...registerForm.getInputProps("passwordConfirmation")}
      />
      <Group align="end">
        <Checkbox
          styles={checkboxStyles}
          mt="md"
          label="Remember me"
          {...registerForm.getInputProps("rememberMe", { type: "checkbox" })}
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
