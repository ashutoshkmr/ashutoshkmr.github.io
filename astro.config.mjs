// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ashutoshkmr.github.io',
  // The résumé page is a print surface, not a page to rank — keep it out of
  // the sitemap to match its noindex.
  integrations: [sitemap({ filter: (page) => !page.includes('/resume') })],
  build: {
    // Inline small stylesheets to cut a render-blocking round trip.
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
