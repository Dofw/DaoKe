<template>
    <div class="comment-reply-list">
        <template v-for="rep in repsRef" :key="rep._id">
            <MoodCommentReplyItem :rep="rep" :com="com" />
        </template>
    </div>
</template>

<script>
import useCommentInterface from '@/compositions/home/useCommentInterface.js'
import MoodCommentReplyItem from '@/components/home/moodCommentReplyItem.vue'

import { ref, onMounted, watchEffect } from 'vue'

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
    setup(props) {
        /**
         * 交互功能
         */
        const repsRef = ref([])
        // 发送数据
        const interfaceObj = useCommentInterface()
        const { onGetReps } = interfaceObj

        // 获取数据
        onMounted(async () => {
            //$http错误的问题都集中在http中，如果入刑到这里，说明是成功的返回结果。
            const reps = await onGetReps(props.com._id)
            repsRef.value = reps.message
        })

        // 父组件，增加了数据。props.isCreate变化。就执行。
        watchEffect(async () => {
            const isChange = props.isCreate
            const reps = await onGetReps(props.com._id)
            repsRef.value = reps.message
        })

        return {
            repsRef
        }
    },
    components: {
        MoodCommentReplyItem
    }
}
</script>

<style MoodCommentReply lang="scss" scope>
@import '@/assets/scss/home/moodCommentReplyList.scss';
</style>
