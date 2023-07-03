import dotenv from 'dotenv'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import vue from '@astrojs/vue'
import '@fontsource/ubuntu/400.css'
import '@fontsource/ubuntu/700.css'
import '@fontsource/ubuntu-mono/400.css'
import '@fontsource/ubuntu-mono/700.css'
import '@fontsource/merriweather/400.css'
import '@fontsource/merriweather/700.css'
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
  integrations: [mdx(), vue()]
})
