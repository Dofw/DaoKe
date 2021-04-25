<template>
    <div class="comment-structure">
        <div class="comment-structure-content d-flex align-items-center">
            <img
                v-if="com.reviewer.photoUrl"
                :src="com.reviewer.photoUrl"
                alt=""
            />
            <img v-else src="" alt="默认头像" />
            <div class="flex-grow-1">
                <p>
                    {{ com.reviewer.nickname ? com.reviewer.nickname : '刀客' }}
                </p>
                <p>{{ com.content }}</p>
                <div class="time-reply">
                    <span>
                        {{ com.time }}
                    </span>
                    <el-badge
                        class="item"
                        :value="countRef"
                        :hidden="!countRef"
                        type="success"
                    >
                        <el-button size="mini" @click="onSwitch"
                            >回复</el-button
                        >
                    </el-badge>
                </div>

                <div v-if="switchRef" class="comment-reply d-flex">
                    <mood-comment-input
                        @myclick="onCreateRep($event, com)"
                        @cancel-reply="oncancelReply"
                    ></mood-comment-input>
                </div>
            </div>
        </div>

        <div class="comment-structure-reply ">
            <mood-comment-reply-list :isCreate="isCreate" :com="com" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import useCommentInterface from '@/compositions/home/useCommentInterface.js'
import MoodCommentInput from '@/components/home/moodCommentInput.vue'
import MoodCommentReplyList from './moodCommentReplyList.vue'

export default {
    name: 'mood-comment-list', // 递归组件
    props: {
        com: {
            type: Object,
            required: true
        }
    },

    setup(props, context) {
        /**
         * 切换功能
         */
        const switchRef = ref(false)
        const onSwitch = function() {
            switchRef.value = !switchRef.value
        }

        const oncancelReply = () => {
            switchRef.value = !switchRef.value
        }

        // 交互功能

        const repsData = ref({}) //该组件，并没有用到这个响应式数据。为了使用onReply
        const isCreate = ref(true) // 为了，让onReply发送后，切换一次v-if。来达到子组件重新渲染的目的
        const countRef = ref(null)

        const { onReply, countCU, onGetOneRepCount } = useCommentInterface()

        // 回复input组件触发的接受函数
        const onCreateRep = async (condition, com) => {
            let body = {
                auther: com.reviewer.username,
                tier: condition.tier,
                content: condition.textarea,
                commentId: com._id //耦合props属性。
            }
            // debugger
            await onReply(condition, body, repsData) // 如何创建后，让页面重新刷新呢。
            const count = await countCU(com._id)
            countRef.value = count
            isCreate.value = !isCreate.value
            switchRef.value = !switchRef.value
        }

        // 获取数据
        onMounted(async () => {
            //$http错误的问题都集中在http中，如果进入到这里，说明是成功的返回结果。
            const count = await onGetOneRepCount(props.com._id)

            if (count.message === null) {
                countRef.value = null
            } else {
                countRef.value = count.message.count
            }
        })

        return {
            onSwitch,
            switchRef,
            onCreateRep,
            isCreate,
            oncancelReply,
            countRef
        }
    },

    components: {
        MoodCommentInput,
        MoodCommentReplyList
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/home/moodCommentList.scss';
</style>
