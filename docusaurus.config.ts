import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "João's site",
  tagline: "Feel welcome to my site :)",
  favicon: "img/favicon.ico",
  staticDirectories: ["static"],

  url: "https://jvthecoder.dev",
  baseUrl: "/",

  organizationName: "joaovitorteixeira",
  projectName: "Joãozinho's site",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "portfolio",
          path: "portfolio",
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl: "https://github.com/joaovitorteixeira/my-blog/tree/main",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "João",
      logo: {
        alt: "João's Logo",
        src: "img/logo.svg",
        srcDark: "img/dark-logo.svg",
      },
      items: [
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/joaovitorteixeira",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Contact Me",
          items: [
            { label: "Email", href: "mailto:joaovitorteixeira.dev@gmail.com" },
          ],
        },
        {
          title: "Social Media",
          items: [
            {
              label: "Linkedin",
              href: "https://www.linkedin.com/in/joao-teixeira-074977174/",
            },
            {
              label: "Instagram",
              href: "https://www.instagram.com/isnt_john_/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} João's Site, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
