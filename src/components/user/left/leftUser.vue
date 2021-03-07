<template>
    <div class="user d-flex align-items-center flex-wrap p-1">
        <div class="photo"></div>
        <div class="me d-flex align-self-end flex-grow-1 ">
            <span class="flex-grow-1 ml-3">Dofw</span>
            <i class="iconfont icon-bianji2 mr-2">编辑</i>
            <form action="" id="formInfo">
                <div class="nickname">
                    <span>nickName</span>
                    <input
                        type="text"
                        name="nickname"
                        placeholder="16个字节以内"
                        maxlength="16"
                        class="nickname"
                        v-model="formInfo.nickname"
                        autocomplete="off"
                        data-field
                    />
                    <p data-field-error></p>
                </div>
                <div class="uploadphoto">
                    <span>upload-photo</span>
                    <img
                        v-if="formInfo.photoUrl"
                        :src="formInfo.photoUrl"
                        alt=""
                        @click="uploadPre"
                    />
                    <div v-else @click="uploadPre">
                        <i class="iconfont icon-shangchuan"></i>
                    </div>
                    <input
                        type="file"
                        name="photo"
                        id="fileupload"
                        style="display: none"
                    />
                </div>
                <div class="sex">
                    <span>Sex</span>
                    <input
                        type="radio"
                        name="sex"
                        id="man"
                        value="man"
                        v-model="formInfo.sex"
                        :checked="formInfo.sex === 'man'"
                    />
                    <label for="man">男</label>
                    <input
                        type="radio"
                        name="sex"
                        id="woman"
                        value="woman"
                        v-model="formInfo.sex"
                        :checked="formInfo.sex === 'woman'"
                    />
                    <label for="woman">女</label>
                </div>
                <div class="games">
                    <span>Games</span>
                    <p>
                        <label for="loves-1"
                            ><input
                                type="text"
                                name="games"
                                id="games-1"
                                v-model="formInfo.games[0]"
                                autocomplete="off"
                        /></label>

                        <label for="loves-2"
                            ><input
                                type="text"
                                name="games"
                                id="games-2"
                                v-model="formInfo.games[1]"
                                autocomplete="off"
                        /></label>

                        <label for="loves-3"
                            ><input
                                type="text"
                                name="games"
                                id="games-3"
                                v-model="formInfo.games[2]"
                                autocomplete="off"
                        /></label>
                        <label for="loves-4"
                            ><input
                                type="text"
                                name="games"
                                id="games-4"
                                v-model="formInfo.games[3]"
                                autocomplete="off"
                        /></label>
                    </p>
                </div>
                <div class="submit">
                    <button type="text" @click="formInfoSubmit">
                        提交
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import useFormInfo from '@/compositions/user/useFormInfo.js'
export default {
    setup() {
        return {
            ...useFormInfo()
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/user/left/leftUser.scss';
</style>
