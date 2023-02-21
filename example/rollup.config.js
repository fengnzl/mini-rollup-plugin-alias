import { defineConfig } from 'rollup'
import { alias } from 'mini-rollup-plugin-alias'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
export default defineConfig({
  input: './index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs'
  },
  plugins: [
    alias({
      // entries: {
      //   '@': './utils'
      // }
      entries: [
        {
          find: '@',
          replacement: './utils'
        }
      ]
    }),
  ]
})
