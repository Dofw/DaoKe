import $http from '@/axios/http.js'

export default function useCommentInterface() {
    /**
     * praise的接口
     * @param {Object} data {count: 1, id: moodid  }
     */

    //创建praise
    const onCreatePraise = async data => {
        const res = await $http.post('/admin/count/praise/create', {
            data
        })
        return res.message
    }
    //更新praise 是根据状态来的，放在done-praise接口中。
    const onUpdatePraise = async data => {
        const res = await $http.post('/admin/count/praise/update', {
            data
        })
        return res.message
    }

    //获取praise
    const onGetPraise = async id => {
        const res = await $http.get('/admin/count/praise/findOne', {
            params: {
                id
            }
        })
        return res.message
    }

    /**
     * done-praise接口
     */
    //创建praise
    const onCreateDonePraise = async data => {
        const res = await $http.post('/admin/count/done-praise/create', {
            data
        })
        return res.message
    }
    //更新praise 是根据状态来的，放在done-praise接口中。
    const onUpdateDonePraise = async data => {
        const res = await $http.post('/admin/count/done-praise/update', {
            data
        })
        return res.message
    }

    //获取praise
    const onGetDonePraise = async (id1, id2) => {
        const res = await $http.get('/admin/count/done-praise/findOne', {
            params: {
                moodId: id1,
                id: id2
            }
        })
        return res.message
    }

    /**
     * 点击事件，前端，处理数据的逻辑（请求次数太多，不建议）。其实，应该由后端做出接口（只需要一个接口，参数约定一下）。
     * @param {*} id1 moodid
     * @returns
     */
    const praiseCU = async (id1, id2) => {
        let praiseResult = await onGetPraise(id1)
        if (!praiseResult) {
            await onCreatePraise({
                id: id1,
                count: 0
            })

            //找出来，获取当前的数据。
            praiseResult = await onGetPraise(id1)
        }

        //praiseResult 创建完之后，才能操作done-praise
        let donePraise = await onGetDonePraise(id1, id2)
        console.log(donePraise)
        let count = praiseResult.count
        if (!donePraise) {
            // 服务端进行关联， praise
            await onCreateDonePraise({
                done: true,
                moodId: id1,
                id: id2
            })
            count += 1
        } else {
            //donePraise存在，update
            await onUpdateDonePraise({
                done: !donePraise.done,
                moodId: id1
            })
            // 此时状态为，true，点击后为false，-1
            donePraise.done ? (count -= 1) : (count += 1)
        }
        //不管是新建更新donepraise，都要更新praise
        await onUpdatePraise({
            count: count,
            id: id1
        })

        // 获取跟新后的数据
        donePraise = await onGetDonePraise(id1, id2)
        return donePraise
    }

    return {
        onCreateDonePraise,
        onGetDonePraise,
        praiseCU
    }
}
