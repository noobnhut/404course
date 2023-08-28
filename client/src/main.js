import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/index.js'
import axiosPlugin from './plugins/axios.js';


createApp(App)
    .use(axiosPlugin)
    .use(router)  
    .mount('#app')
