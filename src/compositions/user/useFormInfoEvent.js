import { ref, onMounted } from 'vue'
import $http from '@/axios/http.js'
import useFormInfoInitData from '@/compositions/user/useFormInfoInitData.js'
import myFormData from '@/utils/myFormData.js'
import router from '@/routes/index.js'

export default function useFormInfoEvent(proxyData) {
    let fileDom, formDom, imgDom, imgPreDom, formInstance
    // 生命周期函数：获取dom保存起来。供后面渲染完成后，异步函数使用。
    onMounted(() => {
        fileDom = document.getElementById('fileupload')
        formDom = document.getElementById('formInfo')
        imgDom = document.getElementById('prePhoto')
        imgPreDom = document.getElementById('preImg')
        formInstance = new myFormData(formDom)
    })
    //
    const isShow = ref(false)
    const changeshow = function() {
        //当做submit的工具函数调用
        isShow.value = !isShow.value
    }
    const unShow = e => {
        e.preventDefault()

        // 如何让数据跟新，从而让该组件从新渲染原始数据。
        imgDom.src = proxyData.photoUrl // 解决imgshow，变回原来的url。
        imgPreDom.style.display = 'none'
        // form组件消失
        isShow.value = !isShow.value
    }
    // uploadPre触发filedom触发，并预备展示。
    const uploadPre = () => {
        fileDom.click()
        fileDom.onchange = function(e) {
            const readFile = new FileReader()
            readFile.readAsDataURL(this.files[0])
            readFile.onload = function() {
                imgDom.src = this.result // 解决imgurl，show存在情况

                //单独控制pre，默认none
                imgPreDom.style.display = 'block'
                imgPreDom.src = this.result
            }
            e.target.value = null //设置之后，fileDom就没有文件了。
        }
    }

    // 表单提交(服务端updata数据)
    const formInfoSubmit = async function(e) {
        // 阻止默认事件
        e.preventDefault()
        const data = formInstance.getFormData()
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
                imgDom.src = proxyData.photoUrl // 解决imgshow，变回原来的url。
                this.$message({
                    type: 'success',
                    message: res.message
                })
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

        this.$message({
            type: 'success',
            message: res.message
        })
        //更新后，再次改变响应式数据。
        useFormInfoInitData(proxyData)
    }

    const onLogout = function() {
        this.$confirm('是否注销登录！', proxyData.nickname, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                sessionStorage.clear()
                router.push('/account/login')

                this.$message({
                    type: 'success',
                    message: '注销成功!'
                })
            })
            .catch(() => {})
    }

    return {
        isShow,
        changeshow,
        unShow,
        formInfoSubmit,
        uploadPre,
        onLogout
    }
}
