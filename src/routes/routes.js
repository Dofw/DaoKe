import User from '../views/User.vue'
import Editor from '../components/user/editor.vue'
import Chat from '../components/user/chat.vue'
import Account from '../views/Account.vue'
import Login from '../components/account/login.vue'
import Regist from '../components/account/regist.vue'

const routes = [
    {
        path: '/',
        redirect: '/account/login'
    },
    {
        // 为个人中心。
        path: '/user',
        component: User,
        redirect: '/user/detail',
        children: [
            {
                path: 'detail',
                component: Editor
            },
            {
                path: 'chat',
                component: Chat
            }
        ],
        meta: {
            isVerify: true
        }
    },
    {
        path: '/account',
        component: Account,
        children: [
            {
                path: 'login',
                component: Login
            },
            {
                path: 'regist',
                component: Regist
            }
        ]
    }
]

export default routes
