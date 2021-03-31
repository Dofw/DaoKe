<template>
    <div class="comment-reply-list">
        <template v-for="(rep, index) in repsRef" :key="rep._id">
            <div class="comment-reply-item">
                <div class="d-flex justify-content-between align-items-end">
                    <div class="flex-grow-1">
                        {{ rep.reviewer.nickname }} 回复 @
                        {{ rep.auther.nickname }} :
                        {{ rep.content }}
                    </div>
                    <div class="d-flex justify-content-end ">
                        <el-button class="" size="mini" @click="onSwitch(index)"
                            >回复</el-button
                        >
                        <el-button class="" size="mini">点赞</el-button>
                    </div>
                </div>
                <div v-if="isSwitch(index)">
                    <mood-comment-input
                        @myclick="onCreate($event, rep)"
                    ></mood-comment-input>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import useCommentInterface from '@/compositions/home/useCommentInterface.js'
import MoodCommentInput from '@/components/home/moodCommentInput.vue'

import { ref, onMounted, computed, watchEffect } from 'vue'

export default {
    props: {
        com: {
            type: Object,
            required: true
        },
        isCreate: {
            type: Boolean
        }
    },
    setup(props, context) {
        /**
         * 切换功能
         */
        const switchRef = ref(false)
        const num = ref(null)
        const onSwitch = index => {
            num.value = index
            switchRef.value = !switchRef.value
        }
        const isSwitch = computed({
            get() {
                return index => {
                    return index === num.value && switchRef.value
                }
            }
        })

        /**
         * 交互功能
         */
        const repsRef = ref([])
        // 发送数据
        const interfaceObj = useCommentInterface()
        const { onGetReps, onReply } = interfaceObj

        // 子组件触发的接受函数
        const onCreate = async (condition, rep) => {
            let body = {
                auther: rep.reviewer.username,
                tier: 1,
                content: condition.textarea,
                commentId: props.com._id //耦合props属性。
            }
            await onReply(condition, body, repsRef)
            switchRef.value = !switchRef.value // 回复完，直接切换。
        }

        // 获取数据
        onMounted(async () => {
            //$http错误的问题都集中在http中，如果入刑到这里，说明是成功的返回结果。
            const reps = await onGetReps(props.com._id)
            repsRef.value = reps.message
            // // 根据coms，请求对应_id条件下的rep
            // coms.message.forEach(async com => {
            //     const rep = await onGetReps(com)
            //     repsData.value[com._id] = rep.message
            // })
        })

        // 父组件，增加了数据。props.isCreate变化。就执行。
        watchEffect(async () => {
            const isChange = props.isCreate
            const reps = await onGetReps(props.com._id)
            repsRef.value = reps.message
        })

        return {
            repsRef,
            onSwitch,
            isSwitch,
            onCreate
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
