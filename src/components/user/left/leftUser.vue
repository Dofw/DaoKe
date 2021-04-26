<template>
    <div class="user d-flex align-items-center flex-wrap ">
        <img v-if="formInfo.photoUrl" :src="formInfo.photoUrl" alt="" />
        <el-avatar
            v-else
            :size="40"
            fit="cover"
            icon="el-icon-user-solid"
        ></el-avatar>
        <div class="me d-flex align-self-end flex-grow-1 ">
            <span class="d-flex align-items-center flex-grow-1 ml-3">{{
                formInfo.nickname
            }}</span>
            <div
                class="d-flex justify-content-center align-content-around flex-wrap"
            >
                <i class="iconfont icon-bianji2 mr-2" @click="onLogout"
                    >注销
                </i>
                <i class="iconfont icon-bianji2 mr-2" @click="changeshow"
                    >修改</i
                >
            </div>
            <form :class="{ active: isShow }" id="formInfo">
                <div class="nickname" data-field-container="nickname">
                    <span>nickName</span>
                    <input
                        type="text"
                        name="nickname"
                        placeholder="16个字节以内"
                        maxlength="16"
                        class="nickname"
                        :value="formInfo.nickname"
                        autocomplete="off"
                        data-field
                    />
                </div>
                <div class="uploadphoto">
                    <span>upload-photo</span>

                    <img
                        v-show="formInfo.photoUrl"
                        id="prePhoto"
                        :src="formInfo.photoUrl"
                        alt=""
                        @click="uploadPre"
                    />
                    <img id="preImg" alt="" name="abc" @click="uploadPre" />

                    <div @click="uploadPre">
                        <i
                            v-if="!formInfo.photoUrl"
                            id="preDiv"
                            class="iconfont icon-shangchuan"
                        ></i>
                    </div>
                    <input
                        type="file"
                        name="photo"
                        id="fileupload"
                        style="display: none"
                    />
                </div>
                <div class="sex" data-field-container="sex">
                    <span>Sex</span>
                    <input
                        type="radio"
                        name="sex"
                        id="man"
                        value="man"
                        :checked="formInfo.sex === 'man'"
                        data-field
                        data-field-attr="checked"
                    />
                    <label for="man">男</label>
                    <input
                        type="radio"
                        name="sex"
                        id="woman"
                        value="woman"
                        :checked="formInfo.sex === 'woman'"
                        data-field
                        data-field-attr="checked"
                    />
                    <label for="woman">女</label>
                </div>
                <div class="games" data-field-container="games">
                    <span>Games</span>
                    <p>
                        <label for="loves-1"
                            ><input
                                type="text"
                                name="games"
                                id="games-1"
                                :value="formInfo.games[0]"
                                autocomplete="off"
                                data-field
                        /></label>

                        <label for="loves-2"
                            ><input
                                type="text"
                                name="games"
                                id="games-2"
                                :value="formInfo.games[1]"
                                autocomplete="off"
                                data-field
                        /></label>

                        <label for="loves-3"
                            ><input
                                type="text"
                                name="games"
                                id="games-3"
                                :value="formInfo.games[2]"
                                autocomplete="off"
                                data-field
                        /></label>
                        <label for="loves-4"
                            ><input
                                type="text"
                                name="games"
                                id="games-4"
                                :value="formInfo.games[3]"
                                autocomplete="off"
                                data-field
                        /></label>
                    </p>
                </div>
                <div class="submit">
                    <button type="text" @click="formInfoSubmit">
                        保存
                    </button>
                    <button type="text" @click="unShow">
                        取消
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import useFormInfoInitData from '@/compositions/user/useFormInfoInitData.js'
import useFormInfoEvent from '@/compositions/user/useFormInfoEvent.js'
export default {
    setup() {
        //初始化假数据
        let initInfo = {
            nickname: '刀客',
            photoUrl: null,
            sex: 'man', // 默认男
            games: [],
            username: ''
        }

        const formInfo = reactive(initInfo)
        //获取服务端数据
        useFormInfoInitData(formInfo)
        return {
            ...useFormInfoEvent(formInfo),
            formInfo
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/user/left/leftUser.scss';
</style>
