import { ref, computed } from 'vue'

// 筛选的，策略模式
const strategy = {
    music: originalDataRef => {
        return originalDataRef.value.filter(item => {
            return !!item.mp3Url
        })
    },
    all: originalDataRef => {
        return originalDataRef.value
    },
    nomusic: originalDataRef => {
        return originalDataRef.value.filter(item => {
            return !item.mp3Url
        })
    }
}

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
            let data

            data = strategy[filterRef.value](dataRef)

            return data
        }
    })

    return {
        filterRef,
        onchangeFilter,
        moodFilterRef
    }
}
