import User from '@/views/User.vue'
import Home from '@/views/Home.vue'
import MoodContent from '@/components/home/moodContent.vue'
import MoodEditor from '@/components/user/right/MoodEditor.vue'
import Moodlist from '@/components/user/right/MoodList.vue'
import Account from '@/views/Account.vue'
import Login from '@/components/account/login.vue'
import Regist from '@/components/account/regist.vue'

const routes = [
    {
        path: '/',
        redirect: '/home/mood'
    },
    {
        // 为个人中心。
        path: '/user',
        component: User,
        redirect: '/user/mood-editor',
        children: [
            {
                path: 'mood-editor',
                component: MoodEditor
            },
            {
                path: 'article',
                component: Moodlist
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
