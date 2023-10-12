import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue'],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      viteMockServe({
        mockPath: './src/mock', // 你的mock文件地址
        localEnabled: command === 'serve', // 开发环境
        prodEnabled: command !== 'serve', // 生产环境 //  这样可以控制关闭mock的时候不让mock打包到最终代码内
        // 如果prodEnable设置为true，则在编译打包的时候，会把mock的文件打包进去，如果你不写injectFile，那就是默认注入到main.ts/main.js
        injectCode: `
       // 这个路径需要注意是在你要注入的文件下的引用路径
        import { setupProdMockServer } from './utils/mockProdServer';
        setupProdMockServer();
      `,
      }),
    ],
    resolve: {
      alias: {
        '@/': `${resolve(__dirname, 'src')}/`,
      },
    },
  })
}
