import { ColorScheme } from "@mantine/core";
import { User } from "../../contexts/AuthProvider";

export type ServerData = {
  user: User;
  colorScheme: ColorScheme;
  authenticated: boolean;
};
