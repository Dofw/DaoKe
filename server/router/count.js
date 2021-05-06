module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')

    const authMiddleware = require('../middleware/auth.js')
    const modelMiddleware = require('../middleware/model.js')
    const praise = require('../mongodb/praise.js')

    const router = express.Router({ mergeParams: true })

    /**
     * 创建
     */
    router.post(
        '/create',
        authMiddleware(),
        modelMiddleware(),
        async (req, res) => {
            const data = req.body.data
            if (req.params.model === 'done-praise') {
                //应为这里，要用到 鉴权后的userid。
                data.id = req.id
            }

            // 这个是创建，每个用户的点赞状态
            const result = await req.model.create(data)

            if (req.params.model === 'done-praise') {
                const praiseRes = await praise.findOne({ id: data.moodId })
                result.praise = praiseRes._id
            }

            await result.save()
            res.send({
                status: 200,
                message: 'count创建ok'
            })
        }
    )

    //修改
    // update
    router.post(
        '/update',
        authMiddleware(),
        modelMiddleware(),
        async (req, res) => {
            const data = req.body.data
            let id = data.id

            if (req.params.model === 'done-praise') {
                //有鉴权
                id = req.id
                await req.model.update(
                    { id, moodId: data.moodId },
                    req.body.data
                )
            } else {
                await req.model.update({ id }, req.body.data)
            }

            res.send({
                status: 200,
                message: '更新成功'
            })
        }
    )
    // 获取
    router.get('/findOne', modelMiddleware(), async (req, res) => {
        const params = req.query
        let { id, moodId } = params
        let praise
        if (req.params.model === 'done-praise') {
            //应为这里，要用到 鉴权后的userid。但是find，不应该有鉴权，否则首页没办法一开始展示总数。

            praise = await req.model
                .findOne({
                    id,
                    moodId
                })
                .populate('praise')
            console.log(praise)
        } else {
            praise = await req.model.findOne({ id })
        }
        res.send({
            status: 200,
            message: praise
        })
    })

    app.use('/admin/count/:model', router) //动态路由。
}
