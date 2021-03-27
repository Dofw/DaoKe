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

        const coms = await onGetComs()
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
                commentId: commentId
            }
        })
        return res
    }

    return {
        onComment,
        onReply,
        onGetComs,
        onGetReps
    }
}
