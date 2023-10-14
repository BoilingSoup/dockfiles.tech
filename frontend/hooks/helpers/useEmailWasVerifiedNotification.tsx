import { cleanNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useHasVerified } from "../../zustand-store/verified/useVerifiedStatus";
import { emailWasVerifiedNotification } from "../api/helpers";

export const useEmailWasVerifiedNotification = () => {
  const router = useRouter();

  const { setHasVerified } = useHasVerified();

  useEffect(() => {
    if (router.query?.verified === "1") {
      emailWasVerifiedNotification();
      setHasVerified(true);
      router.push("/");
    }

    return () => cleanNotifications();
  }, [router]);
};
