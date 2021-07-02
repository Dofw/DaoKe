<template>
    <form action="" class="editormood">
        <div class="mood" data-field-container="mood">
            <textarea
                name="mood"
                id="mood"
                data-field
                placeholder="请输入内容60字以内"
            ></textarea>
        </div>
        <div class="moodelse">
            <div class="upload d-flex">
                <div class="mp3" data-field-container="mp3">
                    <span @click="mp3Span">mp3</span>
                    <input
                        type="file"
                        name="mp3"
                        id="mp3"
                        accept="audio/*"
                        data-field
                        data-field-attr="files"
                    />
                </div>
                <div class="picture" data-field-container="picture">
                    <span @click="pictureSpan">picture</span>
                    <input
                        type="file"
                        name="picture"
                        id="picture"
                        accept="image/*"
                        data-field
                        data-field-attr="files"
                    />
                </div>
            </div>
            <div class="resMusic d-flex">
                <img :src="pictureUrl" alt="" v-if="pictureUrl" />
                <div class="avatar-default" @click="test" v-else>
                    <el-avatar
                        :size="100"
                        fit="cover"
                        icon="el-icon-picture"
                    ></el-avatar>
                </div>

                <!-- <img src="@/assets/images/vue1.jpg" alt="" v-else /> -->
                <audio :src="mp3Url" controls="controls"></audio>
            </div>
            <div class="btn">
                <button @click.prevent="submit">提交</button>
            </div>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
import useEditormoBindEvent from '@/compositions/user/useEditormoBindEvent.js'

export default {
    setup() {
        // 定义img audio的初始响应式src数据。展示初始化视图。
        const pictureUrlRef = ref(null)
        const mp3UrlRef = ref(null)

        return {
            ...useEditormoBindEvent(mp3UrlRef, pictureUrlRef),
            mp3Url: mp3UrlRef,
            pictureUrl: pictureUrlRef
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/user/moodUpload.scss';
</style>
