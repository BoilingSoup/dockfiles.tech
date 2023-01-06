import { Modal, Stack } from "@mantine/core";
import { IconBrandGithub, IconBrandGitlab } from "@tabler/icons";
import { Divider } from "../common/Divider";
import { modalStyles } from "./styles";
import { LoginForm } from "./_loginForm";
import { OAuthButton } from "./_oAuthButton";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const LoginModal = ({ opened, onClose: modalCloseHandler }: Props) => {
  return (
    <Modal centered opened={opened} onClose={modalCloseHandler} title="Sign In" styles={modalStyles}>
      <Stack>
        <LoginForm />
        {/*TODO: on successful login, show success notification and close modal*/}

        <Divider size="xl" />
        <OAuthButton icon={<IconBrandGithub />} text="Sign in With GitHub" />
        <OAuthButton icon={<IconBrandGitlab />} text="Sign in With GitLab" />
      </Stack>
    </Modal>
  );
};
