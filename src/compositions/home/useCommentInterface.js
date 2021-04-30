import $http from '@/axios/http.js'

export default function useCommentInterface() {
    //评论接口，新增
    const onComment = async (condition, body, comsRef) => {
        //获取数据，在异步中获取。setup函数执行一次。

        if (!condition.textarea) {
            //为空
            return false
        }
        body.content = condition.textarea
        await $http.post('/admin/discuss/comment/create', {
            data: body
        })

        const coms = await onGetComs({ moodId: body.moodId })
        comsRef.value = coms.message
    }

    //获取数据
    const onGetComs = async params => {
        const res = await $http.get('/admin/discuss/comment/find', {
            params: params
        })
        return res
    }

    /**
     * 回复接口， 新增
     */
    const onReply = async (condition, body, repsRef) => {
        //获取数据，在异步中获取。setup函数执行一次。
        if (!condition.textarea) {
            //为空
            return false
        }

        await $http.post('/admin/discuss/comment-reply/create', {
            data: body
        })
        const reps = await onGetReps(body.commentId)
        repsRef.value = reps.message
    }

    //获取数据
    const onGetReps = async commentId => {
        const res = await $http.get('/admin/discuss/comment-reply/find', {
            params: {
                commentId
            }
        })
        return res
    }

    //创建repcount
    const onCreateOneRepCount = async data => {
        const res = await $http.post('/admin/count/count/create', {
            data
        })
        return res
    }
    //更新Repcount
    const onUpdateOneRepCount = async data => {
        const res = await $http.post('/admin/count/count/update', {
            data
        })
        return res
    }

    //获取Repcount
    const onGetOneRepCount = async id => {
        const res = await $http.get('/admin/count/count/findOne', {
            params: {
                id
            }
        })
        return res
    }

    /**
     * precount的创建和update封装函数。
     */
    async function countCU(id) {
        let count = await onGetOneRepCount(id) //先获取。
        if (count.message === null) {
            await onCreateOneRepCount({
                // 创建
                id: id,
                count: 1
            })
        } else {
            await onUpdateOneRepCount({
                // 更新
                id: id,
                count: ++count.message.count
            })
        }
        const num = await onGetOneRepCount(id) //先获取。

        return num.message.count
    }

    return {
        onComment,
        onReply,
        onGetComs,
        onGetReps,
        onGetOneRepCount,
        onCreateOneRepCount,
        onUpdateOneRepCount,
        countCU
    }
}
