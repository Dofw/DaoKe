import { ref } from 'vue'
import $http from '@/axios/http.js'

export default function userGetData() {
    const moodDataRef = ref([])
    //请求数据
    $http.get('/admin/resource/mood/find').then(res => {
        moodDataRef.value = res.message
    })
    return {
        moodDataRef
    }
}
