import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthProvider";

export const useRedirectUnauthenticated = (route: string) => {
  const { user } = useAuth();
  const router = useRouter();

  if (typeof window !== "undefined" && !user) {
    router.push(route);
  }
};
