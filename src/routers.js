import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/home.vue'
import SaleDetails from './components/details.vue'
import Reports from './components/reports.vue'
import Entry from './components/entry.vue'
import Deal from './components/deal.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/details',
            name: 'SaleDetails',
            component: SaleDetails
        },
        {
            path: '/reports',
            name: 'Reports',
            component: Reports
        },
        {
            path: '/entry',
            name: 'Entry',
            component: Entry
        },
        {
            path: '/deal',
            name: 'Deal',
            component: Deal
        }
    ]
})
