import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routers.js'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueRouter)

const vue = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
