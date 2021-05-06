import {
    CHANGE_USER_INIT,
    GET_USER_INIT,
    UPDATE_USER_INFO,
    UPLOAD_USER_PHOTO
} from './variableNmae.js'
import $http from '@/axios/http.js'

export default {
    namespaced: true,
    state: {
        formInfo: {
            nickname: '刀客',
            photoUrl: null,
            sex: 'man', // 默认男
            games: [],
            username: ''
        }
    },
    getter: {},
    mutations: {
        // 改变初始化数据
        [CHANGE_USER_INIT](state, payload) {
            state.formInfo = payload.data
        }
    },
    actions: {
        async [GET_USER_INIT](context) {
            const res = await $http.get('/admin/resource/info/findone')
            context.commit(CHANGE_USER_INIT, {
                data: res.message
            })
        },
        async [UPDATE_USER_INFO](context, payload) {
            // 上传跟新数据。
            const res = await $http.post('/admin/resource/info/update', {
                data: payload.data
            })
            context.commit(CHANGE_USER_INIT, { data: res.message })

            return res
        },
        async [UPLOAD_USER_PHOTO](context, payload) {
            // 上传photo
            const baseURL = process.env.VUE_APP_API_URL || '/'
            // fetch ,仅当网络故障时或请求被阻止时，才会标记为 reject
            let res = await fetch(`${baseURL}admin/upload/photo`, {
                method: 'post',
                headers: {
                    Authorization: 'Bearer ' + (sessionStorage.token || '')
                },
                body: payload.formData
            })
            res = await res.text()
            res = JSON.parse(res)
            return res
        }
    }
}
