import { ref, onMounted } from 'vue'
import $http from '@/axios/http.js'

export default function useCommentInterface(props) {
    const data = ref([])
    const textarea = ref('')

    onMounted(async () => {
        const coms = await onGetComs()
        console.log(coms.message)
        data.value = coms.message
    })

    //发送请求
    /**
     * @param(comment)
     * @param(autherId)
     * @param(type)
     */

    const onSubmit = async () => {
        //获取数据，在异步中获取。setup函数执行一次。
        const body = {
            auther: props.auther,
            type: 'mood',
            content: textarea.value
        }
        await $http.post('/admin/comment/create', {
            data: body
        })
        // 提交完，textarea设置为null
        textarea.value = null
        const coms = await onGetComs()
        data.value = coms.message
    }

    //获取数据
    const onGetComs = async () => {
        const res = await $http.get('/admin/comment/find', {
            params: { auther: props.auther, type: 'mood' }
        })
        return res
    }
    return {
        data,
        textarea,
        onSubmit,
        onGetComs
    }
}
