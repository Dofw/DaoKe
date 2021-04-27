import myFormData from '@/utils/myFormData.js'
import $http from '@/axios/http.js'
import { ElMessage } from 'element-plus'

export default function useEditormoBindEvent(mp3UrlRef, pictureUrlRef) {
    const UrlRef = {
        mp3: mp3UrlRef,
        picture: pictureUrlRef
    }

    // 通过span标签点击事件，控制上传
    const mp3Span = () => {
        span2inputFile('#mp3', mp3UrlRef)
    }
    const pictureSpan = () => {
        span2inputFile('#picture', pictureUrlRef)
    }

    // btn提交事件,真正上传。
    const submit = async function() {
        const formDom = document.getElementsByClassName('editormood')[0]
        const moodDom = document.getElementById('mood')
        // 空值阻止发送请求
        if (!moodDom.value) {
            ElMessage({
                message: 'mood不能为空'
            })
            return false
        }
        // 2.1 获取data
        const datas = getData(formDom)
        const fileData = getFileData(datas)
        // 2.2 真正的上传请求
        const res = await requestAll(fileData)
        // 收集响上传失败的信息
        const newRes = res.filter(response => {
            return response.status !== 200
        })
        if (newRes.length !== 0) {
            // 错误信息提示：
            let msg = ''
            newRes.forEach(response => {
                msg += response.message
            })
            ElMessage({
                message: msg
            })
        } else {
            // 提示上传成功
            // 展示服务器返回的数据。
            const moodData = {}
            moodData.mood = datas.mood
            res.forEach(response => {
                UrlRef[response.fieldname].value = response.url // 策略模式
                moodData[`${response.fieldname}Url`] = response.url
                moodData[`${response.fieldname}Name`] = response.filename
            })

            // 上传数据。
            await $http
                .post('/admin/resource/mood/create', {
                    data: moodData
                })
                .then(res => {
                    ElMessage({
                        type: 'success',
                        message: res.status + '创建成功'
                    })
                })
            // 让mood变为空，防止无限次提交
            moodDom.value = ''
        }

        // 2.3 将mood数据回复最初展示。

        // ref.value = data.url
    }
    return {
        mp3Span,
        pictureSpan,
        submit
    }
}

/**
 * 由于，在map3的点击事件函数中，所以dom已经渲染完成了。
 * 封装方法，获取dom，绑定change事件，触发dom的click事件 参数#name ,ref
 */
function span2inputFile(id, ref) {
    // const fileName = id.split('#')[1]
    const dom = document.querySelector(id)
    dom.onchange = async function(e) {
        // 1. 预上传
        // uploadPre触发filedom触发，并预备展示。
        const readFile = new FileReader()
        readFile.readAsDataURL(this.files[0])
        readFile.onload = function() {
            ref.value = this.result
        }

        // 解决每次都能触发，文件变化问题
        // e.target.value = null
    }
    dom.click()
}

/**
 * 获取editor模块中的，form数据
 */
function getData(formDom) {
    if (!formDom) {
        return console.error('formDom,不存在')
    }
    const formInstance = new myFormData(formDom)
    return formInstance.getFormData()
}
/**
 * 获取editor模块中的，file键值对
 */
function getFileData(data) {
    const maps = new Map()
    for (const key in data) {
        if (data[key] instanceof FileList) {
            maps.set(key, data[key])
        }
    }

    return maps
}

/**
 * 并发请求
 */
function requestAll(fileData) {
    const arr = []
    const header = new Headers({
        Authorization: 'Bearer ' + (sessionStorage.token || '')
    })
    const method = 'Post'
    const baseURL = process.env.VUE_APP_API_URL || '/'
    for (const iterator of fileData) {
        let url = `${baseURL}admin/upload/${iterator[0]}`

        let file = iterator[1][0]
        if (!file) {
            continue
        }
        const formData = new FormData()
        formData.append(iterator[0], file)
        arr.push(sendFetch(url, method, formData, header))
    }
    return Promise.all(arr)
}

/**
 * fetch请求:
 * @param(url)`http://localhost:3000/admin/upload/${fileName}`
 * @param(data)
 * @param(headers) new Headers()
 */
function sendFetch(url, method, data, headers) {
    return fetch(url, {
        method: method,
        body: data,
        headers
    }).then(res => {
        return res.json()
    })
}
