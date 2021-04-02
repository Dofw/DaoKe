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
                        <img id="audio-img" :src="pictureUrl" />
                        <div v-if="mp3Url">
                            <i v-if="isPlay" class="el-icon-video-pause"></i>
                            <i v-else class="el-icon-video-play"></i>
                        </div>
                    </div>
                    <div class="mood-mp3 " v-if="mp3Url">
                        <span>音乐名称1</span>
                        <audio
                            id="audio"
                            :src="mp3Url"
                            @timeupdate="ontimeupdta"
                            @durationchange="ondurationchange"
                        ></audio>
                        <el-row class="controls" :gutter="10">
                            <el-col class="mb-1">
                                <div
                                    class="audio-progress"
                                    @click="onprogressclick"
                                >
                                    <el-progress
                                        :text-inside="true"
                                        :stroke-width="3"
                                        :percentage="audioDataRef.progressPer"
                                        :show-text="false"
                                        status="success"
                                    ></el-progress>

                                    <span
                                        class="progress-bar"
                                        :style="{
                                            left: audioDataRef.progressPer + '%'
                                        }"
                                        @mousedown="onmousedownprogress"
                                    ></span>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div @click="onAudioClick">
                                    <i
                                        v-if="audioDataRef.isPlay"
                                        class="el-icon-video-pause"
                                    ></i>
                                    <i v-else class="el-icon-video-play"></i>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div>
                                    <span>
                                        {{ audioDataRef.currentTime }}/{{
                                            audioDataRef.totleTime
                                        }}
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="voice-size" @click="onvoiceclick">
                                    <el-progress
                                        :text-inside="true"
                                        :stroke-width="2"
                                        :percentage="audioDataRef.voicePer"
                                        :show-text="false"
                                        status="success"
                                    ></el-progress>
                                    <span
                                        :style="{
                                            left: audioDataRef.voicePer + '%'
                                        }"
                                        @mousedown="onmousedownvoice"
                                    ></span>
                                </div>
                                <div class="icon-voice">
                                    <i
                                        class="el-icon-turn-off-microphone"
                                        v-if="audioDataRef.isSilence"
                                    ></i>
                                    <i class="el-icon-microphone" v-else></i>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div><i class="el-icon-setting"></i></div>
                            </el-col>
                        </el-row>
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
        const audioDataRef = ref({
            progressPer: 0,
            voicePer: 50,
            isSilence: false,
            isPlay: false,
            currentTime: '',
            totleTime: ''
        })
        // video 动态操作。
        let audioDom, imgDom, progressDom, voiceSizeDom
        onMounted(() => {
            // 使用audiodom的方法。
            audioDom = document.getElementById('audio')

            // 这两个dom，为了计算偏移距离
            progressDom = document.getElementsByClassName('audio-progress')[0]
            voiceSizeDom = document.getElementsByClassName('voice-size')[0]

            imgDom = document.getElementById('audio-img')
        })

        /**
         * voiceSize 点击事件
         */
        const onvoiceclick = e => {
            setVolume(e)
        }

        //voice span的按下事件和拖拽
        const onmousedownvoice = e => {
            setVolume(e)
            window.onmousemove = function(e) {
                setVolume(e)
            }
            window.onmouseup = function() {
                window.onmousemove = false
            }
        }

        /**
         * 工具： 设置声音
         * 1. 设置volume
         * 2. 设置百分比。和progress不一样。没有监听时间变化的事件
         */
        function setVolume(e) {
            const rect = voiceSizeDom.getBoundingClientRect()
            let offset = e.clientX - rect.left

            //设置为非静音
            audioDataRef.value.isSilence = false

            // 控制移动区间
            if (offset < 0) {
                offset = 0
                // 设置为静音
                audioDataRef.value.isSilence = true
            } else if (offset > rect.width) {
                offset = rect.width
            }

            // currentTime = 当前位置 / 总位置 * 总时长
            let currentVolume = offset / rect.width

            audioDom.volume = currentVolume //0--1之间
            audioDataRef.value.voicePer = currentVolume * 100
        }

        /**
         * progress点击事件
         */
        const onprogressclick = e => {
            setCurrentTime(e)
        }

        /**
         * span的按下事件和拖拽
         * 1. 设置时间, 时间更新，重新设置百分比。连锁反应
         * 2. 拖拽事件，设置时间。
         */
        const onmousedownprogress = function(e) {
            setCurrentTime(e)
            window.onmousemove = function(e) {
                setCurrentTime(e)
            }
            window.onmouseup = function() {
                window.onmousemove = false
            }
        }

        /**
         * 工具方法:setCurrentTime
         *  一连串反应。时间变化，重新设置百分比。
         */
        function setCurrentTime(e) {
            // currentTime = 当前位置 / 总位置 * 总时长
            const rect = progressDom.getBoundingClientRect()

            let offset = e.clientX - rect.left
            // 控制移动区间
            if (offset < 0) {
                offset = 0
            } else if (offset > rect.width) {
                offset = rect.width
            }

            let currentTime = (offset / rect.width) * audioDom.duration
            audioDom.currentTime = currentTime
        }

        /**
         * 加载完成事件
         * 1.解决 资源没完全加载，duration为undefined
         */
        const ondurationchange = () => {
            audioDataRef.value.currentTime = setTime(audioDom.currentTime)
            audioDataRef.value.totleTime = setTime(audioDom.duration)
        }
        /**
         * 监控时间变化
         * 1. 设置事件
         * 2. 设置百分比
         */
        const ontimeupdta = e => {
            let per = (audioDom.currentTime / audioDom.duration) * 100
            audioDataRef.value.progressPer = per
            audioDataRef.value.currentTime = setTime(audioDom.currentTime)
        }
        /**
         * 工具函数：设置时间格式
         */
        function setTime(time) {
            let timeInt = parseInt(time)
            let minute = Math.floor(timeInt / 60) // 向下取整
            let second = timeInt - minute * 60

            if (minute < 10) {
                minute = '0' + minute
            }
            if (second < 10) {
                second = '0' + second
            }
            return minute + ':' + second
        }

        //播放控制按钮
        const onAudioClick = () => {
            if (audioDataRef.value.isPlay) {
                audioDom.pause()
                audioDataRef.value.isPlay = !audioDataRef.value.isPlay
                return
            }
            audioDom.play()
            audioDataRef.value.isPlay = !audioDataRef.value.isPlay
        }

        return {
            audioDataRef,
            onAudioClick,
            ontimeupdta,
            onmousedownprogress,
            ondurationchange,
            onprogressclick,
            onmousedownvoice,
            onvoiceclick
        }
    },
    components: {
        MoodCommentList
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/home/moodContent.scss';
</style>
