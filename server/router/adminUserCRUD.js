module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true // 将父级参数，共享到子集中。
    })
    const upper = require('../utils/upperStart.js')

    // 新增
    // router.get('/', async(req, res) => {
    //     const info = await info.find()
    // })

    // 获取
    // router.get('/', async(req, res) => {
    //     const info = await info.find()
    // })

    // 修改
    router.post('/:method', async (req, res) => {
        console.log(JSON.stringify(req.body.data))
        console.log(req.params)
        let model = require(`../mongodb/account${upper(req.params.id)}.js`)
        let method = req.params.method
        let username = req.body.data.username

        // update
        const info = await model[method]({ username }, req.body.data)
        console.log(111, info)

        // 是否更新
        const info1 = await model['find']({ username })
        console.log(222, info1)

        res.send({
            status: 200,
            message: info1
        })
    })

    app.use('/admin/user/:id', router) //动态路由。
}
