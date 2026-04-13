'use client';

import { ThemeProvider } from "@emotion/react";
import { CssBaseline, GlobalStyles, useTheme } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
