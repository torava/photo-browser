import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  distDir: 'build',
  basePath: process.env.PAGES_BASE_PATH,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
