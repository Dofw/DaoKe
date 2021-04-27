<template>
    <div class="regist">
        <form
            action="#"
            id="regist-form"
            class="d-flex justify-content-center align-items-center flex-wrap"
        >
            <div class="username" data-field-container="username">
                <label for="">用户名</label>
                <input
                    type="text"
                    name="username"
                    autocomplete="on"
                    data-field
                    value=""
                />
                <p data-field-error>错误信息展示区</p>
            </div>
            <div class="createpwd" data-field-container="createpwd">
                <label for=""> 创建密码</label>
                <input
                    type="password"
                    name="createpwd"
                    autocomplete="off"
                    data-field-trigger="affirmpwd"
                    data-field
                    value=""
                />
                <p data-field-error>错误信息展示区</p>
            </div>
            <div class="affirmpwd" data-field-container="affirmpwd">
                <label for="">确认密码</label>
                <input
                    type="password"
                    name="affirmpwd"
                    autocomplete="off"
                    data-field-event="input"
                    data-field
                    data-field-trigger="createpwd"
                    value=""
                />
                <p data-field-error class="">错误信息展示区</p>
            </div>
            <div class="other">
                <button @click="onRegist">提交</button>
                <div class="d-flex justify-content-end">
                    <span class="flex-grow-1">
                        客服电话：xxx
                    </span>
                    <router-link
                        custom
                        to="/account/login"
                        v-slot="{ navigate }"
                        ><span role="link" @click="navigate"
                            >login</span
                        ></router-link
                    >
                    <router-link custom to="/home/mood" v-slot="{ navigate }"
                        ><span role="link" @click="navigate">home</span>
                    </router-link>
                </div>
                <h6 style="color: #2ed;">
                    测试demo：密码设置为简单密码，而非个人常用密码
                </h6>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import $http from '../../axios/http.js'
import useValidatorInstance from '../../compositions/account/useRegistValidatorInstance.js'
import { ElMessage } from 'element-plus'
import router from '@/routes/index.js'

export default {
    setup() {
        const validatorInstanceRef = ref(null) //初始化，响应式验证实例对象。
        useValidatorInstance(validatorInstanceRef) // 通过onMounted,生成一个instance实例赋值给validator...
        // button-注册提交函数。
        const onRegist = e => {
            e.preventDefault()

            const validator = validatorInstanceRef.value
            const formData = validator.getFormData()
            const isPass = validator.doValidatorForm()
            const data = {}
            for (const key in formData) {
                if (key === 'username') {
                    data[key] = formData[key][0]
                } else if (key === 'affirmpwd') {
                    data['pwd'] = formData[key][0]
                }
            }
            validator.setStatus()
            if (isPass.formPass) {
                $http
                    .post('/admin/account/regist', {
                        data: data
                    })
                    .then(res => {
                        ElMessage({
                            type: 'success',
                            message: '注册成功!'
                        })
                        router.push('/account/login')
                    })
            }
        }
        return {
            onRegist
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/account/regist.scss';
</style>
