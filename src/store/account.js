import {
    ACCOUNT_LOGIN,
    ACCOUNT_LOGOUT,
    ACCOUNT_CHANGE
} from './variableNmae.js'

import $http from '@/axios/http.js'
export default {
    namespaced: true,
    state: {
        id: null,
        token: null
    },
    mutations: {
        [ACCOUNT_CHANGE](state, payload) {
            state.id = payload.sessionStorage.id
            state.token = payload.sessionStorage.token
        },
        [ACCOUNT_LOGOUT](state) {
            sessionStorage.clear()
            state.id = null
            state.token = null
        }
    },
    actions: {
        async [ACCOUNT_LOGIN](context, { data }) {
            const res = await $http.post('/admin/account/login', {
                data: data
            })
            ;(sessionStorage.id = res.id), (sessionStorage.token = res.token)
            context.commit(ACCOUNT_CHANGE, { sessionStorage })
            return res
        }
    }
}
