import i18nConfig from '@/i18n.config';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from '@mui/system';
import type { Metadata } from 'next';
import { I18nProvider } from 'next-i18next/client';
import { generateI18nStaticParams, getResources, getT, initServerI18next } from 'next-i18next/server';
import { headers } from 'next/headers';

if (process.env.VERCEL_ENV !== 'production') {
  const { setupFetchInterceptor } = await import('request-mocking-protocol/fetch');
  setupFetchInterceptor(() => headers());
}

initServerI18next(i18nConfig);

export async function generateStaticParams() {
  return generateI18nStaticParams();
}

export const metadata: Metadata = {
  title: 'Photo Browser',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;
  const { i18n } = await getT();
  const resources = getResources(i18n);
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <GlobalStyles
            styles={{ html: { height: '100%' }, body: { height: '100%', backgroundColor: 'black', color: 'white' } }}
          />
          <I18nProvider language={lng} resources={resources}>
            {children}
          </I18nProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
