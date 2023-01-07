import { Modal, Stack } from "@mantine/core";
import { IconBrandGithub, IconBrandGitlab } from "@tabler/icons";
import { GITHUB_AUTH_REDIRECT, GITLAB_AUTH_REDIRECT } from "../../config/config";
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
        <LoginForm onClose={modalCloseHandler} />

        <Divider size="xl" />
        <OAuthButton href={GITHUB_AUTH_REDIRECT} icon={<IconBrandGithub />} text="Sign in With GitHub" loadingText="Connecting to GitHub" />
        <OAuthButton href={GITLAB_AUTH_REDIRECT} icon={<IconBrandGitlab />} text="Sign in With GitLab" loadingText="Connecting to GitLab"/>
      </Stack>
    </Modal>
  );
};
