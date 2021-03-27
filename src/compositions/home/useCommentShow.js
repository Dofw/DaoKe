import { ref, computed } from 'vue'

export default function useCommentShow() {
    const isShow = ref(true) //评论的切换
    const isReply = ref(false) // reply
    const num = ref(null) // reply
    const onTrigger = () => {
        isShow.value = !isShow.value
    }
    const onTriggerReply = index => {
        num.value = index
        isReply.value = !isReply.value
    }

    const isReplyShowRef = computed({
        // 计算属性传参的形式，控制条件v-for的index ，点击切换按钮。
        get() {
            return index => {
                return index === num.value && isReply.value
            }
        }
    })
    return {
        isReplyShowRef,
        isShow,
        onTriggerReply,
        onTrigger
    }
}
