import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  esbuild: {
    jsx: 'transform',
    jsxDev: false,
    jsxImportSource: '@/libs/jsx',
    jsxInject: `import { jsx } from '@/libs/jsx/jsx-runtime'`,
    jsxFactory: 'jsx.toVDOM',
  },
})
