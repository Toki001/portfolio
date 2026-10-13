import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
// @ts-expect-error Node build helper is intentionally plain JavaScript.
import { seoHead } from './scripts/seo.mjs'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), {
      name: 'portfolio-seo',
      transformIndexHtml(html) {
        return html.replace('<!-- seo-head -->', seoHead(env.GOOGLE_SITE_VERIFICATION))
      },
    }],
  }
})
