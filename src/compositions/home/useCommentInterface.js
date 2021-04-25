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

    //创建count
    const onCreateOneRepCount = async data => {
        const res = await $http.post('/admin/count/like/create', {
            data
        })
        return res
    }
    //更新count
    const onUpdateOneRepCount = async data => {
        const res = await $http.post('/admin/count/like/update', {
            data
        })
        return res
    }

    //获取count
    const onGetOneRepCount = async id => {
        const res = await $http.get('/admin/count/like/findOne', {
            params: {
                id
            }
        })
        return res
    }

    //创建count
    const onCreateOneLikeCount = async data => {
        const res = await $http.post('/admin/count/like-count/create', {
            data
        })
        return res
    }
    //更新count
    const onUpdateOneLikeCount = async data => {
        const res = await $http.post('/admin/count/like-count/update', {
            data
        })
        return res
    }

    //获取count
    const onGetOneLikeCount = async id => {
        const res = await $http.get('/admin/count/like-count/findOne', {
            params: {
                id
            }
        })
        return res
    }

    /**
     * count的创建和update封装函数。
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

    /**
     * LIKEcount的创建和update封装函数。
     */
    async function likeCountCU(id) {
        let count = await onGetOneLikeCount(id) //先获取。
        if (count.message === null) {
            await onCreateOneLikeCount({
                // 创建
                id: id,
                count: 1
            })
        } else {
            await onUpdateOneLikeCount({
                // 更新
                id: id,
                count: ++count.message.count
            })
        }
        const num = await onGetOneLikeCount(id) //再获取，更新。

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
        onGetOneLikeCount,
        onCreateOneLikeCount,
        onUpdateOneLikeCount,
        countCU,
        likeCountCU
    }
}
