import { createApp } from 'vue'
import '@/styles/reset.css'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { setupRouter } from './router'
import { setupStore } from './store'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function setupApp() {
  const app = createApp(App)

  for (const [key, component] of Object.entries(ElementPlusIconsVue))
    app.component(key, component)

  setupStore(app)
  setupRouter(app)

  app.mount('#app')
}

setupApp()
