import { ColorScheme } from "@mantine/core";
import { User } from "../../contexts/AuthProvider";
import { EnvironmentsData } from "../../hooks/api/helpers";

export type ServerData = {
  user: User;
  colorScheme: ColorScheme;
  environments: EnvironmentsData;
};
