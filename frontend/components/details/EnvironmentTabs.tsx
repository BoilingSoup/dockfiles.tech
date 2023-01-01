import { Badge, Box, Center, Loader, Tabs, TabsValue } from "@mantine/core";
import { IconBook, IconDownload, IconMessage } from "@tabler/icons";
import { useRouter } from "next/router";
import { PseudoLink } from "../common/PseudoLink";
import { tabsSx } from "./styles";

export const README = "readme";
export const DOWNLOAD = "download";
export const COMMENTS = "comments";

type Props = {
  active: typeof README | typeof DOWNLOAD | typeof COMMENTS;
  commentsCount: {
    count: number | undefined;
    isLoading: boolean;
  };
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

  const iconSize = 18;

  return (
    <>
      <Tabs value={active} onTabChange={tabChangeHandler} sx={tabsSx}>
        <Tabs.List>
          <PseudoLink href={`/${stringId}`}>
            <Tabs.Tab value={README} icon={<IconBook size={iconSize} />}>
              View ReadMe
            </Tabs.Tab>
          </PseudoLink>
          <PseudoLink href={`/${stringId}/${DOWNLOAD}`}>
            <Tabs.Tab value={DOWNLOAD} icon={<IconDownload size={iconSize} />}>
              Download
            </Tabs.Tab>
          </PseudoLink>
          <PseudoLink href={`/${stringId}/${COMMENTS}`}>
            <Tabs.Tab value={COMMENTS} icon={<IconMessage size={iconSize} />}>
              Comments
              <Badge variant="gradient" ml={8} gradient={{ from: "indigo", to: "cyan" }}>
                {commentsCount.isLoading ? <Loader color="#ffffff" size="xs" variant="dots" /> : commentsCount.count}
              </Badge>
            </Tabs.Tab>
          </PseudoLink>
        </Tabs.List>
      </Tabs>
      <Box style={{ paddingTop: 50 }} />
    </>
  );
};
