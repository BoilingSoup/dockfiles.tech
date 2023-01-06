import { Button, Checkbox, Group, Modal as MantineModal, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandGithub, IconBrandGitlab } from "@tabler/icons";
import { Divider } from "../common/Divider";
import { modalStyles, oAuthBtnSx, submitSx } from "./styles";

const iconSize = 30;

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const Modal = ({ opened, onClose: modalCloseHandler }: Props) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 8 ? null : "Password must be at least 8 characters long"),
    },
  });

  return (
    <MantineModal centered opened={opened} onClose={modalCloseHandler} title="Sign In" styles={modalStyles}>
      <Stack>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput label="Email" placeholder="your@email.com" {...form.getInputProps("email")} />
          <TextInput label="Password" {...form.getInputProps("password")} />
          <Checkbox mt="md" label="Remember me" {...form.getInputProps("rememberMe", { type: "checkbox" })} />

          <Group position="right" mt="md">
            <Button sx={submitSx} type="submit">
              Submit
            </Button>
          </Group>
        </form>

        <Divider />
        <Button variant="white" sx={oAuthBtnSx} leftIcon={<IconBrandGithub size={iconSize} />}>
          <Text size="lg">Sign in with GitHub</Text>
        </Button>
        <Button variant="white" sx={oAuthBtnSx} leftIcon={<IconBrandGitlab size={iconSize} />}>
          <Text size="lg">Sign in with GitLab</Text>
        </Button>
      </Stack>
    </MantineModal>
  );
};
