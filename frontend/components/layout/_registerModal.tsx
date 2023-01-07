import { Modal, Stack } from "@mantine/core";
import { IconBrandGithub, IconBrandGitlab } from "@tabler/icons";
import { GITHUB_AUTH_REDIRECT, GITLAB_AUTH_REDIRECT } from "../../config/config";
import { Divider } from "../common/Divider";
import { modalStyles } from "./styles";
import { OAuthButton } from "./_oAuthButton";
import { RegisterForm } from "./_registerForm";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const RegisterModal = ({ opened, onClose: modalCloseHandler }: Props) => {
  return (
    <Modal centered opened={opened} onClose={modalCloseHandler} title="Register" styles={modalStyles}>
      <Stack>
        <RegisterForm />
        {/*TODO: on successful register, show info notification to verify email and close modal*/}

        <Divider size="xl" />
        <OAuthButton href={GITHUB_AUTH_REDIRECT} icon={<IconBrandGithub />} text="Sign in With GitHub" />
        <OAuthButton href={GITLAB_AUTH_REDIRECT} icon={<IconBrandGitlab />} text="Sign in With GitLab" />
      </Stack>
    </Modal>
  );
};
