import { Button, Checkbox, Group, Loader, TextInput } from "@mantine/core";
import { useLoginMutation } from "../../hooks/api/useLoginMutation";
import { useLoginForm } from "./hooks/useLoginForm";
import { checkboxStyles, formInputStyles, submitSx } from "./styles";

type Props = {
  onClose: () => void;
};

export const LoginForm = ({ onClose: modalCloseHandler }: Props) => {
  const loginForm = useLoginForm();
  const { mutate: login, isLoading } = useLoginMutation(modalCloseHandler);

  return (
    <form onSubmit={loginForm.onSubmit((values) => login(values))}>
      <TextInput type="email" styles={formInputStyles} label="Email" {...loginForm.getInputProps("email")} />
      <TextInput
        type="password"
        mt={14}
        styles={formInputStyles}
        label="Password"
        {...loginForm.getInputProps("password")}
      />
      <Group align="end">
        <Checkbox
          styles={checkboxStyles}
          mt="md"
          label="Remember me"
          {...loginForm.getInputProps("rememberMe", { type: "checkbox" })}
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
