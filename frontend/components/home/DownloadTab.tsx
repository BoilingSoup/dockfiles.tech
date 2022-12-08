import { Props as EnvironmentProps } from "../../pages/[string_id]";
import { CodeBlock } from "./_codeBlock";

export const DownloadTab = ({ environment }: EnvironmentProps) => {
  return (
    <>
      <CodeBlock
        title="Wget"
        code={`wget https://github.com/${environment.repo_owner}/${environment.repo_name}/archive/${environment.repo_branch}.zip`}
      />

      <CodeBlock
        title="Curl"
        code={`curl -L -O https://github.com/${environment.repo_owner}/${environment.repo_name}/archive/${environment.repo_branch}.zip`}
      />

      <CodeBlock
        title="Git clone"
        code={`git clone https://github.com/${environment.repo_owner}/${environment.repo_name}`}
      />
    </>
  );
};
