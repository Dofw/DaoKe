<template>
    <div class="comment-reply-item">
        <div class="d-flex justify-content-between align-items-end">
            <div class="flex-grow-1">
                <span class="time">{{ rep.time }}</span>
                <span v-if="rep.tier === 1">
                    {{ rep.reviewer.nickname }}
                    <span class="reply-color">回复 @</span>
                    {{ rep.auther.nickname }} :
                    {{ rep.content }}
                </span>
                <span v-else>
                    {{ rep.reviewer.nickname }} : {{ rep.content }}
                </span>
            </div>
            <div class="d-flex justify-content-end">
                <el-badge
                    class="item"
                    :value="RepCountRef"
                    :hidden="!RepCountRef"
                    type="success"
                >
                    <el-button class="" size="mini" @click="onSwitch"
                        >回复</el-button
                    >
                </el-badge>
            </div>
        </div>
        <div v-if="switchRef">
            <mood-comment-input
                @myclick="onCreate($event, rep)"
                @cancel-reply="oncancelReply"
            ></mood-comment-input>
        </div>
    </div>
</template>

<script>
import useCommentInterface from '@/compositions/home/useCommentInterface.js'
import MoodCommentInput from '@/components/home/moodCommentInput.vue'

import { ref, onMounted, watch } from 'vue'

export default {
    props: {
        rep: {
            type: Object,
            required: true
        },
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
        const onSwitch = () => {
            switchRef.value = !switchRef.value
        }
        const oncancelReply = () => {
            switchRef.value = !switchRef.value
        }

        /**
         * 交互功能
         */
        const repsRef = ref([])
        const RepCountRef = ref(0)
        // 发送数据

        const { onReply, countCU, onGetOneRepCount } = useCommentInterface()

        // 子组件触发的接受函数
        const onCreate = async (condition, rep) => {
            if (!condition.textarea) {
                return
            }

            let body = {
                auther: rep.reviewer.username,
                tier: 1,
                content: condition.textarea,
                commentId: props.com._id //耦合props属性。
            }
            await onReply(condition, body, repsRef) // 这里repsRef是因为交互函数中给了参数。

            context.emit('update-refs')

            const count = await countCU(rep._id)
            RepCountRef.value = count // 改变count
            switchRef.value = !switchRef.value // 回复完，直接切换。
        }

        // 获取数据
        onMounted(async () => {
            const count = await onGetOneRepCount(props.rep._id)
            let num
            if (count.message === null) {
                num = null
            } else {
                num = count.message.count
            }
            RepCountRef.value = num
        })

        return {
            repsRef,
            onSwitch,
            onCreate,
            oncancelReply,
            RepCountRef,
            switchRef
        }
    },
    components: {
        MoodCommentInput
    }
}
</script>

<style MoodCommentReply lang="scss" scope>
@import '@/assets/scss/home/moodCommentReplyList.scss';
</style>
