import { ColorScheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { render, RenderResult } from "@testing-library/react";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider, User } from "../contexts/AuthProvider";
import { ColorSchemeProvider, DEFAULT_COLOR_SCHEME } from "../contexts/ColorSchemeProvider";
import { MantineProvider } from "../contexts/MantineProvider";
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
};

export const renderWithContexts = (ui: ReactElement, opts?: ContextsData): RenderResult => {
  const queryClient = opts?.queryClient ?? generateTestQueryClient();
  const colorScheme = opts?.colorScheme ?? DEFAULT_COLOR_SCHEME;
  const user: User = opts?.user ?? null;

  return render(
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider value={colorScheme}>
        <MantineProvider>
          <NotificationsProvider>
            <AuthProvider user={user}>{ui}</AuthProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
};
