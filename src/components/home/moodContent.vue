<template>
    <div class="wrapper">
        <div class="mood-content--top">
            <div class="d-flex align-items-center">
                <el-avatar
                    :size="30"
                    :fit="'cover'"
                    :src="info.photoUrl ? info.photoUrl : ''"
                    icon="el-icon-user-solid"
                ></el-avatar>
                <span>{{ info.nickname ? info.nickname : '刀客' }} 说说：</span>
            </div>
            <p class="modd-text">
                {{ mood }}
            </p>
        </div>
        <div class="mood-content--center d-flex align-items-center">
            <div class="mood-img">
                <img v-if="pictureUrl" :src="pictureUrl" />
            </div>
            <div class="mood-mp3 ">
                <audio v-if="mp3Url" :src="mp3Url" controls></audio>
            </div>
        </div>

        <!-- 评论组件 -->
        <mood-comment-list :auther="username" />
    </div>
</template>

<script>
import MoodCommentList from '@/components/home/moodCommentList.vue'
export default {
    props: {
        mood: { type: String },
        pictureUrl: { type: String },
        mp3Url: { type: String },
        info: {
            type: Object,
            default: () => ({})
        },
        username: {
            //mood模块的usernameId
            type: String,
            requied: true
        }
    },
    setup() {},
    components: {
        MoodCommentList
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/home/moodContent.scss';
</style>
