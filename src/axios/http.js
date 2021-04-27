import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/routes/index.js'

// process.env.VUE_APP_API_URL 这里是dev环境下。打包后，不存在就变成了 /

const $http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/',
    timeout: 20000,
    headers: {
        'content-type': 'application/json'
    }
})

// 请求拦截器
$http.interceptors.request.use(
    config => {
        if (sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + sessionStorage.token
        }
        return config
    },
    err => {
        return '请求拦截器error:' + err
    }
)

// 响应拦截器
$http.interceptors.response.use(
    res => {
        return res.data
    },
    err => {
        if (err.response) {
            switch (err.response.status) {
                case 401: //前后端约定，401为请登录。
                    ElMessage({
                        message: err.response.data.message
                    })
                    router.push('/account/login')
                    break

                case 402: //前后端约定，402为输入为空。
                    ElMessage({
                        message: err.response.data.message
                    })
                    break
                case 403:
                    ElMessage({
                        message: err.response.data.message
                    })
                    break
            }
        }

        return Promise.reject(err)
    }
)
export default $http
