import { reactive, onMounted } from 'vue'
import $http from '../../axios/http.js'

export default function useFormInfo() {
    //初始化假数据
    let initInfo = {
        nickname: 'Hello 刀客',
        photoUrl: null,
        sex: 'man', // 默认男
        games: [],
        username: 'qweqwe'
    }
    const formInfo = reactive(initInfo)
    // 服务器端，改变数据
    $http.get('/admin/resource/info').then(res => {
        if (res.message !== null) {
            const data = res.message
            console.log(data)
            for (const key in initInfo) {
                // console.log(initInfo[key], data[key])
                formInfo[key] = data[key] // 异步情况哦！ 设置为服务器端的数据。
            }
        }
    })

    let fileDom
    // 生命周期函数：获取dom保存起来。供后面渲染完成后，异步函数使用。
    onMounted(() => {
        fileDom = document.getElementById('fileupload')
    })

    // uploadPre触发filedom触发，并预备展示。
    const uploadPre = () => {
        fileDom.click()
        fileDom.onchange = function() {
            const readFile = new FileReader()
            readFile.readAsDataURL(this.files[0])
            readFile.onload = function() {
                formInfo.photoUrl = this.result
            }
            // e.target.value = null //设置之后，fileDom就没有文件了。
        }
    }

    // 表单提交(服务端updata数据)
    const formInfoSubmit = async e => {
        // 阻止默认事件
        e.preventDefault()

        // 获取所有的form数据
        // 创建form表单对象
        const formData = new FormData()
        formData.append(fileDom.name, fileDom.files[0])

        // 头像上传
        if (fileDom.files.length !== 0) {
            let res = await fetch(
                'http://localhost:3000/admin/upload/photoinfo',
                {
                    method: 'post',
                    headers: {
                        Authorization: 'Bearer ' + (sessionStorage.token || '')
                    },
                    body: formData
                }
            ).then(res => {
                console.log(res)
                return res.text()
            })

            res = JSON.parse(res)
            if (res.status !== 200) {
                alert(res.msg)
                return
            }

            // 上传成功了，url存在
            if (res.url) {
                formInfo.photoUrl = res.url
            }
        }
        // 上传跟新数据。
        $http
            .post('/admin/user/info/updateOne', {
                data: formInfo
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return {
        formInfo,
        formInfoSubmit,
        uploadPre
    }
}
