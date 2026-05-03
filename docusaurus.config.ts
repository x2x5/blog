import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'x2x5 Blog',
  tagline: 'Notes, essays, and technical writing.',
  favicon: 'img/favicon.ico',

  url: 'https://x2x5.top',
  baseUrl: '/blog/',

  organizationName: 'x2x5',
  projectName: 'blog',

  trailingSlash: false,

  future: {
    v4: true,
  },

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en'],
    localeConfigs: {
      'zh-CN': {
        label: '中文',
        htmlLang: 'zh-CN',
      },
      en: {
        label: 'English',
        htmlLang: 'en',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        pages: false,
        blog: {
          path: 'blog',
          routeBasePath: '/',
          blogTitle: 'x2x5 Blog',
          blogDescription: 'x2x5 的个人博客',
          showReadingTime: true,
          postsPerPage: 10,
          blogSidebarCount: 5,
          editLocalizedFiles: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    navbar: {
      title: 'x2x5 Blog',
      items: [
        {
          to: '/',
          label: 'Blog',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
