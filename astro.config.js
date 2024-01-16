import dotenv from 'dotenv'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import vue from '@astrojs/vue'
import icon from 'astro-icon'

dotenv.config()

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE,
  build: {
    format: 'directory',
    assets: 'assets'
  },
  server: command => {
    console.log('env: ', command)
    return {
      port: Number(process.env.PORT) || 3000
    }
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true
    }
  },
  integrations: [mdx(), vue(), icon()]
})
