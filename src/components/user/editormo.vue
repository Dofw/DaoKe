<template>
    <form action="" class="editormood">
        <div class="mood" data-field-container="mood">
            <textarea
                name="mood"
                id="mood"
                @click="unfoldArea"
                @keydown.esc="shrinkArea"
                @dblclick="shrinkArea"
                data-field
                placeholder="Write moode! start-single-click end-double-click or esc"
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
                <img src="../../assets/images/vue1.jpg" alt="" v-else />
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
import useEditormoBindEvent from '../../compositions/user/useEditormoBindEvent.js'

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
@import '../../assets/scss/user/editormood.scss';
</style>
