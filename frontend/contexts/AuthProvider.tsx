import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

const AuthContext = createContext<{ user: User; setUser: Dispatch<SetStateAction<User>> } | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  return context;
};

type Props = {
  children: JSX.Element;
};

export type User = null | {
  id: number;
  name: string;
  avatar: string; // optional maybe?
  is_admin: boolean;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>(null);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
