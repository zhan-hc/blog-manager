import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default  ({ mode }) => { 
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  return defineConfig({
    server: {
      port: 4000, // 设置服务启动端口号
      // open: true, // 设置服务启动时是否自动打开浏览器
      // cors: true, // 允许跨域
      proxy: {
        '/blogApi': {
          target: process.env.VITE_API_HOST,
          changeOrigin: true, //是否跨域
          rewrite: (path) => path.replace(/^\/blogApi/, '')
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
          })
        ],
      }),
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          ElementPlusResolver()
        ]
      }),
      Icons({
        autoInstall: true
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      },
    },
    base: './'
  })
}
