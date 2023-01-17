import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

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

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
