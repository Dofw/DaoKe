import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { ElMessage } from 'element-plus'

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const verify = to.matched.some(item => {
        return item.meta.isVerify
    })
    if (verify) {
        if (sessionStorage.token) {
            next()
        } else {
            ElMessage({
                message: '请登录'
            })
            next('/account/login')
        }
    } else {
        next()
    }
})

export default router
