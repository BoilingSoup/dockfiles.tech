import { Aside, Box, Center, Flex, Image, Pagination, Skeleton, Text, useMantineTheme } from "@mantine/core";
import { IconMessage } from "@tabler/icons";
import Link from "next/link";
import React, { CSSProperties, useState } from "react";
import { DEFAULT_AVATAR } from "../../config/config";
import { useAuth } from "../../contexts/AuthProvider";
import { usePollNotifications } from "../../hooks/api/usePollNotifications";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";
import {
  asideSx,
  sidebarContentContainerSx,
  sidebarReplyContainerSx,
  sidebarSkeletonSx,
  sidebarTitleHeight,
  sidebarTitleSx,
  unauthSidebarSx,
} from "./styles";

export const asideWidth = 300;
export const asideBreakPoint = "1400px";

const UnauthenticatedSidebar = () => {
  const { colors, colorScheme } = useMantineTheme();
  const placeholderStyles: CSSProperties = {
    color: colorSchemeHandler(colorScheme, {
      dark: colors.slate[7],
      light: colors.navy[5],
    }),
  };
  return (
    <Center sx={unauthSidebarSx}>
      <IconMessage size={100} style={placeholderStyles} />
      <Text weight="bold" size="lg" style={placeholderStyles}>
        Sign in to post comments.
      </Text>
    </Center>
  );
};

const AuthenticatedSidebar = () => {
  const { user } = useAuth();

  const [pageNum, setPageNum] = useState(1);
  const { data, isLoading } = usePollNotifications(pageNum);

  const { colors, colorScheme } = useMantineTheme();
  const placeholderStyles: CSSProperties = {
    color: colorSchemeHandler(colorScheme, {
      dark: colors.slate[7],
      light: colors.navy[5],
    }),
  };

  return (
    <Box w="100%" h="100%">
      <Center w="100%" h={sidebarTitleHeight}>
        <Text sx={sidebarTitleSx}>Replies to You</Text>
      </Center>

      {user?.email_verified_at ? (
        <>
          {isLoading && (
            <>
              <Center w="100%" h="100%">
                <Skeleton w="100%" h="100%" sx={sidebarSkeletonSx} />
              </Center>
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
      ) : (
        <Center sx={unauthSidebarSx}>
          <IconMessage size={100} style={placeholderStyles} />
          <Text weight="bold" size="lg" style={placeholderStyles} align="center">
            Verify your email to post comments.
          </Text>
        </Center>
      )}
      <Center h="80px" w="100%">
        {data !== undefined && <Pagination page={pageNum} onChange={setPageNum} total={data?.last_page} />}
      </Center>
    </Box>
  );
};

export const Sidebar = () => {
  const { user } = useAuth();

  return (
    <Aside hidden={true} hiddenBreakpoint="xl" width={{ xl: asideWidth }} sx={asideSx}>
      {user ? <AuthenticatedSidebar /> : <UnauthenticatedSidebar />}
    </Aside>
  );
};
