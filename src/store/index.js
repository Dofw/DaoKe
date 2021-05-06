import { createStore } from 'vuex'
import user from '@/store/user.js'
import account from '@/store/account.js'

const store = createStore({
    modules: {
        user,
        account
    }
})

export default store
