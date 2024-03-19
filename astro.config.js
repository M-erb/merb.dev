import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import vue from '@astrojs/vue'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'
import robots from 'astro-robots'
import cloudflare from '@astrojs/cloudflare'
import { loadEnv } from 'vite'

const {
  SITE
} = loadEnv(process.env.NODE_ENV, process.cwd(), '')

const site = SITE ? SITE : 'https://merb.dev'

// https://astro.build/config
export default defineConfig({
  site,
  output: 'hybrid',
  build: {
    format: 'directory',
    assets: 'assets'
  },
  vite: {
    build: {
      minify: false,
    },
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
        `${site}/sitemap-0.xml`,
        `${site}/sitemap-index.xml`,
      ]
    })
  ],
  adapter: cloudflare({
    mode: 'directory',
    functionPerRoute: false,
    imageService: 'compile',
    runtime: {
      type: 'pages',
      mode: 'local',
      bindings: {
        formEntries: {
          type: 'kv'
        }
      }
    }
  })
})
