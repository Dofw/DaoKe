<template>
    <div class="comment-input d-flex">
        <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textareaRef"
            maxlength="100"
            :rows="1"
            show-word-limit
        >
        </el-input>
        <el-button @click.prevent="onReply" size="mini">提交</el-button>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup(props, context) {
        const textareaRef = ref('')
        const onReply = () => {
            context.emit('myclick', {
                textarea: textareaRef.value,
                tier: 0
            })
            textareaRef.value = ''
        }
        return {
            textareaRef,
            onReply
        }
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/home/moodCommentInput.scss';
</style>
