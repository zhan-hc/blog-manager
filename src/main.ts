import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import Element from '@/utils/element'
import 'normalize.css'

const app = createApp(App)
app.use(Element)
app.use(router)
app.mount('#app')
