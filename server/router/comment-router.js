module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')

    const authMiddleware = require('../middleware/auth.js')
    const modelMiddleware = require('../middleware/model.js')

    const Info = require('../mongodb/info.js')

    const router = express.Router({ mergeParams: true })

    // async function remove() {
    //     await Comment.remove()
    //     await Reply.remove()
    // }

    // remove()

    // 回复接口
    router.post(
        '/create',
        authMiddleware(),
        modelMiddleware(),
        async (req, res) => {
            // 前端验证数据。
            const data = req.body.data
            data.reviewer = req.id
            const com = await req.model.create(data)
            const reviewerInfo = await Info.findOne({ username: req.id })
            const autherInfo = await Info.findOne({ username: data.auther })

            //关联
            com.reviewer = reviewerInfo._id
            com.auther = autherInfo._id

            com.save()

            res.send({
                status: 200,
                message: '评论创建ok'
            })
        }
    )

    // 获取评论
    router.get('/find', modelMiddleware(), async (req, res) => {
        const params = req.query
        let condition
        if (req.params.model === 'comment') {
            condition = {
                // auther: params.auther,
                // type: params.type,
                moodId: params.moodId
            }
        } else if (req.params.model === 'comment-reply') {
            condition = {
                commentId: params.commentId
            }
        }

        const coms = await req.model
            .find(condition)
            .populate('reviewer')
            .populate('auther')

        res.send({
            status: 200,
            message: coms
        })
    })

    app.use('/admin/discuss/:model', router) //动态路由。
}
