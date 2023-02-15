import dotenv from 'dotenv'
import { defineConfig } from 'astro/config'
import mdx from "@astrojs/mdx"
dotenv.config()

// https://astro.build/config
export default defineConfig({
  site: 'https://merb.dev',
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
  integrations: [mdx()]
})
