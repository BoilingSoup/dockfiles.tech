import { cleanNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { emailWasVerifiedNotification } from "../api/helpers";

export const useEmailWasVerifiedNotification = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query?.verified === "1") {
      emailWasVerifiedNotification();
      router.push("/");
    }

    return () => cleanNotifications();
  }, [router]);
};
