import { Button, Modal as MantineModal, Stack, Text } from "@mantine/core";
import { IconBrandGithub, IconBrandGitlab } from "@tabler/icons";
import { Divider } from "../common/Divider";
import { modalStyles, oAuthBtnSx } from "./styles";
import { LoginForm } from "./_loginForm";

const iconSize = 30;

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const Modal = ({ opened, onClose: modalCloseHandler }: Props) => {
  return (
    <MantineModal centered opened={opened} onClose={modalCloseHandler} title="Sign In" styles={modalStyles}>
      <Stack>
        <LoginForm />

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
