import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Badge, Tabs } from "@mantine/core";
import { IconPhoto, IconMessageCircle, IconSettings } from "@tabler/icons";

const README = "readme";
const DOWNLOAD = "download";
const COMMENTS = "comments";

type Props = {
  readMe: ReactJSXElement;
  download: ReactJSXElement;
  comments: ReactJSXElement;
  commentsCount: number;
};

export const EnvironmentTabs = ({ readMe, download, comments, commentsCount }: Props) => {
  return (
    <Tabs defaultValue={README}>
      <Tabs.List>
        <Tabs.Tab value={README} icon={<IconPhoto size={14} />}>
          View ReadMe
        </Tabs.Tab>
        <Tabs.Tab value={DOWNLOAD} icon={<IconMessageCircle size={14} />}>
          Download
        </Tabs.Tab>
        <Tabs.Tab value={COMMENTS} icon={<IconSettings size={14} />}>
          Comments
          <Badge variant="gradient" ml={4} gradient={{ from: "indigo", to: "cyan" }}>
            {commentsCount} {/*Add comments_count here when I implement prefetching comments*/}
          </Badge>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={README} pt="xs">
        {readMe}
      </Tabs.Panel>

      <Tabs.Panel value={DOWNLOAD} pt="xs">
        {download}
      </Tabs.Panel>

      <Tabs.Panel value={COMMENTS} pt="xs">
        {comments}
      </Tabs.Panel>
    </Tabs>
  );
};
