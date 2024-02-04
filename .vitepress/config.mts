import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Ashutosh Kumar | Portfolio',
    description: 'Portfolio website for @ashutoshkmr',
    lastUpdated: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Projects', link: '/projects' },
            { text: 'Blogs', link: '/blogs' }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/ashutoshkmr' },
            {
                icon: 'linkedin',
                link: 'https://www.linkedin.com/in/ashutoshkmr40/'
            }
        ]
    },
    cleanUrls: true
});
