module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')

    const authMiddleware = require('../middleware/auth.js')
    const modelMiddleware = require('../middleware/model.js')

    const Info = require('../mongodb/info.js')
    const Comment = require('../mongodb/comment.js')

    const router = express.Router()

    //创建评论
    router.post('/admin/comment/create', authMiddleware(), async (req, res) => {
        // 前端验证数据。
        const data = req.body.data
        data.reviewer = req.id
        const com = await Comment.create(data)
        const info = await Info.findOne({ username: req.id })

        //关联
        com.reviewer = info._id
        com.auther = data.auther

        com.save()

        res.send({
            status: 200,
            message: '评论创建ok'
        })
    })

    // 获取评论
    router.get('/admin/comment/find', async (req, res) => {
        const params = req.query
        console.log(params)

        const coms = await Comment.find({
            auther: params.auther,
            type: params.type
        }).populate('reviewer')

        res.send({
            status: 200,
            message: coms
        })
    })
    app.use(router)
}
