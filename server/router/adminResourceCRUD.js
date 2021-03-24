module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true // 将父级参数，共享到子集中。
    })
    const Info = require('../mongodb/info.js')
    const Info1 = require('../mongodb/mood.js')
    const Info2 = require('../mongodb/user.js')
    const Info3 = require('../mongodb/comment.js')
    const authMiddleware = require('../middleware/auth.js')
    const modelMiddleware = require('../middleware/model.js')
    // const User = require('../mongodb/accountUser.js')

    // async function remove() {
    //     await Info.remove()
    //     await Info1.remove()
    //     await Info2.remove()
    //     await Info3.remove()
    //     console.log(111111)
    // }
    // remove()

    //create
    router.post(
        '/create',
        authMiddleware(),
        modelMiddleware(),
        async (req, res) => {
            const data = req.body.data || {}
            try {
                const source = await req.model.create(data)

                //好像可以放在model中间件中。
                if (req.params.model === 'mood') {
                    // mood时，关联info
                    const info = await Info.findOne({ username: req.id })
                    assert(info, 401, '没有查询到info')

                    source.info = info._id
                }

                // return： 1没有参数，undefined；2有{}，如果不满足条件，报错； 3返回该doc，或者[docs]
                source.username = req.id
                await source.save()
                res.send({
                    status: 200,
                    message: req.params.model + '保存成功'
                })
            } catch (error) {
                res.status(401).send({ message: req.params.model + '创建失败' })
            }
        }
    )

    //find-all mood
    router.get('/find', modelMiddleware(), async (req, res) => {
        const source = await req.model.find().populate('info') //带出来。
        res.send({
            status: 200,
            message: source
        })
    })

    // findone user、info
    router.get(
        '/findone',
        authMiddleware(),
        modelMiddleware(),
        async (req, res) => {
            let source

            if (req.params.model === 'user') {
                source = await req.model
                    .findOne({ _id: req.id })
                    .populate('info')
                    .populate('mood')
                    .populate('todo')
                    .lean()
            } else {
                source = await req.model
                    .findOne({ username: req.id })
                    .populate('username')
            }

            assert(source, 401, '请登录')
            res.send({
                status: 200,
                message: source
            })
        }
    )

    // update
    router.post(
        '/update',
        authMiddleware(),
        modelMiddleware(),
        async (req, res) => {
            // update
            await req.model.update({ username: req.id }, req.body.data)

            res.send({
                status: 200,
                message: '更新成功'
            })
        }
    )

    // remove-all
    router.get(
        '/remove',
        authMiddleware(),
        modelMiddleware(),
        async (req, res) => {
            await req.model.remove()
            res.send({
                status: 200,
                message: '清空成功'
            })
        }
    )

    app.use('/admin/resource/:model', router) //动态路由。
}
