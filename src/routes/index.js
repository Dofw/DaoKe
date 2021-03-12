import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isPass = to.matched.some(item => {
        return item.meta.isVerify
    })
    if (isPass) {
        sessionStorage.token ? next() : next('/account/login')
    } else {
        next()
    }
})

export default router
