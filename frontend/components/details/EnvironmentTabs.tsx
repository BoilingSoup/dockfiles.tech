import { Badge, Tabs, TabsValue } from "@mantine/core";
import { IconPhoto, IconMessageCircle, IconSettings } from "@tabler/icons";
import { useRouter } from "next/router";
import { PseudoLink } from "../common/PseudoLink";

export const README = "readme";
export const DOWNLOAD = "download";
export const COMMENTS = "comments";

type Props = {
  active: typeof README | typeof DOWNLOAD | typeof COMMENTS;
  commentsCount: number;
};

export const EnvironmentTabs = ({ active, commentsCount }: Props) => {
  const router = useRouter();
  const stringId = router.query.string_id;

  const tabChangeHandler = (value: TabsValue) => {
    if (value === README) {
      router.push(`/${stringId}`);
      return;
    }
    router.push(`/${stringId}/${value}`);
  };

  return (
    <Tabs value={active} onTabChange={tabChangeHandler}>
      <Tabs.List>
        <PseudoLink href={`/${stringId}`}>
          <Tabs.Tab value={README} icon={<IconPhoto size={14} />}>
            View ReadMe
          </Tabs.Tab>
        </PseudoLink>
        <PseudoLink href={`/${stringId}/${DOWNLOAD}`}>
          <Tabs.Tab value={DOWNLOAD} icon={<IconMessageCircle size={14} />}>
            Download
          </Tabs.Tab>
        </PseudoLink>
        <PseudoLink href={`/${stringId}/${COMMENTS}`}>
          <Tabs.Tab value={COMMENTS} icon={<IconSettings size={14} />}>
            Comments
            <Badge variant="gradient" ml={4} gradient={{ from: "indigo", to: "cyan" }}>
              {commentsCount /*TODO: populate this with CSR, make api route*/}
            </Badge>
          </Tabs.Tab>
        </PseudoLink>
      </Tabs.List>
    </Tabs>
  );
};
