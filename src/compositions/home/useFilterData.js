import { ref, computed } from 'vue'

export default function useFilterData(dataRef) {
    // 筛选方式初始化
    const filterRef = ref('all')

    //获取筛选方式的事件函数
    const onchangeFilter = filter => {
        // 改变样式
        filterRef.value = filter
    }

    const moodFilterRef = computed({
        get() {
            //此部分，可以封装utils
            let data
            if (filterRef.value === 'music') {
                data = dataRef.value.filter(item => {
                    return !!item.mp3Url
                })
            } else if (filterRef.value === 'all') {
                data = dataRef.value
            } else if (filterRef.value === 'nomusic') {
                data = dataRef.value.filter(item => {
                    return !item.mp3Url
                })
            }
            return data
        }
    })

    return {
        filterRef,
        onchangeFilter,
        moodFilterRef
    }
}
