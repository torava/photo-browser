'use client';

import { ThemeProvider } from "@emotion/react";
import { useTheme } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
