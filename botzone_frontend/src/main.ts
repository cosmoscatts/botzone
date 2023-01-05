import piniaPluginPersist from 'pinia-plugin-persist-uni'
import App from './App.vue'

import 'animate.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/main.less'

createApp(App)
  .use(createPinia().use(piniaPluginPersist))
  .mount('#app')
