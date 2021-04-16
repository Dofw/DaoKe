import User from '../views/User.vue'
import Home from '@/views/Home.vue'
import MoodContent from '@/components/home/moodContent.vue'
import Editor from '../components/user/editor.vue'
import Account from '../views/Account.vue'
import Login from '../components/account/login.vue'
import Regist from '../components/account/regist.vue'

const routes = [
    {
        path: '/',
        redirect: '/home/mood'
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
            }
        ],
        meta: {
            isVerify: true
        }
    },
    {
        path: '/account',
        component: Account,
        redirect: '/account/login',
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
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: 'mood',
                component: MoodContent
            }
        ]
    }
]

export default routes
