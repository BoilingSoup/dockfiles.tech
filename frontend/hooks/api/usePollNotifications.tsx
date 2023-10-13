import { useQuery } from "react-query";
import { apiFetch } from "../../query-client/baseFetcher";
import { queryKeys } from "../../query-client/constants";

export const usePollNotifications = (pageNum: number) => {
  return useQuery(queryKeys.notifications(pageNum), getNotifications(pageNum), {
    refetchInterval: 1000 * 10, // 30 seconds
    refetchOnWindowFocus: true,
  });
};

type NotificationResponse = {
  current_page: number;
  data: Array<{
    id: number;
    content: string;
    is_read: boolean;
    is_meta: boolean;
    comment_id: number;
    created_at: string;
    is_deleted: boolean;
    author: {
      id: number;
      name: string;
      avatar: string;
    };
  }>;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{ url: string | null; label: string; active: boolean }>;
};

function getNotifications(pageNum: number) {
  return async function () {
    return (await apiFetch.get(`replies/received?page=${pageNum}`)) as NotificationResponse;
  };
}
