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
                    autocomplete="on"
                    data-field
                    value=""
                />
                <p data-field-error></p>
            </div>
            <div class="pwd" data-field-container="pwd">
                <label for=""> 密码</label>
                <input type="password" name="pwd" data-field value="" />
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
                    <router-link custom to="/home/mood" v-slot="{ navigate }"
                        ><span role="link" @click="navigate">home</span>
                    </router-link>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import router from '@/routes/index.js'
import useLoginValidatorInstance from '@/compositions/account/useLoginValidatorInstance.js'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { ACCOUNT_LOGIN } from '@/store/variableNmae.js'

export default {
    setup() {
        const store = useStore()
        const validatorInstanceRef = ref(null) //初始化，响应式验证实例对象。
        useLoginValidatorInstance(validatorInstanceRef) // 通过onMounted,生成一个instance实例赋值给validator...
        // button-注册提交函数。
        const onLogin = async function(e) {
            e.preventDefault()
            const validator = validatorInstanceRef.value
            const formData = validator.getFormData()
            const isPass = validator.doValidatorForm()
            const data = {}
            for (const key in formData) {
                data[key] = formData[key][0]
            }

            if (isPass.formPass) {
                const res = await store.dispatch('account/' + ACCOUNT_LOGIN, {
                    data
                })
                if (res) {
                    ElMessage({
                        type: 'success',
                        message: '登录成功!'
                    })
                    router.push('/home/mood')
                }
            } else {
                validator.setStatus()
                ElMessage({
                    type: 'danger',
                    message: '登录信息有误!'
                })
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
