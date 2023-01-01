import { Badge, Tabs, TabsValue } from "@mantine/core";
import { IconPhoto, IconMessageCircle, IconSettings } from "@tabler/icons";
import { useRouter } from "next/router";
import {  MouseEventHandler } from "react";

export const README = "readme";
export const DOWNLOAD = "download";
export const COMMENTS = "comments";

type Props = {
  active: typeof README | typeof DOWNLOAD | typeof COMMENTS;
  commentsCount: number;
};

export const EnvironmentTabs = ({ /*readMe, download, comments,*/ active, commentsCount }: Props) => {
  const router = useRouter();
  const stringId = router.query.string_id;

  const tabChangeHandler = (value: TabsValue) => {
    if (value === README) {
      router.push(`/${stringId}`);
      return;
    }
    router.push(`/${stringId}/${value}`);
  };

  const preventDefaultHandler: MouseEventHandler<HTMLAnchorElement> = (event) => event.preventDefault();
  const noUnderline = {textDecoration: "none"}

  return (
    <Tabs value={active} onTabChange={tabChangeHandler}>
      <Tabs.List>
        <a href={`/${stringId}`} style={noUnderline} onClick={preventDefaultHandler}>
          <Tabs.Tab value={README} icon={<IconPhoto size={14} />}>
            View ReadMe
          </Tabs.Tab>
        </a>
        <a href={`/${stringId}/${DOWNLOAD}`} style={noUnderline} onClick={preventDefaultHandler}>
          <Tabs.Tab value={DOWNLOAD} icon={<IconMessageCircle size={14} />}>
            Download
          </Tabs.Tab>
        </a>
        <a href={`/${stringId}/${COMMENTS}`} style={noUnderline} onClick={preventDefaultHandler}>
          <Tabs.Tab value={COMMENTS} icon={<IconSettings size={14} />}>
            Comments
            <Badge variant="gradient" ml={4} gradient={{ from: "indigo", to: "cyan" }}>
              {commentsCount}
            </Badge>
          </Tabs.Tab>
        </a>
      </Tabs.List>
      {/* <Tabs.Panel value={README} pt="xs"> */}
      {/*   {readMe} */}
      {/* </Tabs.Panel> */}
      {/**/}
      {/* <Tabs.Panel value={DOWNLOAD} pt="xs"> */}
      {/*   {download} */}
      {/* </Tabs.Panel> */}
      {/**/}
      {/* <Tabs.Panel value={COMMENTS} pt="xs"> */}
      {/*   {comments} */}
      {/* </Tabs.Panel> */}
    </Tabs>
  );
};
