import $http from '@/axios/http.js'

export default async function useFormInfo(formInfo) {
    // 服务器端，改变数据

    const res = await $http.get('/admin/resource/info/findone')
    const data = res.message
    if (data !== null) {
        for (const key in formInfo) {
            formInfo[key] = data[key]
        }
    }
}
