<template>
    <div class="wrapper">
        <el-row class="mood-content-top" :gutter="10" align="middle">
            <el-col :span="1.5">
                <div class="block">
                    <el-avatar
                        :size="30"
                        fit="cover"
                        :src="info.photoUrl ? info.photoUrl : ''"
                        icon="el-icon-user-solid"
                    ></el-avatar>
                </div>
            </el-col>
            <el-col :span="6" class="d-flex align-items-center">
                <span class="align-self-shrink"
                    >{{ info.nickname ? info.nickname : '刀客' }}
                    <i class="el-icon-loading"></i>说：</span
                >
            </el-col>
        </el-row>
        <el-row class="mood-content-center" :gutter="10">
            <el-col :span="16">
                <p class="mood-text">
                    {{ mood }}
                </p>
            </el-col>
            <el-col :span="8">
                <div class="radio">
                    <div class="mood-img" v-if="pictureUrl">
                        <img :src="pictureUrl" />
                        <div v-if="mp3Url">
                            <i v-if="isPlay" class="el-icon-video-pause"></i>
                            <i v-else class="el-icon-video-play"></i>
                        </div>
                    </div>
                    <div class="mood-mp3 " v-if="mp3Url">
                        <span>音乐名称1</span>
                        <audio :src="mp3Url" controls></audio>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <!-- 评论组件 -->
            <mood-comment-list :auther="username" :moodId="_id" type="mood" />
        </el-row>
    </div>
</template>

<script>
import MoodCommentList from '@/components/home/moodCommentList.vue'
import { ref, onMounted } from 'vue'
import $http from '@/axios/http.js'
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
        },
        _id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const moodsRef = ref([])
        onMounted(async () => {
            const res = await $http.get('/admin/resource/mood/find')
        })
    },
    components: {
        MoodCommentList
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/home/moodContent.scss';
</style>
