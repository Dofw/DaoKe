<template>
    <div class="comment-input d-flex">
        <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textareaRef"
            maxlength="60"
            :rows="2"
            show-word-limit
        >
        </el-input>
        <el-button @click.prevent="onReply" size="mini" type="primary"
            >提交</el-button
        >
        <el-button v-if="isShow" @click.prevent="cancel" size="mini" type="info"
            >取消</el-button
        >
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    props: {
        isShow: {
            type: Boolean,
            default: true
        }
    },
    setup(props, context) {
        const textareaRef = ref('')
        const onReply = () => {
            context.emit('myclick', {
                textarea: textareaRef.value,
                tier: 0
            })
            textareaRef.value = ''
        }
        const cancel = () => {
            context.emit('cancel-reply')
        }
        return {
            textareaRef,
            onReply,
            cancel
        }
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/home/moodCommentInput.scss';
</style>
