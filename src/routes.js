import Home from './components/PageContent.vue'
import Orders from './components/Orders.vue'
import Modify from './components/Modify.vue'
import Dashboard from './components/Dashboard.vue'

export default [
    { path: '/', component: Home },
    { path: '/orders', component: Orders },
    { path: '/modify', name: 'modify', component: Modify, props: true },
    { path: '/dashboard', component: Dashboard}
]