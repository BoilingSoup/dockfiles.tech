import { setCookie } from "cookies-next";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { USER_DATA_COOKIE_KEY } from "../components/layout/constants";
import { useHasVerified } from "../zustand-store/verified/useVerifiedStatus";

const AuthContext = createContext<{ user: User; setUser: Dispatch<SetStateAction<User>> } | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

type Props = {
  children: JSX.Element;
  user: User;
};

export type User = null | {
  id: number;
  name: string;
  avatar: string | null;
  is_admin: boolean;
  email: string;
  /** Empty string if not verified, ISO string if verified. */
  email_verified_at: string | null;
  github_id: number | null;
  gitlab_id: number | null;
};

export const AuthProvider = ({ children, user: ssrUser }: Props) => {
  const [user, setUser] = useState<User>(ssrUser);

  const { hasVerified } = useHasVerified();

  useEffect(() => {
    if (hasVerified) {
      setUser((prev) => {
        if (!user) {
          return prev;
        }
        const copy = JSON.parse(JSON.stringify(prev)) as User;
        copy!.email_verified_at = Date.now().toString();

        setCookie(USER_DATA_COOKIE_KEY, JSON.stringify(copy));
        return copy;
      });
    }
  }, [hasVerified]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
