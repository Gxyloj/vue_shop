import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import * as ElIconModules from '@element-plus/icons'
import './css/global.css'
import './css/font_2910502_wpcoka2ajt.css'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}
