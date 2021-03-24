import { onMounted } from 'vue'
import $http from '@/axios/http.js'
import useFormInfoInitData from '@/compositions/user/useFormInfoInitData.js'
import myFormData from '@/utils/myFormData.js'

export default function useFormInfoEvent(proxyData) {
    let fileDom, formDom, imgDom, divDom, formInstance
    // 生命周期函数：获取dom保存起来。供后面渲染完成后，异步函数使用。
    onMounted(() => {
        fileDom = document.getElementById('fileupload')
        formDom = document.getElementById('formInfo')
        imgDom = document.getElementById('prePhoto')
        divDom = document.getElementById('preDiv')

        formInstance = new myFormData(formDom)
    })
    //
    const show = () => {
        //当做submit的工具函数调用
        formDom.classList.add('active')
    }
    const unShow = e => {
        e.preventDefault()

        // 如何让数据跟新，从而让该组件从新渲染原始数据。
        imgDom.src = proxyData.photoUrl // 解决imgshow，变回原来的url。
        divDom.style.backgroundImage = `` // 解决imgunshow，变回无背景。
        // form组件消失
        formDom.classList.remove('active')
    }
    // uploadPre触发filedom触发，并预备展示。
    const uploadPre = () => {
        fileDom.click()
        fileDom.onchange = function() {
            const readFile = new FileReader()
            readFile.readAsDataURL(this.files[0])
            readFile.onload = function() {
                imgDom.src = this.result // 解决imgurl，show存在情况
                divDom.style = {
                    backgroundImage: `url(${this.result})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                } //解决imgurl，unshow隐藏情况。 将css通过calss抽离。地址没办法。
            }
            // e.target.value = null //设置之后，fileDom就没有文件了。
        }
    }

    // 表单提交(服务端updata数据)
    const formInfoSubmit = async e => {
        // 阻止默认事件
        e.preventDefault()
        const data = formInstance.getFormData()
        console.log(data)
        unShow(e)

        // 创建form表单上传对象
        const formData = new FormData()
        formData.append(fileDom.name, fileDom.files[0])

        // 头像上传
        if (fileDom.files.length !== 0) {
            let res = await fetch('http://localhost:3000/admin/upload/photo', {
                method: 'post',
                headers: {
                    Authorization: 'Bearer ' + (sessionStorage.token || '')
                },
                body: formData
            })
            res = await res.text()
            res = JSON.parse(res)
            if (res.status !== 200) {
                imgDom.src = null
                alert(res.msg)
                return
            }
            if (res.url) {
                data.photoUrl = res.url
            }
        }

        // 上传跟新数据。
        const res = await $http.post('/admin/resource/info/update', {
            data: data
        })
        alert(res.message)
        //更新后，再次改变响应式数据。
        useFormInfoInitData(proxyData)
    }

    return {
        show,
        unShow,
        formInfoSubmit,
        uploadPre
    }
}
