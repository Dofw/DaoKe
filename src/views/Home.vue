<template>
    <el-container class="my-container">
        <el-header class="pt-2">
            <el-row>
                <!-- nav -->
                <el-col class="d-flex" :span="7">
                    <home-nav></home-nav>
                </el-col>
                <!-- logo -->
                <el-col :span="10">
                    <el-row type="flex" justify="center">
                        <logo size="25px" class="flex-shrink-0" />
                    </el-row>
                </el-col>
                <!-- userinfo -->
                <el-col class="d-flex justify-content-end" :span="7">
                    <home-user
                        :isLogin="sessionRef"
                        v-bind="userInfo"
                        @logout="onhandle"
                    ></home-user>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
import Logo from '@/components/common/logo.vue'
import HomeNav from '@/components/home/homeNav.vue'
import HomeUser from '@/components/home/homeUser.vue'
import { reactive, ref } from 'vue'
import $http from '@/axios/http.js'
export default {
    data() {
        return {}
    },
    components: {
        Logo,
        HomeNav,
        HomeUser
    },
    setup() {
        let userInfo = ref({})
        let sessionRef = ref(!!sessionStorage.token)

        const onhandle = () => {
            sessionStorage.token = ''
            sessionRef.value = !!sessionStorage.token
        }

        $http.get('/admin/resource/user/findone').then(res => {
            userInfo.value = res.message.info
        })

        return {
            userInfo,
            sessionRef,
            onhandle
        }
    }
}
</script>

<style lang="scss" scope>
.my-container {
    width: 960px;
    margin: 0 auto;
}
</style>
