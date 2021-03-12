<template>
    <div class="login">
        <form
            action="#"
            id="login-form"
            class="d-flex justify-content-center align-items-center flex-wrap"
        >
            <div class="username" data-field-container="username">
                <label for="">用户名</label>
                <input
                    type="text"
                    name="username"
                    autocomplete="off"
                    data-field
                    value=""
                />
                <p data-field-error></p>
            </div>
            <div class="pwd" data-field-container="pwd">
                <label for=""> 密码</label>
                <input type="text" name="pwd" data-field value="" />
                <p data-field-error></p>
            </div>
            <div class="other">
                <button @click="onLogin">提交</button>
                <div class="d-flex justify-content-end">
                    <span class="flex-grow-1">客服电话：xxx</span>
                    <router-link
                        custom
                        to="/account/regist"
                        v-slot="{ navigate }"
                        ><span role="link" @click="navigate">regist</span>
                    </router-link>
                    <span>home</span>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import router from '@/routes/index.js'
import useLoginValidatorInstance from '@/compositions/account/useLoginValidatorInstance.js'
import $http from '@/axios/http.js'

export default {
    setup() {
        const validatorInstanceRef = ref(null) //初始化，响应式验证实例对象。
        useLoginValidatorInstance(validatorInstanceRef) // 通过onMounted,生成一个instance实例赋值给validator...
        // button-注册提交函数。
        const onLogin = e => {
            e.preventDefault()
            const validator = validatorInstanceRef.value
            const formData = validator.getFormData()
            const isPass = validator.doValidatorForm()
            const data = {}
            for (const key in formData) {
                data[key] = formData[key][0]
            }

            if (isPass.formPass) {
                $http
                    .post('/admin/account/login', {
                        data: data
                    })
                    .then(res => {
                        console.log(res)
                        if (res.token) {
                            sessionStorage.token = res.token
                        }
                        alert('登录成功')
                        router.push('/user')
                    })
            } else {
                validator.setStatus()
            }
        }
        return {
            onLogin
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/account/login.scss';
</style>
