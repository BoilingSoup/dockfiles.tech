import { Box, Center, Flex, Image, Pagination, Skeleton, Text } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { sidebarContentContainerSx, sidebarReplyContainerSx, sidebarSkeletonSx } from "../../components/layout/styles";
import { DEFAULT_AVATAR, SITE_NAME } from "../../config/config";
import { useAuth } from "../../contexts/AuthProvider";
import { usePollNotifications } from "../../hooks/api/usePollNotifications";
import { usePrefetchBookmarksInitialPage } from "../../hooks/api/usePrefetchBookmarksInitialPage";
import { useRedirectUnauthenticated } from "../../hooks/helpers/useRedirectUnauthenticated";

const Notifications: NextPage = () => {
  useRedirectUnauthenticated("/");
  usePrefetchBookmarksInitialPage();

  const { user } = useAuth();

  const [pageNum, setPageNum] = useState(1);
  const { data, isLoading } = usePollNotifications(pageNum);

  return (
    <>
      <Head>
        <title>{SITE_NAME} | Notifications</title>
      </Head>

      <Text weight="bold" size="xl">
        Replies to You
      </Text>
      {user?.email_verified_at && (
        <>
          {isLoading && (
            <>
              {new Array(6).fill(null).map((_, i) => (
                <Skeleton key={i} w="100%" m="xs" h="104px" sx={sidebarSkeletonSx} />
              ))}
            </>
          )}
          <Flex sx={sidebarContentContainerSx}>
            {data?.data.length === 0 ? (
              <Center w="100%" h="100%">
                <Text weight="bold">No replies!</Text>
              </Center>
            ) : (
              <Flex sx={{ width: "100%", flexDirection: "column" }}>
                {data?.data.map((reply) => (
                  <Box key={reply.id} component={Link} href={`/comment/${reply.comment_id}`}>
                    <Box sx={sidebarReplyContainerSx(reply.is_read)}>
                      <Flex m="md" justify="space-between" align="center">
                        <Flex sx={(theme) => ({ alignItems: "center", gap: theme.spacing.md })}>
                          <Image src={reply.author.avatar ?? DEFAULT_AVATAR} width={30} height={30} radius={9999} />
                          <Text weight="bold">{reply.author.name}</Text>
                        </Flex>
                        {reply.created_at}
                      </Flex>
                      <Text ml="md" mr="md" mb="md">
                        {reply.content}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Flex>
            )}
          </Flex>
        </>
      )}
      <Center h="80px" w="100%">
        {data !== undefined && <Pagination page={pageNum} onChange={setPageNum} total={data?.last_page} />}
      </Center>
    </>
  );
};

export default Notifications;
