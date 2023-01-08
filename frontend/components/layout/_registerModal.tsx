import { Modal, Stack } from "@mantine/core";
import { IconBrandGithub, IconBrandGitlab } from "@tabler/icons";
import { useState } from "react";
import { GITHUB_AUTH_REDIRECT, GITLAB_AUTH_REDIRECT } from "../../config/config";
import { Divider } from "../common/Divider";
import { gitHubOAuthLoadingState, gitLabOAuthLoadingState, initialOAuthBtnStates } from "./constants";
import { modalStyles } from "./styles";
import { OAuthButton } from "./_oAuthButton";
import { RegisterForm } from "./_registerForm";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const RegisterModal = ({ opened, onClose: modalCloseHandler }: Props) => {
  const [buttonStates, setButtonStates] = useState(initialOAuthBtnStates);

  const gitHubClickHandler = () => {
    setButtonStates(gitHubOAuthLoadingState);
  };

  const gitLabClickHandler = () => {
    setButtonStates(gitLabOAuthLoadingState);
  };

  return (
    <Modal centered opened={opened} onClose={modalCloseHandler} title="Register" styles={modalStyles}>
      <Stack>
        <RegisterForm onClose={modalCloseHandler} />

        <Divider size="xl" />
        <OAuthButton
          href={GITHUB_AUTH_REDIRECT}
          onClick={gitHubClickHandler}
          isLoading={buttonStates.gitHub.isLoading}
          disabled={buttonStates.gitLab.isLoading}
          icon={<IconBrandGithub />}
          text="Sign in With GitHub"
          loadingText="Connecting to GitHub"
        />
        <OAuthButton
          onClick={gitLabClickHandler}
          isLoading={buttonStates.gitLab.isLoading}
          disabled={buttonStates.gitHub.isLoading}
          href={GITLAB_AUTH_REDIRECT}
          icon={<IconBrandGitlab />}
          text="Sign in With GitLab"
          loadingText="Connecting to GitLab"
        />
      </Stack>
    </Modal>
  );
};
