import { ColorScheme } from "@mantine/core";

export type User = {
  id: number;
  name: string;
  avatar: string; // optional maybe?
  is_admin: boolean;
};

export type ServerData = {
  user: User;
  colorScheme: ColorScheme;
  authenticated: boolean;
};
