module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true // 将父级参数，共享到子集中。
    })
    const authMiddleware = require('../middleware/auth.js')
    const modelMiddleware = require('../middleware/model.js')
    //create
    modelMiddleware(),
        router.post(
            '/create',
            // authMiddleware(),
            modelMiddleware(),
            async (req, res) => {
                const data = req.body.data || {}
                try {
                    const source = await req.model.create(data)
                    source.username = req.user._id
                    await source.save()
                    console.log(1111, source)
                    res.status(401).send({ source })
                } catch (error) {
                    res.status(401).send({
                        status: 401,
                        message: `${req.params.model} 创建失败`
                    })
                }
            }
        )

    //find all
    router.get('/find', modelMiddleware(), async (req, res) => {
        const source = await req.model.find()
        res.status(200).send(source)
    })

    // update
    router.post(
        '/update',
        authMiddleware(),
        modelMiddleware(),
        async (req, res) => {
            // update
            const source = await req.model.update(
                { username: req.id },
                req.body.data
            )
            console.log(source, req.user)

            res.send({
                status: 200,
                message: info
            })
        }
    )

    // remove
    router.post('/remove', (req, res) => {})
    app.use('/admin/user/:model', router) //动态路由。
}
