import { ColorScheme, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Layout } from "../components/layout/Layout";
import { AuthProvider, User } from "../contexts/AuthProvider";
import { ColorSchemeProvider, DEFAULT_COLOR_SCHEME } from "../contexts/ColorSchemeProvider";
import { EnvironmentsData } from "../hooks/api/helpers";
import { generateQueryClient } from "../query-client/queryClient";

const generateTestQueryClient = () => {
  const client = generateQueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

type ContextsData = {
  queryClient?: QueryClient;
  colorScheme?: ColorScheme;
  user?: User;
  environments?: EnvironmentsData;
};

export const renderWithContexts = (ui: ReactElement, opts?: ContextsData) => {
  const queryClient = opts?.queryClient ?? generateTestQueryClient();
  const colorScheme = opts?.colorScheme ?? DEFAULT_COLOR_SCHEME;
  const user: User = opts?.user ?? null;
  const environments = opts?.environments ?? {};

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider value={colorScheme}>
        <MantineProvider>
          <NotificationsProvider>
            <AuthProvider user={user}>
              <Layout initialData={environments as EnvironmentsData}>{ui}</Layout>
            </AuthProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
};
