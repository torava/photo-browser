import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/photo-browser',
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
