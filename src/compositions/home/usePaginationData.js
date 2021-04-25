import { ref, computed, watchEffect } from 'vue'

export default function usePaginationData(dataRef) {
    // 分页初始化Ref
    const paginationRef = ref({
        total: 0,
        pageSize: 5,
        pageSizes: [5, 10, 15, 20],
        currentPage: 1,
        hide: true
    })

    watchEffect(() => {
        paginationRef.value.total = dataRef.value.length
        if (paginationRef.value.total) {
            paginationRef.value.hide = false
        }
    })

    const pageDataRef = computed({
        get() {
            let data = dataRef.value.slice(
                (paginationRef.value.currentPage - 1) *
                    paginationRef.value.pageSize,
                paginationRef.value.currentPage * paginationRef.value.pageSize
            )
            return data
        }
    })

    //封装到一块。
    const handleCurrentChange = prop => {
        paginationRef.value.currentPage = prop
    }
    const handleSizeChange = prop => {
        paginationRef.value.pageSize = prop
    }

    return {
        pageDataRef,
        paginationRef,
        handleCurrentChange,
        handleSizeChange
    }
}
