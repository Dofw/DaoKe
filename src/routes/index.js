import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isPass = to.matched.some(item => {
        return item.meta
    })

    if (isPass && sessionStorage.token) {
        next()
    } else {
        next('/account/login')
    }
})

export default router
