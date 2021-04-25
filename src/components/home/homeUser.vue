<template>
    <el-row type="flex" class="nav--user" justify="end" align="middle">
        <el-col class="unlogin" :span="11" v-if="!isSessionRef">
            <router-link custom to="/account/login" v-slot="{ navigate }">
                <div class=" block">
                    <el-button @click="navigate" type="primary" size="mini"
                        >登录</el-button
                    >
                </div>
            </router-link>
        </el-col>
        <el-col class="islogin" :span="18" v-else>
            <div class="show d-flex align-items-center" @mouseenter="isShow">
                <div class="block" v-if="userInfo.photoUrl">
                    <el-avatar
                        :src="userInfo.photoUrl"
                        shape="square"
                        :fit="'fill'"
                        :size="30"
                    ></el-avatar>
                </div>
                <div class="block" v-else>
                    <el-avatar
                        src="/../../assets/images/you1.jpg"
                        shape="square"
                        :fit="'fill'"
                        :size="30"
                    ></el-avatar>
                </div>

                <span>{{ userInfo.nickname }}</span>
                <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="exhibition" @mouseleave="isHide" v-if="isExhibitionRef">
                <div class="top">
                    <p>
                        <i class="el-icon-s-home"></i>
                        <router-link
                            custom
                            v-slot="{ navigate, isExactActive }"
                            to="/user/mood-editor"
                            ><span
                                :class="{ 'exact-active': isExactActive }"
                                class="flex-shrink-0"
                                @click="navigate"
                                >个人中心</span
                            >
                        </router-link>
                    </p>
                    <div
                        class="d-flex justify-content-center align-items-center"
                    >
                        <div>
                            <span>0</span>
                            <span>文章</span>
                        </div>
                        <div>
                            <span>0</span>
                            <span>关注</span>
                        </div>
                        <div>
                            <span>0</span>
                            <span>粉丝</span>
                        </div>
                    </div>

                    <div>
                        <el-button
                            type="primary"
                            icon="el-icon-s-promotion"
                            :round="true"
                            size="mini"
                            >签到</el-button
                        >
                    </div>
                </div>

                <div class="main">
                    <ul>
                        <li>
                            <i class="el-icon-user-solid"></i>

                            <router-link
                                custom
                                v-slot="{ navigate, isExactActive }"
                                to="/account/regist"
                                ><span
                                    :class="{ 'exact-active': isExactActive }"
                                    @click="navigate"
                                    >注册页面</span
                                >
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="bottom">
                    <ul>
                        <li>
                            <i class="el-icon-user-solid"></i>
                            <span @click="onexist">
                                退出登录
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { ref } from 'vue'
import $http from '@/axios/http.js'

export default {
    setup() {
        /**
         * 切换功能
         */
        let isSessionRef = ref(!!sessionStorage.token)
        let isExhibitionRef = ref(false)

        const onexist = () => {
            sessionStorage.clear()
            isSessionRef.value = !!sessionStorage.token
        }
        const isShow = () => {
            isExhibitionRef.value = true
        }
        const isHide = () => {
            isExhibitionRef.value = false
        }

        /**
         * 请求数据
         */
        let userInfo = ref({})

        async function getUserInfo() {
            const res = await $http.get('/admin/resource/user/findone')
            userInfo.value = res.message.info
        }
        //存在token，才请求数据
        if (isSessionRef.value) {
            getUserInfo()
        }

        return {
            onexist,
            userInfo,
            isSessionRef,
            isExhibitionRef,
            isShow,
            isHide
        }
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/home/homeUser.scss';
</style>
