import dotenv from 'dotenv'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import vue from '@astrojs/vue'
import icon from 'astro-icon'
import sitemap from "@astrojs/sitemap"
import robots from "astro-robots"
dotenv.config()

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE,
  output: 'static',
  build: {
    format: 'directory',
    assets: 'assets'
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true
    }
  },
  integrations: [
    mdx(),
    vue(),
    icon(),
    sitemap(),
    robots({
      sitemap: [
        `${process.env.SITE}/sitemap-0.xml`,
        `${process.env.SITE}/sitemap-index.xml`,
      ]
    })
  ]
})
