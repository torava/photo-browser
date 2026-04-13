import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from '@mui/system';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

if (process.env.VERCEL_ENV !== 'production') {
  const { setupFetchInterceptor } = await import('request-mocking-protocol/fetch');
  setupFetchInterceptor(() => headers());
}

export const metadata: Metadata = {
  title: 'Photo Browser',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <GlobalStyles
            styles={{ html: { height: '100%' }, body: { height: '100%', backgroundColor: 'black', color: 'white' } }}
          />
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
