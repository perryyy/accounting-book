// main.js
import { createApp } from 'vue'
import App from './App.vue'

// 匯入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // CSS樣式必加

const app = createApp(App)

app.use(ElementPlus) // 掛載 Element Plus
app.mount('#app')
