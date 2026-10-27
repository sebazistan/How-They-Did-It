import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

// The editor (/keystatic) needs a tiny server route; every public page is still pre-built static HTML.
// Local editing (npm run dev) runs on plain Node; the Cloudflare adapter is only for the real build.
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://www.canadianinvestigativejournalism.ca',
  output: 'static',
  adapter: isDev ? undefined : cloudflare(),
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    react(),
    keystatic(),
    sitemap({
      filter: (p) => !p.includes('/keystatic') && !p.includes('/404'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', 'fr-ca': 'fr-CA' } },
    }),
  ],
});
