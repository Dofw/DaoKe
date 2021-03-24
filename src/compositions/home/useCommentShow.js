import { ref } from 'vue'

export default function useCommentShow() {
    const isShow = ref(true)
    const onTrigger = () => {
        isShow.value = !isShow.value
    }

    return {
        isShow,
        onTrigger
    }
}
