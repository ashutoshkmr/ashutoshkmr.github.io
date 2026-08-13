// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ashutoshkmr.github.io',
  integrations: [sitemap()],
  build: {
    // Inline small stylesheets to cut a render-blocking round trip.
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
