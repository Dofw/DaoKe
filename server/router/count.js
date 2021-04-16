module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')

    const authMiddleware = require('../middleware/auth.js')
    const modelMiddleware = require('../middleware/model.js')

    const router = express.Router({ mergeParams: true })

    // 创建
    router.post(
        '/create',
        authMiddleware(),
        modelMiddleware(),
        async (req, res) => {
            const data = req.body.data
            const like = await req.model.create(data)

            like.save()

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

            // update
            await req.model.update({ id: data.id }, req.body.data)

            res.send({
                status: 200,
                message: '更新成功'
            })
        }
    )
    // 获取
    router.get('/findOne', modelMiddleware(), async (req, res) => {
        const params = req.query

        const like = await req.model.findOne({ id: params.id })

        res.send({
            status: 200,
            message: like
        })
    })

    app.use('/admin/count/:model', router) //动态路由。
}
