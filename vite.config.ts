/// <reference types="vitest" />

import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import IstanbulPlugin from 'vite-plugin-istanbul'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueDevTools from 'vite-plugin-vue-devtools'

const plugins: Array<Plugin> = [
  vue(),
  tsconfigPaths(),
  vueDevTools({
    // 启用 Vue DevTools
    componentInspector: true,
    // 将默认编辑器从 VS Code 更改为 WebStorm
    launchEditor: 'webstorm'
  }),
  Components({
    resolvers: [
      AntDesignVueResolver({
        importStyle: false // css in js
      })
    ]
  })
]

if (process.env.CYPRESS_TEST === 'true') {
  console.info('instrumenting code coverage for e2e tests...')
  plugins.push(
    IstanbulPlugin({
      cypress: true,
      checkProd: true,
      exclude: ['dist', '.nyc_output', 'node_modules', 'coverage', 'test'],
      include: ['src/*']
    })
  )
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  optimizeDeps: {
    // exclude: ['lodash-es']
  },
  plugins,
  test:
    {
      server: {
        deps: {
          inline: ['date-fns']
        }
      }
      ,
      environment: 'happy-dom',
      globals:
        true,
      coverage:
        {
          all: true,
          exclude:
            ['*.config.{ts,js}', '**/*.d.ts', 'src/main.ts', 'dist', 'test'],
          functions:
            80,
          branches:
            80,
          statements:
            80
        }
    }
  ,
  build: {
    sourcemap: mode === 'production' ? false : 'inline'
  }
  ,
  server: {
    port: 3000,
    host:
      '0.0.0.0'
  }
}))
